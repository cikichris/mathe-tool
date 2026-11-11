// Vorlesung 03 (19.10.2026): Funktionseigenschaften am Beispiel von Polynomfunktionen
const r = String.raw;

export default {
  id: 'vl03',
  art: 'vorlesung',
  nummer: 3,
  datum: '2026-10-19',
  titel: 'Polynomfunktionen: Symmetrie und Nullstellen',
  ueberblick: r`Polynomfunktionen vom Grad $n$, gerade und ungerade Funktionen, Schnittpunkt mit der $y$-Achse, Nullstellen mit $pq$-Formel, Satz vom Nullprodukt und Ausklammern.`,

  karten: [
    // ---------------- Polynomfunktionen ----------------
    {
      id: 'vl03-polynom-def',
      typ: 'definition',
      thema: 'Polynomfunktionen',
      quelle: 'VL 3, Folie 4',
      frage: r`Was ist eine Polynomfunktion vom Grad $n$? Was sind Absolutglied und Leitkoeffizient?`,
      antwort: r`Eine Funktion $f: \mathbb{R} \to \mathbb{R}$, deren Vorschrift sich in der Form

$$f(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0$$

mit $a_i \in \mathbb{R}$ und $a_n \ne 0$ schreiben lässt.

- $a_0$ heißt **Absolutglied** (die Zahl ohne $x$).
- $a_n$ heißt **Leitkoeffizient** (die Zahl vor der höchsten Potenz).`,
      merke: r`Affin-lineare Funktionen sind Polynomfunktionen vom Grad 1 (bzw. vom Grad 0, falls $m = 0$).`,
    },
    {
      id: 'vl03-polynom-mc',
      typ: 'verstaendnis',
      thema: 'Polynomfunktionen',
      quelle: 'VL 3, Folien 4 und 9',
      herkunft: 'zusatz',
      frage: r`$f(x) = -3x^3 + 12x^2 - 3x - 18$. Was sind Grad, Leitkoeffizient und Absolutglied?`,
      optionen: [
        r`Grad 3, Leitkoeffizient $-3$, Absolutglied $-18$`,
        r`Grad 3, Leitkoeffizient $3$, Absolutglied $18$`,
        r`Grad 4, Leitkoeffizient $-3$, Absolutglied $-18$`,
        r`Grad 3, Leitkoeffizient $-18$, Absolutglied $-3$`,
      ],
      richtig: 0,
      erklaerung: r`Der Grad ist der höchste Exponent (3). Der Leitkoeffizient ist die Zahl vor $x^3$, mit Vorzeichen ($-3$). Das Absolutglied ist die Zahl ohne $x$, ebenfalls mit Vorzeichen ($-18$).`,
    },

    // ---------------- Symmetrie ----------------
    {
      id: 'vl03-gerade-def',
      typ: 'definition',
      thema: 'Symmetrie',
      quelle: 'VL 3, Folie 6',
      frage: r`Wann heißt eine Funktion $f: D \to Z$ **gerade**, und was bedeutet das für den Graphen?`,
      antwort: r`$f$ heißt gerade, wenn für **jedes** $x \in D$ gilt:

$$f(-x) = f(x)$$

Der Graph ist dann **achsensymmetrisch zur $y$-Achse**.`,
      merke: r`Typisches Beispiel: $f(x) = x^2$.`,
    },
    {
      id: 'vl03-ungerade-def',
      typ: 'definition',
      thema: 'Symmetrie',
      quelle: 'VL 3, Folie 7',
      frage: r`Wann heißt eine Funktion $f: D \to Z$ **ungerade**, und was bedeutet das für den Graphen?`,
      antwort: r`$f$ heißt ungerade, wenn für **jedes** $x \in D$ gilt:

$$f(-x) = -f(x)$$

Der Graph ist dann **punktsymmetrisch zum Ursprung** des Koordinatensystems.`,
      merke: r`Typisches Beispiel: $f(x) = x^3$.`,
    },
    {
      id: 'vl03-symmetrie-rezept',
      typ: 'verfahren',
      thema: 'Symmetrie',
      quelle: 'VL 3, Folien 8 bis 9 mit Mitschrift',
      frage: r`Wie untersuchst du, ob eine Funktion gerade, ungerade oder keins von beiden ist?`,
      antwort: r`1. **Vermutung aufstellen:** z. B. $f(1)$ und $f(-1)$ berechnen und vergleichen.
2. **Vermutung „gerade“ oder „ungerade“ nachweisen:** $f(-x)$ **allgemein** berechnen und zeigen, dass $f(-x) = f(x)$ bzw. $f(-x) = -f(x)$ für alle $x \in D$ gilt.
3. **Vermutung „weder noch“ nachweisen:** **Ein** Gegenbeispiel genügt, also ein $x$ mit $f(-x) \ne f(x)$ und $f(-x) \ne -f(x)$.`,
      merke: r`Zahlenbeispiele können eine Symmetrie nur widerlegen, nie beweisen. Für den Nachweis braucht es die Rechnung mit allgemeinem $x$.`,
    },
    {
      id: 'vl03-exponenten-regel',
      typ: 'satz',
      thema: 'Symmetrie',
      quelle: 'Ergänzung zu VL 3, Folie 9',
      herkunft: 'zusatz',
      frage: r`Woran erkennst du bei einer Polynomfunktion schon am Funktionsterm, ob sie gerade oder ungerade ist?`,
      antwort: r`- Nur **gerade** Exponenten (ein Absolutglied zählt als $x^0$ dazu): $f$ ist **gerade**.
- Nur **ungerade** Exponenten (also auch kein Absolutglied): $f$ ist **ungerade**.
- Gerade und ungerade Exponenten **gemischt**: weder gerade noch ungerade.`,
      merke: r`Das liefert schnell die Vermutung. Ob die Regel in der Klausur als Begründung reicht, steht nicht in den Folien. Dort wird immer über $f(-x)$ bzw. ein Gegenbeispiel argumentiert, also im Zweifel so aufschreiben.`,
    },
    {
      id: 'vl03-sym-ungerade-aufgabe',
      typ: 'aufgabe',
      thema: 'Symmetrie',
      quelle: 'VL 3, Folie 9, Beispiel 3',
      herkunft: 'vorlesung',
      rezept: 'vl03-symmetrie-rezept',
      frage: r`Untersuche, ob $f: \mathbb{R} \to \mathbb{R},\ f(x) = 3x^3 - 12x$ gerade, ungerade oder keins von beiden ist.`,
      tipps: [
        r`Stelle zuerst eine Vermutung auf. Welche Exponenten kommen vor?`,
        r`Für den Nachweis: Ersetze überall $x$ durch $(-x)$ und vereinfache. Was ist $(-x)^3$?`,
        r`Vergleiche dein Ergebnis für $f(-x)$ mit $-f(x) = -(3x^3 - 12x)$.`,
      ],
      schritte: [
        { t: r`Vermutung: $f$ ist ungerade.`, w: r`Es kommen nur ungerade Exponenten vor (3 und 1).` },
        { t: r`$f(-x) = 3(-x)^3 - 12(-x) = -3x^3 + 12x$`, w: r`$(-x)^3 = -x^3$, denn eine ungerade Potenz behält das Minus.` },
        { t: r`$-f(x) = -(3x^3 - 12x) = -3x^3 + 12x$` },
        { t: r`Also $f(-x) = -f(x)$ für alle $x \in \mathbb{R}$, d. h. $f$ ist ungerade.` },
      ],
      ergebnis: r`$f$ ist ungerade (Graph punktsymmetrisch zum Ursprung).`,
      fehler: [
        r`Nur mit Zahlen prüfen ($f(1)$ und $f(-1)$): Das ist kein Nachweis.`,
        r`$(-x)^3 = x^3$ rechnen.`,
        r`Den Schlusssatz „für alle $x \in \mathbb{R}$“ weglassen.`,
      ],
    },
    {
      id: 'vl03-sym-gerade-aufgabe',
      typ: 'aufgabe',
      thema: 'Symmetrie',
      quelle: 'VL 3, Folie 9, Beispiel 5',
      herkunft: 'vorlesung',
      rezept: 'vl03-symmetrie-rezept',
      frage: r`Untersuche, ob $f: \mathbb{R} \to \mathbb{R},\ f(x) = 2x^4 - 20x^2 + 18$ gerade, ungerade oder keins von beiden ist.`,
      tipps: [
        r`Wenn du noch keine Vermutung hast: Berechne $f(1)$ und $f(-1)$, dann $f(2)$ und $f(-2)$.`,
        r`Für den Nachweis $f(-x)$ allgemein berechnen. Was ist $(-x)^4$, was ist $(-x)^2$?`,
      ],
      schritte: [
        { t: r`$f(1) = 0$ und $f(-1) = 0$, $\ f(2) = -30$ und $f(-2) = -30$. Vermutung: $f$ ist gerade.`, w: r`Die Werte bei $x$ und $-x$ stimmen überein. Das ist ein Hinweis, aber noch kein Nachweis.` },
        { t: r`$f(-x) = 2(-x)^4 - 20(-x)^2 + 18 = 2x^4 - 20x^2 + 18$`, w: r`Bei geraden Potenzen fällt das Minus weg: $(-x)^4 = x^4$ und $(-x)^2 = x^2$.` },
        { t: r`Also $f(-x) = f(x)$ für alle $x \in \mathbb{R}$, d. h. $f$ ist gerade.` },
      ],
      ergebnis: r`$f$ ist gerade (Graph achsensymmetrisch zur $y$-Achse).`,
      fehler: [
        r`Nach den Zahlenbeispielen aufhören: Vier passende Werte beweisen nichts für alle $x$.`,
      ],
    },
    {
      id: 'vl03-sym-weder-aufgabe',
      typ: 'aufgabe',
      thema: 'Symmetrie',
      quelle: 'VL 3, Folie 9, Beispiel 4',
      herkunft: 'vorlesung',
      rezept: 'vl03-symmetrie-rezept',
      frage: r`Untersuche, ob $f: \mathbb{R} \to \mathbb{R},\ f(x) = -3x^3 + 12x^2 - 3x - 18$ gerade, ungerade oder keins von beiden ist.`,
      tipps: [
        r`Welche Exponenten kommen vor? Was vermutest du?`,
        r`Um „weder noch“ zu zeigen, genügt ein einziges Gegenbeispiel. Berechne $f(1)$ und $f(-1)$.`,
      ],
      schritte: [
        { t: r`Vermutung: weder gerade noch ungerade.`, w: r`Gerade und ungerade Exponenten sind gemischt.` },
        { t: r`$f(1) = -3 + 12 - 3 - 18 = -12$` },
        { t: r`$f(-1) = 3 + 12 + 3 - 18 = 0$` },
        { t: r`$f(-1) \ne f(1)$ und $f(-1) \ne -f(1)$, also ist $f$ weder gerade noch ungerade.`, w: r`Für gerade müsste $f(-1) = -12$ sein, für ungerade $f(-1) = 12$. Beides stimmt nicht.` },
      ],
      ergebnis: r`$f$ ist weder gerade noch ungerade.`,
      fehler: [
        r`Nur $f(-1) \ne f(1)$ zeigen: Damit ist nur „nicht gerade“ gezeigt. Für „weder noch“ muss auch $f(-1) \ne -f(1)$ geprüft werden.`,
        r`Vorzeichenfehler bei $f(-1)$: $-3 \cdot (-1)^3 = +3$ und $-3 \cdot (-1) = +3$.`,
      ],
    },
    {
      id: 'vl03-sym-mc',
      typ: 'verstaendnis',
      thema: 'Symmetrie',
      quelle: 'VL 3, Folie 9, Beispiel 2',
      herkunft: 'vorlesung',
      frage: r`$f(x) = -2x^2 + 4x + 6$ mit $f(1) = 8$ und $f(-1) = 0$. Was folgt daraus?`,
      optionen: [
        r`$f$ ist gerade.`,
        r`$f$ ist ungerade.`,
        r`$f$ ist weder gerade noch ungerade.`,
        r`Aus zwei Werten kann man nichts schließen.`,
      ],
      richtig: 2,
      erklaerung: r`$f(-1) = 0$ ist weder gleich $f(1) = 8$ noch gleich $-f(1) = -8$. Ein Gegenbeispiel genügt, um beide Symmetrien auszuschließen. (Umgekehrt könnte man mit zwei Werten keine Symmetrie beweisen.)`,
    },

    // ---------------- Achsenschnittpunkte ----------------
    {
      id: 'vl03-y-achse',
      typ: 'definition',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folie 10',
      frage: r`Wie bestimmst du den Schnittpunkt eines Funktionsgraphen mit der $y$-Achse?`,
      antwort: r`Für eine Funktion $f: D \to Z$ mit $0 \in D$ ist der Schnittpunkt mit der $y$-Achse der Punkt

$$(0;\ f(0))$$

Man setzt also $0$ für die Variable in den Funktionsterm ein.`,
      merke: r`Bei einer Polynomfunktion ist $f(0)$ gerade das Absolutglied $a_0$.`,
    },
    {
      id: 'vl03-nullstelle-def',
      typ: 'definition',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folie 11',
      frage: r`Was ist eine Nullstelle einer Funktion, und wie bestimmst du sie rechnerisch?`,
      antwort: r`Eine Zahl $x_0 \in D$ heißt Nullstelle von $f$, wenn $f(x_0) = 0$ gilt.

**Rechnerisch:** Funktionsterm gleich Null setzen und die Gleichung $f(x) = 0$ lösen.

**Am Graphen:** Die Nullstellen sind die Stellen, an denen der Graph gemeinsame Punkte mit der $x$-Achse hat.`,
      merke: r`Nicht verwechseln: Für die Nullstellen setzt man $f(x) = 0$. Für den $y$-Achsenschnittpunkt setzt man $x = 0$.`,
    },
    {
      id: 'vl03-methoden',
      typ: 'verfahren',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folie 12 (Zuordnung „wann“ von Claude ergänzt)',
      frage: r`Welche Vorgehensweisen gibt es, um die Nullstellen einer Polynomfunktion zu bestimmen, und wann passt welche?`,
      antwort: r`- **Direkt auflösen:** wenn $x$ nur an einer Stelle vorkommt, z. B. $2x - 6 = 0$ oder $3x^2 - 12 = 0$
- **$pq$-Formel** (oder $abc$-/Mitternachtsformel, Satz von Vieta, quadratische Ergänzung): bei quadratischen Gleichungen
- **Ausklammern:** wenn kein Absolutglied vorhanden ist
- **Substitution:** z. B. wenn nur $x^4$, $x^2$ und eine Zahl vorkommen
- **Polynomdivision** (oder Horner-Schema): bei höherem Grad mit Absolutglied, nachdem eine Nullstelle bekannt ist
- (Näherungsverfahren)`,
      merke: r`Erste Fragen an jede Aufgabe: Welchen Grad hat das Polynom? Gibt es ein Absolutglied?`,
    },

    // ---------------- pq-Formel ----------------
    {
      id: 'vl03-pq-formel',
      typ: 'formel',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folie 13',
      frage: r`Wie lautet die $pq$-Formel, und in welcher Form muss die Gleichung dafür vorliegen?`,
      antwort: r`Für quadratische Gleichungen der Form

$$x^2 + px + q = 0 \quad \text{mit } p, q \in \mathbb{R}$$

gilt:

$$x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$$`,
      merke: r`Vor $x^2$ muss der Faktor 1 stehen. Sonst zuerst die ganze Gleichung durch den Leitkoeffizienten teilen. $p$ und $q$ immer **mit Vorzeichen** ablesen.`,
    },
    {
      id: 'vl03-diskriminante',
      typ: 'satz',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folien 14 und 15',
      frage: r`Was ist die Diskriminante von $x^2 + px + q = 0$, und was sagt sie über die Anzahl der Lösungen?`,
      antwort: r`Die Diskriminante ist der Term unter der Wurzel:

$$D = \left(\frac{p}{2}\right)^2 - q$$

- $D > 0$: zwei verschiedene Lösungen $x_{1/2} = -\dfrac{p}{2} \pm \sqrt{D}$
- $D = 0$: eine doppelte Lösung $x_1 = x_2 = -\dfrac{p}{2}$
- $D < 0$: keine reelle Lösung`,
    },
    {
      id: 'vl03-pq-aufgabe-1',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folie 16, Beispiel 1',
      herkunft: 'vorlesung',
      rezept: 'vl03-pq-rezept',
      frage: r`Bestimme die Nullstellen von $f: \mathbb{R} \to \mathbb{R},\ f(x) = -3x^2 + 6x + 9$.`,
      tipps: [
        r`Setze $f(x) = 0$. Darfst du die $pq$-Formel sofort anwenden?`,
        r`Teile die Gleichung zuerst durch $-3$, damit vor $x^2$ eine 1 steht.`,
        r`Aus $x^2 - 2x - 3 = 0$ liest du $p = -2$ und $q = -3$ ab.`,
      ],
      schritte: [
        { t: r`$f(x) = 0 \Leftrightarrow -3x^2 + 6x + 9 = 0$` },
        { t: r`$\Leftrightarrow x^2 - 2x - 3 = 0 \quad (\,: (-3)\,)$`, w: r`Die $pq$-Formel gilt nur, wenn vor $x^2$ der Faktor 1 steht.` },
        { t: r`$p = -2,\ q = -3$: $\quad x_{1/2} = 1 \pm \sqrt{(-1)^2 + 3} = 1 \pm \sqrt{4} = 1 \pm 2$`, w: r`$-\frac{p}{2} = +1$, und unter der Wurzel wird aus $-q$ ein $+3$.` },
        { t: r`$x_1 = 3,\quad x_2 = -1$` },
      ],
      ergebnis: r`$x_1 = 3$ und $x_2 = -1$`,
      fehler: [
        r`Die $pq$-Formel auf die nicht normierte Gleichung anwenden ($p = 6$, $q = 9$).`,
        r`Vorzeichen: $-\frac{p}{2} = -1$ statt $+1$, oder unter der Wurzel $-3$ statt $+3$.`,
        r`Beim Teilen durch $-3$ nicht alle Vorzeichen umdrehen.`,
      ],
    },
    {
      id: 'vl03-pq-aufgabe-2',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folie 16, Beispiel 2',
      herkunft: 'vorlesung',
      rezept: 'vl03-pq-rezept',
      frage: r`Bestimme die Nullstellen von $f: \mathbb{R} \to \mathbb{R},\ f(x) = 2x^2 - 4x + 8$.`,
      tipps: [
        r`Erst normieren: durch 2 teilen.`,
        r`Schau dir die Diskriminante $\left(\frac{p}{2}\right)^2 - q$ an, bevor du weiterrechnest.`,
      ],
      schritte: [
        { t: r`$f(x) = 0 \Leftrightarrow 2x^2 - 4x + 8 = 0 \Leftrightarrow x^2 - 2x + 4 = 0 \quad (\,: 2\,)$` },
        { t: r`$p = -2,\ q = 4$: $\quad x_{1/2} = 1 \pm \sqrt{(-1)^2 - 4} = 1 \pm \sqrt{-3}$` },
        { t: r`Die Diskriminante ist negativ ($D = -3 < 0$), also gibt es keine reelle Lösung.`, w: r`Aus einer negativen Zahl lässt sich im Reellen keine Wurzel ziehen.` },
        { t: r`$f$ hat keine Nullstellen.` },
      ],
      ergebnis: r`$f$ hat keine Nullstellen.`,
      fehler: [
        r`Das Minus unter der Wurzel „übersehen“ und mit $\sqrt{3}$ weiterrechnen.`,
        r`Keine Antwort hinschreiben: „keine Nullstellen“ ist das Ergebnis.`,
      ],
    },
    {
      id: 'vl03-pq-rezept',
      typ: 'verfahren',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folien 13 bis 16',
      frage: r`Wie bestimmst du die Nullstellen einer quadratischen Funktion $f(x) = ax^2 + bx + c$ mit der $pq$-Formel?`,
      antwort: r`1. **Null setzen:** $ax^2 + bx + c = 0$
2. **Normieren:** durch $a$ teilen, sodass $x^2 + px + q = 0$ entsteht.
3. **$p$ und $q$ mit Vorzeichen ablesen.**
4. **Einsetzen:** $x_{1/2} = -\dfrac{p}{2} \pm \sqrt{\left(\dfrac{p}{2}\right)^2 - q}$
5. **Diskriminante ansehen:** positiv ergibt zwei Nullstellen, null eine doppelte, negativ keine.
6. **Probe** durch Einsetzen in $f$.`,
    },
    {
      id: 'vl03-pq-uebung',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'Übungsvariante zu VL 3, Folie 16',
      herkunft: 'zusatz',
      rezept: 'vl03-pq-rezept',
      frage: r`Bestimme die Nullstellen von $f(x) = 2x^2 + 8x + 8$.`,
      tipps: [
        r`Null setzen und durch 2 teilen.`,
        r`Was ergibt die Diskriminante für $p = 4$ und $q = 4$?`,
      ],
      schritte: [
        { t: r`$2x^2 + 8x + 8 = 0 \Leftrightarrow x^2 + 4x + 4 = 0 \quad (\,: 2\,)$` },
        { t: r`$p = 4,\ q = 4$: $\quad x_{1/2} = -2 \pm \sqrt{2^2 - 4} = -2 \pm \sqrt{0}$` },
        { t: r`$x_1 = x_2 = -2$`, w: r`Die Diskriminante ist 0, also gibt es eine doppelte Nullstelle. Der Graph berührt dort die $x$-Achse nur.` },
        { t: r`Probe: $f(-2) = 2 \cdot 4 - 16 + 8 = 0$ ✓` },
      ],
      ergebnis: r`Doppelte Nullstelle bei $x = -2$`,
      fehler: [
        r`$-\frac{p}{2} = +2$ rechnen: Für $p = 4$ ist $-\frac{p}{2} = -2$.`,
      ],
    },

    // ---------------- Nullprodukt und Ausklammern ----------------
    {
      id: 'vl03-nullprodukt',
      typ: 'satz',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folie 17',
      frage: r`Was besagt der Satz vom Nullprodukt?`,
      antwort: r`Für $a, b \in \mathbb{R}$ gilt:

$$a \cdot b = 0 \;\Leftrightarrow\; a = 0 \,\lor\, b = 0$$

„Ein Produkt ist genau dann Null, wenn mindestens einer der Faktoren Null ist.“`,
      merke: r`Das Zeichen $\lor$ bedeutet „oder“. Der Satz funktioniert nur, wenn auf der anderen Seite **Null** steht.`,
    },
    {
      id: 'vl03-nullprodukt-mc',
      typ: 'verstaendnis',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folie 17',
      herkunft: 'zusatz',
      frage: r`Welche Lösungen hat $(x - 2)(x + 5) = 0$?`,
      optionen: [
        r`$x = -2$ und $x = 5$`,
        r`$x = 2$ und $x = -5$`,
        r`$x = 2$ und $x = 5$`,
        r`Nur $x = 2$`,
      ],
      richtig: 1,
      erklaerung: r`Satz vom Nullprodukt: $x - 2 = 0$ oder $x + 5 = 0$, also $x = 2$ oder $x = -5$. Das Vorzeichen dreht sich jeweils um. Ausmultiplizieren ist hier unnötig.`,
    },
    {
      id: 'vl03-teilen-falle',
      typ: 'verstaendnis',
      thema: 'Nullstellen',
      quelle: 'Ergänzung zu VL 3, Folien 17 und 18',
      herkunft: 'zusatz',
      frage: r`Wie löst du $x^2 = 4x$ richtig?`,
      optionen: [
        r`Durch $x$ teilen: $x = 4$ ist die einzige Lösung.`,
        r`Alles auf eine Seite und ausklammern: $x(x - 4) = 0$, also $x = 0$ oder $x = 4$.`,
        r`Wurzel ziehen: $x = \pm 2\sqrt{x}$.`,
      ],
      richtig: 1,
      erklaerung: r`Beim Teilen durch $x$ geht die Lösung $x = 0$ verloren, denn durch 0 darf man nicht teilen. Deshalb nie durch einen Ausdruck mit der Variablen teilen, sondern ausklammern und den Satz vom Nullprodukt anwenden.`,
    },
    {
      id: 'vl03-ausklammern-rezept',
      typ: 'verfahren',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folie 18',
      frage: r`Wie bestimmst du die Nullstellen einer Polynomfunktion **ohne Absolutglied**?`,
      antwort: r`1. **Null setzen:** $f(x) = 0$
2. **Niedrigste vorhandene Potenz von $x$ ausklammern:** Es entsteht ein Produkt $x^k \cdot (\dots) = 0$.
3. **Satz vom Nullprodukt:** $x^k = 0$ **oder** Klammer $= 0$
4. **Beide Gleichungen einzeln lösen.** Die erste liefert immer $x = 0$, die zweite z. B. mit direktem Auflösen oder der $pq$-Formel.`,
      merke: r`Kein Absolutglied bedeutet: $x = 0$ ist auf jeden Fall eine Nullstelle.`,
    },
    {
      id: 'vl03-ausklammern-aufgabe',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'VL 3, Folie 19 (Beispiel)',
      herkunft: 'vorlesung',
      rezept: 'vl03-ausklammern-rezept',
      frage: r`Bestimme die Nullstellen von $f: \mathbb{R} \to \mathbb{R},\ f(x) = 3x^3 - 12x$.`,
      tipps: [
        r`Gibt es ein Absolutglied? Welche Methode bietet sich an?`,
        r`Klammere $x$ aus und wende den Satz vom Nullprodukt an.`,
        r`Die Klammer $3x^2 - 12 = 0$ kannst du direkt nach $x^2$ auflösen. Denk an beide Vorzeichen beim Wurzelziehen.`,
      ],
      schritte: [
        { t: r`$f(x) = 0 \Leftrightarrow 3x^3 - 12x = 0$` },
        { t: r`$\Leftrightarrow x \cdot (3x^2 - 12) = 0$`, w: r`Kein Absolutglied, also $x$ ausklammern.` },
        { t: r`$\Leftrightarrow x = 0 \,\lor\, 3x^2 - 12 = 0$`, w: r`Satz vom Nullprodukt.` },
        { t: r`$\Leftrightarrow x = 0 \,\lor\, x^2 = 4 \quad (\,+12,\ : 3\,)$` },
        { t: r`$\Leftrightarrow x_1 = 0,\quad x_2 = 2,\quad x_3 = -2$`, w: r`Beim Wurzelziehen entstehen zwei Lösungen: $\pm 2$.` },
      ],
      ergebnis: r`$x_1 = 0,\ x_2 = 2,\ x_3 = -2$`,
      fehler: [
        r`Durch $x$ teilen statt ausklammern: Dann fehlt die Nullstelle $x = 0$.`,
        r`Bei $x^2 = 4$ nur $x = 2$ angeben.`,
      ],
    },
    {
      id: 'vl03-ausklammern-uebung',
      typ: 'aufgabe',
      thema: 'Nullstellen',
      quelle: 'Übungsvariante zu VL 3, Folien 18 und 19',
      herkunft: 'zusatz',
      rezept: 'vl03-ausklammern-rezept',
      frage: r`Bestimme die Nullstellen von $f(x) = x^3 - 4x^2 + 3x$.`,
      tipps: [
        r`Kein Absolutglied: $x$ ausklammern.`,
        r`Die Klammer ist diesmal eine vollständige quadratische Gleichung. Welche Formel hilft?`,
      ],
      schritte: [
        { t: r`$x^3 - 4x^2 + 3x = 0 \Leftrightarrow x \cdot (x^2 - 4x + 3) = 0$` },
        { t: r`$\Leftrightarrow x = 0 \,\lor\, x^2 - 4x + 3 = 0$`, w: r`Satz vom Nullprodukt.` },
        { t: r`$pq$-Formel mit $p = -4,\ q = 3$: $\quad x = 2 \pm \sqrt{(-2)^2 - 3} = 2 \pm 1$`, w: r`Die Klammer ist schon normiert (Faktor 1 vor $x^2$).` },
        { t: r`$x_1 = 0,\quad x_2 = 3,\quad x_3 = 1$` },
      ],
      ergebnis: r`$x_1 = 0,\ x_2 = 3,\ x_3 = 1$`,
      fehler: [
        r`Die Nullstelle $x = 0$ vergessen, weil man nur noch die Klammer betrachtet.`,
      ],
    },
  ],

  formelblatt: [
    {
      id: 'fb-symmetrie',
      titel: 'Symmetrie',
      inhalt: r`gerade: $f(-x) = f(x)$ ($y$-Achse) · ungerade: $f(-x) = -f(x)$ (Ursprung) · „weder noch“: ein Gegenbeispiel`,
    },
    {
      id: 'fb-pq-formel',
      titel: '$pq$-Formel',
      inhalt: r`$x^2 + px + q = 0 \Rightarrow x_{1/2} = -\dfrac{p}{2} \pm \sqrt{\left(\dfrac{p}{2}\right)^2 - q}$. Erst normieren! $D > 0$: zwei, $D = 0$: eine doppelte, $D < 0$: keine Lösung.`,
    },
    {
      id: 'fb-nullprodukt',
      titel: 'Nullprodukt / Ausklammern',
      inhalt: r`$a \cdot b = 0 \Leftrightarrow a = 0 \lor b = 0$. Kein Absolutglied: $x^k$ ausklammern. Nie durch $x$ teilen.`,
    },
    {
      id: 'fb-achsenschnitte',
      titel: 'Achsenschnittpunkte',
      standard: false,
      inhalt: r`$y$-Achse: $(0; f(0))$ · Nullstellen: $f(x) = 0$ lösen`,
    },
  ],
};
