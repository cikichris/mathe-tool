// =====================================================================
//  Lernserie (Streak), Joker und Wochenziel
//
//  days:    { 'JJJJ-MM-TT': Anzahl beantworteter Fragen }
//  mission: { 'JJJJ-MM-TT': true } – Tagesmission geschafft
//
//  Ein Tag zählt, wenn die Tagesmission geschafft oder das Tagesziel
//  (Anzahl Fragen) erreicht ist. Solange heute noch offen ist, bleibt die
//  Serie von gestern bestehen.
//
//  Joker: Pro Kalenderwoche (Mo–So) wird ein einzelner verpasster Tag
//  automatisch überbrückt. Die Serie läuft dann weiter, der Tag selbst
//  zählt aber nicht mit. Zwei verpasste Tage hintereinander beenden die
//  Serie; der Joker wird dann nicht verbraucht.
// =====================================================================
import { addDays, daysBetween } from './srs.js';

export const DEFAULT_GOAL = 10;
export const DEFAULT_WEEK_GOAL = 5;

/** Montag der Woche, in der d liegt. */
export function weekStart(d) {
  const [y, m, day] = d.split('-').map(Number);
  const wd = (new Date(y, m - 1, day).getDay() + 6) % 7; // Mo = 0
  return addDays(d, -wd);
}

function reachedFn(days, goal, mission) {
  return (d) => (days[d] || 0) >= goal || Boolean(mission[d]);
}

/**
 * Geht alle Tage vom ersten aktiven Tag bis heute durch.
 * Liefert laufende Serie, Rekord, überbrückte Tage (Joker) und die
 * Wochen, in denen der Joker schon verbraucht ist.
 */
function walk(days, today, goal, mission) {
  const reached = reachedFn(days, goal, mission);
  const active = [...Object.keys(days), ...Object.keys(mission)].filter(reached).sort();
  const bridged = new Set();
  const usedWeeks = new Set();
  let run = 0;
  let best = 0;
  let lastBridge = null;
  if (!active.length || active[0] > today) return { run, best, bridged, usedWeeks };
  for (let d = active[0]; d <= today; d = addDays(d, 1)) {
    if (reached(d)) {
      run += 1;
      lastBridge = null;
    } else if (d === today) {
      // heute ist noch offen
    } else if (run > 0 && !lastBridge && !usedWeeks.has(weekStart(d))) {
      lastBridge = d;
      bridged.add(d);
      usedWeeks.add(weekStart(d));
    } else {
      if (lastBridge) {
        // Der Joker hat die Serie nicht gerettet: zurückgeben
        bridged.delete(lastBridge);
        usedWeeks.delete(weekStart(lastBridge));
        lastBridge = null;
      }
      run = 0;
    }
    best = Math.max(best, run);
  }
  return { run, best, bridged, usedWeeks };
}

export function computeStreak(days, today, goal = DEFAULT_GOAL, mission = {}, weekGoal = DEFAULT_WEEK_GOAL) {
  const reached = reachedFn(days, goal, mission);
  const todayCount = days[today] || 0;
  const todayDone = reached(today);
  const { run, best, bridged, usedWeeks } = walk(days, today, goal, mission);
  const week = weekStart(today);
  let weekDone = 0;
  for (let i = 0; i < 7; i += 1) {
    const d = addDays(week, i);
    if (d <= today && reached(d)) weekDone += 1;
  }
  return {
    current: run,
    best: Math.max(best, run),
    todayCount,
    todayDone,
    missionToday: Boolean(mission[today]),
    goal,
    bridged,
    jokerFree: !usedWeeks.has(week),
    jokerYesterday: bridged.has(addDays(today, -1)),
    weekDone,
    weekGoal,
  };
}

/** Die letzten n Tage (ältester zuerst) mit Anzahl und ob der Tag zählt. */
export function lastDays(days, today, n, goal = DEFAULT_GOAL, mission = {}) {
  const reached = reachedFn(days, goal, mission);
  const out = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = addDays(today, -i);
    const count = days[d] || 0;
    out.push({ d, count, done: reached(d), mission: Boolean(mission[d]) });
  }
  return out;
}

/** Die sieben Tage der aktuellen Woche (Mo–So). */
export function weekDays(days, today, goal = DEFAULT_GOAL, mission = {}, bridged = new Set()) {
  const reached = reachedFn(days, goal, mission);
  const start = weekStart(today);
  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(start, i);
    return {
      d,
      count: days[d] || 0,
      done: reached(d),
      joker: bridged.has(d),
      today: d === today,
      future: daysBetween(today, d) > 0,
    };
  });
}

/** Anzahl der Wochen (Mo–So), in denen das Wochenziel erreicht wurde. */
export function weeksReached(days, today, goal = DEFAULT_GOAL, mission = {}, weekGoal = DEFAULT_WEEK_GOAL) {
  const reached = reachedFn(days, goal, mission);
  const perWeek = new Map();
  for (const d of new Set([...Object.keys(days), ...Object.keys(mission)])) {
    if (d > today || !reached(d)) continue;
    const w = weekStart(d);
    perWeek.set(w, (perWeek.get(w) || 0) + 1);
  }
  return [...perWeek.values()].filter((n) => n >= weekGoal).length;
}
