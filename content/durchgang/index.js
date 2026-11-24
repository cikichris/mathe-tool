// =====================================================================
//  Vorlesung durchgehen: Folie für Folie mit den handschriftlichen
//  Zwischenschritten aus der Vorlesung, jeweils erklärt.
//
//  Eine Datei pro Vorlesung. Aufbau eines Abschnitts:
//    id        stabil, z. B. 'vl12-d03' (nie ändern, daran hängt der Stand)
//    folien    Foliennummer(n) im PDF, z. B. '5' oder '5–6'
//    titel     Überschrift
//    folie     was auf der Folie steht (zusammengefasst, mit Formeln)
//    notizen   [{ t, w }]: handschriftliche Schritte (t) mit Erklärung (w)
//    plot      optional: Skizze aus den Notizen nachgezeichnet (js/plot.js)
//    kern      das Wichtigste in einem Satz
//    check     optional { frage, antwort }: kurz selbst prüfen
//    karten    optional: IDs passender Karten zum Üben
// =====================================================================
import vl01 from './vl01.js';
import vl02 from './vl02.js';
import vl03 from './vl03.js';
import vl04 from './vl04.js';
import vl05 from './vl05.js';
import vl06 from './vl06.js';
import vl07 from './vl07.js';
import vl09 from './vl09.js';
import vl10 from './vl10.js';
import vl11 from './vl11.js';
import vl12 from './vl12.js';

export const DURCHGAENGE = Object.fromEntries([vl01, vl02, vl03, vl04, vl05, vl06, vl07, vl09, vl10, vl11, vl12].map((d) => [d.unit, d]));
