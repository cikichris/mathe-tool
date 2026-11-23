// Übungsblatt 3 (Besprechung 03./06.11.2026): Potenzen, Logarithmen, Exponentialgleichungen
const r = String.raw;

export default {
  id: 'ue03',
  art: 'uebung',
  nummer: 3,
  datum: '2026-11-03',
  besprechung: ['2026-11-03', '2026-11-06'],
  titel: 'Logarithmen und Exponentialgleichungen',
  ueberblick: r`Aufgaben 1 bis 5 mit den offiziellen Lösungen aus campUAS. Aufgabe 6 (Besprechung in der Übung) ist von Claude gelöst.`,

  karten: [
    // ---------------- Aufgabe 1 ----------------
    {
      id: 'ue03-a1ab',
      typ: 'aufgabe',
      thema: 'Logarithmus',
      quelle: 'Übung 3, Aufgabe 1 a, b',
      herkunft: 'offiziell',
      rezept: 'vl05-loggesetze',
      frage: r`Vereinfache:
a) $\log_{10}\left(2^5 \cdot 5^5\right)$
b) $\log_v\left(\dfrac{(v^2)^3 \cdot v^6}{(v^3)^4}\right)$`,
      tipps: [
        r`a) Gleicher Exponent: $a^n \cdot b^n = (a \cdot b)^n$.`,
        r`b) Erst das Argument mit den Potenzgesetzen vereinfachen.`,
      ],
      schritte: [
        { t: r`a) $\log_{10}\left((2 \cdot 5)^5\right) = \log_{10}\left(10^5\right) = 5$`, q: r`VL 5, Folie 3 (Potenzgesetz): $a^n \cdot b^n = (a \cdot b)^n$. Dann VL 5, Folie 11: $\log_a(a^c) = c$ und $a^{\log_a(b)} = b$. Die Exponentialfunktion zur gleichen Basis hebt den Logarithmus auf (und umgekehrt).` },
        { t: r`b) $\log_v\left(\dfrac{v^6 \cdot v^6}{v^{12}}\right) = \log_v\left(\dfrac{v^{12}}{v^{12}}\right) = \log_v(1) = 0$`, q: r`VL 5, Folie 3 (Potenzgesetz): $(a^m)^n = a^{m \cdot n}$, VL 5, Folie 3 (Potenzgesetz): $a^m \cdot a^n = a^{m+n}$, also $a^{m+n} = a^m \cdot a^n$, VL 5, Folie 3 (Potenzgesetz): $\frac{a^m}{a^n} = a^{m-n}$, also $a^{m-n} = \frac{a^m}{a^n}$. Und $\log_v(1) = 0$, weil $v^0 = 1$ (VL 5, Folie 3).` },
      ],
      ergebnis: r`a) 5 $\quad$ b) 0`,
    },
    {
      id: 'ue03-a1cde',
      typ: 'aufgabe',
      thema: 'Logarithmus',
      quelle: 'Übung 3, Aufgabe 1 c, d, e',
      herkunft: 'offiziell',
      rezept: 'vl05-loggesetze',
      frage: r`Fasse zusammen:
c) $\log_r(2a^2) + \log_r(7b) - (\log_r(14c) + \log_r(b))$
d) $\log_z(x^5) + \log_z(x^7)$
e) $\log_4\left((l + k)^4\right) - \log_4\left(l^2 + 2lk + k^2\right)$`,
      tipps: [
        r`Plus wird zu Mal im Argument, Minus zu Geteilt.`,
        r`e) Erkennst du in $l^2 + 2lk + k^2$ eine binomische Formel?`,
      ],
      schritte: [
        { t: r`c) $\log_r\left(\dfrac{2a^2 \cdot 7b}{14c \cdot b}\right) = \log_r\left(\dfrac{a^2}{c}\right)$`, w: r`Die Klammer mit dem Minus davor gehört komplett in den Nenner.`, q: r`VL 5, Folie 14 (Logarithmengesetz): $\log_a(x \cdot y) = \log_a(x) + \log_a(y)$. VL 5, Folie 14 (Logarithmengesetz): $\log_a\left(\frac{x}{y}\right) = \log_a(x) - \log_a(y)$` },
        { t: r`d) $\log_z(x^5 \cdot x^7) = \log_z(x^{12}) = 12\log_z(x)$`, q: r`VL 5, Folie 14 (Logarithmengesetz): $\log_a(x \cdot y) = \log_a(x) + \log_a(y)$. VL 5, Folie 14 (Logarithmengesetz): $\log_a(x^b) = b \cdot \log_a(x)$` },
        { t: r`e) $l^2 + 2lk + k^2 = (l + k)^2$, also $\log_4\left(\dfrac{(l + k)^4}{(l + k)^2}\right) = \log_4\left((l + k)^2\right) = 2\log_4(l + k)$`, q: r`Binomische Formel (Schulwissen, nicht auf den Folien): $(a + b)^2 = a^2 + 2ab + b^2$. VL 5, Folie 14 (Logarithmengesetz): $\log_a\left(\frac{x}{y}\right) = \log_a(x) - \log_a(y)$. VL 5, Folie 14 (Logarithmengesetz): $\log_a(x^b) = b \cdot \log_a(x)$` },
      ],
      ergebnis: r`c) $\log_r\left(\frac{a^2}{c}\right)$ $\quad$ d) $12\log_z(x)$ $\quad$ e) $2\log_4(l + k)$`,
      fehler: [r`c) Nur $\log_r(14c)$ abziehen und $\log_r(b)$ addieren: Das Minus gilt für die ganze Klammer.`],
    },

    // ---------------- Aufgabe 2 ----------------
    {
      id: 'ue03-a2',
      typ: 'aufgabe',
      thema: 'Logarithmus',
      quelle: 'Übung 3, Aufgabe 2',
      herkunft: 'offiziell',
      rezept: 'vl05-log-def',
      frage: r`Berechne ohne Taschenrechner:
a) $\ln\left(e^{1{,}2}\right)$ $\quad$ b) $\log_9\left(\sqrt[3]{3}\right)$ $\quad$ c) $\log_4\left(2^{10}\right)$ $\quad$ d) $\log_8(2)$`,
      tipps: [
        r`Schreibe das Argument als Potenz der Basis.`,
        r`b) $3 = 9^{\frac{1}{2}}$. c) $2^{10} = (2^2)^5$. d) $2 = \sqrt[3]{8}$.`,
      ],
      schritte: [
        { t: r`a) $\ln(e^{1{,}2}) = 1{,}2$`, q: r`VL 5, Folie 12: $\ln = \log_e$, also $\ln(e^c) = c$ und $e^{\ln(b)} = b$ (VL 5, Folie 11).` },
        { t: r`b) $\sqrt[3]{3} = 3^{\frac{1}{3}} = \left(9^{\frac{1}{2}}\right)^{\frac{1}{3}} = 9^{\frac{1}{6}}$, also $\log_9 = \frac{1}{6}$`, q: r`VL 5, Folie 3: $a^{\frac{1}{n}} = \sqrt[n]{a}$. VL 5, Folie 3 (Potenzgesetz): $(a^m)^n = a^{m \cdot n}$. VL 5, Folie 11: $\log_a(a^c) = c$ und $a^{\log_a(b)} = b$. Die Exponentialfunktion zur gleichen Basis hebt den Logarithmus auf (und umgekehrt).` },
        { t: r`c) $2^{10} = (2^2)^5 = 4^5$, also $\log_4 = 5$`, q: r`VL 5, Folie 3 (Potenzgesetz): $(a^m)^n = a^{m \cdot n}$. VL 5, Folie 11: $\log_a(a^c) = c$ und $a^{\log_a(b)} = b$. Die Exponentialfunktion zur gleichen Basis hebt den Logarithmus auf (und umgekehrt).` },
        { t: r`d) $2 = \sqrt[3]{8} = 8^{\frac{1}{3}}$, also $\log_8(2) = \frac{1}{3}$`, q: r`VL 5, Folie 3: $a^{\frac{1}{n}} = \sqrt[n]{a}$. VL 5, Folie 11: $\log_a(a^c) = c$ und $a^{\log_a(b)} = b$. Die Exponentialfunktion zur gleichen Basis hebt den Logarithmus auf (und umgekehrt).` },
      ],
      ergebnis: r`a) 1,2 $\quad$ b) $\frac{1}{6}$ $\quad$ c) 5 $\quad$ d) $\frac{1}{3}$`,
    },

    // ---------------- Aufgabe 3 ----------------
    {
      id: 'ue03-a3ab',
      typ: 'aufgabe',
      thema: 'Exponentialfunktion',
      quelle: 'Übung 3, Aufgabe 3 a, b',
      herkunft: 'offiziell',
      frage: r`a) Gegeben ist $f(x) = 2^x$. (i) Bestimme $f(-2)$. (ii) An welcher Stelle nimmt $f$ den Wert 64 an?
b) Bestimme die Exponentialfunktion $f(x) = a^x$ mit dem Wertepaar $(2; 16)$.`,
      tipps: [
        r`(ii) $2^x = 64$: Ausprobieren oder $\log_2$ anwenden.`,
        r`b) Einsetzen: $a^2 = 16$. Denk daran, dass $a > 0$ sein muss.`,
      ],
      schritte: [
        { t: r`(i) $f(-2) = 2^{-2} = \dfrac{1}{4}$`, q: r`VL 5, Folie 3: $a^{-n} = \frac{1}{a^n}$` },
        { t: r`(ii) $2^x = 64 \Leftrightarrow x = \log_2(64) = 6$`, q: r`VL 5, Folie 11: $\log_a(b) = c \Leftrightarrow a^c = b$` },
        { t: r`b) $a^2 = 16 \Leftrightarrow a = 4$, also $f(x) = 4^x$`, w: r`$a = -4$ scheidet aus, weil die Basis positiv sein muss.`, q: r`VL 5, Folie 4: Bei $a^x$ ist die Basis $a > 0$. Deshalb nur die positive Wurzel.` },
      ],
      ergebnis: r`a) $\frac{1}{4}$ und $x = 6$ $\quad$ b) $f(x) = 4^x$`,
    },
    {
      id: 'ue03-a3c',
      typ: 'aufgabe',
      thema: 'Exponentialfunktion',
      quelle: 'Übung 3, Aufgabe 3 c',
      herkunft: 'offiziell',
      frage: r`Die Abbildung zeigt den Graphen einer Exponentialfunktion $f(x) = a^x$. Bestimme die Funktionsvorschrift.`,
      plot: {
        x: [-2.6, 6.6], y: [-0.4, 5.6], u: 36,
        fns: [{ f: (x) => 0.5 ** x }],
        alt: 'Fallende Exponentialkurve durch (0; 1), (−1; 2) und (−2; 4), die sich rechts der x-Achse annähert',
      },
      tipps: [
        r`Lies einen Punkt ab, der nicht $(0; 1)$ ist. Den hat jede Exponentialfunktion.`,
        r`Bei $x = -1$ ist der Wert 2. Setze in $a^x$ ein.`,
      ],
      schritte: [
        { t: r`Abgelesener Punkt: $(-1; 2)$` },
        { t: r`$a^{-1} = 2 \Leftrightarrow \dfrac{1}{a} = 2 \Leftrightarrow a = \dfrac{1}{2}$`, q: r`VL 5, Folie 3: $a^{-n} = \frac{1}{a^n}$` },
        { t: r`$f(x) = \left(\dfrac{1}{2}\right)^x$`, w: r`Kontrolle: Der Graph fällt, also $0 < a < 1$. Passt.` },
      ],
      ergebnis: r`$f(x) = \left(\frac{1}{2}\right)^x$`,
    },

    // ---------------- Aufgabe 4 ----------------
    {
      id: 'ue03-a4-zinsen',
      typ: 'aufgabe',
      thema: 'Exponentialfunktion',
      quelle: 'Übung 3, Aufgabe 4',
      herkunft: 'offiziell',
      rezept: 'vl05-zinseszins',
      frage: r`5000 € werden zu 1,2 % Zinsen angelegt.
a) Gib eine Funktion für das Kapital in Abhängigkeit von der Zeit an.
b) Wie hoch ist das Kapital nach 5 Jahren (auf 1 Cent)?
c) Nach wie vielen Jahren hat sich das Kapital verdoppelt (eine Nachkommastelle)?
d) Wie lange dauert die Verdopplung bei einem Startkapital von 3000 €?`,
      tipps: [
        r`Zinseszinsformel $K(t) = K_0 \cdot (1 + \frac{p}{100})^t$.`,
        r`c) $K(t) = 10\,000$ setzen, durch 5000 teilen, dann Logarithmus.`,
      ],
      schritte: [
        { t: r`a) $K: [0;\infty) \to \mathbb{R},\ K(t) = 5000 \cdot 1{,}012^t$`, q: r`VL 5, Folie 7: $K(t) = K_0 \cdot \left(1 + \frac{p}{100}\right)^t$` },
        { t: r`b) $K(5) = 5000 \cdot 1{,}012^5 \approx 5307{,}29$ €` },
        { t: r`c) $5000 \cdot 1{,}012^t = 10\,000 \Leftrightarrow 1{,}012^t = 2 \Leftrightarrow t = \log_{1{,}012}(2) \approx 58{,}1$ Jahre`, w: r`Im Taschenrechner: $\log_{1{,}012}(2) = \frac{\ln 2}{\ln 1{,}012}$.`, q: r`VL 5, Folie 11: $\log_a(b) = c \Leftrightarrow a^c = b$. Zum Ausrechnen: Basiswechsel (nicht auf den Folien): $\log_a(b) = \frac{\ln(b)}{\ln(a)}$. Herleitung: Aus $a^c = b$ folgt mit $\ln$ und VL 5, Folie 14: $c \cdot \ln(a) = \ln(b)$. So rechnet man jeden Logarithmus mit der ln-Taste aus.` },
        { t: r`d) $3000 \cdot 1{,}012^t = 6000 \Leftrightarrow 1{,}012^t = 2$: wieder ca. 58,1 Jahre`, w: r`Die Verdopplungszeit hängt nur vom Zinssatz ab, nicht vom Startkapital.` },
      ],
      ergebnis: r`a) $K(t) = 5000 \cdot 1{,}012^t$ $\quad$ b) 5307,29 € $\quad$ c) und d) je ca. 58,1 Jahre`,
      fehler: [r`Mit $1{,}2^t$ statt $1{,}012^t$ rechnen.`],
    },

    // ---------------- Aufgabe 5 ----------------
    {
      id: 'ue03-a5ab',
      typ: 'aufgabe',
      thema: 'Exponentialgleichungen',
      quelle: 'Übung 3, Aufgabe 5 a, b',
      herkunft: 'offiziell',
      rezept: 'vl06-exp-strategien',
      frage: r`Bestimme die Nullstellen:
a) $f(x) = 3^{2x - 5} - \dfrac{1}{27}$
b) $f(x) = 6^{x + 5} - 36^x$`,
      tipps: [
        r`a) Potenz = Zahl, und $\frac{1}{27} = 3^{-3}$.`,
        r`b) Schreibe $36 = 6^2$. Dann stehen links und rechts Potenzen zur Basis 6.`,
      ],
      schritte: [
        { t: r`a) $3^{2x - 5} = \dfrac{1}{27} \Leftrightarrow 2x - 5 = \log_3\left(\dfrac{1}{27}\right) = -3 \Leftrightarrow x = 1$`, q: r`VL 5, Folie 11: $\log_a(b) = c \Leftrightarrow a^c = b$ Und $\frac{1}{27} = 3^{-3}$ (VL 5, Folie 3: $a^{-n} = \frac{1}{a^n}$).` },
        { t: r`b) $6^{x + 5} = 36^x = (6^2)^x = 6^{2x}$`, q: r`VL 5, Folie 3 (Potenzgesetz): $(a^m)^n = a^{m \cdot n}$` },
        { t: r`$\Leftrightarrow x + 5 = 2x \Leftrightarrow x = 5$`, w: r`Gleiche Basis: Die Exponenten müssen gleich sein ($\log_6$ auf beiden Seiten).`, q: r`VL 6, Folie 3: Potenz = Potenz zur gleichen Basis, dann $\log_6$ auf beiden Seiten; nach VL 5, Folie 11 bleiben die Exponenten übrig.` },
      ],
      ergebnis: r`a) $x = 1$ $\quad$ b) $x = 5$`,
    },
    {
      id: 'ue03-a5cd',
      typ: 'aufgabe',
      thema: 'Exponentialgleichungen',
      quelle: 'Übung 3, Aufgabe 5 c, d',
      herkunft: 'offiziell',
      rezept: 'vl06-exp-strategien',
      frage: r`Bestimme die Nullstellen:
c) $f(x) = 100^{2x} - 101 \cdot 100^x + 100$
d) $f(x) = 3^{2x} + 3^{x + 1} - 10$`,
      tipps: [
        r`$100^{2x} = (100^x)^2$. Substituiere $z = 100^x$.`,
        r`d) $3^{x+1} = 3 \cdot 3^x$. Substituiere $z = 3^x$. Eine $z$-Lösung ist negativ.`,
      ],
      schritte: [
        { t: r`c) $z = 100^x$: $\ z^2 - 101z + 100 = 0 \Rightarrow z = 50{,}5 \pm 49{,}5$, also $z_1 = 100,\ z_2 = 1$`, q: r`VL 5, Folie 3 (Potenzgesetz): $(a^m)^n = a^{m \cdot n}$, also $100^{2x} = (100^x)^2$. VL 6, Folie 3: Potenz substituieren, wenn dieselbe Potenz in verschiedenen Formen vorkommt.` },
        { t: r`$100^x = 100 \Rightarrow x = 1$; $\ 100^x = 1 \Rightarrow x = 0$`, q: r`VL 5, Folie 11: $\log_a(b) = c \Leftrightarrow a^c = b$` },
        { t: r`d) $z = 3^x$: $\ z^2 + 3z - 10 = 0 \Rightarrow z = -\dfrac{3}{2} \pm \dfrac{7}{2}$, also $z_1 = 2,\ z_2 = -5$`, q: r`VL 5, Folie 3 (Potenzgesetz): $a^m \cdot a^n = a^{m+n}$, also $a^{m+n} = a^m \cdot a^n$, also $3^{x+1} = 3 \cdot 3^x$. VL 3, Folie 13 ($pq$-Formel): $x^2 + px + q = 0 \Rightarrow x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$` },
        { t: r`$3^x = 2 \Rightarrow x = \log_3(2)$; $\ 3^x = -5$ ist unmöglich`, w: r`Eine Potenz mit positiver Basis ist immer positiv.`, q: r`VL 5, Folie 6: $a^x > 0$ für alle $x$. Eine Potenz mit positiver Basis kann nie negativ oder null sein.` },
      ],
      ergebnis: r`c) $x_1 = 1,\ x_2 = 0$ $\quad$ d) $x = \log_3(2) \approx 0{,}63$`,
    },
    {
      id: 'ue03-a5ef',
      typ: 'aufgabe',
      thema: 'Exponentialgleichungen',
      quelle: 'Übung 3, Aufgabe 5 e, f',
      herkunft: 'offiziell',
      rezept: 'vl06-exp-strategien',
      frage: r`Bestimme die Nullstellen:
e) $f(x) = 16^{\frac{1}{x}} - 4^{\frac{x^2}{32}}$
f) $f(x) = 7^{\frac{3x}{2}} - 2^{-5x}$`,
      tipps: [
        r`e) $16 = 4^2$. Dann stehen zwei Potenzen zur Basis 4 da.`,
        r`f) Verschiedene Basen: Logarithmus auf beide Seiten, dann alle $x$ auf eine Seite und ausklammern.`,
      ],
      schritte: [
        { t: r`e) $16^{\frac{1}{x}} = (4^2)^{\frac{1}{x}} = 4^{\frac{2}{x}}$, also $\dfrac{2}{x} = \dfrac{x^2}{32}$`, q: r`VL 5, Folie 3 (Potenzgesetz): $(a^m)^n = a^{m \cdot n}$` },
        { t: r`$\Leftrightarrow 64 = x^3 \Leftrightarrow x = 4$`, w: r`Mit $32x$ multiplizieren. $x = 0$ ist ohnehin nicht im Definitionsbereich.`, q: r`Nenner beseitigen: mit $32x$ multiplizieren (erlaubt, weil $x \ne 0$; für $x = 0$ wäre $\frac{1}{x}$ nicht definiert).` },
        { t: r`f) $7^{\frac{3x}{2}} = 2^{-5x} \Leftrightarrow \dfrac{3x}{2}\log_2(7) = -5x \quad (\,\log_2\,)$`, q: r`VL 5, Folie 14 (Logarithmengesetz): $\log_a(x^b) = b \cdot \log_a(x)$ Und $\log_2(2^{-5x}) = -5x$ nach VL 5, Folie 11.` },
        { t: r`$\Leftrightarrow \left(\dfrac{3\log_2(7)}{2} + 5\right) x = 0 \Leftrightarrow x = 0$`, w: r`Die Klammer ist eine positive Zahl, nicht null. Also muss $x = 0$ sein.`, q: r`Ausklammern (VL 3, Folie 18) und VL 3, Folie 17 (Satz vom Nullprodukt): $a \cdot b = 0 \Leftrightarrow a = 0 \lor b = 0$` },
      ],
      ergebnis: r`e) $x = 4$ $\quad$ f) $x = 0$`,
    },

    // ---------------- Aufgabe 6 (Besprechung) ----------------
    {
      id: 'ue03-a6a',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '6 a)',
      thema: 'Exponentialgleichungen',
      quelle: 'Übung 3, Aufgabe 6 a',
      herkunft: 'claude',
      rezept: 'vl06-exp-strategien',
      frage: r`Bestimme alle Nullstellen von $f(x) = 4^{2x - 1} + 16^{x + 1} - 10$.`,
      tipps: [
        r`Bring beide Potenzen auf dieselbe Basis. $4^{2x} = (4^2)^x = 16^x$.`,
        r`Zerlege mit den Potenzgesetzen: $4^{2x - 1} = \frac{4^{2x}}{4}$ und $16^{x + 1} = 16 \cdot 16^x$.`,
        r`Jetzt kommt nur noch $16^x$ vor. Ausklammern oder $z = 16^x$ setzen.`,
      ],
      schritte: [
        { t: r`$4^{2x - 1} = \dfrac{4^{2x}}{4} = \dfrac{16^x}{4}$ und $16^{x + 1} = 16 \cdot 16^x$`, w: r`Potenzgesetze $a^{m-n} = \frac{a^m}{a^n}$ und $a^{m+n} = a^m \cdot a^n$.`, q: r`VL 5, Folie 3 (Potenzgesetz): $\frac{a^m}{a^n} = a^{m-n}$, also $a^{m-n} = \frac{a^m}{a^n}$. VL 5, Folie 3 (Potenzgesetz): $a^m \cdot a^n = a^{m+n}$, also $a^{m+n} = a^m \cdot a^n$. VL 5, Folie 3 (Potenzgesetz): $(a^m)^n = a^{m \cdot n}$, also $4^{2x} = (4^2)^x = 16^x$.` },
        { t: r`$\dfrac{1}{4} \cdot 16^x + 16 \cdot 16^x - 10 = 0$` },
        { t: r`$\Leftrightarrow \dfrac{65}{4} \cdot 16^x = 10$`, w: r`$16^x$ ausklammern: $\frac{1}{4} + 16 = \frac{65}{4}$.`, q: r`$16^x$ ausklammern: $\frac{1}{4} \cdot 16^x + 16 \cdot 16^x = \left(\frac{1}{4} + 16\right) 16^x$ (Distributivgesetz, Schulwissen).` },
        { t: r`$\Leftrightarrow 16^x = \dfrac{40}{65} = \dfrac{8}{13}$` },
        { t: r`$\Leftrightarrow x = \log_{16}\left(\dfrac{8}{13}\right) = \dfrac{\ln(8/13)}{\ln(16)} \approx -0{,}175$`, w: r`Potenz = Zahl, also Logarithmus. Ein negatives Ergebnis ist in Ordnung, weil $\frac{8}{13} < 1$ ist.`, q: r`VL 5, Folie 11: $\log_a(b) = c \Leftrightarrow a^c = b$. Zum Ausrechnen: Basiswechsel (nicht auf den Folien): $\log_a(b) = \frac{\ln(b)}{\ln(a)}$. Herleitung: Aus $a^c = b$ folgt mit $\ln$ und VL 5, Folie 14: $c \cdot \ln(a) = \ln(b)$. So rechnet man jeden Logarithmus mit der ln-Taste aus.` },
      ],
      ergebnis: r`$x = \log_{16}\left(\frac{8}{13}\right) \approx -0{,}175$`,
      fehler: [
        r`$4^{2x - 1} = 4^{2x} - 4$ rechnen: Ein Minus im Exponenten bedeutet Teilen, nicht Abziehen.`,
        r`$16^{x + 1} = 16^x + 16$ statt $16 \cdot 16^x$.`,
      ],
    },
    {
      id: 'ue03-a6b',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '6 b)',
      thema: 'Exponentialgleichungen',
      quelle: 'Übung 3, Aufgabe 6 b',
      herkunft: 'claude',
      rezept: 'vl06-exp-strategien',
      frage: r`Bestimme alle Nullstellen von $f(x) = 2^x + 2^{x + 1} - 3^{x + 2} - 3^{x + 3}$.`,
      tipps: [
        r`Sortiere nach Basen: Die Zweier-Potenzen auf eine Seite, die Dreier-Potenzen auf die andere.`,
        r`Klammere $2^x$ bzw. $3^x$ aus: $2^{x+1} = 2 \cdot 2^x$, $\ 3^{x+2} = 9 \cdot 3^x$, $\ 3^{x+3} = 27 \cdot 3^x$.`,
        r`Aus $3 \cdot 2^x = 36 \cdot 3^x$ wird mit dem Potenzgesetz $\frac{2^x}{3^x} = \left(\frac{2}{3}\right)^x$ eine einzige Potenz.`,
      ],
      schritte: [
        { t: r`$2^x + 2 \cdot 2^x = 9 \cdot 3^x + 27 \cdot 3^x$`, w: r`Zweier nach links, Dreier nach rechts. Exponenten mit Potenzgesetzen zerlegt.`, q: r`VL 5, Folie 3 (Potenzgesetz): $a^m \cdot a^n = a^{m+n}$, also $a^{m+n} = a^m \cdot a^n$, also $2^{x+1} = 2 \cdot 2^x$, $\ 3^{x+2} = 3^2 \cdot 3^x$, $\ 3^{x+3} = 3^3 \cdot 3^x$.` },
        { t: r`$\Leftrightarrow 3 \cdot 2^x = 36 \cdot 3^x$`, w: r`Ausklammern: $(1 + 2) \cdot 2^x$ und $(9 + 27) \cdot 3^x$.`, q: r`Ausklammern (Distributivgesetz, Schulwissen): $2^x + 2 \cdot 2^x = (1 + 2) \cdot 2^x$.` },
        { t: r`$\Leftrightarrow \dfrac{2^x}{3^x} = 12 \Leftrightarrow \left(\dfrac{2}{3}\right)^x = 12$`, w: r`Durch $3 \cdot 3^x$ teilen (ist nie null). Potenzgesetz $\frac{a^n}{b^n} = \left(\frac{a}{b}\right)^n$.`, q: r`VL 5, Folie 3 (Potenzgesetz): $\frac{a^n}{b^n} = \left(\frac{a}{b}\right)^n$` },
        { t: r`$\Leftrightarrow x = \log_{\frac{2}{3}}(12) = \dfrac{\ln(12)}{\ln(2/3)} \approx -6{,}13$`, q: r`VL 5, Folie 11: $\log_a(b) = c \Leftrightarrow a^c = b$. Zum Ausrechnen: Basiswechsel (nicht auf den Folien): $\log_a(b) = \frac{\ln(b)}{\ln(a)}$. Herleitung: Aus $a^c = b$ folgt mit $\ln$ und VL 5, Folie 14: $c \cdot \ln(a) = \ln(b)$. So rechnet man jeden Logarithmus mit der ln-Taste aus.` },
      ],
      ergebnis: r`$x = \log_{\frac{2}{3}}(12) = \dfrac{\ln 12}{\ln 2 - \ln 3} \approx -6{,}13$`,
      fehler: [
        r`$2^x + 2^{x+1} = 2^{2x+1}$ zusammenfassen: Summen von Potenzen lassen sich nicht so addieren.`,
      ],
    },
    {
      id: 'ue03-a6c',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '6 c)',
      thema: 'Exponentialgleichungen',
      quelle: 'Übung 3, Aufgabe 6 c',
      herkunft: 'claude',
      rezept: 'vl06-exp-strategien',
      frage: r`Bestimme alle Nullstellen von $f(x) = e^{2x} - 3e^x + 2$.`,
      tipps: [
        r`$e^{2x} = (e^x)^2$. Welche Substitution bietet sich an?`,
        r`Mit $z = e^x$ entsteht eine quadratische Gleichung.`,
      ],
      schritte: [
        { t: r`$(e^x)^2 - 3e^x + 2 = 0$`, w: r`Potenzgesetz $(a^m)^n = a^{mn}$.`, q: r`VL 5, Folie 3 (Potenzgesetz): $(a^m)^n = a^{m \cdot n}$, also $e^{2x} = (e^x)^2$.` },
        { t: r`$z = e^x$: $\quad z^2 - 3z + 2 = 0$`, q: r`VL 6, Folie 3: Potenz substituieren, wenn dieselbe Potenz in verschiedenen Formen vorkommt.` },
        { t: r`$z_{1/2} = \dfrac{3}{2} \pm \sqrt{\dfrac{9}{4} - 2} = \dfrac{3}{2} \pm \dfrac{1}{2}$, also $z_1 = 2,\ z_2 = 1$`, q: r`VL 3, Folie 13 ($pq$-Formel): $x^2 + px + q = 0 \Rightarrow x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$` },
        { t: r`Rücksubstitution: $e^x = 2 \Rightarrow x_1 = \ln(2)$; $\ e^x = 1 \Rightarrow x_2 = \ln(1) = 0$`, w: r`Beide $z$-Werte sind positiv, also liefern beide eine Lösung.`, q: r`VL 4, Folie 5, Schritt 3: Rücksubstitution, also $x^t = z_i$ für jede Lösung $z_i$ lösen. VL 5, Folie 12: $\ln = \log_e$, also $\ln(e^c) = c$ und $e^{\ln(b)} = b$ (VL 5, Folie 11).` },
      ],
      ergebnis: r`$x_1 = \ln(2) \approx 0{,}69,\ x_2 = 0$`,
    },

    // ---------------- Präsenzübung 03 ----------------
    {
      id: 'ue03-p1a',
      typ: 'aufgabe',
      teil: 'praesenz',
      nr: 'P1 a)',
      thema: 'Exponentialgleichungen',
      quelle: 'Präsenzübung 03, Aufgabe 1 a',
      herkunft: 'claude',
      rezept: 'vl06-exp-strategien',
      frage: r`Untersuche $f(x) = 2^{6x - 1} + 4^{3x + 2} - 8^{2x} - 31$ auf maximalen Definitionsbereich, Nullstellen und Symmetrie.`,
      tipps: [
        r`Alle Basen sind Potenzen von 2: $4 = 2^2$, $8 = 2^3$.`,
        r`Danach kommt überall $2^{6x}$ vor: $2^{6x - 1} = \frac{1}{2} \cdot 2^{6x}$, $4^{3x + 2} = 2^{6x + 4} = 16 \cdot 2^{6x}$, $8^{2x} = 2^{6x}$.`,
        r`Symmetrie: Prüfe $f\left(\frac{1}{6}\right)$ und $f\left(-\frac{1}{6}\right)$.`,
      ],
      schritte: [
        { t: r`$D = \mathbb{R}$`, w: r`Potenzen mit positiver Basis sind für alle $x$ definiert.` },
        { t: r`$4^{3x + 2} = (2^2)^{3x + 2} = 2^{6x + 4} = 16 \cdot 2^{6x}$, $\ 8^{2x} = (2^3)^{2x} = 2^{6x}$, $\ 2^{6x - 1} = \dfrac{2^{6x}}{2}$`, q: r`VL 5, Folie 3: $(a^m)^n = a^{mn}$, $a^{m+n} = a^m a^n$, $a^{m-n} = \frac{a^m}{a^n}$.` },
        { t: r`$f(x) = 0 \Leftrightarrow \left(\dfrac{1}{2} + 16 - 1\right) \cdot 2^{6x} = 31 \Leftrightarrow 15{,}5 \cdot 2^{6x} = 31 \Leftrightarrow 2^{6x} = 2$`, w: r`$2^{6x}$ ausklammern.` },
        { t: r`$\Leftrightarrow 6x = 1 \Leftrightarrow x = \dfrac{1}{6}$`, q: r`VL 5, Folie 11: $\log_2(2^{6x}) = 6x$ und $\log_2(2) = 1$.` },
        { t: r`Symmetrie: $f\left(\frac{1}{6}\right) = 0$, aber $f\left(-\frac{1}{6}\right) = \frac{1}{4} + 8 - \frac{1}{2} - 31 = -23{,}25 \ne 0$: weder gerade noch ungerade`, w: r`Für gerade oder ungerade müsste $f\left(-\frac{1}{6}\right) = \pm f\left(\frac{1}{6}\right) = 0$ sein.`, q: r`VL 3, Folie 8: Ein Gegenbeispiel genügt.` },
      ],
      ergebnis: r`$D = \mathbb{R}$, Nullstelle $x = \frac{1}{6}$, weder gerade noch ungerade`,
    },
    {
      id: 'ue03-p1b',
      typ: 'aufgabe',
      teil: 'praesenz',
      nr: 'P1 b)',
      thema: 'Logarithmengleichungen',
      quelle: 'Präsenzübung 03, Aufgabe 1 b (identisch mit Übung 4, Aufgabe 2 c)',
      herkunft: 'offiziell',
      rezept: 'vl06-log-strategien',
      frage: r`Untersuche $f(x) = \log_3(x^2 - 3) + \log_3(x^2 - 1) - 1$ auf maximalen Definitionsbereich, Nullstellen und Symmetrie.`,
      tipps: [r`Beide Argumente $> 0$: Es reicht $x^2 > 3$.`, r`Logarithmen zusammenfassen, dann $3^{(\,)}$.`],
      schritte: [
        { t: r`$x^2 - 3 > 0 \land x^2 - 1 > 0 \Leftrightarrow x^2 > 3$, also $D = (-\infty; -\sqrt{3}) \cup (\sqrt{3}; \infty)$`, q: r`VL 6, Folie 7: Jedes Argument $> 0$, alle Bedingungen gleichzeitig.` },
        { t: r`$\log_3\left((x^2 - 3)(x^2 - 1)\right) = 1 \Leftrightarrow (x^2 - 3)(x^2 - 1) = 3$`, q: r`VL 5, Folie 14: $\log_a x + \log_a y = \log_a(xy)$. VL 5, Folie 11: $3^{\log_3(b)} = b$.` },
        { t: r`$\Leftrightarrow x^4 - 4x^2 = 0 \Leftrightarrow x^2(x^2 - 4) = 0$: $\ x = 0 \notin D$, $\ x = \pm 2 \in D$` },
        { t: r`$f(-x) = f(x)$, weil nur $x^2$ vorkommt: gerade` },
      ],
      ergebnis: r`$D = (-\infty; -\sqrt{3}) \cup (\sqrt{3}; \infty)$, Nullstellen $\pm 2$, gerade`,
    },
  ],

  formelblatt: [],
};
