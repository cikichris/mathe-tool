// Vorlesung 11 (16.11.2026): arccos/arctan, Cosinus- und Tangensgleichungen,
// vermischte Funktionstypen, Sekante, Tangente, Differenzierbarkeit
const r = String.raw;

export default {
  id: 'vl11',
  art: 'vorlesung',
  nummer: 11,
  datum: '2026-11-16',
  titel: 'Cosinus-/Tangensgleichungen und der Ableitungsbegriff',
  ueberblick: r`Arkuscosinus und Arkustangens, das Lösen von Cosinus- und Tangensgleichungen (die Beispiele 3 bis 5 stehen bei Vorlesung 10), Kombinationen von Funktionstypen und die gedämpfte Schwingung. Danach der Einstieg in die Differentialrechnung: Sekante, Tangente und Differenzierbarkeit.`,

  karten: [
    {
      id: 'vl11-arccos',
      typ: 'definition',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'VL 11, Folie 3',
      frage: r`Was ist die Arkuscosinusfunktion?`,
      antwort: r`Die Cosinusfunktion ist z. B. auf $[0; \pi]$ umkehrbar. Ihre Umkehrfunktion dort heißt Arkuscosinus:

$$\arccos: [-1; 1] \to [0; \pi]$$

$\arccos(a)$ ist also **der eine** Winkel zwischen $0$ und $\pi$, dessen Cosinus $a$ ist.`,
      merke: r`Beispiele: $\arccos(0) = \frac{\pi}{2}$, $\arccos(-0{,}5) = \frac{2\pi}{3}$, $\arccos\left(\frac{\sqrt{3}}{2}\right) = \frac{\pi}{6}$.`,
    },
    {
      id: 'vl11-arctan',
      typ: 'definition',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'VL 11, Folie 5',
      frage: r`Was ist die Arkustangensfunktion?`,
      antwort: r`Die Tangensfunktion ist z. B. auf $\left(-\frac{\pi}{2}; \frac{\pi}{2}\right)$ umkehrbar. Ihre Umkehrfunktion dort heißt Arkustangens:

$$\arctan: (-\infty; \infty) \to \left(-\frac{\pi}{2}; \frac{\pi}{2}\right)$$`,
      merke: r`Anders als $\arcsin$ und $\arccos$ ist $\arctan$ für **jede** reelle Zahl definiert. Eine Tangensgleichung hat deshalb immer Lösungen.`,
    },
    {
      id: 'vl11-intervalle-mc',
      typ: 'verstaendnis',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'VL 10, Folie 10 und VL 11, Folien 3 und 5',
      herkunft: 'zusatz',
      frage: r`In welchem Intervall liegen die Werte von $\arccos$?`,
      optionen: [r`$[0; \pi]$`, r`$\left[-\frac{\pi}{2}; \frac{\pi}{2}\right]$`, r`$\left(-\frac{\pi}{2}; \frac{\pi}{2}\right)$`, r`$[0; 2\pi)$`],
      richtig: 0,
      erklaerung: r`$\arccos$: $[0; \pi]$. $\arcsin$: $\left[-\frac{\pi}{2}; \frac{\pi}{2}\right]$. $\arctan$: $\left(-\frac{\pi}{2}; \frac{\pi}{2}\right)$ (offen, weil $\tan$ an den Rändern Polstellen hat).`,
    },
    {
      id: 'vl11-cos-tan-vergleich',
      typ: 'verfahren',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'VL 10, Folie 11 und VL 11, Folien 4 und 6',
      frage: r`Wie lauten die Lösungsformeln für $\sin(x) = a$, $\cos(x) = a$ und $\tan(x) = a$ im Vergleich?`,
      antwort: r`- $\sin(x) = a$ ($-1 \le a \le 1$): $\ x_{1,k} = \arcsin(a) + k \cdot 2\pi$, $\ x_{2,k} = \pi - \arcsin(a) + k \cdot 2\pi$
- $\cos(x) = a$ ($-1 \le a \le 1$): $\ x_{1,k} = \arccos(a) + k \cdot 2\pi$, $\ x_{2,k} = -\arccos(a) + k \cdot 2\pi$
- $\tan(x) = a$ ($a \in \mathbb{R}$): $\ x_k = \arctan(a) + k \cdot \pi$

jeweils mit $k \in \mathbb{Z}$.`,
      merke: r`Sinus: „$\pi$ minus“. Cosinus: „minus“. Tangens: nur eine Familie, aber $+ k\pi$ statt $+ k \cdot 2\pi$.`,
    },
    {
      id: 'vl11-cos-aufgabe',
      typ: 'aufgabe',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'Übungsvariante zu VL 11, Folie 4',
      herkunft: 'zusatz',
      rezept: 'vl11-cos-tan-vergleich',
      frage: r`Bestimme alle Lösungen von $2\cos(x) + 1 = 0$.`,
      tipps: [r`Cosinus isolieren.`, r`$\arccos\left(-\frac{1}{2}\right) = \frac{2\pi}{3}$.`],
      schritte: [
        { t: r`$2\cos(x) = -1 \Leftrightarrow \cos(x) = -\dfrac{1}{2}$` },
        { t: r`$x_{1,k} = \arccos\left(-\frac{1}{2}\right) + k \cdot 2\pi = \dfrac{2\pi}{3} + k \cdot 2\pi$`, q: r`VL 11, Folie 4: $x_{1,k} = \arccos(a) + k \cdot 2\pi$. Und $\cos\left(\frac{2\pi}{3}\right) = -\frac{1}{2}$, weil $\cos\left(\pi - \frac{\pi}{3}\right) = -\cos\left(\frac{\pi}{3}\right)$.` },
        { t: r`$x_{2,k} = -\dfrac{2\pi}{3} + k \cdot 2\pi,\quad k \in \mathbb{Z}$`, q: r`VL 11, Folie 4: $x_{2,k} = -\arccos(a) + k \cdot 2\pi$.` },
      ],
      ergebnis: r`$x_{1,k} = \frac{2\pi}{3} + 2k\pi,\ x_{2,k} = -\frac{2\pi}{3} + 2k\pi$`,
    },
    {
      id: 'vl11-tan-aufgabe',
      typ: 'aufgabe',
      thema: 'Trigonometrische Gleichungen',
      quelle: 'Übungsvariante zu VL 11, Folie 6',
      herkunft: 'zusatz',
      rezept: 'vl11-cos-tan-vergleich',
      frage: r`Bestimme alle Lösungen von $\tan(2x) = 1$.`,
      tipps: [r`$\arctan(1) = \frac{\pi}{4}$.`, r`Erst für $2x$ lösen, dann alles durch 2 teilen, auch $k\pi$.`],
      schritte: [
        { t: r`$2x_k = \arctan(1) + k\pi = \dfrac{\pi}{4} + k\pi$`, q: r`VL 11, Folie 6: $\tan(x) = a \Rightarrow x_k = \arctan(a) + k\pi$, hier für das Argument $2x$.` },
        { t: r`$x_k = \dfrac{\pi}{8} + k \cdot \dfrac{\pi}{2},\quad k \in \mathbb{Z}$` },
      ],
      ergebnis: r`$x_k = \frac{\pi}{8} + k \cdot \frac{\pi}{2}$`,
    },
    {
      id: 'vl11-funktionstypen',
      typ: 'definition',
      thema: 'Funktionstypen',
      quelle: 'VL 11, Folien 9 und 10',
      frage: r`Welche Funktionstypen kennst du bisher, und was gilt, wenn sie kombiniert werden?`,
      antwort: r`Bisher: affin-lineare Funktionen, Polynomfunktionen, Exponentialfunktionen, Logarithmusfunktionen sowie Sinus- und Cosinusfunktionen (und Tangens).

Oft werden sie kombiniert, z. B. $x + \cos(x)$, $\ x^2 \cdot e^x$, $\ \frac{\sin(x)}{x}$, $\ e^{\sqrt{x}}$.

Zur Nullstellenbestimmung lassen sich viele der bekannten Methoden anwenden. Eine allgemeine Vorgehensweise gibt es nicht.`,
      merke: r`Bei Produkten fast immer zuerst an den Satz vom Nullprodukt denken.`,
    },
    {
      id: 'vl11-gedaempft',
      typ: 'definition',
      thema: 'Funktionstypen',
      quelle: 'VL 11, Folie 11',
      frage: r`Was ist eine gedämpfte Schwingung, z. B. $f(t) = 3e^{-0{,}5t} \cdot \cos(4t)$?`,
      antwort: r`Das Produkt aus einer fallenden Exponentialfunktion und einer Schwingung. Der Graph pendelt zwischen den Hüllkurven $3e^{-0{,}5t}$ und $-3e^{-0{,}5t}$, und die Ausschläge werden mit der Zeit immer kleiner.`,
      plotAntwort: {
        x: [-0.4, 6.4], y: [-3.4, 3.4], u: 40,
        fns: [{ f: (t) => 3 * Math.exp(-0.5 * t) * Math.cos(4 * t), from: 0 }, { f: (t) => 3 * Math.exp(-0.5 * t), from: 0 }],
        alt: 'Gedämpfte Schwingung, deren Ausschläge zwischen den Kurven ±3e hoch −0,5t immer kleiner werden',
      },
      merke: r`Nullstellen: Weil $3e^{-0{,}5t} \ne 0$ ist, kommen sie nur vom Cosinus (Satz vom Nullprodukt). So in Übung 6, Aufgabe 3.`,
    },
    {
      id: 'vl11-sekante',
      typ: 'definition',
      thema: 'Ableitung',
      quelle: 'VL 11, Folie 13',
      frage: r`Was ist eine Sekante, und wie berechnet man ihre Steigung?`,
      antwort: r`Durch zwei verschiedene Punkte $P(x_1; f(x_1))$ und $Q(x_2; f(x_2))$ auf dem Graphen von $f$ gibt es genau eine Gerade, die **Sekante**. Ihre Steigung ist

$$m = \frac{\Delta y}{\Delta x} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}$$`,
      merke: r`Das ist dieselbe Formel wie für die Gerade durch zwei Punkte (VL 2, Folie 6), nur mit $y = f(x)$.`,
    },
    {
      id: 'vl11-sekante-aufgabe',
      typ: 'aufgabe',
      thema: 'Ableitung',
      quelle: 'Übungsvariante zu VL 11, Folie 13',
      herkunft: 'zusatz',
      rezept: 'vl11-sekante',
      frage: r`Berechne die Steigung der Sekante von $f(x) = x^2$ durch die Punkte mit $x_1 = 1$ und $x_2 = 3$.`,
      tipps: [r`Erst die $y$-Werte $f(1)$ und $f(3)$ berechnen.`],
      schritte: [
        { t: r`$f(1) = 1$, $\ f(3) = 9$` },
        { t: r`$m = \dfrac{f(3) - f(1)}{3 - 1} = \dfrac{9 - 1}{2} = 4$`, q: r`VL 11, Folie 13: $m = \frac{f(x_2) - f(x_1)}{x_2 - x_1}$` },
      ],
      ergebnis: r`$m = 4$`,
    },
    {
      id: 'vl11-tangente',
      typ: 'definition',
      thema: 'Ableitung',
      quelle: 'VL 11, Folien 14 und 15',
      frage: r`Wie kommt man von der Sekante zur Tangente, und wie lautet die Tangentensteigung?`,
      antwort: r`Man hält $P(x_0; f(x_0))$ fest und lässt den zweiten Punkt $Q(x_0 + \Delta x; f(x_0 + \Delta x))$ an $P$ heranwandern ($\Delta x \to 0$). Gibt es dabei eine eindeutige Grenzlage der Sekanten, heißt diese Gerade **Tangente von $f$ an der Stelle $x_0$**. Ihre Steigung ist

$$\lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$$`,
      merke: r`Der Bruch ist die Sekantensteigung, $\lim_{\Delta x \to 0}$ ist das Heranwandern. $\Delta x$ ist der Abstand der beiden $x$-Koordinaten.`,
    },
    {
      id: 'vl11-differenzierbar',
      typ: 'definition',
      thema: 'Ableitung',
      quelle: 'VL 11, Folie 16',
      frage: r`Wann heißt $f$ an der Stelle $x_0$ differenzierbar, und was ist $f'(x_0)$?`,
      antwort: r`$f: D \to \mathbb{R}$ heißt **an der Stelle $x_0 \in D$ differenzierbar**, wenn der Grenzwert

$$\lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$$

existiert. Dann heißt dieser Grenzwert **Ableitung von $f$ an der Stelle $x_0$**, geschrieben $f'(x_0)$.`,
      merke: r`$f'(x_0)$ ist also die Steigung der Tangente an der Stelle $x_0$. Bei Zeitfunktionen schreibt man auch $\dot f(t_0)$.`,
    },
    {
      id: 'vl11-betrag-mc',
      typ: 'verstaendnis',
      thema: 'Ableitung',
      quelle: 'VL 11, Folie 16 (Nicht-Beispiel)',
      herkunft: 'vorlesung',
      frage: r`Ist $f(x) = |x|$ an der Stelle $x_0 = 0$ differenzierbar?`,
      optionen: [r`Nein`, r`Ja, mit $f'(0) = 0$`, r`Ja, mit $f'(0) = 1$`],
      optionenFest: true,
      richtig: 0,
      erklaerung: r`Links von 0 hat der Graph die Steigung $-1$, rechts die Steigung $+1$. Die Sekanten nähern sich also keiner eindeutigen Grenzlage, je nachdem, von welcher Seite der zweite Punkt kommt. Am „Knick“ gibt es keine Tangente.`,
    },
  ],

  formelblatt: [
    {
      id: 'fb-sekante-tangente',
      titel: 'Sekante / Tangente',
      inhalt: r`$m_S = \frac{f(x_2) - f(x_1)}{x_2 - x_1}$; $\ f'(x_0) = \lim\limits_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$`,
    },
  ],
};
