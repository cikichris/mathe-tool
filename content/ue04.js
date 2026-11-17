// Übungsblatt 4 (Besprechung 10./13.11.2026): Logarithmengleichungen, Winkel, rechtwinklige Dreiecke
const r = String.raw;

export default {
  id: 'ue04',
  art: 'uebung',
  nummer: 4,
  datum: '2026-11-10',
  besprechung: ['2026-11-10', '2026-11-13'],
  titel: 'Logarithmen, Winkel und Dreiecke',
  ueberblick: r`Aufgaben 1 bis 4 mit den offiziellen Lösungen aus campUAS. Die Aufgaben 5 und 6 (Besprechung in der Übung) sind von Claude gelöst.`,

  karten: [
    // ---------------- Aufgabe 1 ----------------
    {
      id: 'ue04-a1a',
      typ: 'aufgabe',
      thema: 'Logarithmengleichungen',
      quelle: 'Übung 4, Aufgabe 1 a',
      herkunft: 'offiziell',
      rezept: 'vl06-log-strategien',
      frage: r`Bestimme Definitionsbereich und Nullstellen von $f(x) = \log_{10}(4x - 5) - 1{,}5$.`,
      tipps: [
        r`Definitionsbereich: $4x - 5 > 0$.`,
        r`Logarithmus allein stellen, dann $10^{(\,)}$ anwenden.`,
      ],
      schritte: [
        { t: r`$4x - 5 > 0 \Leftrightarrow x > \dfrac{5}{4}$, also $D = \left(\dfrac{5}{4};\infty\right)$`, q: r`VL 6, Folie 7: Für jeden Logarithmus muss das Argument $> 0$ sein; bei mehreren Logarithmen müssen alle Bedingungen gleichzeitig gelten.` },
        { t: r`$\log_{10}(4x - 5) = 1{,}5 \Leftrightarrow 4x - 5 = 10^{1{,}5} = 10\sqrt{10}$`, q: r`VL 5, Folie 11: $\log_a(a^c) = c$ und $a^{\log_a(b)} = b$. Die Exponentialfunktion zur gleichen Basis hebt den Logarithmus auf (und umgekehrt). Und $10^{1{,}5} = 10^1 \cdot 10^{0{,}5} = 10\sqrt{10}$ (VL 5, Folie 3).` },
        { t: r`$\Leftrightarrow x = \dfrac{10\sqrt{10} + 5}{4} \approx 9{,}16 \in D$`, q: r`VL 6, Folie 8: Bei den Lösungen muss geprüft werden, ob sie im Definitionsbereich liegen.` },
      ],
      ergebnis: r`$x = \dfrac{10\sqrt{10} + 5}{4} \approx 9{,}16$`,
    },
    {
      id: 'ue04-a1b',
      typ: 'aufgabe',
      thema: 'Logarithmengleichungen',
      quelle: 'Übung 4, Aufgabe 1 b',
      herkunft: 'offiziell',
      rezept: 'vl06-log-strategien',
      frage: r`Bestimme Definitionsbereich und Nullstellen von $f(x) = \ln(\sqrt{x}) + 1{,}5\ln(x) - \ln(2x)$.`,
      tipps: [
        r`Schreibe $\sqrt{x} = x^{\frac{1}{2}}$ und $1{,}5\ln(x) = \ln(x^{1{,}5})$.`,
        r`Fasse links zusammen und stell auf $\ln(\ldots) = \ln(2x)$ um.`,
      ],
      schritte: [
        { t: r`Alle drei Argumente positiv: $D = (0;\infty)$`, q: r`VL 6, Folie 7: Für jeden Logarithmus muss das Argument $> 0$ sein; bei mehreren Logarithmen müssen alle Bedingungen gleichzeitig gelten.` },
        { t: r`$\ln\left(x^{\frac{1}{2}}\right) + \ln\left(x^{1{,}5}\right) = \ln(2x) \Leftrightarrow \ln(x^2) = \ln(2x)$`, w: r`$x^{0{,}5} \cdot x^{1{,}5} = x^2$.`, q: r`VL 5, Folie 3: $a^{\frac{1}{n}} = \sqrt[n]{a}$. VL 5, Folie 14 (Logarithmengesetz): $\log_a(x^b) = b \cdot \log_a(x)$. VL 5, Folie 14 (Logarithmengesetz): $\log_a(x \cdot y) = \log_a(x) + \log_a(y)$. VL 5, Folie 3 (Potenzgesetz): $a^m \cdot a^n = a^{m+n}$, also $a^{m+n} = a^m \cdot a^n$` },
        { t: r`$\Leftrightarrow x^2 = 2x \Leftrightarrow x(x - 2) = 0 \Leftrightarrow x = 0 \,\lor\, x = 2$`, q: r`VL 5, Folie 12: $\ln = \log_e$, also $\ln(e^c) = c$ und $e^{\ln(b)} = b$ (VL 5, Folie 11). Dann VL 3, Folie 18: Ohne Absolutglied die niedrigste Potenz von $x$ ausklammern. VL 3, Folie 17 (Satz vom Nullprodukt): $a \cdot b = 0 \Leftrightarrow a = 0 \lor b = 0$` },
        { t: r`$x = 0 \notin D$, also nur $x = 2$`, q: r`VL 6, Folie 8: Bei den Lösungen muss geprüft werden, ob sie im Definitionsbereich liegen.` },
      ],
      ergebnis: r`$D = (0;\infty)$, Nullstelle $x = 2$`,
    },

    // ---------------- Aufgabe 2 ----------------
    {
      id: 'ue04-a2a',
      typ: 'aufgabe',
      thema: 'Logarithmengleichungen',
      quelle: 'Übung 4, Aufgabe 2 a',
      herkunft: 'offiziell',
      rezept: 'vl06-log-defbereich',
      frage: r`Bestimme maximalen Definitionsbereich, Nullstellen und Symmetrie von $f(x) = x \cdot \ln(x^2 - 1)$.`,
      tipps: [
        r`$x^2 - 1 > 0$: Löse zuerst $x^2 - 1 = 0$ und überlege, wo die nach oben geöffnete Parabel positiv ist.`,
        r`Nullstellen: Satz vom Nullprodukt. Prüfe danach jede Lösung gegen $D$.`,
      ],
      schritte: [
        { t: r`$x^2 - 1 = 0 \Leftrightarrow x = \pm 1$. Die Parabel ist außerhalb von $[-1; 1]$ positiv, also $D = (-\infty;-1) \cup (1;\infty)$`, q: r`VL 6, Folie 7: Für jeden Logarithmus muss das Argument $> 0$ sein; bei mehreren Logarithmen müssen alle Bedingungen gleichzeitig gelten. VL 6, Folie 7: Erst die Gleichung lösen ($= 0$), dann überlegen, wo der Term positiv ist. $x^2 - c$ ist eine nach oben geöffnete Parabel, also außerhalb der Nullstellen positiv.` },
        { t: r`$x \cdot \ln(x^2 - 1) = 0 \Leftrightarrow x = 0 \,\lor\, \ln(x^2 - 1) = 0$`, q: r`VL 3, Folie 17 (Satz vom Nullprodukt): $a \cdot b = 0 \Leftrightarrow a = 0 \lor b = 0$` },
        { t: r`$\ln(x^2 - 1) = 0 \Leftrightarrow x^2 - 1 = 1 \Leftrightarrow x = \pm\sqrt{2}$`, q: r`$\ln(y) = 0 \Leftrightarrow y = e^0 = 1$ (VL 5, Folie 11 und $a^0 = 1$).` },
        { t: r`$x = 0 \notin D$. Nullstellen: $x = \pm\sqrt{2}$`, q: r`VL 6, Folie 8: Bei den Lösungen muss geprüft werden, ob sie im Definitionsbereich liegen.` },
        { t: r`$f(-x) = (-x)\ln\left((-x)^2 - 1\right) = -x\ln(x^2 - 1) = -f(x)$, also ungerade`, q: r`Rechenregel (nicht auf den Folien): $(-x)^n = x^n$ für gerade $n$ und $(-x)^n = -x^n$ für ungerade $n$, weil sich je zwei Minuszeichen aufheben. VL 3, Folie 7: ungerade heißt $f(-x) = -f(x)$ für alle $x \in D$.` },
      ],
      ergebnis: r`$D = (-\infty;-1) \cup (1;\infty)$, Nullstellen $\pm\sqrt{2}$, ungerade`,
    },
    {
      id: 'ue04-a2b',
      typ: 'aufgabe',
      thema: 'Logarithmengleichungen',
      quelle: 'Übung 4, Aufgabe 2 b',
      herkunft: 'offiziell',
      rezept: 'vl06-log-strategien',
      frage: r`Bestimme maximalen Definitionsbereich, Nullstellen und Symmetrie von $f(x) = \ln(x) - \frac{1}{2}\ln(3x - 2)$.`,
      tipps: [
        r`$\frac{1}{2}\ln(3x - 2) = \ln\left(\sqrt{3x - 2}\right)$.`,
        r`Nach dem Zusammenfassen musst du quadrieren. Danach ist eine Probe Pflicht.`,
      ],
      schritte: [
        { t: r`$x > 0 \land 3x - 2 > 0 \Leftrightarrow x > \dfrac{2}{3}$, also $D = \left(\dfrac{2}{3};\infty\right)$`, q: r`VL 6, Folie 7: Für jeden Logarithmus muss das Argument $> 0$ sein; bei mehreren Logarithmen müssen alle Bedingungen gleichzeitig gelten.` },
        { t: r`$\ln\left(\dfrac{x}{\sqrt{3x - 2}}\right) = 0 \Leftrightarrow \dfrac{x}{\sqrt{3x - 2}} = 1 \Leftrightarrow x = \sqrt{3x - 2}$`, q: r`VL 5, Folie 14 (Logarithmengesetz): $\log_a(x^b) = b \cdot \log_a(x)$ mit $\frac{1}{2}$, dann VL 5, Folie 3: $a^{\frac{1}{n}} = \sqrt[n]{a}$, dann VL 5, Folie 14 (Logarithmengesetz): $\log_a\left(\frac{x}{y}\right) = \log_a(x) - \log_a(y)$. Und $\ln(y) = 0 \Leftrightarrow y = 1$.` },
        { t: r`$\Rightarrow x^2 = 3x - 2 \Leftrightarrow x^2 - 3x + 2 = 0 \Leftrightarrow x_1 = 2,\ x_2 = 1$`, w: r`Quadrieren ist keine Äquivalenzumformung, daher „$\Rightarrow$“.`, q: r`VL 1, Folie 5 und Übung 4 (offizielle Lösung zu 2b): Quadrieren ist keine Äquivalenzumformung. Deshalb „$\Rightarrow$“ und am Ende eine Probe.` },
        { t: r`Probe: $f(2) = \ln 2 - \frac{1}{2}\ln 4 = 0$ ✓ und $f(1) = \ln 1 - \frac{1}{2}\ln 1 = 0$ ✓. Beide liegen in $D$.`, q: r`VL 1, Folie 5 und Übung 4 (offizielle Lösung zu 2b): Quadrieren ist keine Äquivalenzumformung. Deshalb „$\Rightarrow$“ und am Ende eine Probe.` },
        { t: r`Symmetrie: weder noch, z. B. weil $f(1) = 0$, aber $f(-1)$ nicht definiert ist.`, q: r`VL 3, Folie 8: Für „nicht gerade“ bzw. „nicht ungerade“ genügt ein einziges $x$, für das die Gleichung falsch ist.` },
      ],
      ergebnis: r`$D = \left(\frac{2}{3};\infty\right)$, Nullstellen $x = 1$ und $x = 2$, weder gerade noch ungerade`,
      fehler: [r`Die Probe nach dem Quadrieren weglassen.`],
    },
    {
      id: 'ue04-a2c',
      typ: 'aufgabe',
      thema: 'Logarithmengleichungen',
      quelle: 'Übung 4, Aufgabe 2 c',
      herkunft: 'offiziell',
      rezept: 'vl06-log-strategien',
      frage: r`Bestimme maximalen Definitionsbereich, Nullstellen und Symmetrie von $f(x) = \log_3(x^2 - 3) + \log_3(x^2 - 1) - 1$.`,
      tipps: [
        r`Beide Bedingungen zusammen: $x^2 > 3$ (dann ist auch $x^2 > 1$).`,
        r`Zusammenfassen, $3^{(\,)}$ anwenden, ausmultiplizieren.`,
      ],
      schritte: [
        { t: r`$x^2 - 3 > 0 \land x^2 - 1 > 0 \Leftrightarrow x^2 > 3$, also $D = (-\infty;-\sqrt{3}) \cup (\sqrt{3};\infty)$`, q: r`VL 6, Folie 7: Für jeden Logarithmus muss das Argument $> 0$ sein; bei mehreren Logarithmen müssen alle Bedingungen gleichzeitig gelten. VL 6, Folie 7: Erst die Gleichung lösen ($= 0$), dann überlegen, wo der Term positiv ist. $x^2 - c$ ist eine nach oben geöffnete Parabel, also außerhalb der Nullstellen positiv.` },
        { t: r`$\log_3\left((x^2 - 3)(x^2 - 1)\right) = 1 \Leftrightarrow (x^2 - 3)(x^2 - 1) = 3$`, q: r`VL 5, Folie 14 (Logarithmengesetz): $\log_a(x \cdot y) = \log_a(x) + \log_a(y)$. Dann VL 5, Folie 11: $\log_a(a^c) = c$ und $a^{\log_a(b)} = b$. Die Exponentialfunktion zur gleichen Basis hebt den Logarithmus auf (und umgekehrt).` },
        { t: r`$\Leftrightarrow x^4 - 4x^2 + 3 = 3 \Leftrightarrow x^2(x^2 - 4) = 0$`, w: r`In der offiziellen Lösung steht in dieser Zeile „$= 1$“, das ist ein Tippfehler. Das Ergebnis stimmt.` },
        { t: r`$x = 0$ (doppelt) $\notin D$, $\ x = \pm 2 \in D$`, q: r`VL 6, Folie 8: Bei den Lösungen muss geprüft werden, ob sie im Definitionsbereich liegen.` },
        { t: r`$f(-x) = f(x)$, weil nur $x^2$ vorkommt: gerade`, q: r`Rechenregel (nicht auf den Folien): $(-x)^n = x^n$ für gerade $n$ und $(-x)^n = -x^n$ für ungerade $n$, weil sich je zwei Minuszeichen aufheben. VL 3, Folie 6: gerade heißt $f(-x) = f(x)$ für alle $x \in D$.` },
      ],
      ergebnis: r`$D = (-\infty;-\sqrt{3}) \cup (\sqrt{3};\infty)$, Nullstellen $\pm 2$, gerade`,
    },
    {
      id: 'ue04-a2d',
      typ: 'aufgabe',
      thema: 'Logarithmengleichungen',
      quelle: 'Übung 4, Aufgabe 2 d',
      herkunft: 'offiziell',
      rezept: 'vl06-log-strategien',
      frage: r`Bestimme maximalen Definitionsbereich, Nullstellen und Symmetrie von $f(x) = \log_4(-2x^2 + 10) - \log_{16}(64x^2)$.`,
      tipps: [
        r`Definitionsbereich: $-2x^2 + 10 > 0$ (Achtung beim Teilen durch $-2$) und $64x^2 > 0$.`,
        r`Verschiedene Basen. $\log_4(\ldots) = \log_{16}(\ldots)$, dann $16^{(\,)}$ und $16 = 4^2$ nutzen.`,
        r`Es entsteht eine Gleichung mit $x^4$ und $x^2$: Substitution.`,
      ],
      schritte: [
        { t: r`$-2x^2 + 10 > 0 \Leftrightarrow x^2 < 5$ und $x \ne 0$, also $D = (-\sqrt{5};0) \cup (0;\sqrt{5})$`, q: r`VL 6, Folie 7: Für jeden Logarithmus muss das Argument $> 0$ sein; bei mehreren Logarithmen müssen alle Bedingungen gleichzeitig gelten. VL 6, Folie 7: Wer eine Ungleichung mit einer negativen Zahl multipliziert oder durch sie teilt, muss das Relationszeichen umdrehen.` },
        { t: r`$16^{\log_4(-2x^2 + 10)} = (4^{\log_4(-2x^2+10)})^2 = (-2x^2 + 10)^2$, also $(-2x^2 + 10)^2 = 64x^2$`, q: r`VL 6, Folie 8: Logarithmus = Logarithmus, dann Exponentialfunktion zur Basis 16. VL 5, Folie 3 (Potenzgesetz): $(a^m)^n = a^{m \cdot n}$, also $16^c = (4^2)^c = (4^c)^2$. VL 5, Folie 11: $\log_a(a^c) = c$ und $a^{\log_a(b)} = b$. Die Exponentialfunktion zur gleichen Basis hebt den Logarithmus auf (und umgekehrt).` },
        { t: r`$\Leftrightarrow 4x^4 - 104x^2 + 100 = 0 \Leftrightarrow x^4 - 26x^2 + 25 = 0$`, q: r`Binomische Formel (Schulwissen, nicht auf den Folien): $(a - b)^2 = a^2 - 2ab + b^2$ und $: 4$.` },
        { t: r`$z = x^2$: $\ z = 13 \pm 12$, also $z = 25$ oder $z = 1$, damit $x = \pm 5$ oder $x = \pm 1$`, q: r`VL 4, Folie 5: Haben die Exponenten einen gemeinsamen Teiler $t > 1$, hilft $z = x^t$. VL 3, Folie 13 ($pq$-Formel): $x^2 + px + q = 0 \Rightarrow x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$` },
        { t: r`$\pm 5 \notin D$, $\ \pm 1 \in D$. Symmetrie: gerade`, q: r`VL 6, Folie 8: Bei den Lösungen muss geprüft werden, ob sie im Definitionsbereich liegen.` },
      ],
      ergebnis: r`$D = (-\sqrt{5};0) \cup (0;\sqrt{5})$, Nullstellen $\pm 1$, gerade`,
    },

    // ---------------- Aufgabe 3 ----------------
    {
      id: 'ue04-a3-winkel',
      typ: 'aufgabe',
      thema: 'Winkel',
      quelle: 'Übung 4, Aufgabe 3',
      herkunft: 'offiziell',
      rezept: 'vl08-bogenmass',
      frage: r`Wandle in die jeweils andere Einheit um:
a) $\alpha = 75^\circ$ $\quad$ b) $\beta = 120^\circ$ $\quad$ c) $\gamma = \frac{5\pi}{6}$ rad $\quad$ d) $\delta = \frac{5\pi}{4}$ rad $\quad$ e) $\epsilon = \frac{\pi}{8}$ rad`,
      tipps: [r`Grad mal $\frac{\pi}{180}$ ergibt Bogenmaß, Bogenmaß mal $\frac{180^\circ}{\pi}$ ergibt Grad.`],
      schritte: [
        { t: r`a) $75 \cdot \dfrac{\pi}{180} = \dfrac{5\pi}{12}$ rad $\quad$ b) $120 \cdot \dfrac{\pi}{180} = \dfrac{2\pi}{3}$ rad`, q: r`Selbststudium VL 8 (vgl. Übung 4, Aufgabe 3): $180^\circ \hat{=}\ \pi$, also $x = \alpha \cdot \frac{\pi}{180^\circ}$ und $\alpha = x \cdot \frac{180^\circ}{\pi}$.` },
        { t: r`c) $\dfrac{5\pi}{6} \cdot \dfrac{180^\circ}{\pi} = 150^\circ$ $\quad$ d) $\dfrac{5\pi}{4} \cdot \dfrac{180^\circ}{\pi} = 225^\circ$ $\quad$ e) $\dfrac{\pi}{8} \cdot \dfrac{180^\circ}{\pi} = 22{,}5^\circ$`, q: r`Selbststudium VL 8 (vgl. Übung 4, Aufgabe 3): $180^\circ \hat{=}\ \pi$, also $x = \alpha \cdot \frac{\pi}{180^\circ}$ und $\alpha = x \cdot \frac{180^\circ}{\pi}$.` },
      ],
      ergebnis: r`a) $\frac{5\pi}{12}$ $\quad$ b) $\frac{2\pi}{3}$ $\quad$ c) $150^\circ$ $\quad$ d) $225^\circ$ $\quad$ e) $22{,}5^\circ$`,
    },

    // ---------------- Aufgabe 4 ----------------
    {
      id: 'ue04-a4ab',
      typ: 'aufgabe',
      thema: 'Dreiecke',
      quelle: 'Übung 4, Aufgabe 4 a, b',
      herkunft: 'offiziell',
      rezept: 'vl08-dreieck-rezept',
      frage: r`Berechne die fehlenden Seiten und Winkel (eine Nachkommastelle):
a) $\alpha = 90^\circ,\ \beta = 35^\circ,\ c = 3{,}2$ cm
b) $\alpha = 90^\circ,\ \beta = 35^\circ,\ a = 3{,}2$ cm`,
      tipps: [
        r`Rechter Winkel bei $A$: Die Hypotenuse ist $a$, die Katheten sind $b$ und $c$.`,
        r`Von $\beta$ aus: $b$ ist Gegenkathete, $c$ Ankathete. a) $\tan(\beta) = \frac{b}{c}$. b) $\sin(\beta) = \frac{b}{a}$.`,
      ],
      schritte: [
        { t: r`a) $\gamma = 180^\circ - 90^\circ - 35^\circ = 55^\circ$`, q: r`Selbststudium VL 8 / Schulwissen: Innenwinkelsumme im Dreieck $\alpha + \beta + \gamma = 180^\circ$.` },
        { t: r`$\tan(35^\circ) = \dfrac{b}{3{,}2} \Leftrightarrow b \approx 2{,}2$ cm; $\ a = \sqrt{b^2 + c^2} \approx 3{,}9$ cm`, q: r`Selbststudium VL 8 / Schulwissen: im rechtwinkligen Dreieck $\tan = \frac{\text{Gegenkathete}}{\text{Ankathete}}$. Satz des Pythagoras (Schulwissen): $\text{Kathete}_1^2 + \text{Kathete}_2^2 = \text{Hypotenuse}^2$` },
        { t: r`b) $\gamma = 55^\circ$; $\ \sin(35^\circ) = \dfrac{b}{3{,}2} \Leftrightarrow b \approx 1{,}8$ cm; $\ c = \sqrt{a^2 - b^2} \approx 2{,}6$ cm`, q: r`Selbststudium VL 8 / Schulwissen: im rechtwinkligen Dreieck $\sin = \frac{\text{Gegenkathete}}{\text{Hypotenuse}}$. Satz des Pythagoras (Schulwissen): $\text{Kathete}_1^2 + \text{Kathete}_2^2 = \text{Hypotenuse}^2$` },
      ],
      ergebnis: r`a) $\gamma = 55^\circ$, $b \approx 2{,}2$ cm, $a \approx 3{,}9$ cm $\quad$ b) $\gamma = 55^\circ$, $b \approx 1{,}8$ cm, $c \approx 2{,}6$ cm`,
      fehler: [r`$c$ für die Hypotenuse halten. Sie liegt immer gegenüber dem rechten Winkel, hier also $a$.`],
    },
    {
      id: 'ue04-a4c',
      typ: 'aufgabe',
      thema: 'Dreiecke',
      quelle: 'Übung 4, Aufgabe 4 c',
      herkunft: 'offiziell',
      rezept: 'vl08-dreieck-rezept',
      frage: r`Berechne die fehlenden Seiten und Winkel (eine Nachkommastelle): $\alpha = 90^\circ,\ \beta = 28^\circ,\ c = 8{,}6$ cm`,
      tipps: [r`Erst $\gamma$. Dann ist $c$ die Gegenkathete von $\gamma$: $\sin(\gamma) = \frac{c}{a}$.`],
      schritte: [
        { t: r`$\gamma = 180^\circ - 90^\circ - 28^\circ = 62^\circ$`, q: r`Selbststudium VL 8 / Schulwissen: Innenwinkelsumme im Dreieck $\alpha + \beta + \gamma = 180^\circ$.` },
        { t: r`$\sin(62^\circ) = \dfrac{8{,}6}{a} \Leftrightarrow a = \dfrac{8{,}6}{\sin(62^\circ)} \approx 9{,}7$ cm`, q: r`Selbststudium VL 8 / Schulwissen: im rechtwinkligen Dreieck $\sin = \frac{\text{Gegenkathete}}{\text{Hypotenuse}}$` },
        { t: r`$b = \sqrt{a^2 - c^2} \approx 4{,}6$ cm`, q: r`Satz des Pythagoras (Schulwissen): $\text{Kathete}_1^2 + \text{Kathete}_2^2 = \text{Hypotenuse}^2$` },
      ],
      ergebnis: r`$\gamma = 62^\circ$, $a \approx 9{,}7$ cm, $b \approx 4{,}6$ cm`,
    },

    // ---------------- Aufgabe 5 (Besprechung) ----------------
    {
      id: 'ue04-a5a',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '5 a)',
      thema: 'Logarithmengleichungen',
      quelle: 'Übung 4, Aufgabe 5 a',
      herkunft: 'claude',
      rezept: 'vl06-log-strategien',
      frage: r`Bestimme den maximalen Definitionsbereich und alle Nullstellen von $f(x) = \ln(x^2 - 1) - \ln(x) - 1$.`,
      tipps: [
        r`Definitionsbereich: $x^2 - 1 > 0$ **und** $x > 0$. Was bleibt übrig?`,
        r`Die beiden Logarithmen zu einem zusammenfassen, dann $e^{(\,)}$ anwenden.`,
        r`Es entsteht $x^2 - ex - 1 = 0$. Das ist eine $pq$-Formel mit $p = -e$.`,
      ],
      schritte: [
        { t: r`$x^2 - 1 > 0 \Leftrightarrow x < -1 \lor x > 1$; zusammen mit $x > 0$: $D = (1;\infty)$`, w: r`Beide Bedingungen müssen gleichzeitig gelten. Von $(-\infty;-1) \cup (1;\infty)$ bleibt nur der positive Teil.`, q: r`VL 6, Folie 7: Für jeden Logarithmus muss das Argument $> 0$ sein; bei mehreren Logarithmen müssen alle Bedingungen gleichzeitig gelten. VL 6, Folie 7: Erst die Gleichung lösen ($= 0$), dann überlegen, wo der Term positiv ist. $x^2 - c$ ist eine nach oben geöffnete Parabel, also außerhalb der Nullstellen positiv.` },
        { t: r`$\ln(x^2 - 1) - \ln(x) = 1 \Leftrightarrow \ln\left(\dfrac{x^2 - 1}{x}\right) = 1$`, w: r`Logarithmengesetz für den Quotienten.`, q: r`VL 5, Folie 14 (Logarithmengesetz): $\log_a\left(\frac{x}{y}\right) = \log_a(x) - \log_a(y)$` },
        { t: r`$\Leftrightarrow \dfrac{x^2 - 1}{x} = e \Leftrightarrow x^2 - 1 = ex \Leftrightarrow x^2 - ex - 1 = 0$`, w: r`$e^{(\,)}$ auf beide Seiten, dann mit $x$ multiplizieren (erlaubt, weil $x > 0$).`, q: r`VL 5, Folie 12: $\ln = \log_e$, also $\ln(e^c) = c$ und $e^{\ln(b)} = b$ (VL 5, Folie 11).` },
        { t: r`$x_{1/2} = \dfrac{e}{2} \pm \sqrt{\dfrac{e^2}{4} + 1}$`, q: r`VL 3, Folie 13 ($pq$-Formel): $x^2 + px + q = 0 \Rightarrow x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$ mit $p = -e$ und $q = -1$.` },
        { t: r`$x_1 = \dfrac{e}{2} + \sqrt{\dfrac{e^2}{4} + 1} \approx 3{,}05 \in D$, $\ x_2 = \dfrac{e}{2} - \sqrt{\dfrac{e^2}{4} + 1} \approx -0{,}33 \notin D$`, q: r`VL 6, Folie 8: Bei den Lösungen muss geprüft werden, ob sie im Definitionsbereich liegen.` },
      ],
      ergebnis: r`$D = (1;\infty)$, einzige Nullstelle $x = \dfrac{e}{2} + \sqrt{\dfrac{e^2}{4} + 1} \approx 3{,}05$`,
      fehler: [
        r`$D = (-\infty;-1) \cup (1;\infty)$ angeben und $\ln(x)$ vergessen.`,
        r`$\ln(x^2 - 1) = \ln(x^2) - \ln(1)$ rechnen: Für eine Differenz im Argument gibt es kein Gesetz.`,
      ],
    },
    {
      id: 'ue04-a5b',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '5 b)',
      thema: 'Logarithmengleichungen',
      quelle: 'Übung 4, Aufgabe 5 b',
      herkunft: 'claude',
      rezept: 'vl06-log-strategien',
      frage: r`Bestimme den maximalen Definitionsbereich und alle Nullstellen von $f(x) = (\log_{10}(x))^2 - \log_{10}(x) - 2$.`,
      tipps: [
        r`Derselbe Logarithmus kommt einmal quadriert und einmal einfach vor. Welche Strategie passt?`,
        r`Substituiere $z = \log_{10}(x)$.`,
      ],
      schritte: [
        { t: r`$D = (0;\infty)$`, w: r`Nur ein Argument: $x > 0$. Das Quadrat steht außerhalb des Logarithmus.`, q: r`VL 6, Folie 7: Für jeden Logarithmus muss das Argument $> 0$ sein; bei mehreren Logarithmen müssen alle Bedingungen gleichzeitig gelten.` },
        { t: r`$z = \log_{10}(x)$: $\quad z^2 - z - 2 = 0$`, q: r`VL 6, Folie 8: Logarithmus substituieren, wenn derselbe Logarithmus mehrfach vorkommt.` },
        { t: r`$z_{1/2} = \dfrac{1}{2} \pm \sqrt{\dfrac{1}{4} + 2} = \dfrac{1}{2} \pm \dfrac{3}{2}$, also $z_1 = 2,\ z_2 = -1$`, q: r`VL 3, Folie 13 ($pq$-Formel): $x^2 + px + q = 0 \Rightarrow x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$` },
        { t: r`Rücksubstitution: $\log_{10}(x) = 2 \Rightarrow x = 10^2 = 100$; $\ \log_{10}(x) = -1 \Rightarrow x = 10^{-1} = 0{,}1$`, w: r`Anders als bei $z = e^x$ darf $z$ hier auch negativ sein: Der Logarithmus nimmt jeden reellen Wert an.`, q: r`VL 4, Folie 5, Schritt 3: Rücksubstitution, also $x^t = z_i$ für jede Lösung $z_i$ lösen. VL 5, Folie 11: $\log_a(b) = c \Leftrightarrow a^c = b$` },
        { t: r`Beide liegen in $D$.`, q: r`VL 6, Folie 8: Bei den Lösungen muss geprüft werden, ob sie im Definitionsbereich liegen.` },
      ],
      ergebnis: r`$D = (0;\infty)$, Nullstellen $x_1 = 100$ und $x_2 = 0{,}1$`,
      fehler: [
        r`$(\log_{10} x)^2$ mit $\log_{10}(x^2) = 2\log_{10}(x)$ verwechseln.`,
        r`$z = -1$ verwerfen. Negative Werte sind nur bei $z = a^x$ unmöglich, nicht bei $z = \log(x)$.`,
      ],
    },

    // ---------------- Aufgabe 6 (Besprechung) ----------------
    {
      id: 'ue04-a6-tan',
      typ: 'aufgabe',
      teil: 'besprechung',
      nr: '6',
      thema: 'Dreiecke',
      quelle: 'Übung 4, Aufgabe 6',
      herkunft: 'claude',
      rezept: 'vl08-sincostan',
      frage: r`Skizziere ein rechtwinkliges Dreieck $ABC$ mit $\gamma = 90^\circ$ und beschrifte es wie üblich. Weise dann nach, dass $\tan(\alpha) = \dfrac{\sin(\alpha)}{\cos(\alpha)}$ für $0^\circ < \alpha < 90^\circ$ gilt.`,
      plotLoesung: {
        x: [-0.6, 5.6], y: [-0.7, 3.6], u: 46,
        segments: [],
        fns: [],
        points: [[0, 0], [4.5, 0], [4.5, 3]],
        labels: [
          { at: [-0.35, -0.35], text: 'A' }, { at: [4.85, -0.35], text: 'C' }, { at: [4.85, 3.2], text: 'B' },
          { at: [2.25, -0.45], text: 'b' }, { at: [4.85, 1.5], text: 'a' }, { at: [2.0, 1.75], text: 'c' },
          { at: [0.95, 0.25], text: 'α' }, { at: [4.15, 2.25], text: 'β' }, { at: [4.2, 0.3], text: '90°' },
        ],
        polygons: [[[0, 0], [4.5, 0], [4.5, 3]]],
        noAxes: true,
        alt: 'Rechtwinkliges Dreieck mit rechtem Winkel bei C. Seite b von A nach C, Seite a von C nach B, Hypotenuse c von A nach B. Winkel α bei A, β bei B.',
      },
      tipps: [
        r`Von $\alpha$ aus: $a$ ist Gegenkathete, $b$ Ankathete, $c$ Hypotenuse.`,
        r`$\sin(\alpha) = \frac{a}{c}$ und $\cos(\alpha) = \frac{b}{c}$. Bilde den Doppelbruch.`,
        r`Durch einen Bruch teilt man, indem man mit dem Kehrwert multipliziert.`,
      ],
      schritte: [
        { t: r`Skizze: rechter Winkel bei $C$. Gegenüber von $C$ liegt die Hypotenuse $c$, gegenüber von $A$ die Seite $a$, gegenüber von $B$ die Seite $b$.` },
        { t: r`$\sin(\alpha) = \dfrac{a}{c},\quad \cos(\alpha) = \dfrac{b}{c},\quad \tan(\alpha) = \dfrac{a}{b}$`, w: r`Gegenkathete durch Hypotenuse, Ankathete durch Hypotenuse, Gegenkathete durch Ankathete.`, q: r`Selbststudium VL 8 / Schulwissen: im rechtwinkligen Dreieck $\sin = \frac{\text{Gegenkathete}}{\text{Hypotenuse}}$. Selbststudium VL 8 / Schulwissen: im rechtwinkligen Dreieck $\cos = \frac{\text{Ankathete}}{\text{Hypotenuse}}$. Selbststudium VL 8 / Schulwissen: im rechtwinkligen Dreieck $\tan = \frac{\text{Gegenkathete}}{\text{Ankathete}}$` },
        { t: r`$\dfrac{\sin(\alpha)}{\cos(\alpha)} = \dfrac{\;\frac{a}{c}\;}{\frac{b}{c}} = \dfrac{a}{c} \cdot \dfrac{c}{b} = \dfrac{a}{b}$`, w: r`Mit dem Kehrwert multiplizieren, dann $c$ kürzen.`, q: r`Bruchrechnen (Schulwissen): Durch einen Bruch teilt man, indem man mit dem Kehrwert multipliziert.` },
        { t: r`Vergleich: $\dfrac{a}{b}$ ist genau $\tan(\alpha)$. Also gilt $\tan(\alpha) = \dfrac{\sin(\alpha)}{\cos(\alpha)}$. $\quad\square$`, w: r`Die Einschränkung $0^\circ < \alpha < 90^\circ$ kommt daher, dass $\alpha$ ein spitzer Winkel im rechtwinkligen Dreieck sein muss.` },
      ],
      ergebnis: r`$\dfrac{\sin\alpha}{\cos\alpha} = \dfrac{a/c}{b/c} = \dfrac{a}{b} = \tan\alpha$`,
      fehler: [r`Den Doppelbruch falsch auflösen, z. B. $\frac{a}{c} \cdot \frac{b}{c}$ rechnen.`],
    },
  ],

  formelblatt: [],
};
