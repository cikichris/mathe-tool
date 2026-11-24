// =====================================================================
//  Lernmodus (Pomodoro): Fokusblock – Pause – Fokusblock …
//
//  Der Zustand liegt nur auf diesem Gerät (localStorage). Gerechnet wird
//  mit Endzeitpunkten statt mit einem laufenden Zähler. So stimmt der
//  Timer auch, wenn das Handy zwischendurch gesperrt war oder die Seite
//  neu geladen wurde.
//
//  Ablauf: fokus → (automatisch) pause → bereit (wartet auf „weiter“).
//  Nach jedem `every`-ten Block gibt es die lange Pause.
// =====================================================================

const KEY = 'mathe-tool.fokus';
const MIN = 60 * 1000;

export const DEFAULTS = { work: 20, brk: 5, long: 15, every: 4, breath: 'ruhig', sound: true };

function blank() {
  return { phase: 'aus', endsAt: 0, left: 0, paused: false, block: 0, long: false, day: '' };
}

let st = blank();
try {
  st = { ...blank(), ...JSON.parse(globalThis.localStorage?.getItem(KEY) || '{}') };
} catch { /* privater Modus */ }

function save() {
  try { globalThis.localStorage?.setItem(KEY, JSON.stringify(st)); } catch { /* egal */ }
}

const conf = (c) => ({ ...DEFAULTS, ...c });

/**
 * Bringt den Zustand auf den Zeitpunkt now und liefert, was dabei passiert
 * ist: [{ type: 'fokus-ende', block }, { type: 'pause-ende' }].
 */
export function advance(settings, now = Date.now()) {
  const c = conf(settings);
  const events = [];
  let guard = 0;
  while (!st.paused && (st.phase === 'fokus' || st.phase === 'pause') && now >= st.endsAt && guard < 10) {
    guard += 1;
    if (st.phase === 'fokus') {
      st.block += 1;
      events.push({ type: 'fokus-ende', block: st.block, at: st.endsAt });
      st.long = st.block % c.every === 0;
      st.phase = 'pause';
      st.endsAt += (st.long ? c.long : c.brk) * MIN;
    } else {
      events.push({ type: 'pause-ende', at: st.endsAt });
      st.phase = 'bereit';
      st.endsAt = 0;
    }
  }
  if (events.length) save();
  return events;
}

export function status(settings, now = Date.now()) {
  const c = conf(settings);
  const remaining = st.paused ? st.left : Math.max(0, st.endsAt - now);
  const total = st.phase === 'fokus' ? c.work * MIN : st.phase === 'pause' ? (st.long ? c.long : c.brk) * MIN : 0;
  return { ...st, remaining, total, running: st.phase === 'fokus' || st.phase === 'pause' };
}

/** Neuen Fokusblock starten. day = heutiges Datum (der Blockzähler beginnt jeden Tag neu). */
export function startFocus(settings, day, now = Date.now()) {
  const c = conf(settings);
  if (st.day !== day) { st.block = 0; st.day = day; }
  st.phase = 'fokus';
  st.paused = false;
  st.left = 0;
  st.long = false;
  st.endsAt = now + c.work * MIN;
  save();
}

export function startBreak(settings, now = Date.now()) {
  const c = conf(settings);
  st.phase = 'pause';
  st.paused = false;
  st.long = false;
  st.endsAt = now + c.brk * MIN;
  save();
}

export function pause(now = Date.now()) {
  if (st.paused || !(st.phase === 'fokus' || st.phase === 'pause')) return;
  st.paused = true;
  st.left = Math.max(0, st.endsAt - now);
  save();
}

export function resume(now = Date.now()) {
  if (!st.paused) return;
  st.paused = false;
  st.endsAt = now + st.left;
  st.left = 0;
  save();
}

/** Aktuelle Phase sofort beenden (zählt einen Fokusblock nicht mit). */
export function skip(settings, now = Date.now()) {
  const c = conf(settings);
  if (st.phase === 'fokus') {
    st.phase = 'pause';
    st.long = false;
    st.paused = false;
    st.endsAt = now + c.brk * MIN;
  } else {
    st.phase = 'bereit';
    st.paused = false;
    st.endsAt = 0;
  }
  save();
}

export function stop() {
  const { block, day } = st;
  st = { ...blank(), block, day };
  save();
}

/** Nur für Tests. */
export function _reset() {
  st = blank();
  save();
}

export function mmss(ms) {
  const s = Math.ceil(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
