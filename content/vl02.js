// Vorlesung 02 (13.10.2026): Affin-lineare Funktionen
const r = String.raw;

export default {
  id: 'vl02',
  art: 'vorlesung',
  nummer: 2,
  datum: '2026-10-13',
  titel: 'Affin-lineare Funktionen',
  ueberblick: r`Geraden $f(x) = mx + b$: Steigung und $y$-Achsenabschnitt, Gerade zeichnen und ablesen, Gerade durch zwei Punkte, Anwendungsaufgaben, Lage zweier Geraden und Schnittpunkt.`,

  karten: [
    {
      id: 'vl02-affin-def',
      typ: 'definition',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 3',
      frage: r`Was ist eine affin-lineare Funktion, und was bedeuten $m$ und $b$?`,
      antwort: r`Eine Funktion $f: \mathbb{R} \to \mathbb{R}$, deren Vorschrift sich als

$$f(x) = m \cdot x + b \quad \text{mit } m, b \in \mathbb{R}$$

schreiben lässt. Ihr Graph ist eine **Gerade**.

- $m$ = **Steigung** der Geraden
- $b$ = **$y$-Achsenabschnitt** (dort schneidet die Gerade die $y$-Achse, denn $f(0) = b$)`,
      merke: r`$m > 0$: Gerade steigt. $m < 0$: Gerade fällt. $m = 0$: waagerechte Gerade.`,
    },
    {
      id: 'vl02-verlauf-mc',
      typ: 'verstaendnis',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 4',
      frage: r`Wie verläuft die Gerade zu $g(x) = -2x - 1$?`,
      optionen: [
        r`Sie steigt und schneidet die $y$-Achse bei $-1$.`,
        r`Sie fällt und schneidet die $y$-Achse bei $-1$.`,
        r`Sie fällt und schneidet die $y$-Achse bei $-2$.`,
        r`Sie steigt und schneidet die $y$-Achse bei $-2$.`,
      ],
      richtig: 1,
      erklaerung: r`$m = -2 < 0$, also fällt die Gerade: pro Schritt 1 nach rechts geht es 2 nach unten. $b = -1$ ist der $y$-Achsenabschnitt.`,
    },
    {
      id: 'vl02-zeichnen',
      typ: 'verfahren',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 4',
      frage: r`Wie zeichnest du die Gerade zu $f(x) = \frac{2}{3}x - 1$ ohne Wertetabelle?`,
      antwort: r`1. **$y$-Achsenabschnitt markieren:** $b = -1$, also Punkt $(0; -1)$.
2. **Steigungsdreieck anlegen:** $m = \frac{2}{3} = \frac{\Delta y}{\Delta x}$, also 3 nach rechts und 2 nach oben. Das führt zum Punkt $(3; 1)$.
3. **Gerade** durch beide Punkte zeichnen.`,
      plotAntwort: {
        x: [-2.5, 6.5], y: [-2.6, 3.6], u: 38,
        fns: [{ f: (x) => (2 / 3) * x - 1 }],
        segments: [{ from: [0, -1], to: [3, -1] }, { from: [3, -1], to: [3, 1] }],
        points: [[0, -1], [3, 1]],
        labels: [{ at: [1.5, -1.45], text: '3' }, { at: [3.3, 0], text: '2' }],
        alt: 'Gerade durch (0; −1) und (3; 1) mit Steigungsdreieck: 3 nach rechts, 2 nach oben',
      },
      merke: r`Bei ganzzahliger Steigung, z. B. $m = -2 = \frac{-2}{1}$: 1 nach rechts, 2 nach unten.`,
    },
    {
      id: 'vl02-ablesen-aufgabe',
      typ: 'aufgabe',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 5 (Beispiel 2)',
      herkunft: 'vorlesung',
      rezept: 'vl02-ablesen-rezept',
      frage: r`Bestimme die Funktionsvorschrift der abgebildeten Geraden.`,
      plot: {
        x: [-3.4, 3.4], y: [-0.6, 3.6], grid: 0.5,
        fns: [{ f: (x) => -0.4 * x + 2, from: -3, to: 3 }],
        alt: 'Fallende Gerade, die die y-Achse bei 2 schneidet und durch den Punkt (2,5; 1) geht',
      },
      tipps: [
        r`Ansatz: $f(x) = mx + b$. Lies zuerst $b$ an der $y$-Achse ab.`,
        r`Für die Steigung brauchst du einen zweiten Punkt, den du genau ablesen kannst. Schau bei $y = 1$.`,
        r`Vom Punkt $(0; 2)$ zum Punkt $(2{,}5; 1)$: Wie weit geht es nach rechts, wie weit nach unten?`,
      ],
      schritte: [
        { t: r`Ansatz: $f: \mathbb{R} \to \mathbb{R},\ f(x) = m \cdot x + b$`, w: r`Der Graph ist eine Gerade, also ist die Funktion affin-linear.` },
        { t: r`$y$-Achsenabschnitt ablesen: $b = 2$` },
        { t: r`Steigungsdreieck von $(0; 2)$ nach $(2{,}5; 1)$: $\Delta x = 2{,}5$ und $\Delta y = -1$`, w: r`Es geht nach unten, deshalb ist $\Delta y$ negativ.` },
        { t: r`$m = \dfrac{\Delta y}{\Delta x} = \dfrac{-1}{2{,}5} = -\dfrac{2}{5}$` },
        { t: r`$f(x) = -\dfrac{2}{5}x + 2$` },
      ],
      ergebnis: r`$f(x) = -\dfrac{2}{5}x + 2$`,
      fehler: [
        r`Vorzeichen vergessen: Eine fallende Gerade hat eine negative Steigung.`,
        r`$\Delta x$ und $\Delta y$ vertauschen: Es ist immer „Höhe durch Breite“, also $\frac{\Delta y}{\Delta x}$.`,
      ],
    },
    {
      id: 'vl02-ablesen-rezept',
      typ: 'verfahren',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 5',
      frage: r`Wie liest du die Funktionsvorschrift einer Geraden aus ihrem Graphen ab?`,
      antwort: r`1. Ansatz $f(x) = mx + b$.
2. **$b$ ablesen:** Schnittstelle mit der $y$-Achse.
3. **Zweiten Punkt suchen**, der sich genau ablesen lässt (am besten auf einem Gitterpunkt).
4. **Steigungsdreieck:** $m = \dfrac{\Delta y}{\Delta x}$, mit Vorzeichen (nach unten = negativ).
5. Einsetzen und mit einem dritten Punkt kontrollieren.`,
    },
    {
      id: 'vl02-steigung-formel',
      typ: 'formel',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 6',
      frage: r`Wie berechnest du die Steigung der Geraden durch $P_1(x_1; y_1)$ und $P_2(x_2; y_2)$?`,
      antwort: r`Für $x_1 \ne x_2$ gilt:

$$m = \frac{y_2 - y_1}{x_2 - x_1} = \frac{\Delta y}{\Delta x}$$

Durch zwei verschiedene Punkte gibt es genau eine Gerade.`,
      merke: r`Oben und unten dieselbe Reihenfolge der Punkte verwenden. Bei $x_1 = x_2$ ist die Gerade senkrecht und kein Funktionsgraph.`,
    },
    {
      id: 'vl02-zwei-punkte-rezept',
      typ: 'verfahren',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 6',
      frage: r`Wie bestimmst du die Funktionsvorschrift der Geraden durch zwei gegebene Punkte?`,
      antwort: r`1. **Steigung:** $m = \dfrac{y_2 - y_1}{x_2 - x_1}$
2. **$b$ bestimmen:** einen der Punkte in $y = mx + b$ einsetzen und nach $b$ auflösen.
3. **Vorschrift hinschreiben:** $f(x) = mx + b$
4. **Probe** mit dem anderen Punkt.`,
      merke: r`Kurzform für Schritt 2: $b = y_1 - m \cdot x_1$.`,
    },
    {
      id: 'vl02-zwei-punkte-aufgabe',
      typ: 'aufgabe',
      thema: 'Geraden',
      quelle: 'Übungsvariante zu VL 2, Folie 6',
      herkunft: 'zusatz',
      rezept: 'vl02-zwei-punkte-rezept',
      frage: r`Bestimme die affin-lineare Funktion, deren Graph durch die Punkte $(-2; 5)$ und $(4; -1)$ verläuft.`,
      tipps: [
        r`Ansatz $f(x) = mx + b$. Berechne zuerst die Steigung aus den beiden Punkten.`,
        r`$m = \dfrac{-1 - 5}{4 - (-2)}$. Achte auf das doppelte Minus im Nenner.`,
        r`Setze dann einen Punkt ein, z. B. $5 = m \cdot (-2) + b$.`,
      ],
      schritte: [
        { t: r`$m = \dfrac{y_2 - y_1}{x_2 - x_1} = \dfrac{-1 - 5}{4 - (-2)} = \dfrac{-6}{6} = -1$`, w: r`Zwei Punkte legen die Steigung fest.` },
        { t: r`Punkt $(-2; 5)$ einsetzen: $5 = -1 \cdot (-2) + b \Leftrightarrow 5 = 2 + b \Leftrightarrow b = 3$`, w: r`Der Punkt liegt auf der Geraden, also muss seine Koordinaten die Gleichung erfüllen.` },
        { t: r`$f(x) = -x + 3$` },
        { t: r`Probe mit $(4; -1)$: $f(4) = -4 + 3 = -1$ ✓` },
      ],
      ergebnis: r`$f(x) = -x + 3$`,
      fehler: [
        r`Im Nenner $4 - 2$ statt $4 - (-2)$ rechnen.`,
        r`Die Reihenfolge der Punkte oben und unten verschieden wählen. Das dreht das Vorzeichen von $m$ um.`,
      ],
    },
    {
      id: 'vl02-tarif-aufgabe',
      typ: 'aufgabe',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 7 (Anwendungsbeispiel)',
      herkunft: 'vorlesung',
      rezept: 'vl02-anwendung-rezept',
      frage: r`Ein Erdgastarif kostet pro Jahr 157,35 € Grundgebühr und zusätzlich 9,08 ct pro kWh.
a) Stelle eine Funktion auf, die den Gesamtpreis in einem Jahr in Abhängigkeit vom Verbrauch beschreibt.
b) Eine Familie hat 12 Abschläge von je 100 € gezahlt. Wie hoch darf ihr Verbrauch höchstens sein, damit sie nichts nachzahlen muss?`,
      tipps: [
        r`Lege zuerst fest, wofür $x$ und $f(x)$ stehen, jeweils mit Einheit.`,
        r`Die Grundgebühr fällt unabhängig vom Verbrauch an (das ist $b$). Der Arbeitspreis kommt pro kWh dazu (das ist $m$). Achte auf Cent und Euro.`,
        r`b) Insgesamt gezahlt wurden $12 \cdot 100$ €. Gesucht ist das $x$ mit $f(x) = 1200$.`,
      ],
      schritte: [
        { t: r`a) $x$: Erdgasverbrauch in kWh, $f(x)$: Gesamtpreis in einem Jahr in €`, w: r`Bei Anwendungsaufgaben gehört die Bedeutung der Variablen zur Lösung.` },
        { t: r`$9{,}08$ ct $= 0{,}0908$ €`, w: r`Grundgebühr und Arbeitspreis müssen dieselbe Einheit haben.` },
        { t: r`$f: [0;\infty) \to [157{,}35;\infty),\quad f(x) = 0{,}0908\,x + 157{,}35$`, w: r`Ein negativer Verbrauch ist nicht möglich, deshalb $D = [0;\infty)$. Der Preis beträgt mindestens die Grundgebühr.` },
        { t: r`b) $0{,}0908\,x + 157{,}35 = 1200 \;\Leftrightarrow\; 0{,}0908\,x = 1042{,}65 \;\Leftrightarrow\; x \approx 11482{,}93$` },
        { t: r`Antwort: Die Familie darf höchstens etwa 11 482,93 kWh verbrauchen, um nichts nachzuzahlen.` },
      ],
      ergebnis: r`a) $f(x) = 0{,}0908\,x + 157{,}35$ $\quad$ b) höchstens ca. $11\,482{,}93$ kWh`,
      fehler: [
        r`Mit $9{,}08$ statt $0{,}0908$ rechnen (Cent nicht in Euro umgerechnet).`,
        r`Den Antwortsatz mit Einheit weglassen.`,
        r`Bei b) $x = 1200$ einsetzen, statt $f(x) = 1200$ zu lösen.`,
      ],
    },
    {
      id: 'vl02-anwendung-rezept',
      typ: 'verfahren',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 7',
      herkunft: 'zusatz',
      frage: r`Wie gehst du bei einer Textaufgabe mit „fester Betrag plus Betrag pro Einheit“ vor?`,
      antwort: r`1. **Variablen festlegen:** Wofür stehen $x$ und $f(x)$? Einheiten dazuschreiben.
2. **Einheiten angleichen** (z. B. Cent in Euro).
3. **Funktion aufstellen:** fester Betrag $= b$, Betrag pro Einheit $= m$, also $f(x) = mx + b$. Sinnvollen Definitionsbereich angeben.
4. **Frage übersetzen:** „Wie viel kostet …?“ heißt $x$ einsetzen. „Bei welchem Verbrauch …?“ heißt $f(x) = \text{Wert}$ lösen.
5. **Antwortsatz** mit Einheit.`,
    },
    {
      id: 'vl02-lage',
      typ: 'satz',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 8',
      frage: r`Welche drei Lagen können zwei Geraden $f(x) = m_1 x + b_1$ und $g(x) = m_2 x + b_2$ zueinander haben, und woran erkennst du sie?`,
      antwort: r`- **Identisch:** $m_1 = m_2$ und $b_1 = b_2$
- **Echt parallel:** $m_1 = m_2$ und $b_1 \ne b_2$ (kein gemeinsamer Punkt)
- **Schnitt in genau einem Punkt:** $m_1 \ne m_2$`,
      merke: r`Erst die Steigungen vergleichen. Nur bei verschiedenen Steigungen gibt es einen Schnittpunkt.`,
    },
    {
      id: 'vl02-lage-mc',
      typ: 'verstaendnis',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 8',
      herkunft: 'zusatz',
      frage: r`Wie liegen die Geraden zu $f(x) = 3x - 1$ und $g(x) = 3x + 2$ zueinander?`,
      optionen: [
        r`Sie sind identisch.`,
        r`Sie sind echt parallel.`,
        r`Sie schneiden sich in genau einem Punkt.`,
      ],
      richtig: 1,
      erklaerung: r`Beide haben die Steigung $3$, aber verschiedene $y$-Achsenabschnitte ($-1 \ne 2$). Gleichsetzen bestätigt das: $3x - 1 = 3x + 2 \Leftrightarrow -1 = 2$, ein Widerspruch, also kein gemeinsamer Punkt.`,
    },
    {
      id: 'vl02-schnittpunkt-rezept',
      typ: 'verfahren',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 9',
      frage: r`Wie bestimmst du den Schnittpunkt zweier Geraden $f$ und $g$?`,
      antwort: r`1. **Steigungen vergleichen:** Nur für $m_1 \ne m_2$ gibt es einen Schnittpunkt.
2. **Gleichsetzen:** $f(x) = g(x)$
3. **Nach $x$ auflösen.**
4. **$y$ berechnen:** $x$ in $f$ oder $g$ einsetzen.
5. **Schnittpunkt angeben:** $S(x; y)$`,
      merke: r`Probe: $x$ auch in die andere Funktion einsetzen. Es muss derselbe $y$-Wert herauskommen.`,
    },
    {
      id: 'vl02-schnittpunkt-aufgabe',
      typ: 'aufgabe',
      thema: 'Geraden',
      quelle: 'VL 2, Folie 9 (Beispiel)',
      herkunft: 'vorlesung',
      rezept: 'vl02-schnittpunkt-rezept',
      frage: r`Gegeben sind $f(x) = 2x + 7$ und $g(x) = -x - 2$. Bestimme den Schnittpunkt der beiden Geraden, sofern vorhanden.`,
      tipps: [
        r`Prüfe zuerst an den Steigungen, ob es überhaupt einen Schnittpunkt gibt.`,
        r`Im Schnittpunkt haben beide Funktionen denselben Wert: $f(x) = g(x)$.`,
        r`Vergiss am Ende die $y$-Koordinate nicht.`,
      ],
      schritte: [
        { t: r`$m_1 = 2$ und $m_2 = -1$, also $m_1 \ne m_2$: Es gibt einen Schnittpunkt.` },
        { t: r`Gleichsetzen: $2x + 7 = -x - 2$`, w: r`Im Schnittpunkt liefern beide Funktionen für dasselbe $x$ dasselbe $y$.` },
        { t: r`$\Leftrightarrow 3x = -9 \quad (\,+x,\ -7\,)$` },
        { t: r`$\Leftrightarrow x = -3 \quad (\,: 3\,)$` },
        { t: r`$y$-Koordinate: $g(-3) = -(-3) - 2 = 1$`, w: r`Probe mit der anderen Funktion: $f(-3) = -6 + 7 = 1$ ✓` },
        { t: r`Schnittpunkt: $S(-3; 1)$` },
      ],
      ergebnis: r`$S(-3; 1)$`,
      fehler: [
        r`Nur $x = -3$ angeben: Ein Schnittpunkt hat zwei Koordinaten.`,
        r`Vorzeichenfehler bei $-(-3)$.`,
      ],
    },
  ],

  formelblatt: [
    {
      id: 'fb-gerade',
      titel: 'Gerade',
      inhalt: r`$f(x) = mx + b$, $\ m = \dfrac{y_2 - y_1}{x_2 - x_1}$, $\ b = y_1 - m x_1$`,
    },
    {
      id: 'fb-lage-geraden',
      titel: 'Lage zweier Geraden',
      inhalt: r`$m_1 = m_2,\ b_1 = b_2$: identisch · $m_1 = m_2,\ b_1 \ne b_2$: parallel · $m_1 \ne m_2$: Schnittpunkt über $f(x) = g(x)$`,
    },
  ],
};
