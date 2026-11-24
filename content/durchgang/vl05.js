// Vorlesung 5 (26.10.2026) durchgehen: Potenzgesetze, Exponentialfunktionen, Logarithmus
const r = String.raw;

export default {
  unit: 'vl05',
  abschnitte: [
    {
      id: 'vl05-d01',
      folien: '3',
      titel: 'Potenzgesetze',
      folie: r`Für $a, b \ne 0$ und $m, n \in \mathbb{Z}$:
- $a^m \cdot a^n = a^{m+n}$, $\frac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{m \cdot n}$
- $a^n \cdot b^n = (a \cdot b)^n$, $\frac{a^n}{b^n} = \left(\frac{a}{b}\right)^n$

Festlegungen: $a^0 = 1$, $a^{-n} = \frac{1}{a^n}$, $a^{\frac{1}{n}} = \sqrt[n]{a}$, $a^{\frac{m}{n}} = \sqrt[n]{a^m}$`,
      kern: r`Diese Gesetze braucht man ständig: beim Umformen von Exponentialgleichungen und später beim Ableiten ($\frac{1}{x^3} = x^{-3}$).`,
      check: { frage: r`Schreibe $\frac{1}{\sqrt{x}}$ als Potenz.`, antwort: r`$x^{-\frac{1}{2}}$` },
      karten: ['vl05-potenzgesetze', 'vl05-potenz-festlegungen', 'vl05-potenz-mc'],
    },
    {
      id: 'vl05-d02',
      folien: '4–5',
      titel: r`Exponentialfunktionen: $2^x$ und $0{,}5^x$`,
      folie: r`$f(x) = a^x$ mit $a \in (0; \infty)$ heißt Exponentialfunktion zur Basis $a$.

Beispiele: $f(x) = 2^x$ und $g(x) = 0{,}5^x$`,
      notizen: [
        { t: r`Wertetabelle für $f(x) = 2^x$: $x = -3, -2, -1, 0, 1, 2, 3$ ergibt $\frac{1}{8}, \frac{1}{4}, \frac{1}{2}, 1, 2, 4, 8$.`, w: r`Negative Exponenten ergeben Brüche: $2^{-3} = \frac{1}{2^3} = \frac{1}{8}$.` },
        { t: r`Wertetabelle für $g(x) = 0{,}5^x$: $8, 4, 2, 1, 0{,}5 = \frac{1}{2}, 0{,}25 = \frac{1}{4}, 0{,}125 = \frac{1}{8}$.`, w: r`Genau die umgekehrte Reihenfolge, denn $0{,}5^x = \left(\frac{1}{2}\right)^x = 2^{-x}$.` },
        { t: r`Beide Graphen gehen durch $(0 \mid 1)$. $f$ wächst, $g$ fällt. Sie sind Spiegelbilder an der y-Achse.`, w: r`$g(x) = f(-x)$.` },
      ],
      plot: {
        x: [-3.3, 3.3], y: [-0.5, 8.5], u: 36,
        fns: [{ f: (x) => 2 ** x }, { f: (x) => 0.5 ** x }],
        points: [[0, 1], [1, 2], [2, 4], [3, 8], [-1, 2], [-2, 4], [-3, 8]],
        labels: [{ at: [2.6, 7.6], text: '2ˣ' }, { at: [-2.5, 7.6], text: '0,5ˣ' }],
        alt: 'Graphen von 2 hoch x und 0,5 hoch x',
      },
      kern: r`$a > 1$: wachsend, $0 < a < 1$: fallend. Immer durch $(0 \mid 1)$, immer positiv.`,
      karten: ['vl05-exp-def'],
    },
    {
      id: 'vl05-d03',
      folien: '6–9',
      titel: 'Eigenschaften, Zinseszins und die Zahl $e$',
      folie: r`Für $f(x) = a^x$, $a \ne 1$: $f(0) = 1$, $f(1) = a$, $f(x) > 0$ (keine Nullstellen), weder gerade noch ungerade. $a > 1$: wachsend, links Annäherung an die x-Achse.

Zinseszins: $K(t) = K_0 \cdot \left(1 + \frac{p}{100}\right)^t$

Eulersche Zahl: $e = \lim\limits_{n \to \infty}\left(1 + \frac{1}{n}\right)^n = 2{,}71828\ldots$`,
      kern: r`Exponentialfunktionen haben **keine** Nullstellen. Die Basis $e \approx 2{,}718$ ist die wichtigste.`,
      karten: ['vl05-exp-eigenschaften', 'vl05-zinseszins', 'vl05-euler'],
    },
    {
      id: 'vl05-d04',
      folien: '10',
      titel: 'Verschobene Exponentialfunktion: $e^x - 2$',
      folie: r`Graph einer nach unten verschobenen e-Funktion.`,
      notizen: [
        { t: r`$f: \mathbb{R} \to \mathbb{R}$, $f(x) = e^x - 2$. „Hier gibt es eine Nullstelle.“`, w: r`Um 2 nach unten verschoben, schneidet der Graph jetzt die x-Achse.` },
        { t: r`$f(x) = 0 \iff e^x - 2 = 0 \quad | +2 \iff e^x = 2$`, w: r`` },
        { t: r`„Hier wird der Logarithmus benötigt!“`, w: r`Welche Zahl muss in den Exponenten, damit $e^x = 2$ ist? Das beantwortet erst der Logarithmus: $x = \ln(2) \approx 0{,}69$.` },
      ],
      plot: {
        x: [-4.3, 2.4], y: [-2.5, 6], u: 34,
        fns: [{ f: (x) => Math.exp(x) - 2 }],
        segments: [{ from: [-4.3, -2], to: [2.4, -2] }],
        points: [[Math.log(2), 0]],
        alt: 'Graph von e hoch x minus 2 mit Asymptote y = −2 und Nullstelle bei ln 2',
      },
      kern: r`Um $x$ aus dem Exponenten zu holen, braucht man den Logarithmus.`,
    },
    {
      id: 'vl05-d05',
      folien: '11–13',
      titel: 'Logarithmus: Definition und Beispiele',
      folie: r`$\log_a(b) = c \iff a^c = b$ (für $a > 0$, $a \ne 1$, $b > 0$). Der Logarithmus ist die Zahl, mit der man $a$ potenzieren muss, um $b$ zu erhalten. Es gilt $\log_a(a^c) = c$ und $a^{\log_a(b)} = b$.

Natürlicher Logarithmus: $\ln(b) = \log_e(b)$`,
      notizen: [
        { t: r`1) $\log_5(25) = 2$, denn $5^2 = 25$`, w: r`Frage immer: „5 hoch wie viel ist 25?“` },
        { t: r`2) $\log_2(8) = 3$, denn $2^3 = 8$`, w: r`` },
        { t: r`3) $\log_4(1) = 0$, denn $4^0 = 1$`, w: r`Der Logarithmus von 1 ist zu jeder Basis 0.` },
        { t: r`4) $\log_1(4)$ ↯`, w: r`Nicht definiert: $1^c = 1$ für jedes $c$, nie 4. Deshalb ist die Basis 1 verboten.` },
        { t: r`5) $\log_{16}(4) = \frac{1}{2}$, denn $16^{\frac{1}{2}} = \sqrt{16} = 4$`, w: r`Hoch $\frac{1}{2}$ ist die Wurzel.` },
        { t: r`6) $\log_2\left(\frac{1}{4}\right) = -2$, denn $2^{-2} = \frac{1}{2^2} = \frac{1}{4}$`, w: r`Brüche ergeben negative Logarithmen.` },
        { t: r`7) $\ln(e) = 1$, denn $e^1 = e$`, w: r`` },
      ],
      kern: r`$\log_a(b)$ beantwortet: „$a$ hoch wie viel ergibt $b$?“`,
      check: { frage: r`$\log_3\left(\frac{1}{9}\right) = ?$`, antwort: r`$-2$, denn $3^{-2} = \frac{1}{9}$.` },
      karten: ['vl05-log-def', 'vl05-ln', 'vl05-log-werte', 'vl05-log-basis1-mc'],
    },
    {
      id: 'vl05-d06',
      folien: '14',
      titel: 'Logarithmengesetze',
      folie: r`Für $a > 0$, $a \ne 1$, $b \in \mathbb{R}$, $x, y > 0$:
- $\log_a(x \cdot y) = \log_a(x) + \log_a(y)$
- $\log_a\left(\frac{x}{y}\right) = \log_a(x) - \log_a(y)$
- $\log_a(x^b) = b \cdot \log_a(x)$`,
      notizen: [
        { t: r`„Achtung: Es gibt z. B. kein Logarithmengesetz für $\log_a(x + y)$!“`, w: r`Ein häufiger Klausurfehler: $\log(x + y)$ ist **nicht** $\log(x) + \log(y)$. Das gilt nur für ein Produkt im Argument.` },
      ],
      kern: r`Produkt wird Summe, Quotient wird Differenz, Exponent wird Faktor. Für Summen im Argument gibt es nichts.`,
      karten: ['vl05-loggesetze', 'vl05-loggesetz-mc'],
    },
    {
      id: 'vl05-d07',
      folien: '15–18',
      titel: r`Logarithmusfunktion am Beispiel $\log_2(x)$`,
      folie: r`$f: (0; \infty) \to \mathbb{R}$, $f(x) = \log_a(x)$ mit $a \in (0; \infty) \setminus \{1\}$.

Eigenschaften: $f(a) = 1$, genau eine Nullstelle $x_0 = 1$, weder gerade noch ungerade. $a > 1$: wachsend, für $x \to 0$ gegen $-\infty$.`,
      notizen: [
        { t: r`Wertetabelle für $\log_2(x)$: $x = \frac{1}{4}, \frac{1}{2}, 1, 2, 4, 8$ ergibt $-2, -1, 0, 1, 2, 3$.`, w: r`Das ist die Tabelle von $2^x$ mit vertauschten Spalten: Der Logarithmus ist die Umkehrfunktion.` },
        { t: r`Die Punkte werden eingetragen und verbunden: Der Graph steigt immer langsamer und stürzt bei $x \to 0$ nach unten.`, w: r`` },
      ],
      plot: {
        x: [-0.5, 9.3], y: [-2.5, 3.5], u: 32,
        fns: [{ f: (x) => Math.log2(x), from: 0.2, to: 9.3 }],
        points: [[0.25, -2], [0.5, -1], [1, 0], [2, 1], [4, 2], [8, 3]],
        alt: 'Graph von log zur Basis 2 mit den Punkten aus der Wertetabelle',
      },
      kern: r`$\log_a(x)$ ist nur für $x > 0$ definiert, hat die Nullstelle 1 und ist die Umkehrung von $a^x$.`,
      karten: ['vl05-logfkt-def', 'vl05-logfkt-eigenschaften'],
    },
  ],
};
