// Übungsblatt 1 (Besprechung 20./23.10.2026): Terme, Gleichungen, Funktionen, Geraden
const r = String.raw;

const FUNKTION_OPTIONEN = [
  r`Ja, das ist eine Funktion.`,
  r`Nein: Die Vorschrift ist nicht für jedes $x \in D$ definiert.`,
  r`Nein: Nicht alle Funktionswerte liegen in der Zielmenge $Z$.`,
  r`Nein: Die Zuordnung ist nicht eindeutig.`,
];

export default {
  id: 'ue01',
  art: 'uebung',
  nummer: 1,
  datum: '2026-10-20',
  titel: 'Terme, Gleichungen und Geraden',
  ueberblick: r`Aufgaben 1 und 2 mit den offiziellen Ergebnissen aus campUAS. Für die Aufgaben 3 und 4 (Besprechung in der Übung) liegt noch keine Musterlösung vor, sie sind von Claude gelöst und entsprechend markiert.`,

  karten: [
    // ---------------- Aufgabe 1 ----------------
    {
      id: 'ue01-a1-einordnen',
      typ: 'verstaendnis',
      thema: 'Terme und Gleichungen',
      quelle: 'Übung 1, Aufgabe 1',
      herkunft: 'offiziell',
      frage: r`Welcher dieser Ausdrücke ist eine **Gleichung**?`,
      optionen: [r`$(2x - 1)^2$`, r`$2x^2 = 18$`, r`$\frac{1}{2} - \frac{1}{3}$`, r`$3x - (2x - 1)$`],
      richtig: 1,
      erklaerung: r`Eine Gleichung besteht aus zwei Termen, die durch ein Gleichheitszeichen verbunden sind. Die anderen drei Ausdrücke sind Terme: Man kann sie vereinfachen, aber nicht „lösen“. Ausdrücke wie „$\cdot\,) + -3$“ aus Teil b) sind weder Term noch Gleichung, weil sie nicht sinnvoll sind.`,
    },
    {
      id: 'ue01-a1-terme',
      typ: 'aufgabe',
      thema: 'Terme und Gleichungen',
      quelle: 'Übung 1, Aufgabe 1 a, d, e, j',
      herkunft: 'offiziell',
      frage: r`Vereinfache die Terme so weit wie möglich:
a) $\dfrac{3}{6}$
d) $(2x - 3) \cdot 5$
e) $\dfrac{1}{2} - \dfrac{1}{3}$
j) $3x - (2x - 1)$`,
      tipps: [
        r`e) Brüche lassen sich nur mit gleichem Nenner subtrahieren. Was ist der Hauptnenner von 2 und 3?`,
        r`j) Ein Minus vor der Klammer dreht **jedes** Vorzeichen in der Klammer um.`,
      ],
      schritte: [
        { t: r`a) $\dfrac{3}{6} = \dfrac{1}{2}$`, w: r`Kürzen mit 3.` },
        { t: r`d) $(2x - 3) \cdot 5 = 10x - 15$`, w: r`Ausmultiplizieren: Jeder Summand in der Klammer wird mit 5 multipliziert.` },
        { t: r`e) $\dfrac{1}{2} - \dfrac{1}{3} = \dfrac{3}{6} - \dfrac{2}{6} = \dfrac{1}{6}$`, w: r`Auf den Hauptnenner 6 erweitern, dann die Zähler subtrahieren.` },
        { t: r`j) $3x - (2x - 1) = 3x - 2x + 1 = x + 1$`, w: r`Minusklammer: aus $-1$ wird $+1$.` },
      ],
      ergebnis: r`a) $\dfrac{1}{2}$ $\quad$ d) $10x - 15$ $\quad$ e) $\dfrac{1}{6}$ $\quad$ j) $x + 1$`,
      fehler: [
        r`j) $3x - 2x - 1$ schreiben: Das Minus gilt für die ganze Klammer.`,
        r`e) Zähler und Nenner einzeln subtrahieren ($\frac{1-1}{2-3}$).`,
        r`d) Nur den ersten Summanden mit 5 multiplizieren.`,
      ],
    },
    {
      id: 'ue01-a1-binom',
      typ: 'aufgabe',
      thema: 'Terme und Gleichungen',
      quelle: 'Übung 1, Aufgabe 1 h',
      herkunft: 'offiziell',
      frage: r`Löse die Klammer auf: $(2x - 1)^2$`,
      tipps: [
        r`Das ist die 2. binomische Formel: $(a - b)^2 = a^2 - 2ab + b^2$.`,
        r`Hier ist $a = 2x$ und $b = 1$. Achte darauf, dass $a^2 = (2x)^2$ ist.`,
      ],
      schritte: [
        { t: r`$(2x - 1)^2 = (2x)^2 - 2 \cdot 2x \cdot 1 + 1^2$`, w: r`2. binomische Formel mit $a = 2x$ und $b = 1$.` },
        { t: r`$= 4x^2 - 4x + 1$`, w: r`$(2x)^2 = 2^2 \cdot x^2 = 4x^2$: Die 2 wird mitquadriert.` },
      ],
      ergebnis: r`$4x^2 - 4x + 1$`,
      fehler: [
        r`Das mittlere Glied vergessen: $(2x - 1)^2 \ne 4x^2 + 1$ und $\ne 4x^2 - 1$.`,
        r`$(2x)^2 = 2x^2$ rechnen statt $4x^2$.`,
      ],
    },
    {
      id: 'ue01-a1-produkt',
      typ: 'aufgabe',
      thema: 'Terme und Gleichungen',
      quelle: 'Übung 1, Aufgabe 1 k',
      herkunft: 'offiziell',
      frage: r`Vereinfache so weit wie möglich: $\dfrac{1}{2}(2x - 1) \cdot (3 - x)$`,
      tipps: [
        r`Multipliziere zuerst die beiden Klammern miteinander aus (jeder mit jedem) und lass den Faktor $\frac{1}{2}$ noch stehen.`,
        r`$(2x - 1)(3 - x)$ ergibt vier Produkte: $2x \cdot 3$, $2x \cdot (-x)$, $-1 \cdot 3$ und $-1 \cdot (-x)$.`,
      ],
      schritte: [
        { t: r`$\dfrac{1}{2}(2x - 1)(3 - x) = \dfrac{1}{2}\left(6x - 2x^2 - 3 + x\right)$`, w: r`Klammern ausmultiplizieren: jeder Summand der ersten mit jedem der zweiten.` },
        { t: r`$= \dfrac{1}{2}\left(-2x^2 + 7x - 3\right)$`, w: r`Zusammenfassen und nach Potenzen ordnen.` },
        { t: r`$= -x^2 + 3{,}5x - 1{,}5$`, w: r`Zum Schluss alles mit $\frac{1}{2}$ multiplizieren.` },
      ],
      ergebnis: r`$-x^2 + 3{,}5x - 1{,}5$`,
      fehler: [
        r`$-1 \cdot (-x) = -x$ rechnen: Minus mal Minus ergibt Plus.`,
        r`Den Faktor $\frac{1}{2}$ nur auf einen Teil anwenden.`,
      ],
    },
    {
      id: 'ue01-a1-gleichungen',
      typ: 'aufgabe',
      thema: 'Terme und Gleichungen',
      quelle: 'Übung 1, Aufgabe 1 c, g',
      herkunft: 'offiziell',
      frage: r`Bestimme die Lösungsmengen:
c) $2x + 1 = -3$
g) $(x + 3)^2 = x^2 + 9$`,
      tipps: [
        r`g) Löse zuerst die Klammer links mit der 1. binomischen Formel auf.`,
        r`g) Danach steht auf beiden Seiten $x^2$. Was passiert, wenn du auf beiden Seiten $x^2$ abziehst?`,
      ],
      schritte: [
        { t: r`c) $2x + 1 = -3 \Leftrightarrow 2x = -4 \Leftrightarrow x = -2$, also $\mathbb{L} = \{-2\}$`, w: r`Äquivalenzumformungen: erst $-1$, dann $: 2$.` },
        { t: r`g) $(x + 3)^2 = x^2 + 9 \Leftrightarrow x^2 + 6x + 9 = x^2 + 9$`, w: r`1. binomische Formel: $(a + b)^2 = a^2 + 2ab + b^2$.` },
        { t: r`$\Leftrightarrow 6x = 0 \Leftrightarrow x = 0$, also $\mathbb{L} = \{0\}$`, w: r`$x^2$ und $9$ fallen auf beiden Seiten weg.` },
      ],
      ergebnis: r`c) $\mathbb{L} = \{-2\}$ $\quad$ g) $\mathbb{L} = \{0\}$`,
      fehler: [
        r`g) Denken, die Gleichung stimme für alle $x$: $(x + 3)^2$ ist **nicht** $x^2 + 9$. Die Gleichung ist nur für $x = 0$ wahr.`,
      ],
    },
    {
      id: 'ue01-a1-quadratisch',
      typ: 'aufgabe',
      thema: 'Terme und Gleichungen',
      quelle: 'Übung 1, Aufgabe 1 f, l',
      herkunft: 'offiziell',
      frage: r`Bestimme die Lösungsmengen:
f) $2x^2 = 18$
l) $x^2 = -1$`,
      tipps: [
        r`f) Bring die Gleichung auf die Form $x^2 = \text{Zahl}$.`,
        r`Wie viele Zahlen ergeben quadriert 9? Und kann ein Quadrat negativ sein?`,
      ],
      schritte: [
        { t: r`f) $2x^2 = 18 \Leftrightarrow x^2 = 9$` },
        { t: r`$\Leftrightarrow x_1 = 3,\ x_2 = -3$, also $\mathbb{L} = \{-3; 3\}$`, w: r`Beim Wurzelziehen entstehen zwei Lösungen, denn auch $(-3)^2 = 9$.` },
        { t: r`l) $x^2 = -1$ hat keine reelle Lösung, also $\mathbb{L} = \{\,\}$`, w: r`Das Quadrat einer reellen Zahl ist nie negativ.` },
      ],
      ergebnis: r`f) $\mathbb{L} = \{-3; 3\}$ $\quad$ l) $\mathbb{L} = \{\,\}$`,
      fehler: [
        r`f) Nur $x = 3$ angeben und die negative Lösung vergessen.`,
        r`l) „Geht nicht“ schreiben, ohne die Lösungsmenge anzugeben. Die leere Menge ist die Antwort.`,
      ],
    },

    // ---------------- Aufgabe 2 ----------------
    {
      id: 'ue01-a2a-werte',
      typ: 'aufgabe',
      thema: 'Geraden',
      quelle: 'Übung 1, Aufgabe 2 a (i), (ii)',
      herkunft: 'offiziell',
      frage: r`Gegeben ist $f: \mathbb{R} \to \mathbb{R},\ f(x) = -\dfrac{1}{4}x + \dfrac{3}{2}$.
(i) Bestimme den Funktionswert an der Stelle $x = 2$.
(ii) An welcher Stelle nimmt die Funktion den Wert $\dfrac{1}{4}$ an?`,
      tipps: [
        r`„Stelle“ meint einen $x$-Wert, „Funktionswert“ oder „Wert“ meint einen $y$-Wert.`,
        r`(i) $x = 2$ einsetzen. (ii) $f(x) = \frac{1}{4}$ setzen und nach $x$ auflösen.`,
      ],
      schritte: [
        { t: r`(i) $f(2) = -\dfrac{1}{4} \cdot 2 + \dfrac{3}{2} = -\dfrac{1}{2} + \dfrac{3}{2} = 1$`, w: r`Die Stelle ist gegeben, also einsetzen.` },
        { t: r`(ii) $-\dfrac{1}{4}x + \dfrac{3}{2} = \dfrac{1}{4}$`, w: r`Der Wert ist gegeben, gesucht ist die Stelle. Also Gleichung aufstellen.` },
        { t: r`$\Leftrightarrow -\dfrac{1}{4}x = -\dfrac{5}{4}$`, w: r`Auf beiden Seiten $\frac{3}{2} = \frac{6}{4}$ abziehen: $\frac{1}{4} - \frac{6}{4} = -\frac{5}{4}$.` },
        { t: r`$\Leftrightarrow x = 5$`, w: r`Mit $-4$ multiplizieren.` },
      ],
      ergebnis: r`(i) $f(2) = 1$ $\quad$ (ii) $x = 5$`,
      fehler: [
        r`Stelle und Wert verwechseln: bei (ii) $f\!\left(\frac{1}{4}\right)$ berechnen.`,
      ],
    },
    {
      id: 'ue01-a2a-skizze',
      typ: 'aufgabe',
      thema: 'Geraden',
      quelle: 'Übung 1, Aufgabe 2 a (iii)',
      herkunft: 'claude',
      rezept: 'vl02-zeichnen',
      frage: r`Skizziere den Graphen von $f(x) = -\dfrac{1}{4}x + \dfrac{3}{2}$ in einem kartesischen Koordinatensystem.`,
      tipps: [
        r`Zwei Punkte genügen für eine Gerade. Einen kennst du sofort: den $y$-Achsenabschnitt.`,
        r`$m = -\frac{1}{4}$ bedeutet: 4 nach rechts, 1 nach unten.`,
      ],
      schritte: [
        { t: r`$y$-Achsenabschnitt: $b = \dfrac{3}{2}$, also Punkt $(0; 1{,}5)$` },
        { t: r`Steigungsdreieck: $m = -\dfrac{1}{4}$, also 4 nach rechts und 1 nach unten. Das führt zu $(4; 0{,}5)$.` },
        { t: r`Gerade durch beide Punkte zeichnen. Kontrolle: $f(2) = 1$ aus Teil (i), der Punkt $(2; 1)$ liegt auf der Geraden.` },
      ],
      plotLoesung: {
        x: [-3.4, 7.4], y: [-1.2, 3.2], u: 34,
        fns: [{ f: (x) => -0.25 * x + 1.5 }],
        segments: [{ from: [0, 1.5], to: [4, 1.5] }, { from: [4, 1.5], to: [4, 0.5] }],
        points: [[0, 1.5], [4, 0.5], [2, 1]],
        labels: [{ at: [2, 1.9], text: '4' }, { at: [4.35, 1], text: '1' }],
        alt: 'Fallende Gerade durch (0; 1,5), (2; 1) und (4; 0,5) mit Steigungsdreieck',
      },
      ergebnis: r`Fallende Gerade durch $(0; 1{,}5)$ und $(4; 0{,}5)$. Sie schneidet die $x$-Achse bei $x = 6$.`,
      fehler: [
        r`Das Steigungsdreieck nach oben statt nach unten zeichnen.`,
      ],
    },
    {
      id: 'ue01-a2b-parallel',
      typ: 'aufgabe',
      thema: 'Geraden',
      quelle: 'Übung 1, Aufgabe 2 b',
      herkunft: 'offiziell',
      frage: r`Bestimme die Funktionsvorschrift der Geraden, die parallel zur Geraden $f(x) = -\dfrac{1}{4}x + \dfrac{3}{2}$ verläuft und durch den Punkt $(3; 1)$ geht.`,
      tipps: [
        r`Was haben parallele Geraden gemeinsam?`,
        r`Die Steigung kennst du damit schon. Setze den Punkt $(3; 1)$ in $y = mx + b$ ein, um $b$ zu bestimmen.`,
      ],
      schritte: [
        { t: r`Parallel bedeutet gleiche Steigung: $m = -\dfrac{1}{4}$`, w: r`Parallele Geraden unterscheiden sich nur im $y$-Achsenabschnitt.` },
        { t: r`Punkt $(3; 1)$ einsetzen: $1 = -\dfrac{1}{4} \cdot 3 + b \Leftrightarrow b = 1 + \dfrac{3}{4} = \dfrac{7}{4}$` },
        { t: r`$g(x) = -\dfrac{1}{4}x + \dfrac{7}{4}$` },
      ],
      ergebnis: r`$g(x) = -\dfrac{1}{4}x + \dfrac{7}{4}$`,
      fehler: [
        r`Auch $b = \frac{3}{2}$ übernehmen: Dann wäre es dieselbe Gerade, und sie ginge nicht durch $(3; 1)$.`,
      ],
    },
    {
      id: 'ue01-a2c-zwei-punkte',
      typ: 'aufgabe',
      thema: 'Geraden',
      quelle: 'Übung 1, Aufgabe 2 c',
      herkunft: 'offiziell',
      rezept: 'vl02-zwei-punkte-rezept',
      frage: r`Bestimme die Funktionsvorschrift der affin-linearen Funktion mit den Wertepaaren $(-1; 3)$ und $(3; 7)$.`,
      tipps: [
        r`Erst die Steigung aus den beiden Punkten, dann $b$ durch Einsetzen eines Punktes.`,
        r`$m = \dfrac{7 - 3}{3 - (-1)}$`,
      ],
      schritte: [
        { t: r`$m = \dfrac{7 - 3}{3 - (-1)} = \dfrac{4}{4} = 1$` },
        { t: r`Punkt $(-1; 3)$ einsetzen: $1 \cdot (-1) + b = 3 \Leftrightarrow b = 4$` },
        { t: r`$f(x) = x + 4$`, w: r`Probe mit dem zweiten Punkt: $f(3) = 3 + 4 = 7$ ✓` },
      ],
      ergebnis: r`$f(x) = x + 4$`,
      fehler: [
        r`Im Nenner $3 - 1 = 2$ rechnen statt $3 - (-1) = 4$.`,
      ],
    },
    {
      id: 'ue01-a2d-schnittpunkt',
      typ: 'aufgabe',
      thema: 'Geraden',
      quelle: 'Übung 1, Aufgabe 2 d',
      herkunft: 'offiziell',
      rezept: 'vl02-schnittpunkt-rezept',
      frage: r`Bestimme den Schnittpunkt der Geraden $f(x) = -\dfrac{1}{4}x + \dfrac{3}{2}$ und $g(x) = x + 4$.`,
      tipps: [
        r`Gleichsetzen: $f(x) = g(x)$.`,
        r`Bring alle $x$ auf eine Seite: $-\frac{1}{4}x - x = -\frac{5}{4}x$.`,
        r`Setze das gefundene $x$ in die einfachere Funktion ein, um $y$ zu erhalten.`,
      ],
      schritte: [
        { t: r`$-\dfrac{1}{4}x + \dfrac{3}{2} = x + 4$`, w: r`Im Schnittpunkt stimmen die Funktionswerte überein.` },
        { t: r`$\Leftrightarrow -\dfrac{5}{4}x = \dfrac{5}{2}$`, w: r`Auf beiden Seiten $x$ und $\frac{3}{2}$ abziehen: $4 - \frac{3}{2} = \frac{5}{2}$.` },
        { t: r`$\Leftrightarrow x = -2$`, w: r`Mit $-\frac{4}{5}$ multiplizieren: $\frac{5}{2} \cdot \left(-\frac{4}{5}\right) = -2$.` },
        { t: r`$y = g(-2) = -2 + 4 = 2$`, w: r`Probe: $f(-2) = \frac{1}{2} + \frac{3}{2} = 2$ ✓` },
        { t: r`Schnittpunkt: $S(-2; 2)$` },
      ],
      ergebnis: r`$S(-2; 2)$`,
      fehler: [
        r`$-\frac{1}{4}x - x = -\frac{1}{4}$ oder $-\frac{2}{4}x$ rechnen: $x$ ist $\frac{4}{4}x$.`,
        r`Die $y$-Koordinate vergessen.`,
      ],
    },
    {
      id: 'ue01-a2e-ablesen',
      typ: 'aufgabe',
      thema: 'Geraden',
      quelle: 'Übung 1, Aufgabe 2 e',
      herkunft: 'offiziell',
      rezept: 'vl02-ablesen-rezept',
      frage: r`Die Abbildung zeigt den Graphen einer affin-linearen Funktion. Bestimme ihre Funktionsvorschrift.`,
      plot: {
        x: [-3.6, 2.6], y: [-4.1, 4.6], grid: 0.5, u: 40,
        fns: [{ f: (x) => -2 * x - 1.5, from: -3, to: 1.25 }],
        alt: 'Fallende Gerade, die die y-Achse bei −1,5 schneidet und pro Einheit nach rechts um 2 fällt',
      },
      tipps: [
        r`Lies den $y$-Achsenabschnitt ab. Er liegt zwischen zwei ganzen Zahlen.`,
        r`Geh von einem gut ablesbaren Punkt genau 1 nach rechts. Um wie viel fällt die Gerade?`,
      ],
      schritte: [
        { t: r`$y$-Achsenabschnitt ablesen: $b = -1{,}5$` },
        { t: r`Steigungsdreieck, z. B. von $(-1; 0{,}5)$ nach $(0; -1{,}5)$: 1 nach rechts, 2 nach unten, also $m = \dfrac{-2}{1} = -2$` },
        { t: r`$f(x) = -2x - 1{,}5$`, w: r`Kontrolle mit einem weiteren Punkt: $f(-2) = 4 - 1{,}5 = 2{,}5$ ✓` },
      ],
      ergebnis: r`$f(x) = -2x - 1{,}5$`,
      fehler: [
        r`$b = -1$ oder $b = -2$ ablesen: Das Gitter hat halbe Schritte.`,
        r`Die Nullstelle (bei $x = -0{,}75$) mit dem $y$-Achsenabschnitt verwechseln.`,
      ],
    },

    // ---------------- Aufgabe 3 ----------------
    {
      id: 'ue01-a3a',
      typ: 'verstaendnis',
      thema: 'Funktionsbegriff',
      quelle: 'Übung 1, Aufgabe 3 a',
      herkunft: 'claude',
      frage: r`Handelt es sich um eine Funktion? $\quad f: \mathbb{R} \to \mathbb{R},\ f(x) = \sqrt{x}$`,
      optionen: FUNKTION_OPTIONEN,
      optionenFest: true,
      richtig: 1,
      erklaerung: r`Für negative $x$ ist $\sqrt{x}$ im Reellen nicht definiert, z. B. $f(-1) = \sqrt{-1}$. Negative Zahlen liegen aber in $D = \mathbb{R}$. Mit $D = [0;\infty)$ wäre es eine Funktion.`,
    },
    {
      id: 'ue01-a3b',
      typ: 'verstaendnis',
      thema: 'Funktionsbegriff',
      quelle: 'Übung 1, Aufgabe 3 b',
      herkunft: 'claude',
      frage: r`Handelt es sich um eine Funktion? $\quad f: [-3;3] \to [0;\infty),\ f(x) = \sqrt{9 - x^2}$`,
      optionen: FUNKTION_OPTIONEN,
      optionenFest: true,
      richtig: 0,
      erklaerung: r`Für $x \in [-3;3]$ gilt $x^2 \le 9$, also $9 - x^2 \ge 0$: Die Wurzel ist überall auf $D$ definiert. Eine Wurzel ist nie negativ, also liegen alle Werte in $[0;\infty)$. Und zu jedem $x$ gibt es genau einen Wert. Der Graph ist der obere Halbkreis mit Radius 3.`,
    },
    {
      id: 'ue01-a3c',
      typ: 'verstaendnis',
      thema: 'Funktionsbegriff',
      quelle: 'Übung 1, Aufgabe 3 c',
      herkunft: 'claude',
      frage: r`Handelt es sich um eine Funktion? $\quad f: \{1, 2, 3\} \to \{2, 3, 4\},\ f(x) = x + 1$`,
      optionen: FUNKTION_OPTIONEN,
      optionenFest: true,
      richtig: 0,
      erklaerung: r`$D$ hat nur drei Elemente, die man alle prüfen kann: $f(1) = 2$, $f(2) = 3$, $f(3) = 4$. Alle drei Werte liegen in $Z = \{2, 3, 4\}$, und die Zuordnung ist eindeutig.`,
    },
    {
      id: 'ue01-a3d',
      typ: 'verstaendnis',
      thema: 'Funktionsbegriff',
      quelle: 'Übung 1, Aufgabe 3 d',
      herkunft: 'claude',
      frage: r`Handelt es sich um eine Funktion? $\quad f: \mathbb{R} \to [0;\infty),\ f(x) = x^2 - 1$`,
      optionen: FUNKTION_OPTIONEN,
      optionenFest: true,
      richtig: 2,
      erklaerung: r`Zum Beispiel ist $f(0) = -1$, und $-1$ liegt nicht in $Z = [0;\infty)$. Ein einziges Gegenbeispiel genügt als Begründung. Mit $Z = [-1;\infty)$ oder $Z = \mathbb{R}$ wäre es eine Funktion.`,
    },
    {
      id: 'ue01-a3e',
      typ: 'verstaendnis',
      thema: 'Funktionsbegriff',
      quelle: 'Übung 1, Aufgabe 3 e',
      herkunft: 'claude',
      frage: r`Handelt es sich um eine Funktion? $\quad f: [0;\infty) \to \mathbb{R},\ f(x) = \pm\sqrt{x}$`,
      optionen: FUNKTION_OPTIONEN,
      optionenFest: true,
      richtig: 3,
      erklaerung: r`Wegen $\pm$ gehören zu jedem $x > 0$ zwei Werte, z. B. zu $x = 4$ die Werte $2$ und $-2$. Eine Funktion muss jedem $x$ genau einen Wert zuordnen.`,
    },

    // ---------------- Aufgabe 4 ----------------
    {
      id: 'ue01-a4-kosten',
      typ: 'aufgabe',
      thema: 'Geraden',
      quelle: 'Übung 1, Aufgabe 4',
      herkunft: 'claude',
      rezept: 'vl02-zwei-punkte-rezept',
      frage: r`Fixkosten fallen unabhängig von der produzierten Menge an, variable Kosten hängen linear von der Stückzahl ab. Ein Möbelhersteller benötigt bei einer Monatsproduktion von 800 Stühlen insgesamt 102 200 € und bei 3500 Stühlen 342 500 €.
Wie hoch sind die Fixkosten, und wie hoch sind die variablen Herstellungskosten pro Stuhl?`,
      tipps: [
        r`Die Gesamtkosten sind eine affin-lineare Funktion der Stückzahl: $K(x) = mx + b$. Was bedeuten $m$ und $b$ hier?`,
        r`Die Angaben sind zwei Punkte auf der Geraden: $(800; 102\,200)$ und $(3500; 342\,500)$.`,
        r`$m = \dfrac{342\,500 - 102\,200}{3500 - 800}$. Danach einen Punkt einsetzen, um $b$ zu bestimmen.`,
      ],
      schritte: [
        { t: r`$x$: Anzahl der Stühle pro Monat, $K(x)$: Gesamtkosten in €. Ansatz: $K(x) = mx + b$`, w: r`$b$ sind die Fixkosten (fallen auch bei $x = 0$ an), $m$ sind die variablen Kosten pro Stuhl.` },
        { t: r`$m = \dfrac{342\,500 - 102\,200}{3500 - 800} = \dfrac{240\,300}{2700} = 89$`, w: r`2700 Stühle mehr kosten 240 300 € mehr. Die Fixkosten fallen bei der Differenz heraus.` },
        { t: r`Punkt $(800; 102\,200)$ einsetzen: $102\,200 = 89 \cdot 800 + b \Leftrightarrow b = 102\,200 - 71\,200 = 31\,000$` },
        { t: r`Probe: $K(3500) = 89 \cdot 3500 + 31\,000 = 311\,500 + 31\,000 = 342\,500$ ✓` },
        { t: r`Antwort: Die Fixkosten betragen 31 000 €, die variablen Herstellungskosten 89 € pro Stuhl.` },
      ],
      ergebnis: r`Fixkosten: $31\,000$ € $\quad$ variable Kosten: $89$ € pro Stuhl`,
      fehler: [
        r`$102\,200 : 800$ rechnen: Das wären die Durchschnittskosten pro Stuhl, darin stecken die Fixkosten mit drin.`,
        r`Den Antwortsatz mit Einheiten weglassen.`,
      ],
    },
  ],

  formelblatt: [
    {
      id: 'fb-binomische-formeln',
      titel: 'Binomische Formeln',
      inhalt: r`$(a \pm b)^2 = a^2 \pm 2ab + b^2$, $\ (a + b)(a - b) = a^2 - b^2$`,
    },
  ],
};
