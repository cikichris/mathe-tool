// Vorlesung 06 (27.10.2026): Exponentialgleichungen, Symmetrie, Definitionsbereich bei Logarithmen
const r = String.raw;

export default {
  id: 'vl06',
  art: 'vorlesung',
  nummer: 6,
  datum: '2026-10-27',
  titel: 'Exponentialgleichungen und Definitionsbereich bei Logarithmen',
  ueberblick: r`Strategien zum Lösen von Exponentialgleichungen mit vier vorgerechneten Beispielen, Symmetrie von Exponentialfunktionen, der maximale Definitionsbereich bei Logarithmusfunktionen und Strategien für Logarithmengleichungen.`,

  karten: [
    {
      id: 'vl06-exp-strategien',
      typ: 'verfahren',
      thema: 'Exponentialgleichungen',
      quelle: 'VL 6, Folie 3',
      frage: r`Welche Strategien helfen beim Lösen von Exponentialgleichungen?`,
      antwort: r`- Umstellen auf **Potenz = Zahl**, dann Logarithmus anwenden
- Umstellen auf **Potenz = Potenz**, dann Logarithmus anwenden
- Potenz- bzw. Logarithmengesetze anwenden
- Potenz substituieren (z. B. $z = 2^x$ oder $z = e^x$)
- Satz vom Nullprodukt`,
      merke: r`Wenn dieselbe Potenz in verschiedenen Formen vorkommt ($e^{2x}$ und $e^x$, $2^x$ und $2^{-x}$), ist meist Substitution gemeint.`,
    },
    {
      id: 'vl06-exp-bsp1',
      typ: 'aufgabe',
      thema: 'Exponentialgleichungen',
      quelle: 'VL 6, Folie 4, Beispiel 1',
      herkunft: 'vorlesung',
      rezept: 'vl06-exp-strategien',
      frage: r`Bestimme die Nullstellen von $f(x) = 3 \cdot \left(\frac{1}{2}\right)^{2x} - 12$.`,
      tipps: [
        r`Stelle so um, dass die Potenz allein auf einer Seite steht.`,
        r`Aus $\left(\frac{1}{2}\right)^{2x} = 4$ wird mit $\log_{\frac{1}{2}}$ der Exponent frei.`,
      ],
      schritte: [
        { t: r`$3 \cdot \left(\frac{1}{2}\right)^{2x} - 12 = 0 \Leftrightarrow \left(\frac{1}{2}\right)^{2x} = 4 \quad (\,+12,\ :3\,)$` },
        { t: r`$\Leftrightarrow 2x = \log_{\frac{1}{2}}(4) = -2$`, w: r`$\left(\frac{1}{2}\right)^{-2} = 2^2 = 4$.` },
        { t: r`$\Leftrightarrow x = -1$` },
      ],
      ergebnis: r`$x = -1$`,
    },
    {
      id: 'vl06-exp-bsp2',
      typ: 'aufgabe',
      thema: 'Exponentialgleichungen',
      quelle: 'VL 6, Folie 4, Beispiel 2',
      herkunft: 'vorlesung',
      rezept: 'vl06-exp-strategien',
      frage: r`Bestimme die Nullstellen von $f(x) = 2^x + 4 \cdot 2^{-x} - 5$.`,
      tipps: [
        r`Schreibe $2^{-x} = \frac{1}{2^x}$. Dann kommt nur noch $2^x$ vor.`,
        r`Substituiere $z = 2^x$ und multipliziere mit $z$.`,
      ],
      schritte: [
        { t: r`$2^x + 4 \cdot \dfrac{1}{2^x} - 5 = 0$` },
        { t: r`$z = 2^x$: $\quad z + \dfrac{4}{z} - 5 = 0 \Leftrightarrow z^2 - 5z + 4 = 0 \quad (\,\cdot z\,)$`, w: r`Multiplizieren mit $z$ ist erlaubt, weil $z = 2^x > 0$ ist.` },
        { t: r`$z_{1/2} = \dfrac{5}{2} \pm \sqrt{\dfrac{25}{4} - 4} = \dfrac{5}{2} \pm \dfrac{3}{2}$, also $z_1 = 4,\ z_2 = 1$` },
        { t: r`Rücksubstitution: $2^x = 4 \Rightarrow x_1 = \log_2(4) = 2$; $\ 2^x = 1 \Rightarrow x_2 = \log_2(1) = 0$` },
      ],
      ergebnis: r`$x_1 = 2,\ x_2 = 0$`,
    },
    {
      id: 'vl06-exp-bsp3',
      typ: 'aufgabe',
      thema: 'Exponentialgleichungen',
      quelle: 'VL 6, Folie 4, Beispiel 3',
      herkunft: 'vorlesung',
      rezept: 'vl06-exp-strategien',
      frage: r`Bestimme die Nullstellen von $f(x) = e^{x+1} - 2^x$.`,
      tipps: [
        r`Bring die beiden Potenzen auf verschiedene Seiten: $e^{x+1} = 2^x$.`,
        r`Wende $\ln$ auf beide Seiten an und nutze $\ln(2^x) = x \ln(2)$.`,
        r`Alle $x$ auf eine Seite und $x$ ausklammern.`,
      ],
      schritte: [
        { t: r`$e^{x+1} = 2^x \quad (\,+2^x\,)$`, w: r`Potenz = Potenz mit verschiedenen Basen: Logarithmus auf beiden Seiten.` },
        { t: r`$\Leftrightarrow x + 1 = \ln(2^x) = x \cdot \ln(2) \quad (\,\ln\,)$` },
        { t: r`$\Leftrightarrow 1 = x \ln(2) - x = x \cdot (\ln(2) - 1)$`, w: r`$x$ ausklammern, damit es nur noch einmal vorkommt.` },
        { t: r`$\Leftrightarrow x = \dfrac{1}{\ln(2) - 1} \approx -3{,}26$` },
      ],
      ergebnis: r`$x = \dfrac{1}{\ln(2) - 1} \approx -3{,}26$`,
      fehler: [
        r`$x + 1 = x \ln(2)$ durch $x$ teilen wollen: $x$ steht auf beiden Seiten, also erst sammeln und ausklammern.`,
      ],
    },
    {
      id: 'vl06-exp-bsp4',
      typ: 'aufgabe',
      thema: 'Exponentialgleichungen',
      quelle: 'VL 6, Folie 4, Beispiel 4',
      herkunft: 'vorlesung',
      rezept: 'vl03-nullprodukt',
      frage: r`Bestimme die Nullstellen von $f(x) = (e^x - 1) \cdot (e^x - 2)$.`,
      tipps: [r`Es steht schon ein Produkt da, das gleich null sein soll.`],
      schritte: [
        { t: r`$e^x - 1 = 0 \,\lor\, e^x - 2 = 0$`, w: r`Satz vom Nullprodukt. Nicht ausmultiplizieren!` },
        { t: r`$e^x = 1 \,\lor\, e^x = 2$` },
        { t: r`$x_1 = \ln(1) = 0,\quad x_2 = \ln(2)$` },
      ],
      ergebnis: r`$x_1 = 0,\ x_2 = \ln(2) \approx 0{,}69$`,
    },
    {
      id: 'vl06-exp-symmetrie',
      typ: 'aufgabe',
      thema: 'Symmetrie',
      quelle: 'VL 6, Folien 5 und 6',
      herkunft: 'vorlesung',
      rezept: 'vl03-symmetrie-rezept',
      frage: r`Untersuche auf Symmetrie:
a) $f(x) = e^{-2x}$
b) $f(x) = e^{x^2 + 1}$
c) $f(x) = e^x - e^{-x}$`,
      tipps: [
        r`Erst $f(1)$ und $f(-1)$ vergleichen, um eine Vermutung zu bekommen.`,
        r`Für den Nachweis $f(-x)$ allgemein ausrechnen.`,
      ],
      schritte: [
        { t: r`a) $f(1) = e^{-2} \approx 0{,}135$, $\ f(-1) = e^2 \approx 7{,}389$: weder $f(1)$ noch $-f(1)$, also weder gerade noch ungerade.` },
        { t: r`b) $f(-x) = e^{(-x)^2 + 1} = e^{x^2 + 1} = f(x)$ für alle $x$, also gerade.` },
        { t: r`c) $f(-x) = e^{-x} - e^{x}$ und $-f(x) = -(e^x - e^{-x}) = -e^x + e^{-x}$` },
        { t: r`Also $f(-x) = -f(x)$ für alle $x$: $f$ ist ungerade.` },
      ],
      ergebnis: r`a) weder noch $\quad$ b) gerade $\quad$ c) ungerade`,
    },
    {
      id: 'vl06-log-defbereich',
      typ: 'verfahren',
      thema: 'Definitionsbereich',
      quelle: 'VL 6, Folie 7',
      frage: r`Wie bestimmst du den maximalen Definitionsbereich einer Funktion mit Logarithmus, z. B. $f(x) = \log_a(p(x))$?`,
      antwort: r`1. Für **jeden** Logarithmus die Ungleichung **Argument $> 0$** aufstellen, hier $p(x) > 0$.
2. Ungleichung lösen. Manchmal ist es leichter, erst die Gleichung $p(x) = 0$ zu lösen und dann zu überlegen, wo $p(x)$ positiv ist (z. B. über die Form der Parabel).
3. Bei mehreren Logarithmen die Lösungsmengen kombinieren: Es müssen **alle** Bedingungen gleichzeitig gelten.`,
      merke: r`**Achtung:** Beim Multiplizieren oder Dividieren mit einer **negativen** Zahl dreht sich das Relationszeichen um ($>$ wird $<$).`,
    },
    {
      id: 'vl06-ungleichung-mc',
      typ: 'verstaendnis',
      thema: 'Definitionsbereich',
      quelle: 'VL 6, Folie 7',
      herkunft: 'zusatz',
      frage: r`Was ist die Lösungsmenge von $-2x + 6 > 0$?`,
      optionen: [r`$x < 3$`, r`$x > 3$`, r`$x > -3$`, r`$x < -3$`],
      richtig: 0,
      erklaerung: r`$-2x > -6$. Beim Teilen durch $-2$ dreht sich das Zeichen um: $x < 3$. Probe mit $x = 0$: $6 > 0$ stimmt.`,
    },
    {
      id: 'vl06-log-strategien',
      typ: 'verfahren',
      thema: 'Logarithmengleichungen',
      quelle: 'VL 6, Folie 8',
      frage: r`Welche Strategien helfen beim Lösen von Logarithmengleichungen, und was darfst du am Ende nicht vergessen?`,
      antwort: r`- Umstellen auf **Logarithmus = Zahl**, dann Exponentialfunktion anwenden (z. B. $e^{(\,)}$ bei $\ln$)
- Umstellen auf **Logarithmus = Logarithmus**, dann Exponentialfunktion anwenden
- Logarithmen- bzw. Potenzgesetze anwenden (mehrere Logarithmen zu einem zusammenfassen)
- Logarithmus substituieren (z. B. $z = \log_{10}(x)$)
- Satz vom Nullprodukt

**Am Ende immer prüfen, ob die Lösungen im Definitionsbereich liegen!**`,
      merke: r`Zuerst den Definitionsbereich bestimmen, dann rechnen, dann aussortieren.`,
    },
    {
      id: 'vl06-log-bsp1',
      typ: 'aufgabe',
      thema: 'Logarithmengleichungen',
      quelle: 'VL 6, Folie 9, Beispiel 1',
      herkunft: 'vorlesung',
      rezept: 'vl06-log-strategien',
      frage: r`Bestimme maximalen Definitionsbereich und Nullstellen von $f(x) = \ln(3x - 4) - 2$.`,
      tipps: [
        r`Definitionsbereich: $3x - 4 > 0$.`,
        r`Nullstellen: Logarithmus allein stellen, dann $e^{(\,)}$ auf beide Seiten.`,
      ],
      schritte: [
        { t: r`$3x - 4 > 0 \Leftrightarrow x > \dfrac{4}{3}$, also $D = \left(\dfrac{4}{3};\infty\right)$` },
        { t: r`$\ln(3x - 4) - 2 = 0 \Leftrightarrow \ln(3x - 4) = 2$` },
        { t: r`$\Leftrightarrow 3x - 4 = e^2 \quad (\,e^{(\,)}\,)$`, w: r`$e^{\ln(y)} = y$: Die Exponentialfunktion hebt den Logarithmus auf.` },
        { t: r`$\Leftrightarrow x = \dfrac{e^2 + 4}{3} \approx 3{,}80 \in D$` },
      ],
      ergebnis: r`$D = \left(\frac{4}{3};\infty\right)$, Nullstelle $x = \dfrac{e^2 + 4}{3} \approx 3{,}80$`,
    },
  ],

  formelblatt: [
    {
      id: 'fb-exp-gleichungen',
      titel: 'Exponentialgleichungen',
      inhalt: r`Potenz = Zahl bzw. Potenz = Potenz, dann log. Gleiche Potenz in zwei Formen ($e^{2x}, e^x$): $z = e^x$, nur $z > 0$ zurückführen.`,
    },
    {
      id: 'fb-log-gleichungen',
      titel: 'Log-Gleichungen',
      inhalt: r`Erst $D$: jedes Argument $> 0$. Logs zusammenfassen, dann $a^{(\,)}$ anwenden. Am Ende Lösungen gegen $D$ prüfen (nach Quadrieren Probe!).`,
    },
  ],
};
