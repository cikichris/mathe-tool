// =====================================================================
//  Klausurthemen
//
//  Fasst die Themen der Karten (Feld "thema") zu den großen Blöcken der
//  Klausur zusammen. Für die Anzeige „Klausurreife pro Thema“.
//  Neue Themen in Karten hier eintragen, sonst meldet
//  tools/check-content.mjs einen Fehler.
//  Themen unter OHNE_THEMA zählen nicht zur Klausurreife.
// =====================================================================

export const THEMEN = [
  {
    id: 'funktionen',
    titel: 'Funktionen und Geraden',
    themen: ['Grundbegriffe', 'Funktionsbegriff', 'Geraden', 'Terme und Gleichungen', 'Funktionstypen'],
  },
  {
    id: 'polynome',
    titel: 'Polynome und Nullstellen',
    themen: ['Polynomfunktionen', 'Symmetrie', 'Nullstellen', 'Linearfaktoren'],
  },
  {
    id: 'explog',
    titel: 'Exponential und Logarithmus',
    themen: ['Potenzen', 'Exponentialfunktion', 'Logarithmus', 'Definitionsbereich'],
  },
  {
    id: 'gleichungen',
    titel: 'Exp- und Log-Gleichungen',
    themen: ['Exponentialgleichungen', 'Logarithmengleichungen'],
  },
  {
    id: 'dreiecke',
    titel: 'Winkel und Dreiecke',
    themen: ['Winkel', 'Dreiecke'],
  },
  {
    id: 'winkelfunktionen',
    titel: 'Winkelfunktionen',
    themen: ['Winkelfunktionen', 'Allgemeine Winkelfunktionen'],
  },
  {
    id: 'triggleichungen',
    titel: 'Trigonometrische Gleichungen',
    themen: ['Trigonometrische Gleichungen'],
  },
  {
    id: 'ableitungen',
    titel: 'Ableitungen',
    themen: ['Ableitung', 'Ableitungsregeln'],
  },
];

/** Karten mit diesen Themen gehören zu keinem Klausurthema (z. B. Klausurregeln). */
export const OHNE_THEMA = ['Klausur'];
