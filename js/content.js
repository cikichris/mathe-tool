// Bereitet die Inhalte aus content/ für die App auf.
import { WOCHEN } from '../content/index.js';

export const TYP_LABEL = {
  definition: 'Definition',
  satz: 'Satz',
  formel: 'Formel',
  verfahren: 'Verfahren',
  verstaendnis: 'Verständnis',
  aufgabe: 'Aufgabe',
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
