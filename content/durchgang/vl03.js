// Vorlesung 3 (19.10.2026) durchgehen: Polynomfunktionen, Symmetrie, Nullstellen, pq-Formel, Ausklammern
const r = String.raw;

export default {
  unit: 'vl03',
  abschnitte: [
    {
      id: 'vl03-d01',
      folien: '4–5',
      titel: 'Polynomfunktion vom Grad $n$',
      folie: r`$f(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0$ mit $a_n \ne 0$ heißt Polynomfunktion vom Grad $n$. $a_0$ ist das **Absolutglied**, $a_n$ der **Leitkoeffizient**.`,
      notizen: [
        { t: r`„Affin-lineare Funktionen sind Polynomfunktionen vom Grad 1.“`, w: r`$f(x) = mx + b$ passt in das Schema mit $n = 1$, $a_1 = m$, $a_0 = b$.` },
      ],
      kern: r`Grad = höchster Exponent. Leitkoeffizient = Zahl davor, Absolutglied = Zahl ohne $x$.`,
      check: { frage: r`Grad, Leitkoeffizient und Absolutglied von $-3x^3 + 12x^2 - 3x - 18$?`, antwort: r`Grad 3, Leitkoeffizient $-3$, Absolutglied $-18$.` },
      karten: ['vl03-polynom-def', 'vl03-polynom-mc'],
    },
    {
      id: 'vl03-d02',
      folien: '6–8',
      titel: 'Gerade und ungerade Funktionen',
      folie: r`**Gerade:** $f(-x) = f(x)$ für alle $x \in D$, achsensymmetrisch zur y-Achse.

**Ungerade:** $f(-x) = -f(x)$ für alle $x \in D$, punktsymmetrisch zum Ursprung.

Für „gerade“ bzw. „ungerade“ muss man die Gleichung für **jedes** $x$ nachweisen. Für „nicht gerade“ genügt **ein** Gegenbeispiel.`,
      kern: r`Nachweis allgemein mit $-x$, Widerlegung mit einer einzigen Zahl.`,
      karten: ['vl03-gerade-def', 'vl03-ungerade-def', 'vl03-symmetrie-rezept'],
    },
    {
      id: 'vl03-d03',
      folien: '9 und Notizseiten',
      titel: 'Symmetrie: fünf Beispiele',
      folie: r`1) $-x - 2$ 2) $-2x^2 + 4x + 6$ 3) $3x^3 - 12x$ 4) $-3x^3 + 12x^2 - 3x - 18$ 5) $2x^4 - 20x^2 + 18$`,
      notizen: [
        { t: r`1) Vermutung: weder gerade noch ungerade. $f(1) = -3$ und $f(-1) = -1$. $f(-1) \ne f(1)$ und $f(-1) \ne -f(1)$ $\Rightarrow$ weder gerade noch ungerade.`, w: r`Gemischte Exponenten (1 und 0) sprechen gegen Symmetrie. Ein Gegenbeispiel genügt.` },
        { t: r`2) $f(1) = 8$ und $f(-1) = 0$. $f(-1) \ne f(1)$ und $f(-1) \ne -f(1)$ $\Rightarrow$ weder gerade noch ungerade.`, w: r`Exponenten 2, 1, 0: gemischt.` },
        { t: r`3) Vermutung: ungerade. $f(-x) = 3(-x)^3 - 12(-x) = -3x^3 + 12x$ und $-f(x) = -(3x^3 - 12x) = -3x^3 + 12x$ $\Rightarrow f(-x) = -f(x)$ für alle $x$, d. h. ungerade.`, w: r`Nur ungerade Exponenten (3 und 1). $(-x)^3 = -x^3$.` },
        { t: r`4) Vermutung: weder noch. $f(1) = -12$ und $f(-1) = 0$, also $f(-1) \ne \pm f(1)$ $\Rightarrow$ weder gerade noch ungerade.`, w: r`` },
        { t: r`5) Angenommen, wir haben noch keine Vermutung: $f(1) = 0$, $f(-1) = 0$, $f(2) = -30$, $f(-2) = -30$.`, w: r`Gleiche Werte bei $x$ und $-x$: Das deutet auf gerade hin, beweist es aber noch nicht.` },
        { t: r`$f(-x) = 2(-x)^4 - 20(-x)^2 + 18 = 2x^4 - 20x^2 + 18$ $\Rightarrow f(-x) = f(x)$ für alle $x$, d. h. gerade.`, w: r`Nur gerade Exponenten (4, 2, 0).` },
      ],
      kern: r`Bei Polynomen: nur gerade Exponenten → gerade, nur ungerade Exponenten → ungerade, gemischt → weder noch. Begründen muss man trotzdem.`,
      karten: ['vl03-exponenten-regel', 'vl03-sym-ungerade-aufgabe', 'vl03-sym-gerade-aufgabe', 'vl03-sym-weder-aufgabe', 'vl03-sym-mc'],
    },
    {
      id: 'vl03-d04',
      folien: '10–12',
      titel: 'y-Achsenabschnitt und Nullstellen',
      folie: r`Schnittpunkt mit der y-Achse: $(0; f(0))$, also 0 einsetzen.

Nullstelle: $x_0$ mit $f(x_0) = 0$. Funktionsterm gleich null setzen und die Gleichung lösen. Methoden bei Polynomen: direkt auflösen, $pq$-Formel, Ausklammern, Substitution, Polynomdivision.`,
      kern: r`y-Achse: $x = 0$ einsetzen. Nullstellen: $f(x) = 0$ lösen.`,
      karten: ['vl03-y-achse', 'vl03-nullstelle-def', 'vl03-methoden'],
    },
    {
      id: 'vl03-d05',
      folien: '13–15',
      titel: '$pq$-Formel und Diskriminante',
      folie: r`Für $x^2 + px + q = 0$: $$x_{1/2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$$
Diskriminante $D = \left(\frac{p}{2}\right)^2 - q$: $D > 0$ zwei Lösungen, $D = 0$ eine doppelte, $D < 0$ keine reelle Lösung.`,
      kern: r`Vor der $pq$-Formel muss vor $x^2$ eine 1 stehen. Die Diskriminante sagt, wie viele Lösungen es gibt.`,
      karten: ['vl03-pq-formel', 'vl03-diskriminante', 'vl03-pq-rezept'],
    },
    {
      id: 'vl03-d06',
      folien: '16',
      titel: '$pq$-Formel: zwei Beispiele',
      folie: r`1) $f(x) = -3x^2 + 6x + 9$ 2) $f(x) = 2x^2 - 4x + 8$`,
      notizen: [
        { t: r`1) $f(x) = 0 \iff -3x^2 + 6x + 9 = 0 \quad | :(-3) \iff x^2 - 2x - 3 = 0$`, w: r`Durch den Faktor vor $x^2$ teilen, auch wenn er negativ ist.` },
        { t: r`$\iff x_{1/2} = 1 \pm \sqrt{(-1)^2 + 3} = 1 \pm 2 \iff x_1 = 3, \; x_2 = -1$`, w: r`$p = -2$, $q = -3$: $-\frac{p}{2} = 1$, $\left(\frac{p}{2}\right)^2 - q = 1 + 3 = 4$.` },
        { t: r`2) $f(x) = 0 \iff 2x^2 - 4x + 8 = 0 \quad | :2 \iff x^2 - 2x + 4 = 0$`, w: r`` },
        { t: r`$\iff x_{1/2} = 1 \pm \sqrt{(-1)^2 - 4} = 1 \pm \sqrt{-3}$ ↯ $\Rightarrow f$ hat keine Nullstellen.`, w: r`Diskriminante $-3 < 0$: Wurzel aus einer negativen Zahl gibt es in $\mathbb{R}$ nicht.` },
      ],
      kern: r`Normieren, $p$ und $q$ mit Vorzeichen ablesen, einsetzen. Negative Diskriminante: keine Nullstellen.`,
      karten: ['vl03-pq-aufgabe-1', 'vl03-pq-aufgabe-2', 'vl03-pq-uebung'],
    },
    {
      id: 'vl03-d07',
      folien: '17–19',
      titel: 'Satz vom Nullprodukt und Ausklammern',
      folie: r`$a \cdot b = 0 \iff a = 0 \vee b = 0$: Ein Produkt ist genau dann null, wenn mindestens ein Faktor null ist.

Fehlt das Absolutglied, die niedrigste $x$-Potenz ausklammern und dann den Satz vom Nullprodukt anwenden.

Beispiel: $f(x) = 3x^3 - 12x$`,
      notizen: [
        { t: r`Unter dem Zeichen $\vee$: „oder“ (lateinisch „vel“).`, w: r`Mathematisches „oder“: Es darf auch beides gelten.` },
        { t: r`$f(x) = 0 \iff 3x^3 - 12x = 0$ | Ausklammern $\iff x \cdot (3x^2 - 12) = 0$`, w: r`Niedrigste Potenz ist $x^1$.` },
        { t: r`| Satz vom Nullprodukt $\iff x = 0 \;\vee\; 3x^2 - 12 = 0 \quad | +12$`, w: r`` },
        { t: r`$\iff x = 0 \;\vee\; 3x^2 = 12 \quad | :3 \iff x = 0 \;\vee\; x^2 = 4 \quad | \pm\sqrt{\;}$`, w: r`` },
        { t: r`$\iff x_1 = 0, \; x_2 = 2, \; x_3 = -2$`, w: r`Nicht durch $x$ teilen! Sonst geht die Nullstelle $x = 0$ verloren.` },
      ],
      kern: r`Ausklammern statt durch $x$ teilen: Die Lösung $x = 0$ bleibt so erhalten.`,
      karten: ['vl03-nullprodukt', 'vl03-nullprodukt-mc', 'vl03-teilen-falle', 'vl03-ausklammern-rezept', 'vl03-ausklammern-aufgabe'],
    },
  ],
};
