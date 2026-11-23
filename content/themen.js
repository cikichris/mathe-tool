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
    kurz: 'Funktion',
    titel: 'Funktionen und Geraden',
    themen: ['Grundbegriffe', 'Funktionsbegriff', 'Geraden', 'Terme und Gleichungen', 'Funktionstypen'],
  },
  {
    id: 'polynome',
    kurz: 'Polynom',
    titel: 'Polynome und Nullstellen',
    themen: ['Polynomfunktionen', 'Symmetrie', 'Nullstellen', 'Linearfaktoren'],
  },
  {
    id: 'explog',
    kurz: 'Exp/Log',
    titel: 'Exponential und Logarithmus',
    themen: ['Potenzen', 'Exponentialfunktion', 'Logarithmus', 'Definitionsbereich'],
  },
  {
    id: 'gleichungen',
    kurz: 'Exp-Gl.',
    titel: 'Exp- und Log-Gleichungen',
    themen: ['Exponentialgleichungen', 'Logarithmengleichungen'],
  },
  {
    id: 'dreiecke',
    kurz: 'Dreieck',
    titel: 'Winkel und Dreiecke',
    themen: ['Winkel', 'Dreiecke'],
  },
  {
    id: 'winkelfunktionen',
    kurz: 'sin/cos',
    titel: 'Winkelfunktionen',
    themen: ['Winkelfunktionen', 'Allgemeine Winkelfunktionen'],
  },
  {
    id: 'triggleichungen',
    kurz: 'Trig-Gl.',
    titel: 'Trigonometrische Gleichungen',
    themen: ['Trigonometrische Gleichungen'],
  },
  {
    id: 'ableitungen',
    kurz: 'f′(x)',
    titel: 'Ableitungen',
    themen: ['Ableitung', 'Ableitungsregeln'],
  },
];

/** Karten mit diesen Themen gehören zu keinem Klausurthema (z. B. Klausurregeln). */
export const OHNE_THEMA = ['Klausur'];
