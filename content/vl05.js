// Vorlesung 05 (26.10.2026): Potenzgesetze, Exponential- und Logarithmusfunktionen
const r = String.raw;

export default {
  id: 'vl05',
  art: 'vorlesung',
  nummer: 5,
  datum: '2026-10-26',
  titel: 'Exponential- und Logarithmusfunktionen',
  ueberblick: r`Potenzgesetze, Exponentialfunktionen $a^x$ und ihre Eigenschaften, Zinseszins, die Eulersche Zahl $e$, der Logarithmus als Umkehrung des Potenzierens, Logarithmengesetze und Logarithmusfunktionen.`,

  karten: [
    {
      id: 'vl05-potenzgesetze',
      typ: 'formel',
      thema: 'Potenzen',
      quelle: 'VL 5, Folie 3',
      frage: r`Wie lauten die fünf Potenzgesetze?`,
      antwort: r`Für $a, b \ne 0$ und $m, n \in \mathbb{Z}$:
- $a^m \cdot a^n = a^{m+n}$
- $\dfrac{a^m}{a^n} = a^{m-n}$
- $(a^m)^n = a^{m \cdot n}$
- $a^n \cdot b^n = (a \cdot b)^n$
- $\dfrac{a^n}{b^n} = \left(\dfrac{a}{b}\right)^n$`,
      merke: r`Gleiche Basis: Exponenten addieren bzw. subtrahieren. Gleicher Exponent: Basen multiplizieren bzw. dividieren.`,
    },
    {
      id: 'vl05-potenz-festlegungen',
      typ: 'formel',
      thema: 'Potenzen',
      quelle: 'VL 5, Folie 3',
      frage: r`Was bedeuten $a^0$, $a^{-n}$, $a^{\frac{1}{n}}$ und $a^{\frac{m}{n}}$?`,
      antwort: r`- $a^0 = 1$
- $a^{-n} = \dfrac{1}{a^n}$
- $a^{\frac{1}{n}} = \sqrt[n]{a}$
- $a^{\frac{m}{n}} = \sqrt[n]{a^m} = \left(\sqrt[n]{a}\right)^m$`,
      merke: r`Negativer Exponent heißt Kehrwert, Bruch im Exponenten heißt Wurzel. Beispiel: $8^{\frac{2}{3}} = (\sqrt[3]{8})^2 = 4$.`,
    },
    {
      id: 'vl05-potenz-mc',
      typ: 'verstaendnis',
      thema: 'Potenzen',
      quelle: 'VL 5, Folie 3',
      herkunft: 'zusatz',
      frage: r`Was ergibt $\dfrac{(x^2)^3 \cdot x^{-1}}{x^4}$?`,
      optionen: [r`$x$`, r`$x^{0}$`, r`$x^{3}$`, r`$x^{-2}$`],
      richtig: 0,
      erklaerung: r`$(x^2)^3 = x^6$, dann $x^6 \cdot x^{-1} = x^5$ und $\frac{x^5}{x^4} = x^1 = x$.`,
    },
    {
      id: 'vl05-exp-def',
      typ: 'definition',
      thema: 'Exponentialfunktion',
      quelle: 'VL 5, Folie 4',
      frage: r`Was ist eine Exponentialfunktion zur Basis $a$?`,
      antwort: r`Eine Funktion $f: \mathbb{R} \to \mathbb{R}$, deren Vorschrift sich als

$$f(x) = a^x \quad \text{mit } a \in (0;\infty)$$

schreiben lässt. Die Variable steht im **Exponenten**.`,
      merke: r`Nicht verwechseln: $x^2$ ist eine Potenzfunktion (Variable in der Basis), $2^x$ eine Exponentialfunktion.`,
    },
    {
      id: 'vl05-exp-eigenschaften',
      typ: 'satz',
      thema: 'Exponentialfunktion',
      quelle: 'VL 5, Folien 5 und 6',
      frage: r`Welche Eigenschaften hat $f(x) = a^x$ mit $a > 0,\ a \ne 1$?`,
      antwort: r`- $f(0) = 1$ und $f(1) = a$
- $f(x) > 0$ für alle $x$, also **keine Nullstellen**
- weder gerade noch ungerade
- $a > 1$: wachsend, links Annäherung an die $x$-Achse, rechts gegen $\infty$
- $0 < a < 1$: fallend, rechts Annäherung an die $x$-Achse, links gegen $\infty$`,
      plotAntwort: {
        x: [-3.4, 3.4], y: [-0.6, 8.4], u: 34,
        fns: [{ f: (x) => 2 ** x }, { f: (x) => 0.5 ** x }],
        points: [[0, 1], [1, 2], [-1, 2]],
        alt: 'Graphen von 2 hoch x (steigend) und 0,5 hoch x (fallend), beide schneiden die y-Achse bei 1',
      },
      merke: r`Jeder Graph von $a^x$ geht durch $(0; 1)$.`,
    },
    {
      id: 'vl05-zinseszins',
      typ: 'formel',
      thema: 'Exponentialfunktion',
      quelle: 'VL 5, Folie 7',
      frage: r`Wie beschreibt man das Wachstum eines Startkapitals $K_0$ bei einem Zinssatz von $p\,\%$?`,
      antwort: r`$$K: [0;\infty) \to [0;\infty),\quad K(t) = K_0 \cdot \left(1 + \frac{p}{100}\right)^t$$

$t$ = Zeit in Jahren seit der Anlage, $K(t)$ = Kapital nach $t$ Jahren.`,
      merke: r`Der Faktor $1 + \frac{p}{100}$ ist die Basis. Bei 1,2 % also $1{,}012$.`,
    },
    {
      id: 'vl05-euler',
      typ: 'definition',
      thema: 'Exponentialfunktion',
      quelle: 'VL 5, Folien 8 und 9',
      frage: r`Was ist die Eulersche Zahl $e$?`,
      antwort: r`Eine häufig verwendete Basis für Exponentialfunktionen, z. B. definiert als

$$e := \lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n$$

$e$ ist irrational, $e = 2{,}71828\ldots$. Der Graph von $f(x) = e^x$ verläuft zwischen dem von $2^x$ und dem von $3^x$.`,
    },
    {
      id: 'vl05-log-def',
      typ: 'definition',
      thema: 'Logarithmus',
      quelle: 'VL 5, Folie 11',
      frage: r`Was ist der Logarithmus $\log_a(b)$?`,
      antwort: r`Für $a > 0,\ a \ne 1$ und $b > 0$ ist $\log_a(b)$ diejenige Zahl $c$, mit der man $a$ potenzieren muss, um $b$ zu erhalten:

$$\log_a(b) = c \;\Leftrightarrow\; a^c = b$$

Es folgt: $\log_a(a^c) = c$ und $a^{\log_a(b)} = b$.`,
      merke: r`Frage dich immer: „$a$ hoch wie viel ergibt $b$?“`,
    },
    {
      id: 'vl05-ln',
      typ: 'definition',
      thema: 'Logarithmus',
      quelle: 'VL 5, Folie 12',
      frage: r`Was ist der natürliche Logarithmus?`,
      antwort: r`Der Logarithmus zur Basis $e$:

$$\ln(b) = \log_e(b)$$`,
      merke: r`$\ln(e) = 1$, $\ln(1) = 0$ und $\ln(e^x) = x$.`,
    },
    {
      id: 'vl05-log-werte',
      typ: 'aufgabe',
      thema: 'Logarithmus',
      quelle: 'VL 5, Folie 13',
      herkunft: 'vorlesung',
      rezept: 'vl05-log-def',
      frage: r`Berechne ohne Taschenrechner:
a) $\log_5(25)$ $\quad$ b) $\log_2(8)$ $\quad$ c) $\log_4(1)$ $\quad$ d) $\log_{16}(4)$ $\quad$ e) $\log_2\left(\frac{1}{4}\right)$ $\quad$ f) $\ln(e)$`,
      tipps: [
        r`Übersetze jeweils: „Basis hoch wie viel ergibt das Argument?“`,
        r`d) $4 = \sqrt{16}$. e) $\frac{1}{4} = 2^{-2}$.`,
      ],
      schritte: [
        { t: r`a) $\log_5(25) = 2$, denn $5^2 = 25$` },
        { t: r`b) $\log_2(8) = 3$, denn $2^3 = 8$` },
        { t: r`c) $\log_4(1) = 0$, denn $4^0 = 1$` },
        { t: r`d) $\log_{16}(4) = \frac{1}{2}$, denn $16^{\frac{1}{2}} = \sqrt{16} = 4$` },
        { t: r`e) $\log_2\left(\frac{1}{4}\right) = -2$, denn $2^{-2} = \frac{1}{2^2} = \frac{1}{4}$` },
        { t: r`f) $\ln(e) = 1$, denn $e^1 = e$` },
      ],
      ergebnis: r`a) 2 $\quad$ b) 3 $\quad$ c) 0 $\quad$ d) $\frac{1}{2}$ $\quad$ e) $-2$ $\quad$ f) 1`,
      fehler: [
        r`$\log_1(4)$ ausrechnen wollen: Die Basis 1 ist nicht erlaubt, denn $1^c$ ist immer 1.`,
      ],
    },
    {
      id: 'vl05-log-basis1-mc',
      typ: 'verstaendnis',
      thema: 'Logarithmus',
      quelle: 'VL 5, Folie 13, Beispiel 4',
      herkunft: 'vorlesung',
      frage: r`Was ist $\log_1(4)$?`,
      optionen: [r`$4$`, r`$0$`, r`$1$`, r`Nicht definiert`],
      richtig: 3,
      erklaerung: r`Gesucht wäre $c$ mit $1^c = 4$. Aber $1^c = 1$ für jedes $c$. Deshalb ist die Basis $a = 1$ beim Logarithmus ausgeschlossen.`,
    },
    {
      id: 'vl05-loggesetze',
      typ: 'formel',
      thema: 'Logarithmus',
      quelle: 'VL 5, Folie 14',
      frage: r`Wie lauten die drei Logarithmengesetze?`,
      antwort: r`Für $a > 0,\ a \ne 1,\ b \in \mathbb{R}$ und $x, y > 0$:
- $\log_a(x \cdot y) = \log_a(x) + \log_a(y)$
- $\log_a\left(\dfrac{x}{y}\right) = \log_a(x) - \log_a(y)$
- $\log_a(x^b) = b \cdot \log_a(x)$`,
      merke: r`**Achtung:** Für $\log_a(x + y)$ gibt es **kein** Gesetz.`,
    },
    {
      id: 'vl05-loggesetz-mc',
      typ: 'verstaendnis',
      thema: 'Logarithmus',
      quelle: 'VL 5, Folie 14',
      herkunft: 'zusatz',
      frage: r`Welche Umformung ist **falsch**?`,
      optionen: [
        r`$\ln(3x) = \ln(3) + \ln(x)$`,
        r`$\ln(x^5) = 5\ln(x)$`,
        r`$\ln(x + 3) = \ln(x) + \ln(3)$`,
        r`$\ln\left(\frac{x}{2}\right) = \ln(x) - \ln(2)$`,
      ],
      richtig: 2,
      erklaerung: r`Für eine Summe im Argument gibt es kein Logarithmengesetz. Zum Gegencheck mit $x = 1$: $\ln(4) \approx 1{,}39$, aber $\ln(1) + \ln(3) \approx 1{,}10$.`,
    },
    {
      id: 'vl05-logfkt-def',
      typ: 'definition',
      thema: 'Logarithmus',
      quelle: 'VL 5, Folien 15 und 16',
      frage: r`Was ist eine Logarithmusfunktion, und was ist ihr Definitionsbereich?`,
      antwort: r`Eine Funktion $f: (0;\infty) \to \mathbb{R}$ mit $f(x) = \log_a(x)$ und $a \in (0;\infty) \setminus \{1\}$.

Der Logarithmus ist nur für **positive** Argumente definiert.`,
      plotAntwort: {
        x: [-0.6, 9.4], y: [-2.6, 3.4], u: 34,
        fns: [{ f: (x) => Math.log2(x), from: 0.05 }],
        points: [[0.25, -2], [0.5, -1], [1, 0], [2, 1], [4, 2], [8, 3]],
        alt: 'Graph von log zur Basis 2: geht durch (1; 0), (2; 1), (4; 2), (8; 3) und fällt für x gegen 0 steil ab',
      },
    },
    {
      id: 'vl05-logfkt-eigenschaften',
      typ: 'satz',
      thema: 'Logarithmus',
      quelle: 'VL 5, Folie 17',
      frage: r`Welche Eigenschaften hat $f(x) = \log_a(x)$?`,
      antwort: r`- $f(a) = 1$
- genau eine Nullstelle: $x_0 = 1$
- weder gerade noch ungerade
- $a > 1$: wachsend, für $x \to 0$ gegen $-\infty$, rechts gegen $\infty$
- $0 < a < 1$: fallend, für $x \to 0$ gegen $\infty$, rechts gegen $-\infty$
- Der Graph entsteht aus dem von $a^x$ durch **Spiegelung an der ersten Winkelhalbierenden** ($y = x$).`,
      merke: r`Exponentialfunktion: keine Nullstelle, Schnitt mit der $y$-Achse bei 1. Logarithmus: Nullstelle bei 1, kein Schnitt mit der $y$-Achse.`,
    },
  ],

  formelblatt: [
    {
      id: 'fb-potenzgesetze',
      titel: 'Potenzgesetze',
      inhalt: r`$a^m a^n = a^{m+n}$, $\frac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$, $a^n b^n = (ab)^n$, $a^{-n} = \frac{1}{a^n}$, $a^{\frac{m}{n}} = \sqrt[n]{a^m}$, $a^0 = 1$`,
    },
    {
      id: 'fb-logarithmus',
      titel: 'Logarithmus',
      inhalt: r`$\log_a(b) = c \Leftrightarrow a^c = b$ $\ (a > 0, a \ne 1, b > 0)$; $\ \log_a(xy) = \log_a x + \log_a y$, $\log_a\frac{x}{y} = \log_a x - \log_a y$, $\log_a(x^b) = b\log_a x$. Kein Gesetz für $\log(x + y)$!`,
    },
    {
      id: 'fb-zinseszins',
      titel: 'Zinseszins',
      inhalt: r`$K(t) = K_0 \left(1 + \frac{p}{100}\right)^t$`,
    },
    {
      id: 'fb-exp-log-eigenschaften',
      titel: 'Exp/Log-Eigenschaften',
      standard: false,
      inhalt: r`$a^x$: immer $> 0$, Punkt $(0;1)$. $\ \log_a x$: nur $x > 0$, Nullstelle $x = 1$, Punkt $(a; 1)$.`,
    },
  ],
};
