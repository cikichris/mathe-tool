// Übungsblatt 6 (Besprechung 24./27.11.2026): Winkelfunktionen, gedämpfte Schwingung, Ableitungen
const r = String.raw;

const COSGL = r`VL 11, Folie 4: $\cos(x) = a \Rightarrow x_{1,k} = \arccos(a) + k \cdot 2\pi,\ x_{2,k} = -\arccos(a) + k \cdot 2\pi$`;
const SINGL = r`VL 10, Folie 11: $\sin(x) = a \Rightarrow x_{1,k} = \arcsin(a) + k \cdot 2\pi,\ x_{2,k} = \pi - \arcsin(a) + k \cdot 2\pi$`;
const TANGL = r`VL 11, Folie 6: $\tan(x) = a \Rightarrow x_k = \arctan(a) + k\pi$`;
const W_ALLG = r`VL 10, Folien 5 und 6: $-A + b \le y \le A + b$, also $W = [b - A;\ b + A]$`;
const P_ALLG = r`VL 10, Folien 5 und 6: Periodenlänge $p = \frac{2\pi}{\omega}$`;
const P_TAN = r`VL 10, Folie 8: Bei $a \tan(bx + c) + d$ ist die Periodenlänge $p = \frac{\pi}{b}$`;
const POTENZ = r`VL 12, Folie 11 (Potenzregel): $(x^k)' = k \cdot x^{k-1}$`;
const FAKTOR = r`VL 12, Folie 13 (Faktorregel): $(c \cdot g)' = c \cdot g'$`;
const SUMME = r`VL 12, Folie 14 (Summenregel): $(g + h)' = g' + h'$`;
const UMSCHREIBEN = r`VL 5, Folie 3: $\frac{1}{x^n} = x^{-n}$ und $\sqrt[n]{x^m} = x^{\frac{m}{n}}$`;
const TABELLE = r`VL 9, Folie 8 (Wertetabelle)`;
const NP = r`VL 3, Folie 17 (Satz vom Nullprodukt): $a \cdot b = 0 \Leftrightarrow a = 0 \lor b = 0$`;

