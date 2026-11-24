// Vorlesung 2 (13.10.2026) durchgehen: affin-lineare Funktionen, Steigung, Anwendung, Lage von Geraden
const r = String.raw;

export default {
  unit: 'vl02',
  abschnitte: [
    {
      id: 'vl02-d01',
      folien: '3–4',
      titel: 'Affin-lineare Funktionen zeichnen',
      folie: r`$f(x) = m \cdot x + b$ heißt affin-linear, der Graph ist eine Gerade. $m$ ist die Steigung, $b$ der y-Achsenabschnitt.

Beispiele 1: $f(x) = \frac{2}{3}x - 1$ und $g(x) = -2x - 1$`,
      notizen: [
        { t: r`Beide starten bei $b = -1$ auf der y-Achse.`, w: r`Der y-Achsenabschnitt ist der Punkt $(0 \mid b)$.` },
        { t: r`$f$: Steigungsdreieck 3 nach rechts, 2 nach oben. So kommt man zum Punkt $(3 \mid 1)$.`, w: r`$m = \frac{2}{3}$ heißt: pro 3 Schritte nach rechts 2 nach oben. Mit dem Nenner als Schrittweite bleibt man auf ganzen Kästchen.` },
        { t: r`$g$: 1 nach rechts, 2 nach unten. So kommt man zu $(1 \mid -3)$.`, w: r`$m = -2 = \frac{-2}{1}$: negative Steigung, die Gerade fällt.` },
      ],
      plot: {
        x: [-2.5, 8], y: [-3.5, 4.5], u: 30,
        fns: [{ f: (x) => (2 / 3) * x - 1 }, { f: (x) => -2 * x - 1 }],
        points: [[0, -1], [3, 1], [1, -3]],
        segments: [{ from: [0, -1], to: [3, -1] }, { from: [3, -1], to: [3, 1] }],
        alt: 'Geraden 2/3 x − 1 und −2x − 1 mit Steigungsdreieck',
      },
      kern: r`Zeichnen: Bei $b$ auf der y-Achse starten, dann mit dem Steigungsdreieck (Nenner nach rechts, Zähler nach oben) den zweiten Punkt finden.`,
      karten: ['vl02-affin-def', 'vl02-verlauf-mc', 'vl02-zeichnen'],
    },
    {
      id: 'vl02-d02',
      folien: '5',
      titel: 'Funktionsgleichung aus dem Graphen ablesen',
      folie: r`Eine fallende Gerade im Koordinatensystem. Gesucht: ihre Funktionsgleichung.`,
      notizen: [
        { t: r`$f: \mathbb{R} \to \mathbb{R}$, $f(x) = m \cdot x + b$`, w: r`Ansatz hinschreiben.` },
        { t: r`$b = 2$`, w: r`Die Gerade schneidet die y-Achse bei 2.` },
        { t: r`Steigungsdreieck: von $(0 \mid 2)$ aus 2,5 nach rechts und $-1$ nach unten zum Punkt $(2{,}5 \mid 1)$.`, w: r`Zwei gut ablesbare Punkte wählen.` },
        { t: r`$m = \frac{-1}{2{,}5} = -\frac{2}{5}$`, w: r`Höhenunterschied durch Breite. Mit 2 erweitern: $\frac{-2}{5}$.` },
        { t: r`$\Rightarrow f(x) = -\frac{2}{5}x + 2$`, w: r`` },
      ],
      kern: r`Ablesen: $b$ an der y-Achse, $m$ über ein Steigungsdreieck zwischen zwei gut lesbaren Punkten.`,
      karten: ['vl02-ablesen-aufgabe', 'vl02-ablesen-rezept'],
    },
    {
      id: 'vl02-d03',
      folien: '6',
      titel: 'Steigung durch zwei Punkte',
      folie: r`Durch $P_1(x_1; y_1)$ und $P_2(x_2; y_2)$ mit $x_1 \ne x_2$ gibt es genau eine Gerade mit
$$m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\Delta y}{\Delta x}.$$`,
      kern: r`Steigung = Unterschied der y-Werte durch Unterschied der x-Werte. Dann $b$ durch Einsetzen eines Punktes.`,
      check: { frage: r`Gerade durch $(1 \mid 2)$ und $(3 \mid 8)$?`, antwort: r`$m = \frac{8 - 2}{3 - 1} = 3$. Einsetzen: $2 = 3 \cdot 1 + b$, also $b = -1$ und $f(x) = 3x - 1$.` },
      karten: ['vl02-steigung-formel', 'vl02-zwei-punkte-rezept', 'vl02-zwei-punkte-aufgabe'],
    },
    {
      id: 'vl02-d04',
      folien: '7 und Notizseite',
      titel: 'Anwendung: Gastarif',
      folie: r`Tarif: Grundgebühr 157,35 € pro Jahr, Arbeitspreis 9,08 ct/kWh.

a) Funktion für den Jahrespreis in Abhängigkeit vom Verbrauch aufstellen und skizzieren.
b) 12 Abschläge à 100 €: Wie hoch darf der Verbrauch höchstens sein, damit nichts nachzuzahlen ist?`,
      notizen: [
        { t: r`a) $x$: Erdgasverbrauch in kWh, $f(x)$: Gesamtpreis in einem Jahr in €`, w: r`Zuerst die Variablen mit Einheit festlegen.` },
        { t: r`$f: [0; \infty) \to [157{,}35; \infty)$, $f(x) = 0{,}0908x + 157{,}35$`, w: r`9,08 ct = 0,0908 € pro kWh ist die Steigung, die Grundgebühr der y-Achsenabschnitt. Verbrauch kann nicht negativ sein.` },
        { t: r`Skizze: Gerade beginnt bei 157,35 auf der Preisachse, bei 10 000 kWh etwa 1065 €.`, w: r`$0{,}0908 \cdot 10000 + 157{,}35 = 1065{,}35$.` },
        { t: r`b) $0{,}0908x + 157{,}35 = 1200 \iff 0{,}0908x = 1042{,}65 \iff x \approx 11482{,}93$`, w: r`$12 \cdot 100 = 1200$ € gezahlt. Grundgebühr abziehen, durch den Arbeitspreis teilen.` },
        { t: r`D. h. die Familie darf maximal 11 482,93 kWh verbrauchen, um nichts nachzuzahlen.`, w: r`Antwortsatz mit Einheit nicht vergessen.` },
      ],
      kern: r`Fixkosten = $b$, Kosten pro Einheit = $m$. Mit Einheiten in Euro umrechnen (ct → €).`,
      karten: ['vl02-tarif-aufgabe', 'vl02-anwendung-rezept'],
    },
    {
      id: 'vl02-d05',
      folien: '8–9',
      titel: 'Lage zweier Geraden und Schnittpunkt',
      folie: r`Zwei Geraden $f(x) = m_1 x + b_1$ und $g(x) = m_2 x + b_2$ können identisch, echt parallel oder sich in einem Punkt schneiden.

Beispiel: $f(x) = 2x + 7$, $g(x) = -x - 2$. Gesucht: Schnittpunkt, sofern vorhanden.`,
      notizen: [
        { t: r`Identisch: $m_1 = m_2$ und $b_1 = b_2$. Echt parallel: $m_1 = m_2$ und $b_1 \ne b_2$. Schnittpunkt: $m_1 \ne m_2$.`, w: r`Ein Blick auf die Steigungen reicht für die Entscheidung.` },
        { t: r`$m_1 = 2$, $m_2 = -1$, d. h. $m_1 \ne m_2 \Rightarrow$ Es gibt einen Schnittpunkt.`, w: r`` },
        { t: r`Gleichsetzen: $f(x) = g(x) \iff 2x + 7 = -x - 2 \quad | +x - 7$`, w: r`Am Schnittpunkt haben beide Geraden dieselbe Höhe.` },
        { t: r`$\iff 3x = -9 \quad | :3 \iff x = -3$`, w: r`` },
        { t: r`$g(-3) = -(-3) - 2 = 1 \Rightarrow S(-3; 1)$`, w: r`x-Wert in eine der beiden Gleichungen einsetzen. Zur Kontrolle: $f(-3) = -6 + 7 = 1$. ✓` },
      ],
      kern: r`Steigungen vergleichen, dann gleichsetzen, nach $x$ lösen, $y$ durch Einsetzen.`,
      karten: ['vl02-lage', 'vl02-lage-mc', 'vl02-schnittpunkt-rezept', 'vl02-schnittpunkt-aufgabe'],
    },
  ],
};
