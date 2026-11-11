// =====================================================================
//  Lernstand
//
//  Alles wird zuerst im Browser gespeichert (localStorage). So läuft die
//  App auch ohne Login und ohne Netz. Ist Supabase eingerichtet und du
//  bist angemeldet, gleicht sync.js den Stand mit der Datenbank ab.
// =====================================================================
import { schedule, dateStr, MAX_INTERVAL, daysBetween } from './srs.js';

const KEY = 'mathe-tool.v1';

function blank() {
  return {
    v: 1,
    cards: {},          // card_id -> Zustand (siehe srs.js) + upd (Zeitstempel in ms)
    dirty: {},          // card_id -> true: noch nicht in der Datenbank
    pending: [],        // Bewertungen, die noch hochgeladen werden müssen
    settings: { examDate: '', newPerDay: 15, upd: 0 },
    settingsDirty: false,
    sheet: { sel: {}, upd: 0 },   // Formelblatt: item_id -> true/false
    sheetDirty: false,
  };
}

let state = blank();
let memoryOnly = false;
const listeners = new Set();

function uuid() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/x/g, () =>
    Math.floor(Math.random() * 16).toString(16));
}

export function load() {
  try {
    const raw = globalThis.localStorage.getItem(KEY);
    if (raw) state = { ...blank(), ...JSON.parse(raw) };
  } catch {
    memoryOnly = true; // privater Modus o. Ä.: Stand gilt nur für diese Sitzung
  }
  return state;
}

function save() {
  try {
    globalThis.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    memoryOnly = true;
  }
  listeners.forEach((cb) => cb());
}

export function onChange(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export const isMemoryOnly = () => memoryOnly;
export const cardState = (id) => state.cards[id];
export const allCardStates = () => state.cards;
export const settings = () => state.settings;

/** Größter erlaubter Abstand: nie über den Klausurtermin hinaus. */
export function maxInterval(today = dateStr()) {
  const exam = state.settings.examDate;
  if (!exam) return MAX_INTERVAL;
  const left = daysBetween(today, exam);
  if (left <= 1) return MAX_INTERVAL;
  return Math.max(1, Math.min(MAX_INTERVAL, Math.floor(left / 2)));
}

export function rate(cardId, rating, mode = 'heute', today = dateStr()) {
  const next = schedule(state.cards[cardId], rating, today, maxInterval(today));
  next.upd = Date.now();
  state.cards[cardId] = next;
  state.dirty[cardId] = true;
  state.pending.push({ id: uuid(), card_id: cardId, rating, mode, reviewed_at: new Date().toISOString() });
  save();
  return next;
}

export function setSettings(patch) {
  state.settings = { ...state.settings, ...patch, upd: Date.now() };
  state.settingsDirty = true;
  save();
}

export function sheetSelected(item) {
  const own = state.sheet.sel[item.id];
  return own === undefined ? item.standard !== false : own;
}

export function setSheetSelected(itemId, on) {
  state.sheet.sel[itemId] = on;
  state.sheet.upd = Date.now();
  state.sheetDirty = true;
  save();
}

export function resetAll() {
  state = blank();
  save();
}

/** Wie viele neue Karten wurden heute schon begonnen? */
export function newCardsToday(today = dateStr()) {
  return Object.values(state.cards).filter((c) => c.first === today).length;
}

// ---------------------------------------------------------------------
//  Abgleich mit der Datenbank (wird von sync.js benutzt)
// ---------------------------------------------------------------------

const toRow = (id, c) => ({
  card_id: id,
  due: c.due,
  interval_days: c.ivl,
  ease: c.ease,
  reps: c.reps,
  lapses: c.lapses,
  first_seen: c.first,
  last_review: c.last,
  updated_at: new Date(c.upd || 0).toISOString(),
});

const fromRow = (r) => ({
  due: r.due,
  ivl: r.interval_days,
  ease: Number(r.ease),
  reps: r.reps,
  lapses: r.lapses,
  first: r.first_seen,
  last: r.last_review,
  upd: Date.parse(r.updated_at),
});

/**
 * Übernimmt den Stand aus der Datenbank. Pro Karte gewinnt der neuere
 * Eintrag. Was lokal neuer ist, wird zum Hochladen vorgemerkt.
 */
export function applyRemote({ cards = [], userData = [] }) {
  const seen = new Set();
  for (const row of cards) {
    seen.add(row.card_id);
    const local = state.cards[row.card_id];
    const remoteUpd = Date.parse(row.updated_at);
    if (!local || remoteUpd > (local.upd || 0)) {
      state.cards[row.card_id] = fromRow(row);
      delete state.dirty[row.card_id];
    } else if ((local.upd || 0) > remoteUpd) {
      state.dirty[row.card_id] = true;
    }
  }
  for (const id of Object.keys(state.cards)) {
    if (!seen.has(id)) state.dirty[id] = true;
  }

  let seenSettings = false;
  let seenSheet = false;
  for (const row of userData) {
    const remoteUpd = Date.parse(row.updated_at);
    if (row.key === 'settings') {
      seenSettings = true;
      if (remoteUpd > state.settings.upd) {
        state.settings = { ...blank().settings, ...row.value, upd: remoteUpd };
        state.settingsDirty = false;
      } else if (state.settings.upd > remoteUpd) state.settingsDirty = true;
    }
    if (row.key === 'sheet') {
      seenSheet = true;
      if (remoteUpd > state.sheet.upd) {
        state.sheet = { sel: row.value?.sel || {}, upd: remoteUpd };
        state.sheetDirty = false;
      } else if (state.sheet.upd > remoteUpd) state.sheetDirty = true;
    }
  }
  if (!seenSettings && state.settings.upd) state.settingsDirty = true;
  if (!seenSheet && state.sheet.upd) state.sheetDirty = true;
  save();
}

/** Alles, was noch hochgeladen werden muss. */
export function outbox() {
  const cards = Object.keys(state.dirty)
    .filter((id) => state.cards[id])
    .map((id) => toRow(id, state.cards[id]));
  const userData = [];
  if (state.settingsDirty) {
    const { upd, ...value } = state.settings;
    userData.push({ key: 'settings', value, updated_at: new Date(upd).toISOString() });
  }
  if (state.sheetDirty) {
    userData.push({ key: 'sheet', value: { sel: state.sheet.sel }, updated_at: new Date(state.sheet.upd).toISOString() });
  }
  return { cards, reviews: [...state.pending], userData };
}

/** Nach erfolgreichem Hochladen: Vormerkungen entfernen. */
export function markPushed(box) {
  for (const row of box.cards) {
    const local = state.cards[row.card_id];
    // Nur abhaken, wenn die Karte seit dem Hochladen nicht erneut bewertet wurde
    if (local && new Date(local.upd || 0).toISOString() === row.updated_at) delete state.dirty[row.card_id];
  }
  const sent = new Set(box.reviews.map((r) => r.id));
  state.pending = state.pending.filter((r) => !sent.has(r.id));
  for (const row of box.userData) {
    if (row.key === 'settings' && new Date(state.settings.upd).toISOString() === row.updated_at) state.settingsDirty = false;
    if (row.key === 'sheet' && new Date(state.sheet.upd).toISOString() === row.updated_at) state.sheetDirty = false;
  }
  save();
}

export function hasUnsynced() {
  return Object.keys(state.dirty).length > 0 || state.pending.length > 0 || state.settingsDirty || state.sheetDirty;
}
