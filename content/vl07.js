// Vorlesung 07 (02.11.2026): Logarithmengleichungen, Symmetrie von Logarithmusfunktionen
const r = String.raw;

export default {
  id: 'vl07',
  art: 'vorlesung',
  nummer: 7,
  datum: '2026-11-02',
  titel: 'Logarithmengleichungen und Symmetrie',
  ueberblick: r`Die Beispiele aus Vorlesung 6 werden zu Ende gerechnet: Definitionsbereich bestimmen, Logarithmen zusammenfassen, Lösungen gegen den Definitionsbereich prüfen. Dazu Symmetrie bei Logarithmusfunktionen.`,

  karten: [
    {
      id: 'vl07-log-bsp2',
      typ: 'aufgabe',
      thema: 'Logarithmengleichungen',
      quelle: 'VL 7, Folie 4, Beispiel 2',
      herkunft: 'vorlesung',
      rezept: 'vl06-log-strategien',
      frage: r`Bestimme maximalen Definitionsbereich und Nullstellen von $f(x) = \ln(x) - \ln(x^2) - 4$.`,
      tipps: [
        r`Definitionsbereich: $x > 0$ und $x^2 > 0$. Was bleibt übrig?`,
        r`Fasse die beiden Logarithmen zu einem zusammen und kürze.`,
      ],
      schritte: [
        { t: r`$x > 0$ und $x^2 > 0 \Leftrightarrow x \ne 0$. Beides zusammen: $D = (0;\infty)$`, w: r`Bei mehreren Logarithmen müssen alle Bedingungen gleichzeitig gelten.` },
        { t: r`$\ln(x) - \ln(x^2) - 4 = 0 \Leftrightarrow \ln\left(\dfrac{x}{x^2}\right) - 4 = 0 \Leftrightarrow \ln\left(\dfrac{1}{x}\right) = 4$` },
        { t: r`$\Leftrightarrow \dfrac{1}{x} = e^4 \Leftrightarrow x = \dfrac{1}{e^4} \in D$` },
      ],
      ergebnis: r`$D = (0;\infty)$, Nullstelle $x = \dfrac{1}{e^4} = e^{-4} \approx 0{,}018$`,
    },
    {
      id: 'vl07-log-bsp3',
      typ: 'aufgabe',
      thema: 'Logarithmengleichungen',
      quelle: 'VL 7, Folie 4, Beispiel 3',
      herkunft: 'vorlesung',
      rezept: 'vl06-log-strategien',
      frage: r`Bestimme maximalen Definitionsbereich und Nullstellen von $f(x) = \log_2(x) + 3\log_2(2x) - 7$.`,
      tipps: [
        r`$3\log_2(2x) = \log_2\left((2x)^3\right)$.`,
        r`Nach dem Zusammenfassen: $\log_2(8x^4) = 7$, dann $2^{(\,)}$ anwenden.`,
        r`Prüfe beide Lösungen gegen den Definitionsbereich.`,
      ],
      schritte: [
        { t: r`$x > 0$ und $2x > 0$, also $D = (0;\infty)$` },
        { t: r`$\log_2(x) + \log_2(8x^3) = 7 \Leftrightarrow \log_2(8x^4) = 7$`, w: r`Erst $b \cdot \log_a(x) = \log_a(x^b)$, dann Summe zu Produkt.` },
        { t: r`$\Leftrightarrow 8x^4 = 2^7 = 128 \Leftrightarrow x^4 = 16$` },
        { t: r`$x_1 = 2 \in D,\quad x_2 = -2 \notin D$` },
      ],
      ergebnis: r`$D = (0;\infty)$, einzige Nullstelle $x = 2$`,
      fehler: [r`$x = -2$ mit angeben: Für negative $x$ ist $\log_2(x)$ nicht definiert.`],
    },
    {
      id: 'vl07-log-bsp4',
      typ: 'aufgabe',
      thema: 'Logarithmengleichungen',
      quelle: 'VL 7, Folie 4, Beispiel 4',
      herkunft: 'vorlesung',
      rezept: 'vl06-log-strategien',
      frage: r`Bestimme maximalen Definitionsbereich und Nullstellen von $f(x) = \log_8(4x) - \log_2(x)$.`,
      tipps: [
        r`Verschiedene Basen. Stell auf Logarithmus = Logarithmus um und wende $8^{(\,)}$ an.`,
        r`$8 = 2^3$, also $8^{\log_2(x)} = 2^{3\log_2(x)} = 2^{\log_2(x^3)} = x^3$.`,
      ],
      schritte: [
        { t: r`$4x > 0$ und $x > 0$, also $D = (0;\infty)$` },
        { t: r`$\log_8(4x) = \log_2(x) \Leftrightarrow 4x = 8^{\log_2(x)} \quad (\,8^{(\,)}\,)$` },
        { t: r`$8^{\log_2(x)} = (2^3)^{\log_2(x)} = 2^{3\log_2(x)} = 2^{\log_2(x^3)} = x^3$`, w: r`Potenzgesetz, dann Logarithmengesetz rückwärts, dann $a^{\log_a(b)} = b$.` },
        { t: r`$4x = x^3 \Leftrightarrow x(x^2 - 4) = 0 \Leftrightarrow x = 0 \,\lor\, x = 2 \,\lor\, x = -2$` },
        { t: r`Nur $x = 2$ liegt in $D$.` },
      ],
      ergebnis: r`$D = (0;\infty)$, einzige Nullstelle $x = 2$`,
    },
    {
      id: 'vl07-log-symmetrie',
      typ: 'aufgabe',
      thema: 'Symmetrie',
      quelle: 'VL 7, Folien 5 und 6',
      herkunft: 'vorlesung',
      rezept: 'vl03-symmetrie-rezept',
      frage: r`Untersuche auf Symmetrie:
a) $f(x) = \ln(4x^2)$
b) $f(x) = \log_2(x^3)$`,
      tipps: [
        r`Bestimme zuerst den Definitionsbereich. Liegt mit $x$ auch $-x$ darin?`,
        r`b) Was ist $f(-1)$?`,
      ],
      schritte: [
        { t: r`a) $D = \mathbb{R} \setminus \{0\}$. $\ f(-x) = \ln\left(4(-x)^2\right) = \ln(4x^2) = f(x)$ für alle $x \in D$, also gerade.` },
        { t: r`b) $f(1) = \log_2(1) = 0$, aber $f(-1) = \log_2(-1)$ ist nicht definiert.`, w: r`$D = (0;\infty)$: Der Graph liegt nur rechts der $y$-Achse und kann gar nicht symmetrisch sein.` },
        { t: r`Also ist $f$ in b) weder gerade noch ungerade.` },
      ],
      ergebnis: r`a) gerade $\quad$ b) weder gerade noch ungerade`,
    },
    {
      id: 'vl07-symmetrie-d-mc',
      typ: 'verstaendnis',
      thema: 'Symmetrie',
      quelle: 'VL 7, Folie 6',
      herkunft: 'zusatz',
      frage: r`Der Definitionsbereich einer Funktion ist $D = (0;\infty)$. Was gilt für die Symmetrie?`,
      optionen: [
        r`Sie ist sicher weder gerade noch ungerade.`,
        r`Das hängt von der Funktionsvorschrift ab.`,
        r`Sie ist sicher gerade.`,
      ],
      richtig: 0,
      erklaerung: r`Für Symmetrie muss mit jedem $x$ auch $-x$ im Definitionsbereich liegen. Bei $D = (0;\infty)$ ist $f(-x)$ für kein $x \in D$ definiert.`,
    },
  ],

  formelblatt: [
    {
      id: 'fb-log-zurueck',
      titel: 'Log auflösen',
      standard: false,
      inhalt: r`$a^{\log_a(b)} = b$, $\ \log_a(a^c) = c$, $\ e^{\ln x} = x$; Basiswechsel: $\log_a b = \frac{\ln b}{\ln a}$`,
    },
  ],
};
