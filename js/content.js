// Bereitet die Inhalte aus content/ für die App auf.
import { WOCHEN } from '../content/index.js';
import { THEMEN, OHNE_THEMA } from '../content/themen.js';
import { DURCHGAENGE } from '../content/durchgang/index.js';

export const TYP_LABEL = {
  definition: 'Definition',
  satz: 'Satz',
  formel: 'Formel',
  verfahren: 'Verfahren',
  verstaendnis: 'Verständnis',
  aufgabe: 'Aufgabe',
};

export const TEIL_LABEL = {
  besprechung: 'Aufgaben zur Besprechung',
  praesenz: 'Präsenzaufgaben',
};

export const HERKUNFT_KURZ = {
  offiziell: 'Offizielle Lösung',
  vorlesung: 'Aus der Vorlesung',
  claude: 'Lösung von Claude',
  zusatz: 'Zusatz von Claude',
};

export const HERKUNFT_LABEL = {
  offiziell: 'Ergebnis aus der offiziellen Lösung, Erklärungen von Claude',
  vorlesung: 'In der Vorlesung vorgerechnet, Erklärungen von Claude',
  claude: 'Von Claude gelöst, noch nicht mit einer Musterlösung abgeglichen',
  zusatz: 'Zusatzfrage von Claude, nicht aus den Unterlagen',
};

export const weeks = WOCHEN;
export const units = [];
export const cards = [];
export const cardById = new Map();
export const unitById = new Map();
export const sheetItems = [];

for (const woche of WOCHEN) {
  for (const unit of woche.einheiten) {
    unit.woche = woche.nr;
    unit.kurz = `${unit.art === 'vorlesung' ? 'Vorlesung' : 'Übung'} ${unit.nummer}`;
    units.push(unit);
    unitById.set(unit.id, unit);
    for (const card of unit.karten) {
      if (cardById.has(card.id)) console.warn('Doppelte Karten-ID:', card.id);
      card.unit = unit;
      cards.push(card);
      cardById.set(card.id, card);
    }
    for (const item of unit.formelblatt || []) {
      item.unit = unit;
      sheetItems.push(item);
    }
  }
}

/** Übungsblätter mit Aufgaben, die in der Übung besprochen werden (oder Präsenzaufgaben). */
export const uebungen = units
  .filter((u) => u.art === 'uebung' && u.karten.some((c) => c.teil))
  .sort((a, b) => a.nummer - b.nummer);

/** Das Blatt, dessen Besprechung als Nächstes ansteht (heute zählt mit). */
export function nextUebung(today) {
  const open = uebungen.filter((u) => (u.besprechung || []).some((d) => d >= today));
  return open[0] || uebungen[uebungen.length - 1] || null;
}

/** Klausurthemen mit ihren Karten (Karten bekommen card.klausurthema). */
export const themen = THEMEN.map((t) => ({ ...t, karten: [] }));
const themaZu = new Map();
for (const t of themen) for (const name of t.themen) themaZu.set(name, t);
for (const card of cards) {
  const t = themaZu.get(card.thema);
  card.klausurthema = t ? t.id : null;
  if (t) t.karten.push(card);
  else if (!OHNE_THEMA.includes(card.thema)) console.warn('Thema ohne Klausurthema:', card.thema);
}
export const themaById = new Map(themen.map((t) => [t.id, t]));

/** Vorlesung durchgehen: unit.durchgang = { abschnitte: [...] }; jeder Abschnitt kennt sein Klausurthema. */
export const abschnittById = new Map();
for (const unit of units) {
  const d = DURCHGAENGE[unit.id];
  if (!d) continue;
  unit.durchgang = d;
  // Häufigstes Klausurthema der Einheit als Vorgabe
  const count = {};
  for (const c of unit.karten) if (c.klausurthema) count[c.klausurthema] = (count[c.klausurthema] || 0) + 1;
  const haupt = Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  for (const a of d.abschnitte) {
    a.unit = unit;
    const linked = (a.karten || []).map((id) => cardById.get(id)).find((c) => c?.klausurthema);
    a.klausurthema = linked?.klausurthema || haupt;
    abschnittById.set(a.id, a);
  }
}
