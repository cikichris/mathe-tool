// =====================================================================
//  Inhaltsverzeichnis: Welche Einheiten gehören zu welcher Woche?
//
//  Neue Woche einpflegen:
//    1. Datei content/vlXX.js bzw. content/ueXX.js anlegen
//    2. hier importieren und in die passende Woche eintragen
//    3. node tools/check-content.mjs ausführen
//
//  Wichtig: Die id einer Karte nie nachträglich ändern. An ihr hängt
//  der gespeicherte Lernstand.
// =====================================================================
import vl01 from './vl01.js';
import vl02 from './vl02.js';
import vl03 from './vl03.js';
import ue01 from './ue01.js';

export const WOCHEN = [
  {
    nr: 1,
    titel: 'Grundbegriffe, Funktionen und Geraden',
    einheiten: [vl01, vl02, ue01],
  },
  {
    nr: 2,
    titel: 'Polynomfunktionen',
    einheiten: [vl03],
  },
];
