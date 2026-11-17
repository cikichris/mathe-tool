// =====================================================================
//  Inhaltsverzeichnis: Welche Einheiten gehören zu welcher Woche?
//
//  Neue Woche einpflegen:
//    1. Datei content/vlXX.js bzw. content/ueXX.js anlegen
//       Übungen: besprechung: ['JJJJ-MM-TT', ...] am Blatt; Aufgaben, die in der
//       Übung besprochen werden, bekommen teil: 'besprechung', Präsenzaufgaben
//       teil: 'praesenz', und beide eine Nummer nr: '3 a)'. Sie erscheinen
//       dann im Menüpunkt „Übung“.
//    2. hier importieren und in die passende Woche eintragen
//    3. node tools/check-content.mjs ausführen
//
//  Wichtig: Die id einer Karte nie nachträglich ändern. An ihr hängt
//  der gespeicherte Lernstand.
// =====================================================================
import vl01 from './vl01.js';
import vl02 from './vl02.js';
import vl03 from './vl03.js';
import vl04 from './vl04.js';
import vl05 from './vl05.js';
import vl06 from './vl06.js';
import vl07 from './vl07.js';
import vl08 from './vl08.js';
import vl09 from './vl09.js';
import vl10 from './vl10.js';
import ue01 from './ue01.js';
import ue02 from './ue02.js';
import ue03 from './ue03.js';
import ue04 from './ue04.js';
import ue05 from './ue05.js';

export const WOCHEN = [
  { nr: 1, titel: 'Grundbegriffe, Funktionen und Geraden', einheiten: [vl01, vl02, ue01] },
  { nr: 2, titel: 'Polynomfunktionen', einheiten: [vl03, vl04, ue02] },
  { nr: 3, titel: 'Exponential- und Logarithmusfunktionen', einheiten: [vl05, vl06, ue03] },
  { nr: 4, titel: 'Logarithmengleichungen, Winkel und Dreiecke', einheiten: [vl07, vl08, ue04] },
  { nr: 5, titel: 'Winkelfunktionen', einheiten: [vl09, vl10, ue05] },
];
