// Vorlesung 7 durchgehen: Logarithmengleichungen und Symmetrie von Logarithmusfunktionen
const r = String.raw;

export default {
  unit: 'vl07',
  abschnitte: [
    {
      id: 'vl07-d01',
      folien: '3',
      titel: 'Strategien für Logarithmengleichungen',
      folie: r`- umstellen, sodass auf einer Seite ein Logarithmus und auf der anderen eine Zahl steht, dann Exponentialfunktion anwenden
- umstellen, sodass links und rechts je ein Logarithmus steht, dann Exponentialfunktion anwenden
- Logarithmen- bzw. Potenzgesetze anwenden
- Logarithmus substituieren
- Satz vom Nullprodukt

**Achtung:** Prüfen, ob die Lösungen im Definitionsbereich liegen!`,
      kern: r`Erst den Definitionsbereich bestimmen, am Ende jede Lösung damit prüfen. Dazwischen: Logarithmen zusammenfassen und mit der Basis „hochnehmen“.`,
      check: { frage: r`Warum muss man bei Logarithmengleichungen die Lösungen prüfen?`, antwort: r`Beim Umformen (z. B. mit den Logarithmengesetzen oder durch Wurzelziehen) können Werte entstehen, für die die ursprünglichen Logarithmen gar nicht definiert sind.` },
    },
    {
      id: 'vl07-d02',
      folien: '4 und Notizseiten',
      titel: r`Beispiel 2: $\ln(x) - \ln(x^2) - 4$`,
      folie: r`Nullstellen von $f(x) = \ln(x) - \ln(x^2) - 4$`,
      notizen: [
        { t: r`Max. Definitionsbereich: $x > 0$ und $x^2 > 0$`, w: r`Jedes Argument eines Logarithmus muss positiv sein.` },
        { t: r`Erst mal: $x^2 = 0 \iff x_{1,2} = 0$. Also $x^2 > 0 \iff x \ne 0$.`, w: r`Die Skizze der Parabel zeigt: $x^2$ ist überall positiv außer bei 0.` },
        { t: r`$\Rightarrow D = (0; \infty) = \{x \in \mathbb{R} \mid x > 0\}$`, w: r`Beide Bedingungen gleichzeitig: $x > 0$ (gelb) und $x \ne 0$ (grün) ergibt $x > 0$.` },
        { t: r`$f(x) = 0 \iff \ln(x) - \ln(x^2) - 4 = 0$ | Logarithmengesetz`, w: r`$\ln(u) - \ln(v) = \ln\left(\frac{u}{v}\right)$.` },
        { t: r`$\iff \ln\left(\frac{x}{x^2}\right) - 4 = 0$ | Kürzen`, w: r`` },
        { t: r`$\iff \ln\left(\frac{1}{x}\right) - 4 = 0 \quad | +4 \iff \ln\left(\frac{1}{x}\right) = 4 \quad | e^{(\,)}$`, w: r`Der Logarithmus steht allein. „$e$ hoch“ beide Seiten hebt den $\ln$ auf.` },
        { t: r`$\iff \frac{1}{x} = e^4 \quad | \cdot x \iff 1 = e^4 \cdot x \quad | :e^4 \iff x = \frac{1}{e^4} \in D$`, w: r`$\frac{1}{e^4} \approx 0{,}018 > 0$, liegt also im Definitionsbereich.` },
      ],
      kern: r`Differenz von Logarithmen zu einem Logarithmus zusammenfassen, dann $e^{(\,)}$ anwenden.`,
      karten: ['vl07-log-bsp2'],
    },
    {
      id: 'vl07-d03',
      folien: '4 und Notizseiten',
      titel: r`Beispiel 3: $\log_2(x) + 3\log_2(2x) - 7$`,
      folie: r`Nullstellen von $f(x) = \log_2(x) + 3\log_2(2x) - 7$`,
      notizen: [
        { t: r`Max. Definitionsbereich: $x > 0$ und $2x > 0 \;|:2 \iff x > 0$. Also $D = (0; \infty)$.`, w: r`` },
        { t: r`$f(x) = 0 \iff \log_2(x) + 3\log_2(2x) - 7 = 0 \quad | +7$`, w: r`` },
        { t: r`$\iff \log_2(x) + 3\log_2(2x) = 7$ | Logarithmengesetz`, w: r`$r \cdot \log_a(u) = \log_a(u^r)$: Die 3 wandert als Exponent hinein.` },
        { t: r`$\iff \log_2(x) + \log_2((2x)^3) = 7 \iff \log_2(x) + \log_2(8x^3) = 7$ | Log.-Gesetz`, w: r`$(2x)^3 = 8x^3$, die 2 auch hoch 3 nehmen!` },
        { t: r`$\iff \log_2(x \cdot 8x^3) = 7 \iff \log_2(8x^4) = 7 \quad | 2^{(\,)}$`, w: r`$\log_a(u) + \log_a(v) = \log_a(u \cdot v)$. Dann „2 hoch“ beide Seiten, passend zur Basis.` },
        { t: r`$\iff 8x^4 = 2^7 \quad | :8 \iff x^4 = 16 \quad | \pm\sqrt[4]{\;}$`, w: r`$2^7 = 128$ und $128 : 8 = 16$.` },
        { t: r`$\iff x_1 = 2 \in D, \quad x_2 = -2 \notin D$`, w: r`Beim geraden Wurzelziehen entstehen zwei Kandidaten, aber $-2$ ist nicht positiv.` },
        { t: r`$\Rightarrow f$ hat nur die Nullstelle $x_1 = 2$.`, w: r`` },
      ],
      kern: r`Faktor vor dem Log als Exponent hineinziehen, Summen zu einem Produkt zusammenfassen. Am Ende den Definitionsbereich prüfen.`,
      karten: ['vl07-log-bsp3'],
    },
    {
      id: 'vl07-d04',
      folien: '4 und Notizseiten',
      titel: r`Beispiel 4: $\log_8(4x) - \log_2(x)$`,
      folie: r`Nullstellen von $f(x) = \log_8(4x) - \log_2(x)$`,
      notizen: [
        { t: r`Max. Definitionsbereich: $4x > 0 \;|:4$ und $x > 0$, also $D = (0; \infty)$.`, w: r`` },
        { t: r`$f(x) = 0 \iff \log_8(4x) - \log_2(x) = 0 \quad | +\log_2(x) \iff \log_8(4x) = \log_2(x) \quad | 8^{(\,)}$`, w: r`Verschiedene Basen. Man nimmt „8 hoch“, das hebt den $\log_8$ links auf.` },
        { t: r`$\iff 4x = 8^{\log_2(x)} \quad | 8 = 2^3$`, w: r`Rechts bleibt die 8 stehen. Trick: $8$ als Zweierpotenz schreiben.` },
        { t: r`$\iff 4x = (2^3)^{\log_2(x)} \iff 4x = 2^{3 \cdot \log_2(x)}$ | Potenzgesetz`, w: r`$(a^m)^n = a^{m \cdot n}$.` },
        { t: r`$\iff 4x = 2^{\log_2(x^3)}$ | Logarithmengesetz`, w: r`$3 \cdot \log_2(x) = \log_2(x^3)$.` },
        { t: r`$\iff 4x = x^3 \quad | -4x \iff 0 = x^3 - 4x$ | Ausklammern`, w: r`$2^{\log_2(u)} = u$: „2 hoch“ und $\log_2$ heben sich auf.` },
        { t: r`$\iff 0 = x \cdot (x^2 - 4)$ | Satz vom Nullprodukt`, w: r`Ein Produkt ist null, wenn ein Faktor null ist.` },
        { t: r`$\iff x = 0 \;\vee\; x^2 = 4 \iff x_1 = 0 \notin D, \; x_2 = 2 \in D, \; x_3 = -2 \notin D$`, w: r`0 und $-2$ liegen nicht in $(0; \infty)$.` },
        { t: r`$\Rightarrow f$ hat nur eine Nullstelle: $x_2 = 2$.`, w: r`` },
      ],
      kern: r`Bei verschiedenen Basen eine Basis als Potenz der anderen schreiben ($8 = 2^3$), dann mit Potenz- und Logarithmengesetzen vereinfachen.`,
      karten: ['vl07-log-bsp4'],
    },
    {
      id: 'vl07-d05',
      folien: '5–6 und Notizseiten',
      titel: 'Symmetrie von Logarithmusfunktionen',
      folie: r`Reine Logarithmusfunktionen $\log_a(x)$ sind weder gerade noch ungerade. Allgemeinere können es sein. Nachweis wie bei anderen Funktionen.

Beispiele: 1) $f(x) = \ln(4x^2)$ 2) $f(x) = \log_2(x^3)$`,
      notizen: [
        { t: r`1) $f(1) = \ln(4)$, $f(-1) = \ln(4)$`, w: r`Erst mit einem Zahlenbeispiel testen: gleiche Werte, vermutlich gerade.` },
        { t: r`$f(-x) = \ln(4 \cdot (-x)^2) = \ln(4x^2) = f(x)$ für alle $x \in D$ $\Rightarrow f$ ist gerade.`, w: r`$(-x)^2 = x^2$. Der allgemeine Nachweis mit $-x$ ist nötig, ein Zahlenbeispiel allein reicht nicht.` },
        { t: r`2) $f(1) = \log_2(1^3) = 0$, $f(-1) = \log_2((-1)^3) = \log_2(-1)$ ↯`, w: r`Der Logarithmus einer negativen Zahl ist nicht definiert.` },
        { t: r`Das ist gar nicht definiert, $-1$ liegt außerhalb des Definitionsbereichs. $\Rightarrow f$ ist weder gerade noch ungerade ($D = (0; \infty)$, der Graph liegt nur rechts der y-Achse).`, w: r`Für Symmetrie muss mit $x$ auch $-x$ im Definitionsbereich liegen. Das ist hier nie der Fall.` },
      ],
      kern: r`Symmetrie geht nur, wenn der Definitionsbereich symmetrisch zu 0 ist. Sonst sofort: weder gerade noch ungerade.`,
      check: { frage: r`Ist $f(x) = \ln(x^2 + 1)$ gerade?`, antwort: r`Ja: $D = \mathbb{R}$ und $f(-x) = \ln((-x)^2 + 1) = \ln(x^2 + 1) = f(x)$.` },
      karten: ['vl07-log-symmetrie', 'vl07-symmetrie-d-mc'],
    },
  ],
};
