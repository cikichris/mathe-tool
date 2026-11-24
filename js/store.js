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
    settings: { examDate: '', newPerDay: 15, dailyGoal: 10, weekGoal: 5, upd: 0 },
    settingsDirty: false,
    sheet: { sel: {}, upd: 0 },   // Formelblatt: item_id -> true/false
    sheetDirty: false,
    drill: { stats: {}, upd: 0 }, // Methode erkennen: aufgabe_id -> [richtig, falsch, letztes Datum]
    drillDirty: false,
    // Lernserie: Datum -> Anzahl beantworteter Fragen; parts: Datum -> { k, a, m }
    // (Karten in Abfragen, Rechenaufgaben, Methode erkennen); mission: Datum -> true
    activity: { days: {}, parts: {}, mission: {}, backfilled: false },
    activityDirty: false,
    prep: { status: {}, notes: {}, upd: 0 }, // Übungsvorbereitung: card_id -> Status bzw. Frage
    prepDirty: false,
    checks: { list: {}, upd: 0 }, // Eigene Lösung geprüft: card_id -> [{ d, ok, of, result }]
    checksDirty: false,
    badges: { got: {}, cnt: {}, upd: 0 }, // Meilensteine: id -> Datum; cnt: Zähler (z. B. ohneTipp)
    badgesDirty: false,
    missionPick: { d: '', card: '' },    // Aufgabe des Tages (nur auf diesem Gerät)
    walk: { status: {}, notes: {}, upd: 0 }, // Vorlesung durchgehen: Abschnitt -> 'ok' | 'unklar', Notiz
    walkDirty: false,
    owner: '',                           // Konto, zu dem dieser Lernstand gehört ('' = ohne Login gelernt)
    // Lernpunkte für die Skyline: log: Tag -> { Klausurthema: Punkte, _: allgemein };
    // 'start' = einmaliges Startkapital aus dem bisherigen Lernstand; shop: gebaute Extras -> Datum
    points: { log: {}, shop: {}, init: false, upd: 0 },
    pointsDirty: false,
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
    state.drill ||= blank().drill;
    state.activity = { ...blank().activity, ...state.activity };
    state.badges = { ...blank().badges, ...state.badges };
    state.missionPick ||= blank().missionPick;
    state.points = { ...blank().points, ...state.points };
    state.walk ||= blank().walk;
    state.prep ||= blank().prep;
    state.checks ||= blank().checks;
    state.settings = { ...blank().settings, ...state.settings };
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

function countActivity(today) {
  state.activity.days[today] = (state.activity.days[today] || 0) + 1;
  state.activityDirty = true;
}

export const activityDays = () => state.activity.days;
export const missionDays = () => state.activity.mission;
export const partsToday = (today = dateStr()) => ({ k: 0, a: 0, m: 0, f: 0, ...state.activity.parts[today] });
/** Summe eines Zählers über alle Tage (z. B. f = Fokusblöcke). */
export const partTotal = (part) => Object.values(state.activity.parts).reduce((sum, p) => sum + (p[part] || 0), 0);

/** Zählt einen Teil der Tagesmission: k = Karte in einer Abfrage, a = Rechenaufgabe, m = Methode erkannt. */
export function countPart(part, today = dateStr()) {
  const p = { k: 0, a: 0, m: 0, ...state.activity.parts[today] };
  p[part] = (p[part] || 0) + 1;
  state.activity.parts[today] = p;
  state.activityDirty = true;
  save();
}

export function markMission(today = dateStr()) {
  if (state.activity.mission[today]) return;
  state.activity.mission[today] = true;
  state.activityDirty = true;
  save();
}

export const missionPick = () => state.missionPick;
export function setMissionPick(d, card) {
  state.missionPick = { d, card };
  save();
}

export const badgesGot = () => state.badges.got;

// ---------------------------------------------------------------------
//  Lernpunkte (Skyline)
// ---------------------------------------------------------------------

/** Punkte gutschreiben. thema = Klausurthema der Karte oder null (allgemein). */
export function earn(thema, n, today = dateStr()) {
  if (!n) return;
  const day = state.points.log[today] || {};
  const key = thema || '_';
  day[key] = (day[key] || 0) + n;
  state.points.log[today] = day;
  state.points.upd = Date.now();
  state.pointsDirty = true;
  save();
}

/** Summe der gesammelten Punkte pro Klausurthema ('_' = allgemein). */
export function pointsByKey() {
  const sum = {};
  for (const day of Object.values(state.points.log)) {
    for (const [k, n] of Object.entries(day)) sum[k] = (sum[k] || 0) + n;
  }
  return sum;
}

export const pointsInitDone = () => state.points.init;