export default {
  id: 'ue06',
  art: 'uebung',
  nummer: 6,
  datum: '2026-11-24',
  besprechung: ['2026-11-24', '2026-11-27'],
  titel: 'Winkelfunktionen und erste Ableitungen',
  ueberblick: r`Aufgaben 1 bis 5 mit den offiziellen Lösungen aus campUAS. Die Aufgaben 6 und 7 (Besprechung in der Übung) sind von Claude gelöst.`,

  karten: [
    // ---------------- Aufgabe 1 ----------------
    {
      id: 'ue06-a1ab',
      typ: 'aufgabe',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'Übung 6, Aufgabe 1 a, b',
      herkunft: 'offiziell',
      rezept: 'vl11-cos-tan-vergleich',
      frage: r`Bestimme Wertebereich und alle Nullstellen:
a) $f(x) = \cos(x) + \dfrac{1}{\sqrt{2}}$ $\quad$ b) $f(x) = \cos(x) - 2$`,
      tipps: [r`Wertebereich: $[-1 + b; 1 + b]$.`, r`a) $\cos(x) = -\frac{1}{\sqrt{2}}$, und $\arccos\left(-\frac{1}{\sqrt{2}}\right) = \frac{3\pi}{4}$.`],
      schritte: [
        { t: r`a) $W = \left[-1 + \frac{1}{\sqrt{2}};\ 1 + \frac{1}{\sqrt{2}}\right]$`, q: W_ALLG },
        { t: r`$\cos(x) = -\dfrac{1}{\sqrt{2}} \Rightarrow x_{1,k} = \dfrac{3\pi}{4} + k \cdot 2\pi,\ x_{2,k} = -\dfrac{3\pi}{4} + k \cdot 2\pi$`, q: COSGL + r`. Und $\arccos\left(-\frac{1}{\sqrt{2}}\right) = \pi - \frac{\pi}{4} = \frac{3\pi}{4}$.` },
        { t: r`b) $W = [-3; -1]$; $\ \cos(x) = 2$ hat keine Lösung, also keine Nullstellen`, q: r`VL 9, Folie 12: $-1 \le \cos(x) \le 1$` },
      ],
      ergebnis: r`a) $W = \left[-1 + \frac{1}{\sqrt{2}}; 1 + \frac{1}{\sqrt{2}}\right]$, $x = \pm\frac{3\pi}{4} + 2k\pi$ $\quad$ b) $W = [-3; -1]$, keine Nullstellen`,
    },
    {
      id: 'ue06-a1cd',
      typ: 'aufgabe',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'Übung 6, Aufgabe 1 c, d',
      herkunft: 'offiziell',
      rezept: 'vl11-cos-tan-vergleich',
      frage: r`Bestimme Wertebereich und alle Nullstellen:
c) $f(x) = 4\cos(x)$ $\quad$ d) $f(x) = 2\cos(x) - \sqrt{3}$`,
      tipps: [r`c) $\arccos(0) = \frac{\pi}{2}$. d) $\cos(x) = \frac{\sqrt{3}}{2}$ ist ein Tabellenwert.`],
      schritte: [
        { t: r`c) $W = [-4; 4]$; $\ \cos(x) = 0 \Rightarrow x_{1,k} = \dfrac{\pi}{2} + k \cdot 2\pi,\ x_{2,k} = -\dfrac{\pi}{2} + k \cdot 2\pi$`, q: COSGL },
        { t: r`d) $W = [-2 - \sqrt{3};\ 2 - \sqrt{3}]$; $\ \cos(x) = \dfrac{\sqrt{3}}{2} \Rightarrow x_{1,k} = \dfrac{\pi}{6} + k \cdot 2\pi,\ x_{2,k} = -\dfrac{\pi}{6} + k \cdot 2\pi$`, q: COSGL + '. ' + TABELLE + r`: $\cos\left(\frac{\pi}{6}\right) = \frac{\sqrt{3}}{2}$.` },
      ],
      ergebnis: r`c) $W = [-4; 4]$, $x = \pm\frac{\pi}{2} + 2k\pi$ $\quad$ d) $W = [-2 - \sqrt{3}; 2 - \sqrt{3}]$, $x = \pm\frac{\pi}{6} + 2k\pi$`,
    },

    // ---------------- Aufgabe 2 ----------------
    {
      id: 'ue06-a2a',
      typ: 'aufgabe',
      thema: 'Allgemeine Winkelfunktionen',
      quelle: 'Übung 6, Aufgabe 2 a',
      herkunft: 'offiziell',
      rezept: 'vl10-gleichung-rezept',
      frage: r`Bestimme Periodenlänge, Wertebereich und alle Nullstellen von $f(x) = 1{,}5\sin(3x - \pi) - 0{,}75$ und skizziere den Graphen.`,
      tipps: [r`$\omega = 3$, $A = 1{,}5$, $b = -0{,}75$.`, r`Nullstellen: $\sin(3x - \pi) = 0{,}5$. Beide Familien für das Argument, dann $+\pi$ und $: 3$.`],
      schritte: [
        { t: r`$\omega = 3 \Rightarrow p = \dfrac{2\pi}{3}$; $\ W = [-2{,}25; 0{,}75]$`, q: P_ALLG + '. ' + W_ALLG },
        { t: r`$1{,}5\sin(3x - \pi) = 0{,}75 \Leftrightarrow \sin(3x - \pi) = 0{,}5$` },
        { t: r`$3x_{1,k} - \pi = \dfrac{\pi}{6} + k \cdot 2\pi \;\lor\; 3x_{2,k} - \pi = \dfrac{5\pi}{6} + k \cdot 2\pi$`, q: SINGL + r`. $\arcsin(0{,}5) = \frac{\pi}{6}$.` },
        { t: r`$x_{1,k} = \dfrac{7\pi}{18} + k \cdot \dfrac{2\pi}{3},\quad x_{2,k} = \dfrac{11\pi}{18} + k \cdot \dfrac{2\pi}{3}$`, w: r`Erst $+\pi$, dann alles durch 3.` },
      ],
      plotLoesung: {
        x: [-3.4, 6.6], y: [-2.6, 1.2], u: 32, grid: 0.25, pi: true,
        fns: [{ f: (x) => 1.5 * Math.sin(3 * x - Math.PI) - 0.75 }],
        alt: 'Sinuskurve zwischen −2,25 und 0,75 mit Periodenlänge 2π/3',
      },
      ergebnis: r`$p = \frac{2\pi}{3}$, $W = [-2{,}25; 0{,}75]$, $x_{1,k} = \frac{7\pi}{18} + k\frac{2\pi}{3}$, $x_{2,k} = \frac{11\pi}{18} + k\frac{2\pi}{3}$`,
    },
    {
      id: 'ue06-a2b',
      typ: 'aufgabe',
      thema: 'Allgemeine Winkelfunktionen',
      quelle: 'Übung 6, Aufgabe 2 b',
      herkunft: 'offiziell',
      rezept: 'vl10-gleichung-rezept',
      frage: r`Bestimme Periodenlänge, Wertebereich und alle Nullstellen von $f(x) = 2\cos\left(0{,}5x + \dfrac{\pi}{4}\right) + \sqrt{2}$ und skizziere den Graphen.`,
      tipps: [r`$\cos(\ldots) = -\frac{\sqrt{2}}{2}$, und $\arccos\left(-\frac{\sqrt{2}}{2}\right) = \frac{3\pi}{4}$.`],
      schritte: [
        { t: r`$\omega = 0{,}5 \Rightarrow p = 4\pi$; $\ W = [-2 + \sqrt{2};\ 2 + \sqrt{2}]$`, q: P_ALLG + '. ' + W_ALLG },
        { t: r`$\cos\left(0{,}5x + \frac{\pi}{4}\right) = -\dfrac{\sqrt{2}}{2}$` },
        { t: r`$0{,}5x_{1,k} + \dfrac{\pi}{4} = \dfrac{3\pi}{4} + k \cdot 2\pi \;\lor\; 0{,}5x_{2,k} + \dfrac{\pi}{4} = -\dfrac{3\pi}{4} + k \cdot 2\pi$`, q: COSGL },
        { t: r`$x_{1,k} = \pi + k \cdot 4\pi,\quad x_{2,k} = -2\pi + k \cdot 4\pi$`, w: r`$-\frac{\pi}{4}$, dann $: 0{,}5$ (also mal 2, auch bei $k \cdot 2\pi$).` },
      ],
      plotLoesung: {
        x: [-7, 13.2], y: [-1, 3.8], u: 16, grid: 0.5, pi: true, piEvery: 2,
        fns: [{ f: (x) => 2 * Math.cos(0.5 * x + Math.PI / 4) + Math.SQRT2 }],
        alt: 'Cosinuskurve zwischen −2 + √2 und 2 + √2 mit Periodenlänge 4π und Nullstellen bei π und −2π',
      },
      ergebnis: r`$p = 4\pi$, $W = [-2 + \sqrt{2}; 2 + \sqrt{2}]$, $x_{1,k} = \pi + 4k\pi$, $x_{2,k} = -2\pi + 4k\pi$`,
    },

    // ---------------- Aufgabe 3 ----------------
    {
      id: 'ue06-a3',
      typ: 'aufgabe',
      thema: 'Funktionstypen',
      quelle: 'Übung 6, Aufgabe 3',
      herkunft: 'offiziell',
      rezept: 'vl11-gedaempft',
      frage: r`Bestimme alle Achsenschnittpunkte von $f: \mathbb{R} \to \mathbb{R},\ f(t) = 3e^{-t}\sin\left(4t - \dfrac{\pi}{2}\right)$.`,
      tipps: [r`$y$-Achse: $t = 0$ einsetzen.`, r`Nullstellen: Produkt gleich null, und $3e^{-t}$ ist nie null.`],
      schritte: [
        { t: r`$f(0) = 3e^0 \sin\left(-\dfrac{\pi}{2}\right) = 3 \cdot (-1) = -3$, also $(0; -3)$`, q: r`VL 3, Folie 10: Schnittpunkt mit der $y$-Achse ist $(0; f(0))$.` },
        { t: r`$3e^{-t}\sin\left(4t - \frac{\pi}{2}\right) = 0 \Leftrightarrow \sin\left(4t - \frac{\pi}{2}\right) = 0$`, w: r`$3e^{-t} \ne 0$ für alle $t$.`, q: NP + r`. VL 5, Folie 6: $e^{-t} > 0$.` },
        { t: r`$4t_{1,k} - \dfrac{\pi}{2} = 0 + k \cdot 2\pi \;\lor\; 4t_{2,k} - \dfrac{\pi}{2} = \pi + k \cdot 2\pi$`, q: SINGL + r`. $\arcsin(0) = 0$.` },
        { t: r`$t_{1,k} = \dfrac{\pi}{8} + k \cdot \dfrac{\pi}{2},\quad t_{2,k} = \dfrac{3\pi}{8} + k \cdot \dfrac{\pi}{2}$` },
      ],
      ergebnis: r`$(0; -3)$; Nullstellen $t_{1,k} = \frac{\pi}{8} + k\frac{\pi}{2}$, $t_{2,k} = \frac{3\pi}{8} + k\frac{\pi}{2}$`,
    },

    // ---------------- Aufgabe 4 ----------------
    {
      id: 'ue06-a4-potenzen',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'Übung 6, Aufgabe 4 a bis f',
      herkunft: 'offiziell',
      rezept: 'vl12-potenzregel',
      frage: r`Leite ab: a) $x^3$ $\ $ b) $x^5$ $\ $ c) $x$ $\ $ d) $1$ $\ $ e) $\dfrac{1}{x}$ $\ $ f) $\dfrac{1}{x^2}$`,
      tipps: [r`e) und f) als $x^{-1}$ bzw. $x^{-2}$ schreiben.`],
      schritte: [
        { t: r`a) $3x^2$ $\quad$ b) $5x^4$ $\quad$ c) $1$ $\quad$ d) $0$`, q: POTENZ },
        { t: r`e) $x^{-1} \Rightarrow -x^{-2} = -\dfrac{1}{x^2}$ $\quad$ f) $x^{-2} \Rightarrow -2x^{-3} = -\dfrac{2}{x^3}$`, q: UMSCHREIBEN },
      ],
      ergebnis: r`$3x^2$, $5x^4$, $1$, $0$, $-\frac{1}{x^2}$, $-\frac{2}{x^3}$`,
    },
    {
      id: 'ue06-a4-wurzeln',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'Übung 6, Aufgabe 4 g bis j',
      herkunft: 'offiziell',
      rezept: 'vl12-potenzregel',
      frage: r`Leite ab: g) $\sqrt{x}$ $\ $ h) $\sqrt[3]{x}$ $\ $ i) $\sqrt[4]{x^3}$ $\ $ j) $\dfrac{1}{\sqrt{x}}$`,
      tipps: [r`Wurzeln als Potenz mit Bruch im Exponenten schreiben.`],
      schritte: [
        { t: r`g) $x^{\frac{1}{2}} \Rightarrow \dfrac{1}{2}x^{-\frac{1}{2}} = \dfrac{1}{2\sqrt{x}}$`, q: UMSCHREIBEN + '. ' + POTENZ },
        { t: r`h) $x^{\frac{1}{3}} \Rightarrow \dfrac{1}{3}x^{-\frac{2}{3}} = \dfrac{1}{3\sqrt[3]{x^2}}$` },
        { t: r`i) $x^{\frac{3}{4}} \Rightarrow \dfrac{3}{4}x^{-\frac{1}{4}} = \dfrac{3}{4\sqrt[4]{x}}$` },
        { t: r`j) $x^{-\frac{1}{2}} \Rightarrow -\dfrac{1}{2}x^{-\frac{3}{2}} = -\dfrac{1}{2\sqrt{x^3}}$` },
      ],
      ergebnis: r`$\frac{1}{2\sqrt{x}}$, $\frac{1}{3\sqrt[3]{x^2}}$, $\frac{3}{4\sqrt[4]{x}}$, $-\frac{1}{2\sqrt{x^3}}$`,
    },
    {
      id: 'ue06-a4-faktoren',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'Übung 6, Aufgabe 4 k bis o',
      herkunft: 'offiziell',
      rezept: 'vl12-faktor-summe',
      frage: r`Leite ab: k) $-23$ $\ $ l) $2x^3$ $\ $ m) $\dfrac{3}{4x^3}$ $\ $ n) $2\sqrt{x}$ $\ $ o) $-\dfrac{1}{2\sqrt[3]{x^4}}$`,
      tipps: [r`Konstanten vor dem $x$ bleiben stehen (Faktorregel).`, r`m) $\frac{3}{4}x^{-3}$. o) $-\frac{1}{2}x^{-\frac{4}{3}}$.`],
      schritte: [
        { t: r`k) $0$ $\quad$ l) $6x^2$`, q: FAKTOR },
        { t: r`m) $\dfrac{3}{4}x^{-3} \Rightarrow -\dfrac{9}{4}x^{-4} = -\dfrac{9}{4x^4}$`, q: UMSCHREIBEN },
        { t: r`n) $2x^{\frac{1}{2}} \Rightarrow x^{-\frac{1}{2}} = \dfrac{1}{\sqrt{x}}$` },
        { t: r`o) $-\dfrac{1}{2}x^{-\frac{4}{3}} \Rightarrow \dfrac{2}{3}x^{-\frac{7}{3}} = \dfrac{2}{3\sqrt[3]{x^7}}$`, w: r`$-\frac{1}{2} \cdot \left(-\frac{4}{3}\right) = \frac{2}{3}$ und $-\frac{4}{3} - 1 = -\frac{7}{3}$.` },
      ],
      ergebnis: r`$0$, $6x^2$, $-\frac{9}{4x^4}$, $\frac{1}{\sqrt{x}}$, $\frac{2}{3\sqrt[3]{x^7}}$`,
    },
    {
      id: 'ue06-a4-summen',
      typ: 'aufgabe',
      thema: 'Ableitungsregeln',
      quelle: 'Übung 6, Aufgabe 4 p bis r',
      herkunft: 'offiziell',
      rezept: 'vl12-faktor-summe',
      frage: r`Leite ab: p) $x^3 + \dfrac{3}{2}x^2 - 6x + \dfrac{1}{2}$ $\ $ q) $-\dfrac{1}{2}x^3 + 2x^2 - x$ $\ $ r) $-\sqrt{x} + \dfrac{2}{3x^2}$`,
      tipps: [r`Summand für Summand ableiten.`],
      schritte: [
        { t: r`p) $3x^2 + 3x - 6$`, q: SUMME + '. ' + FAKTOR },
        { t: r`q) $-\dfrac{3}{2}x^2 + 4x - 1$` },
        { t: r`r) $-x^{\frac{1}{2}} + \dfrac{2}{3}x^{-2} \Rightarrow -\dfrac{1}{2}x^{-\frac{1}{2}} - \dfrac{4}{3}x^{-3} = -\dfrac{1}{2\sqrt{x}} - \dfrac{4}{3x^3}$`, q: UMSCHREIBEN },
      ],
      ergebnis: r`$3x^2 + 3x - 6$; $\ -\frac{3}{2}x^2 + 4x - 1$; $\ -\frac{1}{2\sqrt{x}} - \frac{4}{3x^3}$`,
    },

    // ---------------- Aufgabe 5 ----------------
    {
      id: 'ue06-a5ab',
      typ: 'aufgabe',
      thema: 'Ableitung',
      quelle: 'Übung 6, Aufgabe 5 a, b',
      herkunft: 'offiziell',
      rezept: 'vl12-grenzkosten',
      frage: r`a) $K = f(A)$ sind die Kosten in € für ein Haus mit $A$ m³ umbautem Raum. Was bedeutet $f'(A_0)$?
b) $K = f(T)$ sind die Kosten in € für die Förderung von $T$ Tonnen Kupfer. Was bedeutet $f'(2000) = 100$?`,
      tipps: [r`$f'(x_0)$ ≈ um wie viel $f$ steigt, wenn $x$ um 1 größer wird.`],
      schritte: [
        { t: r`a) $f'(A_0)$ entspricht (näherungsweise) dem Preis für den $(A_0 + 1)$-ten Kubikmeter.`, q: r`VL 12, Folien 7 und 9: lokale Änderungsrate bzw. Grenzkosten.` },
        { t: r`b) Die Förderkosten für die 2001. Tonne Kupfer betragen etwa 100 €.` },
      ],
      ergebnis: r`a) Kosten für einen zusätzlichen m³ $\quad$ b) die 2001. Tonne kostet ca. 100 €`,
    },
    {
      id: 'ue06-a5cd',
      typ: 'aufgabe',
      thema: 'Ableitung',
      quelle: 'Übung 6, Aufgabe 5 c, d',
      herkunft: 'offiziell',
      rezept: 'vl12-aenderungsraten',
      frage: r`c) $T = f(t)$ ist die Temperatur eines Kuchens in °C, $t$ in Stunden seit 10 Uhr: erst Backen, dann Abkühlen auf dem Balkon. Welche Einheit hat $f'(t)$, welches Vorzeichen, und was bedeutet $f'(0{,}3) = 500$?
d) $f(x)$ ist die Höhe des Rheinufers in m, $x$ km von der Quelle entfernt. Einheit und Vorzeichen von $f'(x)$?`,
      tipps: [r`Einheit von $f'$: Einheit von $f$ pro Einheit von $x$.`],
      schritte: [
        { t: r`c) Einheit °C pro Stunde. Beim Backen $f'(t) > 0$, beim Abkühlen $f'(t) < 0$.`, q: r`VL 12, Folie 7: lokale Änderungsrate.` },
        { t: r`$f'(0{,}3) = 500$: Nach 18 Minuten erwärmt sich der Kuchen mit 500 °C/h, also etwa 8,3 °C pro Minute.` },
        { t: r`d) Einheit m pro km. $f'(x) < 0$, denn Wasser fließt nur bergab.` },
      ],
      ergebnis: r`c) °C/h, erst positiv, dann negativ; 500 °C/h nach 18 min $\quad$ d) m/km, negativ`,
    },
    {
      id: 'ue06-a5ef',
      typ: 'aufgabe',
      thema: 'Ableitung',
      quelle: 'Übung 6, Aufgabe 5 e, f',
      herkunft: 'offiziell',
      rezept: 'vl12-aenderungsraten',
      frage: r`e) $t(x)$ ist die Einkommensteuer in € bei einem Einkommen von $x$ €. Was bedeutet $t'(x)$?
f) $q = f(p)$ ist die verkaufte Stückzahl bei einem Preis von $p$ € pro Stück. Deute $f(10) = 240\,000$ und $f'(10) = -29\,000$.`,
      tipps: [r`Bei $f'$ immer: „Wenn $x$ um 1 steigt, ändert sich $f$ um ungefähr …“`],
      schritte: [
        { t: r`e) Verdient man $x + 1$ statt $x$ Euro, zahlt man für den zusätzlichen Euro etwa $t'(x)$ Euro Steuern.` },
        { t: r`f) Bei 10 € pro Stück verkauft man 240 000 Stück. Erhöht man den Preis um 1 €, sinkt der Absatz um etwa 29 000 Stück.` },
      ],
      ergebnis: r`e) Steuer auf den nächsten Euro $\quad$ f) 240 000 Stück bei 10 €, je Euro mehr ca. 29 000 Stück weniger`,
    },

    // ---------------- Aufgabe 6 (Besprechung) ----------------
    {
      id: 'ue06-a6a',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '6 a)',
      thema: 'Allgemeine Winkelfunktionen',
      quelle: 'Übung 6, Aufgabe 6 a',
      herkunft: 'claude',
      rezept: 'vl10-gleichung-rezept',
      frage: r`Bestimme Amplitude, Wertebereich, Kreisfrequenz, Periodenlänge und die Nullstellen von $f(x) = 2 \cdot \sin\left(4x - \dfrac{\pi}{3}\right) - \sqrt{3}$.`,
      tipps: [
        r`Lies $A$, $\omega$ und $b$ direkt ab: $A = 2$, $\omega = 4$, $b = -\sqrt{3}$.`,
        r`Nullstellen: $\sin\left(4x - \frac{\pi}{3}\right) = \frac{\sqrt{3}}{2}$. Das ist ein Tabellenwert.`,
        r`$\arcsin\left(\frac{\sqrt{3}}{2}\right) = \frac{\pi}{3}$. Zweite Familie: $\pi - \frac{\pi}{3} = \frac{2\pi}{3}$.`,
      ],
      schritte: [
        { t: r`Amplitude $A = 2$, Kreisfrequenz $\omega = 4$`, q: r`VL 10, Folie 3: In $A \sin(\omega x + \varphi) + b$ ist $A$ die Amplitude und $\omega$ die Kreisfrequenz.` },
        { t: r`$W = [-2 - \sqrt{3};\ 2 - \sqrt{3}]$`, w: r`$2 - \sqrt{3} \approx 0{,}27 > 0$: Die 0 liegt im Wertebereich, also gibt es Nullstellen.`, q: W_ALLG },
        { t: r`$p = \dfrac{2\pi}{4} = \dfrac{\pi}{2}$`, q: P_ALLG },
        { t: r`$f(x) = 0 \Leftrightarrow 2\sin\left(4x - \frac{\pi}{3}\right) = \sqrt{3} \Leftrightarrow \sin\left(4x - \frac{\pi}{3}\right) = \dfrac{\sqrt{3}}{2}$` },
        { t: r`$4x_{1,k} - \dfrac{\pi}{3} = \dfrac{\pi}{3} + k \cdot 2\pi \;\lor\; 4x_{2,k} - \dfrac{\pi}{3} = \pi - \dfrac{\pi}{3} + k \cdot 2\pi = \dfrac{2\pi}{3} + k \cdot 2\pi$`, q: SINGL + '. ' + TABELLE + r`: $\sin\left(\frac{\pi}{3}\right) = \frac{\sqrt{3}}{2}$.` },
        { t: r`$4x_{1,k} = \dfrac{2\pi}{3} + k \cdot 2\pi \;\lor\; 4x_{2,k} = \pi + k \cdot 2\pi \quad (\,+\frac{\pi}{3}\,)$` },
        { t: r`$x_{1,k} = \dfrac{\pi}{6} + k \cdot \dfrac{\pi}{2},\quad x_{2,k} = \dfrac{\pi}{4} + k \cdot \dfrac{\pi}{2},\quad k \in \mathbb{Z} \quad (\,: 4\,)$`, w: r`Auch $k \cdot 2\pi$ wird durch 4 geteilt. Der Abstand $\frac{\pi}{2}$ ist genau die Periodenlänge, gute Kontrolle.` },
      ],
      ergebnis: r`$A = 2$, $W = [-2 - \sqrt{3}; 2 - \sqrt{3}]$, $\omega = 4$, $p = \frac{\pi}{2}$; $\ x_{1,k} = \frac{\pi}{6} + k\frac{\pi}{2}$, $x_{2,k} = \frac{\pi}{4} + k\frac{\pi}{2}$`,
      fehler: [
        r`Erst durch 4 teilen und dann $k \cdot 2\pi$ addieren.`,
        r`Die zweite Lösungsfamilie $\pi - \arcsin(a)$ vergessen.`,
      ],
    },
    {
      id: 'ue06-a6b',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '6 b)',
      thema: 'Allgemeine Winkelfunktionen',
      quelle: 'Übung 6, Aufgabe 6 b',
      herkunft: 'claude',
      rezept: 'vl11-cos-tan-vergleich',
      frage: r`Bestimme Amplitude, Wertebereich, Kreisfrequenz, Periodenlänge und die Nullstellen von $f(x) = 0{,}5 \cdot \cos\left(0{,}25x + \dfrac{\pi}{2}\right) - \dfrac{1}{2\sqrt{2}}$.`,
      tipps: [
        r`$\frac{1}{2\sqrt{2}} = \frac{\sqrt{2}}{4}$ (mit $\sqrt{2}$ erweitern). Damit ist $b = -\frac{\sqrt{2}}{4}$.`,
        r`Nullstellen: $\cos(\ldots) = \frac{1}{2\sqrt{2}} : 0{,}5 = \frac{1}{\sqrt{2}} = \frac{\sqrt{2}}{2}$.`,
        r`$\arccos\left(\frac{\sqrt{2}}{2}\right) = \frac{\pi}{4}$. Beim Auflösen: $-\frac{\pi}{2}$, dann $: 0{,}25$ (also mal 4).`,
      ],
      schritte: [
        { t: r`Amplitude $A = 0{,}5$, Kreisfrequenz $\omega = 0{,}25$` },
        { t: r`$W = \left[-\dfrac{1}{2} - \dfrac{\sqrt{2}}{4};\ \dfrac{1}{2} - \dfrac{\sqrt{2}}{4}\right] \approx [-0{,}85;\ 0{,}15]$`, w: r`$\frac{1}{2\sqrt{2}} = \frac{\sqrt{2}}{2 \cdot 2} = \frac{\sqrt{2}}{4}$.`, q: W_ALLG },
        { t: r`$p = \dfrac{2\pi}{0{,}25} = 8\pi$`, q: P_ALLG },
        { t: r`$0{,}5\cos\left(0{,}25x + \frac{\pi}{2}\right) = \dfrac{1}{2\sqrt{2}} \Leftrightarrow \cos\left(0{,}25x + \frac{\pi}{2}\right) = \dfrac{1}{\sqrt{2}} = \dfrac{\sqrt{2}}{2}$`, w: r`Durch 0,5 teilen heißt mal 2.` },
        { t: r`$0{,}25x_{1,k} + \dfrac{\pi}{2} = \dfrac{\pi}{4} + k \cdot 2\pi \;\lor\; 0{,}25x_{2,k} + \dfrac{\pi}{2} = -\dfrac{\pi}{4} + k \cdot 2\pi$`, q: COSGL + '. ' + TABELLE + r`: $\cos\left(\frac{\pi}{4}\right) = \frac{\sqrt{2}}{2}$.` },
        { t: r`$0{,}25x_{1,k} = -\dfrac{\pi}{4} + k \cdot 2\pi \;\lor\; 0{,}25x_{2,k} = -\dfrac{3\pi}{4} + k \cdot 2\pi \quad (\,-\frac{\pi}{2}\,)$` },
        { t: r`$x_{1,k} = -\pi + k \cdot 8\pi,\quad x_{2,k} = -3\pi + k \cdot 8\pi,\quad k \in \mathbb{Z} \quad (\,\cdot 4\,)$`, w: r`Kontrolle: Der Abstand zwischen zwei Nullstellen derselben Familie ist $8\pi$, genau die Periodenlänge.` },
      ],
      ergebnis: r`$A = 0{,}5$, $W = \left[-\frac{1}{2} - \frac{\sqrt{2}}{4}; \frac{1}{2} - \frac{\sqrt{2}}{4}\right]$, $\omega = 0{,}25$, $p = 8\pi$; $\ x_{1,k} = -\pi + 8k\pi$, $x_{2,k} = -3\pi + 8k\pi$`,
      fehler: [r`Beim Teilen durch 0,25 nur $-\frac{\pi}{4}$ mal 4 nehmen und $k \cdot 2\pi$ vergessen: Es wird $k \cdot 8\pi$.`],
    },
    {
      id: 'ue06-a6c',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '6 c)',
      thema: 'Allgemeine Winkelfunktionen',
      quelle: 'Übung 6, Aufgabe 6 c',
      herkunft: 'claude',
      rezept: 'vl11-cos-tan-vergleich',
      frage: r`Bestimme Periodenlänge und Nullstellen von $f(x) = \tan\left(\pi x - \dfrac{\pi}{2}\right) - \sqrt{3}$.`,
      tipps: [
        r`Beim Tangens ist die Periodenlänge $\frac{\pi}{b}$, hier mit $b = \pi$.`,
        r`$\tan\left(\pi x - \frac{\pi}{2}\right) = \sqrt{3}$, und $\arctan(\sqrt{3}) = \frac{\pi}{3}$.`,
      ],
      schritte: [
        { t: r`$p = \dfrac{\pi}{\pi} = 1$`, q: P_TAN },
        { t: r`$\tan\left(\pi x - \frac{\pi}{2}\right) = \sqrt{3}$` },
        { t: r`$\pi x_k - \dfrac{\pi}{2} = \arctan(\sqrt{3}) + k\pi = \dfrac{\pi}{3} + k\pi$`, q: TANGL + r`. $\tan\left(\frac{\pi}{3}\right) = \frac{\sin(\pi/3)}{\cos(\pi/3)} = \frac{\sqrt{3}/2}{1/2} = \sqrt{3}$ (VL 9, Folien 8 und 13).` },
        { t: r`$\pi x_k = \dfrac{5\pi}{6} + k\pi \Leftrightarrow x_k = \dfrac{5}{6} + k,\quad k \in \mathbb{Z}$`, w: r`$+\frac{\pi}{2}$, dann durch $\pi$ teilen. Der Abstand 1 ist genau die Periodenlänge.` },
      ],
      ergebnis: r`$p = 1$; $\ x_k = \frac{5}{6} + k,\ k \in \mathbb{Z}$`,
      fehler: [r`Beim Tangens eine zweite Lösungsfamilie bilden: Es gibt nur eine, weil die Periode schon $\pi$ ist.`],
    },
    {
      id: 'ue06-a6d',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '6 d)',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'Übung 6, Aufgabe 6 d',
      herkunft: 'claude',
      rezept: 'vl03-nullprodukt',
      frage: r`Bestimme die Nullstellen von $f(x) = (\sin(x))^2 + \dfrac{1}{2}\sin(x)$.`,
      tipps: [
        r`Kein Absolutglied: $\sin(x)$ ausklammern.`,
        r`Satz vom Nullprodukt: $\sin(x) = 0$ oder $\sin(x) + \frac{1}{2} = 0$.`,
        r`$\arcsin\left(-\frac{1}{2}\right) = -\frac{\pi}{6}$.`,
      ],
      schritte: [
        { t: r`$\sin(x) \cdot \left(\sin(x) + \dfrac{1}{2}\right) = 0$`, w: r`Wie bei Polynomen ohne Absolutglied: den gemeinsamen Faktor ausklammern. Man könnte auch $z = \sin(x)$ substituieren.`, q: r`VL 3, Folie 18 (Ausklammern), hier mit $\sin(x)$ statt $x$.` },
        { t: r`$\sin(x) = 0 \;\lor\; \sin(x) = -\dfrac{1}{2}$`, q: NP },
        { t: r`$\sin(x) = 0$: $\ x_{1,k} = 0 + k \cdot 2\pi,\ x_{2,k} = \pi + k \cdot 2\pi$, zusammen $x = k\pi$`, q: r`VL 9, Folie 11: Nullstellen des Sinus.` },
        { t: r`$\sin(x) = -\dfrac{1}{2}$: $\ x_{3,k} = -\dfrac{\pi}{6} + k \cdot 2\pi,\ x_{4,k} = \pi + \dfrac{\pi}{6} + k \cdot 2\pi = \dfrac{7\pi}{6} + k \cdot 2\pi$`, q: SINGL + r`. VL 9, Folie 11: Sinus ist ungerade, also $\arcsin\left(-\frac{1}{2}\right) = -\frac{\pi}{6}$.` },
      ],
      ergebnis: r`$x = k\pi$, $\ x = -\frac{\pi}{6} + 2k\pi$, $\ x = \frac{7\pi}{6} + 2k\pi$ $\ (k \in \mathbb{Z})$`,
      fehler: [
        r`Durch $\sin(x)$ teilen: Dann gehen alle Nullstellen $k\pi$ verloren.`,
        r`$\pi - \left(-\frac{\pi}{6}\right)$ als $\pi - \frac{\pi}{6}$ rechnen.`,
      ],
    },

    // ---------------- Aufgabe 7 (Besprechung) ----------------
    {
      id: 'ue06-a7a',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '7 a)',
      thema: 'Ableitungsregeln',
      quelle: 'Übung 6, Aufgabe 7 a',
      herkunft: 'claude',
      rezept: 'vl12-potenzregel',
      frage: r`Bestimme die Ableitungsfunktion von $f(x) = 2\sqrt[4]{x} + \dfrac{1}{\sqrt[3]{x}}$.`,
      tipps: [r`Beide Summanden als Potenz schreiben: $2x^{\frac{1}{4}} + x^{-\frac{1}{3}}$.`, r`Exponent minus 1: $\frac{1}{4} - 1 = -\frac{3}{4}$ und $-\frac{1}{3} - 1 = -\frac{4}{3}$.`],
      schritte: [
        { t: r`$f(x) = 2x^{\frac{1}{4}} + x^{-\frac{1}{3}}$`, q: UMSCHREIBEN },
        { t: r`$f'(x) = 2 \cdot \dfrac{1}{4}x^{-\frac{3}{4}} - \dfrac{1}{3}x^{-\frac{4}{3}} = \dfrac{1}{2}x^{-\frac{3}{4}} - \dfrac{1}{3}x^{-\frac{4}{3}}$`, q: POTENZ + '. ' + FAKTOR + '. ' + SUMME },
        { t: r`$= \dfrac{1}{2\sqrt[4]{x^3}} - \dfrac{1}{3\sqrt[3]{x^4}}$`, w: r`Zurück in Wurzelschreibweise, wie in der offiziellen Lösung zu Aufgabe 4.` },
      ],
      ergebnis: r`$f'(x) = \frac{1}{2\sqrt[4]{x^3}} - \frac{1}{3\sqrt[3]{x^4}}$`,
    },
    {
      id: 'ue06-a7bcd',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '7 b–d)',
      thema: 'Ableitungsregeln',
      quelle: 'Übung 6, Aufgabe 7 b bis d',
      herkunft: 'claude',
      rezept: 'vl12-exp',
      frage: r`Bestimme die Ableitungsfunktionen ($a \in \mathbb{R}$):
b) $f(x) = 2\sin(x) + \pi$ $\quad$ c) $s(t) = \dfrac{1}{2}at^2$ $\quad$ d) $f(x) = 2^x + 3^x$`,
      tipps: [
        r`b) $\pi$ ist eine Konstante. c) Die Variable ist $t$, $a$ ist ein konstanter Faktor.`,
        r`d) $x$ steht im Exponenten: $(a^x)' = \ln(a) \cdot a^x$.`,
      ],
      schritte: [
        { t: r`b) $f'(x) = 2\cos(x) + 0 = 2\cos(x)$`, w: r`$\pi \approx 3{,}14$ ist eine feste Zahl, ihre Ableitung ist 0.`, q: r`VL 12, Folie 16: $(\sin x)' = \cos x$. ` + FAKTOR + '. ' + SUMME },
        { t: r`c) $s'(t) = \dfrac{1}{2}a \cdot 2t = at$`, w: r`Physik: Ist $s$ der Weg bei konstanter Beschleunigung $a$, ist $s'(t) = at$ die Geschwindigkeit.`, q: POTENZ + '. ' + FAKTOR },
        { t: r`d) $f'(x) = \ln(2) \cdot 2^x + \ln(3) \cdot 3^x$`, q: r`VL 12, Folie 17: $(a^x)' = \ln(a) \cdot a^x$. ` + SUMME },
      ],
      ergebnis: r`b) $2\cos(x)$ $\quad$ c) $at$ $\quad$ d) $\ln(2) \cdot 2^x + \ln(3) \cdot 3^x$`,
      fehler: [
        r`d) Potenzregel anwenden: $x \cdot 2^{x-1}$ ist falsch.`,
        r`c) nach $a$ statt nach $t$ ableiten.`,
      ],
    },
  ],

  formelblatt: [
    {
      id: 'fb-ableitung-deuten',
      titel: 'Ableitung deuten',
      standard: false,
      inhalt: r`$f'(x_0)$ ≈ Änderung von $f$, wenn $x$ um 1 steigt. Einheit: [f] pro [x].`,
    },
  ],
};
