// =====================================================================
//  Lernserie (Streak)
//
//  days: { 'JJJJ-MM-TT': Anzahl beantworteter Fragen }
//  Ein Tag zählt für die Serie, wenn das Tagesziel erreicht ist.
//  Solange heute noch nicht geschafft ist, bleibt die Serie von gestern
//  bestehen. Sie reißt erst, wenn ein ganzer Tag ohne erreichtes Ziel
//  vergangen ist.
// =====================================================================
import { addDays, daysBetween } from './srs.js';

export const DEFAULT_GOAL = 10;

export function computeStreak(days, today, goal = DEFAULT_GOAL) {
  const reached = (d) => (days[d] || 0) >= goal;
  const todayCount = days[today] || 0;
  const todayDone = todayCount >= goal;

  // Laufende Serie: ab heute (falls geschafft) bzw. ab gestern rückwärts zählen
  let current = 0;
  let d = todayDone ? today : addDays(today, -1);
  while (reached(d)) {
    current += 1;
    d = addDays(d, -1);
  }

  // Bestwert über alle gespeicherten Tage
  const sorted = Object.keys(days).filter(reached).sort();
  let best = 0;
  let run = 0;
  let prev = null;
  for (const day of sorted) {
    run = prev && daysBetween(prev, day) === 1 ? run + 1 : 1;
    best = Math.max(best, run);
    prev = day;
  }

  return { current, best: Math.max(best, current), todayCount, todayDone, goal };
}

/** Die letzten n Tage (ältester zuerst) mit Anzahl und ob das Ziel erreicht wurde. */
export function lastDays(days, today, n, goal = DEFAULT_GOAL) {
  const out = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const d = addDays(today, -i);
    const count = days[d] || 0;
    out.push({ d, count, done: count >= goal });
  }
  return out;
}