/** Einmalig: Startkapital für alles, was schon vor den Punkten gelernt wurde. */
export function pointsInit(start) {
  if (state.points.init) return;
  state.points.log.start = start;
  state.points.init = true;
  state.points.upd = Date.now();
  state.pointsDirty = true;
  save();
}

export const shop = () => state.points.shop;

export function buy(id, today = dateStr()) {
  if (state.points.shop[id]) return;
  state.points.shop[id] = today;
  state.points.upd = Date.now();
  state.pointsDirty = true;
  save();
}
export const counter = (name) => state.badges.cnt[name] || 0;

export function bump(name) {
  state.badges.cnt[name] = (state.badges.cnt[name] || 0) + 1;
  state.badges.upd = Date.now();
  state.badgesDirty = true;
  save();
}

/** Neue Meilensteine eintragen. Gibt die wirklich neuen IDs zurück. */
export function award(ids, today = dateStr()) {
  const fresh = ids.filter((id) => !state.badges.got[id]);
  if (!fresh.length) return [];
  for (const id of fresh) state.badges.got[id] = today;
  state.badges.upd = Date.now();
  state.badgesDirty = true;
  save();
  return fresh;
}
export const activityBackfilled = () => state.activity.backfilled;

/**
 * Übernimmt Tage aus dem Verlauf der Datenbank (Tabelle reviews), einmalig
 * nach dem ersten Abgleich. Pro Tag gilt der größere Wert.
 */
export function backfillActivity(timestamps) {
  const perDay = {};
  for (const ts of timestamps) {
    const d = dateStr(new Date(ts));
    perDay[d] = (perDay[d] || 0) + 1;
  }
  for (const [d, n] of Object.entries(perDay)) {
    if (n > (state.activity.days[d] || 0)) state.activity.days[d] = n;
  }
  state.activity.backfilled = true;
  state.activityDirty = true;
  save();
}

