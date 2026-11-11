// =====================================================================
//  Wiederholungsplan (Spaced Repetition, angelehnt an SM-2)
//
//  Zustand einer Karte:
//    due    'JJJJ-MM-TT'  nächster Fälligkeitstag
//    ivl    Abstand in Tagen bis zur nächsten Wiederholung (0 = heute nochmal)
//    ease   Faktor, mit dem der Abstand bei "Gut" wächst (Start 2,5)
//    reps   Anzahl erfolgreicher Wiederholungen in Folge
//    lapses wie oft "Nochmal" gedrückt wurde
//    first  Tag, an dem die Karte zum ersten Mal dran war
//    last   Tag der letzten Bewertung
// =====================================================================

export const AGAIN = 1;
export const HARD = 2;
export const GOOD = 3;
export const EASY = 4;

export const RATING_LABELS = { 1: 'Nochmal', 2: 'Schwer', 3: 'Gut', 4: 'Leicht' };

// Länger als so viele Tage liegt keine Karte herum. Bis zur Klausur
// soll alles regelmäßig wiederkommen.
export const MAX_INTERVAL = 30;

// Ab diesem Abstand gilt eine Karte als "sicher".
export const SAFE_INTERVAL = 7;

const MIN_EASE = 1.3;
const START_EASE = 2.5;

export function dateStr(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function addDays(str, n) {
  const [y, m, d] = str.split('-').map(Number);
  return dateStr(new Date(y, m - 1, d + n));
}

export function daysBetween(from, to) {
  const [y1, m1, d1] = from.split('-').map(Number);
  const [y2, m2, d2] = to.split('-').map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

export function isNew(state) {
  return !state || !state.first;
}

export function isDue(state, today) {
  return !isNew(state) && state.due <= today;
}

/** 'neu' | 'lernend' | 'sicher' */
export function stage(state) {
  if (isNew(state)) return 'neu';
  return state.ivl >= SAFE_INTERVAL ? 'sicher' : 'lernend';
}

/**
 * Berechnet den neuen Zustand nach einer Bewertung.
 * Verändert den übergebenen Zustand nicht.
 */
export function schedule(state, rating, today, maxInterval = MAX_INTERVAL) {
  const prev = state && state.first ? state : null;
  const next = prev
    ? { ...prev }
    : { due: today, ivl: 0, ease: START_EASE, reps: 0, lapses: 0, first: today, last: today };

  // Vorzeitig geübt (Karte war noch gar nicht fällig) und gewusst:
  // Der Plan bleibt, wie er ist. Nur "Nochmal" holt die Karte zurück.
  const early = prev && prev.due > today;
  if (early && rating !== AGAIN) {
    next.last = today;
    return next;
  }

  let ivl;
  if (rating === AGAIN) {
    ivl = 0;
    next.reps = 0;
    if (prev) {
      next.lapses += 1;
      next.ease = Math.max(MIN_EASE, next.ease - 0.2);
    }
  } else if (!prev || prev.ivl === 0) {
    // Neue Karte oder Karte, die gerade neu gelernt wird
    const relearn = prev && prev.lapses > 0;
    ivl = rating === HARD ? 1 : rating === GOOD ? (relearn ? 1 : 2) : (relearn ? 2 : 4);
    next.reps += 1;
  } else {
    if (rating === HARD) {
      next.ease = Math.max(MIN_EASE, next.ease - 0.15);
      ivl = Math.max(prev.ivl + 1, Math.round(prev.ivl * 1.2));
    } else if (rating === GOOD) {
      ivl = Math.max(prev.ivl + 1, Math.round(prev.ivl * next.ease));
    } else {
      next.ease = next.ease + 0.15;
      ivl = Math.max(prev.ivl + 2, Math.round(prev.ivl * next.ease * 1.3));
    }
    next.reps += 1;
  }

  next.ivl = Math.min(ivl, Math.max(1, maxInterval));
  if (ivl === 0) next.ivl = 0;
  next.ease = Math.round(next.ease * 100) / 100;
  next.due = addDays(today, next.ivl);
  next.last = today;
  return next;
}

/** Text für die Bewertungsknöpfe, z. B. "3 Tage". */
export function intervalLabel(ivl) {
  if (ivl <= 0) return 'gleich';
  if (ivl === 1) return 'morgen';
  return `${ivl} Tage`;
}
