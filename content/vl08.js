// Vorlesung 08 (Selbststudium mit Videos): Winkel, Bogenmaß und rechtwinklige Dreiecke
// Es gibt keine Folien. Die Karten sind aus Übungsblatt 4 und Vorlesung 9 abgeleitet.
const r = String.raw;

export default {
  id: 'vl08',
  art: 'vorlesung',
  nummer: 8,
  datum: '2026-11-03',
  titel: 'Selbststudium: Winkel und rechtwinklige Dreiecke',
  ueberblick: r`Vorlesung 8 lief als Video zum Selbststudium. Dazu gab es keine Folien. Die Karten hier hat Claude aus Übungsblatt 4 und Vorlesung 9 abgeleitet: Grad und Bogenmaß, Sinus, Cosinus und Tangens im rechtwinkligen Dreieck.`,

  karten: [
    {
      id: 'vl08-bogenmass',
      typ: 'formel',
      thema: 'Winkel',
      quelle: 'Selbststudium, vgl. Übung 4, Aufgabe 3',
      herkunft: 'zusatz',
      frage: r`Wie rechnest du einen Winkel von Grad in Bogenmaß um und umgekehrt?`,
      antwort: r`$180^\circ$ entsprechen $\pi$ rad. Deshalb:

$$x = \alpha \cdot \frac{\pi}{180^\circ} \qquad \alpha = x \cdot \frac{180^\circ}{\pi}$$

Beispiel: $75^\circ = 75 \cdot \frac{\pi}{180} = \frac{5\pi}{12}$ rad.`,
      merke: r`Wichtige Werte: $30^\circ = \frac{\pi}{6}$, $45^\circ = \frac{\pi}{4}$, $60^\circ = \frac{\pi}{3}$, $90^\circ = \frac{\pi}{2}$, $180^\circ = \pi$, $360^\circ = 2\pi$.`,
    },
    {
      id: 'vl08-bogenmass-mc',
      typ: 'verstaendnis',
      thema: 'Winkel',
      quelle: 'Selbststudium, vgl. Übung 4, Aufgabe 3',
      herkunft: 'zusatz',
      frage: r`Wie viel Grad sind $\frac{3\pi}{4}$ rad?`,
      optionen: [r`$135^\circ$`, r`$120^\circ$`, r`$270^\circ$`, r`$45^\circ$`],
      richtig: 0,
      erklaerung: r`$\frac{3\pi}{4} \cdot \frac{180^\circ}{\pi} = \frac{3 \cdot 180^\circ}{4} = 135^\circ$.`,
    },
    {
      id: 'vl08-dreieck-bezeichnungen',
      typ: 'definition',
      thema: 'Dreiecke',
      quelle: 'Selbststudium, vgl. Übung 4, Aufgaben 4 und 6',
      herkunft: 'zusatz',
      frage: r`Wie werden Seiten und Winkel in einem Dreieck $ABC$ üblicherweise bezeichnet, und was sind Hypotenuse und Katheten?`,
      antwort: r`- Die Winkel $\alpha, \beta, \gamma$ liegen an den Ecken $A, B, C$.
- Die Seite $a$ liegt **gegenüber** von $A$ (bzw. $\alpha$), $b$ gegenüber von $B$, $c$ gegenüber von $C$.

Im rechtwinkligen Dreieck:
- **Hypotenuse:** die längste Seite, gegenüber dem rechten Winkel
- **Katheten:** die beiden Seiten am rechten Winkel
- Von einem spitzen Winkel aus gesehen: **Gegenkathete** liegt gegenüber, **Ankathete** liegt am Winkel an.`,
      merke: r`Bei $\gamma = 90^\circ$ ist $c$ die Hypotenuse. Bei $\alpha = 90^\circ$ (wie in Übung 4, Aufgabe 4) ist es $a$!`,
    },
    {
      id: 'vl08-sincostan',
      typ: 'formel',
      thema: 'Dreiecke',
      quelle: 'Selbststudium, vgl. Übung 4, Aufgabe 6',
      herkunft: 'zusatz',
      frage: r`Wie sind $\sin(\alpha)$, $\cos(\alpha)$ und $\tan(\alpha)$ im rechtwinkligen Dreieck definiert?`,
      antwort: r`$$\sin(\alpha) = \frac{\text{Gegenkathete}}{\text{Hypotenuse}} \qquad \cos(\alpha) = \frac{\text{Ankathete}}{\text{Hypotenuse}} \qquad \tan(\alpha) = \frac{\text{Gegenkathete}}{\text{Ankathete}}$$

Für $\gamma = 90^\circ$: $\ \sin(\alpha) = \frac{a}{c}$, $\ \cos(\alpha) = \frac{b}{c}$, $\ \tan(\alpha) = \frac{a}{b}$.`,
      merke: r`Daraus folgt $\tan(\alpha) = \frac{\sin(\alpha)}{\cos(\alpha)}$.`,
    },
    {
      id: 'vl08-pythagoras',
      typ: 'satz',
      thema: 'Dreiecke',
      quelle: 'Selbststudium, vgl. Übung 4, Aufgabe 4',
      herkunft: 'zusatz',
      frage: r`Was besagen der Satz des Pythagoras und die Innenwinkelsumme?`,
      antwort: r`**Pythagoras:** Im rechtwinkligen Dreieck gilt $\text{Kathete}_1^2 + \text{Kathete}_2^2 = \text{Hypotenuse}^2$, bei $\gamma = 90^\circ$ also $a^2 + b^2 = c^2$.

**Innenwinkelsumme:** $\alpha + \beta + \gamma = 180^\circ$.`,
    },
    {
      id: 'vl08-dreieck-rezept',
      typ: 'verfahren',
      thema: 'Dreiecke',
      quelle: 'Selbststudium, vgl. Übung 4, Aufgabe 4',
      herkunft: 'zusatz',
      frage: r`Wie berechnest du in einem rechtwinkligen Dreieck alle fehlenden Seiten und Winkel?`,
      antwort: r`1. **Skizze** mit Beschriftung. Den rechten Winkel und die Hypotenuse markieren.
2. **Fehlenden Winkel** über die Innenwinkelsumme.
3. **Eine Seite** über $\sin$, $\cos$ oder $\tan$: das Verhältnis wählen, in dem die gegebene und die gesuchte Seite vorkommen.
4. **Letzte Seite** über Pythagoras (oder wieder über eine Winkelfunktion).
5. **Winkel aus Seiten:** z. B. $\alpha = \arctan\left(\frac{a}{b}\right)$. Taschenrechner auf **DEG** stellen.`,
      merke: r`Lieber mit den exakten Zwischenwerten weiterrechnen und erst am Ende runden.`,
    },
    {
      id: 'vl08-dreieck-aufgabe',
      typ: 'aufgabe',
      thema: 'Dreiecke',
      quelle: 'Übungsvariante zu Übung 4, Aufgabe 4',
      herkunft: 'zusatz',
      rezept: 'vl08-dreieck-rezept',
      frage: r`Im Dreieck $ABC$ ist $\gamma = 90^\circ$, $\alpha = 40^\circ$ und $c = 5$ cm. Berechne $\beta$, $a$ und $b$ auf eine Nachkommastelle.`,
      tipps: [
        r`Bei $\gamma = 90^\circ$ ist $c$ die Hypotenuse.`,
        r`$a$ ist die Gegenkathete von $\alpha$: $\sin(\alpha) = \frac{a}{c}$.`,
      ],
      schritte: [
        { t: r`$\beta = 180^\circ - 90^\circ - 40^\circ = 50^\circ$`, q: r`Selbststudium VL 8 / Schulwissen: Innenwinkelsumme im Dreieck $\alpha + \beta + \gamma = 180^\circ$.` },
        { t: r`$\sin(40^\circ) = \dfrac{a}{5} \Leftrightarrow a = 5 \cdot \sin(40^\circ) \approx 3{,}2$ cm`, q: r`Selbststudium VL 8 / Schulwissen: im rechtwinkligen Dreieck $\sin = \frac{\text{Gegenkathete}}{\text{Hypotenuse}}$` },
        { t: r`$\cos(40^\circ) = \dfrac{b}{5} \Leftrightarrow b = 5 \cdot \cos(40^\circ) \approx 3{,}8$ cm`, w: r`Kontrolle mit Pythagoras: $3{,}21^2 + 3{,}83^2 \approx 25 = 5^2$.`, q: r`Selbststudium VL 8 / Schulwissen: im rechtwinkligen Dreieck $\cos = \frac{\text{Ankathete}}{\text{Hypotenuse}}$` },
      ],
      ergebnis: r`$\beta = 50^\circ$, $a \approx 3{,}2$ cm, $b \approx 3{,}8$ cm`,
      fehler: [r`Taschenrechner im Bogenmaß-Modus (RAD): $\sin(40)$ ergibt dann etwa $0{,}745$ statt $0{,}643$.`],
    },
  ],

  formelblatt: [
    {
      id: 'fb-bogenmass',
      titel: 'Grad und Bogenmaß',
      inhalt: r`$x = \alpha \cdot \frac{\pi}{180^\circ}$; $\ 30^\circ = \frac{\pi}{6}$, $45^\circ = \frac{\pi}{4}$, $60^\circ = \frac{\pi}{3}$, $90^\circ = \frac{\pi}{2}$`,
    },
    {
      id: 'fb-dreieck',
      titel: 'Rechtwinkliges Dreieck',
      inhalt: r`$\sin = \frac{GK}{H}$, $\cos = \frac{AK}{H}$, $\tan = \frac{GK}{AK}$; $\ a^2 + b^2 = c^2$ ($\gamma = 90^\circ$); $\alpha + \beta + \gamma = 180^\circ$`,
    },
  ],
};