export function rate(cardId, rating, mode = 'heute', today = dateStr()) {
  const next = schedule(state.cards[cardId], rating, today, maxInterval(today));
  next.upd = Date.now();
  state.cards[cardId] = next;
  state.dirty[cardId] = true;
  state.pending.push({ id: uuid(), card_id: cardId, rating, mode, reviewed_at: new Date().toISOString() });
  countActivity(today);
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

export const prepStatus = (id) => state.prep.status[id] || '';
export const prepNote = (id) => state.prep.notes[id] || '';

export function setPrepStatus(id, status) {
  if (status) state.prep.status[id] = status;
  else delete state.prep.status[id];
  state.prep.upd = Date.now();
  state.prepDirty = true;
  save();
}

export function setPrepNote(id, text) {
  const t = String(text || '').slice(0, 2000);
  if (t.trim()) state.prep.notes[id] = t;
  else delete state.prep.notes[id];
  state.prep.upd = Date.now();
  state.prepDirty = true;
  save();
}

export const walkStatus = (id) => state.walk.status[id] || '';
export const walkNote = (id) => state.walk.notes[id] || '';

/** Gibt true zurück, wenn der Abschnitt zum ersten Mal als verstanden markiert wurde. */
export function setWalkStatus(id, status) {
  const first = status === 'ok' && !state.walk.status[id] && !state.walk.notes[`${id}#ok`];
  if (status) state.walk.status[id] = status;
  else delete state.walk.status[id];
  if (status === 'ok') state.walk.notes[`${id}#ok`] = '1'; // merkt sich, dass es dafür schon Punkte gab
  state.walk.upd = Date.now();
  state.walkDirty = true;
  save();
  return first;
}

export function setWalkNote(id, text) {
  const t = String(text || '').slice(0, 2000);
  if (t.trim()) state.walk.notes[id] = t;
  else delete state.walk.notes[id];
  state.walk.upd = Date.now();
  state.walkDirty = true;
  save();
}

export const checksFor = (id) => state.checks.list[id] || [];
export const allChecks = () => state.checks.list;

/** Ergebnis einer Selbstkontrolle speichern (die letzten 10 je Aufgabe). */
export function addCheck(id, entry) {
  const list = [...(state.checks.list[id] || []), entry].slice(-10);
  state.checks.list[id] = list;
  state.checks.upd = Date.now();
  state.checksDirty = true;
  save();
}

export const drillStats = () => state.drill.stats;

export function recordDrill(id, correct, today = dateStr()) {
  const [right = 0, wrong = 0] = state.drill.stats[id] || [];
  state.drill.stats[id] = correct ? [right + 1, wrong, today] : [right, wrong + 1, today];
  state.drill.upd = Date.now();
  state.drillDirty = true;
  countActivity(today);
  save();
}

export function resetAll() {
  const { owner } = state;
  state = blank();
  state.owner = owner;
  save();
}

export const owner = () => state.owner || '';

/**
 * Beim Anmelden: Gehört der Lernstand in diesem Browser zu einem anderen
 * Konto, wird er verworfen (er liegt ja in dessen Datenbank). Wurde ohne
 * Login gelernt, wird der Stand in das Konto übernommen.
 * Gibt true zurück, wenn verworfen wurde.
 */
export function adoptOwner(id) {
  if (state.owner === id) return false;
  const foreign = Boolean(state.owner);
  if (foreign) state = blank();
  state.owner = id;
  save();
  return foreign;
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
  let seenDrill = false;
  let seenActivity = false;
  let seenPrep = false;
  let seenChecks = false;
  let seenBadges = false;
  let seenPoints = false;
  let seenWalk = false;
  for (const row of userData) {
    const remoteUpd = Date.parse(row.updated_at);
    if (row.key === 'settings') {
      seenSettings = true;
      if (remoteUpd > state.settings.upd) {
        state.settings = { ...blank().settings, ...row.value, upd: remoteUpd };
        state.settingsDirty = false;
      } else if (state.settings.upd > remoteUpd) state.settingsDirty = true;
    }
    if (row.key === 'activity') {
      // Tage werden zusammengeführt (pro Tag der größere Wert), nicht ersetzt
      const remote = row.value?.days || {};
      let localHasMore = false;
      for (const [d, n] of Object.entries(remote)) {
        if (n > (state.activity.days[d] || 0)) state.activity.days[d] = n;
      }
      for (const [d, n] of Object.entries(state.activity.days)) {
        if (n > (remote[d] || 0)) localHasMore = true;
      }
      const rParts = row.value?.parts || {};
      for (const [d, p] of Object.entries(rParts)) {
        const l = { ...state.activity.parts[d] };
        for (const [k, n] of Object.entries(p)) l[k] = Math.max(l[k] || 0, n || 0);
        state.activity.parts[d] = l;
      }
      for (const [d, p] of Object.entries(state.activity.parts)) {
        const r = rParts[d] || {};
        if (Object.entries(p).some(([k, n]) => (n || 0) > (r[k] || 0))) localHasMore = true;
      }
      const rMission = row.value?.mission || {};
      for (const d of Object.keys(rMission)) state.activity.mission[d] = true;
      for (const d of Object.keys(state.activity.mission)) if (!rMission[d]) localHasMore = true;
      if (row.value?.backfilled) state.activity.backfilled = true;
      state.activityDirty = localHasMore || (state.activity.backfilled && !row.value?.backfilled);
      seenActivity = true;
    }
    if (row.key === 'badges') {
      // Meilensteine werden zusammengeführt: früheres Datum, größerer Zähler
      seenBadges = true;
      const got = row.value?.got || {};
      const cnt = row.value?.cnt || {};
      let localHasMore = false;
      for (const [id, d] of Object.entries(got)) {
        if (!state.badges.got[id] || d < state.badges.got[id]) state.badges.got[id] = d;
      }
      for (const [id, d] of Object.entries(state.badges.got)) if (got[id] !== d) localHasMore = true;
      for (const [k, n] of Object.entries(cnt)) state.badges.cnt[k] = Math.max(state.badges.cnt[k] || 0, n);
      for (const [k, n] of Object.entries(state.badges.cnt)) if (n !== cnt[k]) localHasMore = true;
      state.badgesDirty = localHasMore;
      if (localHasMore) state.badges.upd = Date.now();
    }
    if (row.key === 'points') {
      // Pro Tag und Thema gilt der größere Wert, Extras werden vereinigt
      seenPoints = true;
      const rLog = row.value?.log || {};
      const rShop = row.value?.shop || {};
      let localHasMore = false;
      for (const [d, day] of Object.entries(rLog)) {
        const l = state.points.log[d] || {};
        for (const [k, n] of Object.entries(day)) l[k] = Math.max(l[k] || 0, n);
        state.points.log[d] = l;
      }
      for (const [d, day] of Object.entries(state.points.log)) {
        for (const [k, n] of Object.entries(day)) if (n > (rLog[d]?.[k] || 0)) localHasMore = true;
      }
      for (const [id, d] of Object.entries(rShop)) {
        if (!state.points.shop[id] || d < state.points.shop[id]) state.points.shop[id] = d;
      }
      for (const [id, d] of Object.entries(state.points.shop)) if (rShop[id] !== d) localHasMore = true;
      if (row.value?.init) state.points.init = true;
      else if (state.points.init) localHasMore = true;
      state.pointsDirty = localHasMore;
      if (localHasMore) state.points.upd = Date.now();
    }
    if (row.key === 'checks') {
      seenChecks = true;
      if (remoteUpd > state.checks.upd) {
        state.checks = { list: row.value?.list || {}, upd: remoteUpd };
        state.checksDirty = false;
      } else if (state.checks.upd > remoteUpd) state.checksDirty = true;
    }
    if (row.key === 'walk') {
      seenWalk = true;
      if (remoteUpd > state.walk.upd) {
        state.walk = { status: row.value?.status || {}, notes: row.value?.notes || {}, upd: remoteUpd };
        state.walkDirty = false;
      } else if (state.walk.upd > remoteUpd) state.walkDirty = true;
    }
    if (row.key === 'prep') {
      seenPrep = true;
      if (remoteUpd > state.prep.upd) {
        state.prep = { status: row.value?.status || {}, notes: row.value?.notes || {}, upd: remoteUpd };
        state.prepDirty = false;
      } else if (state.prep.upd > remoteUpd) state.prepDirty = true;
    }
    if (row.key === 'drill') {
      seenDrill = true;
      if (remoteUpd > state.drill.upd) {
        state.drill = { stats: row.value?.stats || {}, upd: remoteUpd };
        state.drillDirty = false;
      } else if (state.drill.upd > remoteUpd) state.drillDirty = true;
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
  if (!seenDrill && state.drill.upd) state.drillDirty = true;
  if (!seenPrep && state.prep.upd) state.prepDirty = true;
  if (!seenChecks && state.checks.upd) state.checksDirty = true;
  if (!seenBadges && state.badges.upd) state.badgesDirty = true;
  if (!seenPoints && state.points.upd) state.pointsDirty = true;
  if (!seenWalk && state.walk.upd) state.walkDirty = true;
  if (!seenActivity && (Object.keys(state.activity.days).length || state.activity.backfilled)) state.activityDirty = true;
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
  if (state.drillDirty) {
    userData.push({ key: 'drill', value: { stats: state.drill.stats }, updated_at: new Date(state.drill.upd).toISOString() });
  }
  if (state.checksDirty) {
    userData.push({ key: 'checks', value: { list: state.checks.list }, updated_at: new Date(state.checks.upd).toISOString() });
  }
  if (state.prepDirty) {
    userData.push({ key: 'prep', value: { status: state.prep.status, notes: state.prep.notes }, updated_at: new Date(state.prep.upd).toISOString() });
  }
  if (state.activityDirty) {
    userData.push({
      key: 'activity',
      value: { days: { ...state.activity.days }, parts: JSON.parse(JSON.stringify(state.activity.parts)), mission: { ...state.activity.mission }, backfilled: state.activity.backfilled },
      updated_at: new Date().toISOString(),
    });
  }
  if (state.walkDirty) {
    userData.push({ key: 'walk', value: { status: state.walk.status, notes: state.walk.notes }, updated_at: new Date(state.walk.upd).toISOString() });
  }
  if (state.pointsDirty) {
    userData.push({ key: 'points', value: { log: JSON.parse(JSON.stringify(state.points.log)), shop: { ...state.points.shop }, init: state.points.init }, updated_at: new Date(state.points.upd || Date.now()).toISOString() });
  }
  if (state.badgesDirty) {
    userData.push({ key: 'badges', value: { got: { ...state.badges.got }, cnt: { ...state.badges.cnt } }, updated_at: new Date(state.badges.upd || Date.now()).toISOString() });
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
    if (row.key === 'drill' && new Date(state.drill.upd).toISOString() === row.updated_at) state.drillDirty = false;
    if (row.key === 'prep' && new Date(state.prep.upd).toISOString() === row.updated_at) state.prepDirty = false;
    if (row.key === 'walk' && new Date(state.walk.upd).toISOString() === row.updated_at) state.walkDirty = false;
    if (row.key === 'points' && JSON.stringify({ log: state.points.log, shop: state.points.shop, init: state.points.init }) === JSON.stringify(row.value)) state.pointsDirty = false;
    if (row.key === 'badges' && JSON.stringify({ got: state.badges.got, cnt: state.badges.cnt }) === JSON.stringify(row.value)) state.badgesDirty = false;
    if (row.key === 'checks' && new Date(state.checks.upd).toISOString() === row.updated_at) state.checksDirty = false;
    if (row.key === 'activity') {
      const sent = row.value.days;
      const changed = Object.entries(state.activity.days).some(([d, n]) => n !== sent[d])
        || JSON.stringify(state.activity.parts) !== JSON.stringify(row.value.parts)
        || Object.keys(state.activity.mission).length !== Object.keys(row.value.mission).length;
      if (!changed) state.activityDirty = false;
    }
  }
  save();
}

export function hasUnsynced() {
  return Object.keys(state.dirty).length > 0 || state.pending.length > 0 || state.settingsDirty || state.sheetDirty || state.drillDirty || state.activityDirty || state.prepDirty || state.checksDirty || state.badgesDirty || state.pointsDirty || state.walkDirty;
}
