// Vorlesung 11 (16.11.2026) durchgehen: arccos, arctan, Cosinus-/Tangensgleichungen, Funktionstypen, Sekante, Tangente, Differenzierbarkeit
const r = String.raw;

export default {
  unit: 'vl11',
  abschnitte: [
    {
      id: 'vl11-d01',
      folien: '3',
      titel: 'Die Umkehrfunktion zur Cosinusfunktion',
      folie: r`Der Cosinus ist z. B. auf $[0; \pi]$ umkehrbar. Die Umkehrfunktion ist
$$\arccos: [-1; 1] \to [0; \pi],\quad x \mapsto \arccos(x).$$`,
      notizen: [
        { t: r`Im Graphen ist der Cosinus auf $[0; \pi]$ hervorgehoben.`, w: r`Dort fällt er streng von $1$ auf $-1$ und nimmt jeden Wert genau einmal an. Nur so kann man eindeutig zurückrechnen.` },
      ],
      kern: r`$\arccos(a)$ liefert immer einen Winkel zwischen $0$ und $\pi$, dessen Cosinus $a$ ist.`,
      check: { frage: r`Was ist $\arccos(0)$?`, antwort: r`$\frac{\pi}{2}$, denn $\cos\left(\frac{\pi}{2}\right) = 0$ und $\frac{\pi}{2} \in [0; \pi]$.` },
      karten: ['vl11-arccos', 'vl11-intervalle-mc'],
    },
    {
      id: 'vl11-d02',
      folien: '4',
      titel: 'Cosinus-Gleichungen lösen',
      folie: r`$\cos(x) = a$ mit $-1 \le a \le 1$. Im Intervall $[-\pi; \pi)$: $x_1 = \arccos(a)$, $x_2 = -\arccos(a)$.

Insgesamt: $x_{1,k} = \arccos(a) + k \cdot 2\pi$, $x_{2,k} = -\arccos(a) + k \cdot 2\pi$, $k \in \mathbb{Z}$`,
      notizen: [
        { t: r`Im Cosinusgraphen wird eine Höhe $a$ markiert, und alle Stellen mit $\cos(x) = a$ werden beschriftet.`, w: r`Die Gleichung $\cos(x) = a$ fragt: Wo hat der Graph die Höhe $a$?` },
        { t: r`Türkis: $\arccos(a)$, dazu $\arccos(a) - 2\pi$ und $\arccos(a) + 2\pi$.`, w: r`Die erste Lösungsfamilie: der Taschenrechnerwert plus ganze Perioden ($2\pi$).` },
        { t: r`Lila: $-\arccos(a)$, $-\arccos(a) + 2\pi$ usw.`, w: r`Zweite Familie: Der Cosinus ist achsensymmetrisch zur y-Achse, $\cos(-x) = \cos(x)$. Deshalb ist auch $-\arccos(a)$ eine Lösung.` },
      ],
      kern: r`Bei Cosinus-Gleichungen gibt es zwei Lösungsfamilien: $\pm\arccos(a) + k \cdot 2\pi$.`,
      check: { frage: r`Löse $\cos(x) = 1$.`, antwort: r`$\arccos(1) = 0$, beide Familien fallen zusammen: $x_k = k \cdot 2\pi$.` },
      karten: ['vl11-cos-tan-vergleich'],
    },
    {
      id: 'vl11-d03',
      folien: '5–6',
      titel: 'arctan und Tangens-Gleichungen',
      folie: r`Der Tangens ist z. B. auf $\left(-\frac{\pi}{2}; \frac{\pi}{2}\right)$ umkehrbar: $\arctan: (-\infty; \infty) \to \left(-\frac{\pi}{2}; \frac{\pi}{2}\right)$.

$\tan(x) = a$ mit $a \in \mathbb{R}$: im Intervall $\left(-\frac{\pi}{2}; \frac{\pi}{2}\right)$ ist $x = \arctan(a)$, insgesamt $x_k = \arctan(a) + k \cdot \pi$, $k \in \mathbb{Z}$.`,
      notizen: [
        { t: r`Am $\pi$ in $k \cdot \pi$: „Periodenlänge von tan“`, w: r`Der Tangens wiederholt sich schon nach $\pi$, nicht erst nach $2\pi$ wie Sinus und Cosinus.` },
        { t: r`Im Graphen: Höhe $a$ markiert, Lösungen $\arctan(a) - \pi$, $\arctan(a)$, $\arctan(a) + \pi$, $\arctan(a) + 2\pi$, $\arctan(a) + 3\pi$.`, w: r`Jeder Ast des Tangens erreicht jede Höhe genau einmal. Deshalb gibt es nur **eine** Lösungsfamilie.` },
      ],
      kern: r`Tangens-Gleichung: nur eine Familie, $x_k = \arctan(a) + k \cdot \pi$. Kein „minus“-Fall, und $\pi$ statt $2\pi$.`,
      check: { frage: r`Warum braucht man beim Tangens keine zweite Lösungsfamilie?`, antwort: r`Weil jeder Ast (Länge $\pi$) jede Höhe genau einmal annimmt. Verschieben um $k\pi$ liefert schon alle Lösungen.` },
      karten: ['vl11-arctan', 'vl11-cos-tan-vergleich'],
    },
    {
      id: 'vl11-d04',
      folien: '7 und Notizseite',
      titel: r`Beispiel 3: Nullstellen von $\cos(2x - \pi)$`,
      folie: r`Nullstellen von $f(x) = \cos(2x - \pi)$`,
      notizen: [
        { t: r`$f(x) = 0 \iff \cos(2x - \pi) = 0$`, w: r`Nullstellen: Funktion gleich 0 setzen. Der Cosinus steht schon allein.` },
        { t: r`$\iff \begin{cases} 2x_{1,k} - \pi = \arccos(0) + k \cdot 2\pi \\ 2x_{2,k} - \pi = -\arccos(0) + k \cdot 2\pi \end{cases} \quad k \in \mathbb{Z}$`, w: r`Das ganze Argument $2x - \pi$ wird wie $x$ in der Formel von Folie 4 behandelt: zwei Familien.` },
        { t: r`$\iff \begin{cases} 2x_{1,k} - \pi = \frac{\pi}{2} + k \cdot 2\pi \\ 2x_{2,k} - \pi = -\frac{\pi}{2} + k \cdot 2\pi \end{cases} \quad \Big| +\pi$`, w: r`$\arccos(0) = \frac{\pi}{2}$.` },
        { t: r`$\iff \begin{cases} 2x_{1,k} = \frac{3\pi}{2} + k \cdot 2\pi \\ 2x_{2,k} = \frac{\pi}{2} + k \cdot 2\pi \end{cases} \quad \Big| :2$`, w: r`$\frac{\pi}{2} + \pi = \frac{3\pi}{2}$ und $-\frac{\pi}{2} + \pi = \frac{\pi}{2}$.` },
        { t: r`$\iff \begin{cases} x_{1,k} = \frac{3\pi}{4} + k \cdot \pi \\ x_{2,k} = \frac{\pi}{4} + k \cdot \pi \end{cases}$`, w: r`**Alles** durch 2 teilen, auch $k \cdot 2\pi$. Daraus wird $k \cdot \pi$.` },
      ],
      kern: r`Erst die Lösungsformel auf das ganze Argument anwenden, dann nach $x$ umstellen. Beim Teilen auch den $k$-Term teilen.`,
      karten: ['vl11-cos-aufgabe'],
    },
    {
      id: 'vl11-d05',
      folien: '7 und Notizseite',
      titel: r`Beispiel 4: $5\cos\left(0{,}5x - \frac{\pi}{3}\right) + 2{,}5$`,
      folie: r`Nullstellen von $f(x) = 5\cos\left(0{,}5x - \frac{\pi}{3}\right) + 2{,}5$`,
      notizen: [
        { t: r`$f(x) = 0 \iff 5\cos\left(0{,}5x - \frac{\pi}{3}\right) + 2{,}5 = 0 \quad | -2{,}5$`, w: r`Zuerst den Cosinus freistellen: Was außen steht, wird zuerst entfernt.` },
        { t: r`$\iff 5\cos\left(0{,}5x - \frac{\pi}{3}\right) = -2{,}5 \quad | :5$`, w: r`` },
        { t: r`$\iff \cos\left(0{,}5x - \frac{\pi}{3}\right) = -0{,}5$`, w: r`$-0{,}5$ liegt zwischen $-1$ und $1$, es gibt also Lösungen.` },
        { t: r`$\iff \begin{cases} 0{,}5x_{1,k} - \frac{\pi}{3} = \arccos(-0{,}5) + k \cdot 2\pi \\ 0{,}5x_{2,k} - \frac{\pi}{3} = -\arccos(-0{,}5) + k \cdot 2\pi \end{cases}$`, w: r`Zwei Familien wie auf Folie 4.` },
        { t: r`$\iff \begin{cases} 0{,}5x_{1,k} - \frac{\pi}{3} = \frac{2\pi}{3} + k \cdot 2\pi \\ 0{,}5x_{2,k} - \frac{\pi}{3} = -\frac{2\pi}{3} + k \cdot 2\pi \end{cases} \quad \Big| +\frac{\pi}{3}$`, w: r`$\arccos(-0{,}5) = \frac{2\pi}{3}$ (Wertetabelle bzw. $\cos(120°) = -0{,}5$).` },
        { t: r`$\iff \begin{cases} 0{,}5x_{1,k} = \pi + k \cdot 2\pi \\ 0{,}5x_{2,k} = -\frac{\pi}{3} + k \cdot 2\pi \end{cases} \quad \Big| :0{,}5$`, w: r`$\frac{2\pi}{3} + \frac{\pi}{3} = \pi$ und $-\frac{2\pi}{3} + \frac{\pi}{3} = -\frac{\pi}{3}$.` },
        { t: r`$\iff \begin{cases} x_{1,k} = 2\pi + k \cdot 4\pi \\ x_{2,k} = -\frac{2\pi}{3} + k \cdot 4\pi \end{cases}$`, w: r`Durch $0{,}5$ teilen heißt mal 2 nehmen. Die Periode wird $4\pi$, passend zu $p = \frac{2\pi}{0{,}5}$.` },
      ],
      kern: r`Reihenfolge: Konstante weg, Vorfaktor weg, dann $\arccos$ mit zwei Familien, zum Schluss nach $x$ auflösen.`,
      check: { frage: r`Warum steht am Ende $k \cdot 4\pi$ und nicht $k \cdot 2\pi$?`, antwort: r`Weil durch $0{,}5$ geteilt wurde: $\frac{k \cdot 2\pi}{0{,}5} = k \cdot 4\pi$. Das ist die Periode von $\cos(0{,}5x)$.` },
      karten: ['vl11-cos-aufgabe'],
    },
    {
      id: 'vl11-d06',
      folien: '7 und Notizseite',
      titel: r`Beispiel 5: $3\tan\left(x - \frac{\pi}{4}\right) - 3$`,
      folie: r`Nullstellen von $f(x) = 3\tan\left(x - \frac{\pi}{4}\right) - 3$`,
      notizen: [
        { t: r`$f(x) = 0 \iff 3\tan\left(x - \frac{\pi}{4}\right) - 3 = 0 \quad | +3$`, w: r`` },
        { t: r`$\iff 3\tan\left(x - \frac{\pi}{4}\right) = 3 \quad | :3$`, w: r`` },
        { t: r`$\iff \tan\left(x - \frac{\pi}{4}\right) = 1$`, w: r`Tangens freigestellt.` },
        { t: r`$\iff x_k - \frac{\pi}{4} = \arctan(1) + k \cdot \pi, \quad k \in \mathbb{Z}$`, w: r`Nur eine Familie, Periode $\pi$ (Folie 6).` },
        { t: r`$\iff x_k - \frac{\pi}{4} = \frac{\pi}{4} + k \cdot \pi \quad \Big| +\frac{\pi}{4}$`, w: r`$\arctan(1) = \frac{\pi}{4}$, weil $\tan(45°) = 1$.` },
        { t: r`$\iff x_k = \frac{\pi}{2} + k \cdot \pi$`, w: r`` },
      ],
      kern: r`Beim Tangens dieselben Schritte, aber nur eine Lösungsfamilie mit $k \cdot \pi$.`,
      karten: ['vl11-tan-aufgabe'],
    },
    {
      id: 'vl11-d07',
      folien: '9–11',
      titel: 'Funktionstypen und gedämpfte Schwingung',
      folie: r`Überblick: affin-lineare, Polynom-, Exponential-, Logarithmus-, Sinus-/Cosinusfunktionen. Oft werden sie kombiniert, z. B. $x + \cos(x)$, $x^2 \cdot e^x$, $\frac{\sin(x)}{x}$, $e^{\sqrt{x}}$. Ein allgemeines Verfahren für Nullstellen gibt es dann nicht.

Folie 11 zeigt den Graphen einer gedämpften Schwingung.`,
      notizen: [
        { t: r`$$f(t) = 3e^{-0{,}5t} \cdot \cos(4t)$$`, w: r`Eine Kombination aus Exponential- und Cosinusfunktion.` },
        { t: r`Die gestrichelten Kurven oben und unten: $3e^{-0{,}5t}$ und $-3e^{-0{,}5t}$.`, w: r`Weil $-1 \le \cos(4t) \le 1$ ist, bleibt $f$ immer zwischen diesen beiden Kurven. Sie werden mit der Zeit kleiner, die Schwingung „klingt ab“.` },
      ],
      plot: {
        x: [0, 6.2], y: [-3.3, 3.3], u: 46,
        fns: [{ f: (t) => 3 * Math.exp(-0.5 * t) * Math.cos(4 * t) }, { f: (t) => 3 * Math.exp(-0.5 * t) }, { f: (t) => -3 * Math.exp(-0.5 * t) }],
        alt: 'Gedämpfte Schwingung zwischen den Hüllkurven 3e^(−0,5t) und −3e^(−0,5t)',
      },
      kern: r`Gedämpfte Schwingung: Amplitude $3e^{-0{,}5t}$ wird kleiner, $\cos(4t)$ sorgt fürs Schwingen.`,
      karten: ['vl11-funktionstypen', 'vl11-gedaempft'],
    },
    {
      id: 'vl11-d08',
      folien: '13–14',
      titel: 'Von der Sekante zur Tangente',
      folie: r`Sekante: Gerade durch zwei Punkte $P(x_1; f(x_1))$ und $Q(x_2; f(x_2))$ des Graphen mit Steigung $m = \frac{\Delta y}{\Delta x} = \frac{f(x_2) - f(x_1)}{x_2 - x_1}$.

Jetzt ist $P(x_0; f(x_0))$ fest und $Q(x_0 + \Delta x; f(x_0 + \Delta x))$ wandert an $P$ heran. Die Grenzlage der Geraden heißt **Tangente**.`,
      notizen: [
        { t: r`$\Delta x$ = Abstand zwischen den x-Koordinaten`, w: r`$Q$ liegt um $\Delta x$ weiter rechts als $P$.` },
        { t: r`$$m = \frac{f(x_0 + \Delta x) - f(x_0)}{x_0 + \Delta x - x_0} = \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$$`, w: r`Die Sekantenformel mit $x_1 = x_0$ und $x_2 = x_0 + \Delta x$. Im Nenner hebt sich $x_0$ weg.` },
      ],
      kern: r`Sekantensteigung mit festem Punkt: $\frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}$. Wird $\Delta x$ kleiner, nähert sich die Sekante der Tangente.`,
      check: { frage: r`Sekantensteigung von $f(x) = x^2$ zwischen $x_0 = 1$ und $\Delta x = 1$?`, antwort: r`$\frac{f(2) - f(1)}{1} = \frac{4 - 1}{1} = 3$.` },
      karten: ['vl11-sekante', 'vl11-sekante-aufgabe'],
    },
    {
      id: 'vl11-d09',
      folien: '15–16',
      titel: 'Tangentensteigung und Differenzierbarkeit',
      folie: r`Existiert eine Tangente an der Stelle $x_0$, ist ihre Steigung
$$\lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}.$$
Existiert dieser Grenzwert, heißt $f$ an der Stelle $x_0$ **differenzierbar**, und der Grenzwert heißt **Ableitung** $f'(x_0)$.`,
      notizen: [
        { t: r`Um das $\lim$ ein Kreis: „Heranwandern des 2. Punktes an den festen Punkt“`, w: r`$\Delta x \to 0$ heißt: $Q$ rückt immer näher an $P$.` },
        { t: r`Unter dem Bruch: „Sekantensteigung“`, w: r`Der Bruch selbst ist nur die Steigung einer Sekante (Abschnitt davor).` },
        { t: r`Darunter: $f'(x_0)$`, w: r`Der Grenzwert bekommt einen eigenen Namen: die Ableitung an der Stelle $x_0$.` },
      ],
      kern: r`Ableitung = Grenzwert der Sekantensteigungen = Steigung der Tangente.`,
      karten: ['vl11-tangente', 'vl11-differenzierbar'],
    },
    {
      id: 'vl11-d10',
      folien: 'Notizseite nach 16',
      titel: 'Nicht-Beispiel: $|x|$ an der Stelle 0',
      folie: r`$f: \mathbb{R} \to [0; \infty)$, $f(x) = |x|$`,
      notizen: [
        { t: r`Graph: links der Ursprung eine fallende Gerade (Steigung $-1$), rechts eine steigende (Steigung $+1$). Im Ursprung ein Knick.`, w: r`$|x| = -x$ für $x < 0$ und $|x| = x$ für $x \ge 0$.` },
        { t: r`Sekanten von links haben Steigung $-1$, Sekanten von rechts Steigung $+1$.`, w: r`Je nachdem, von welcher Seite $Q$ heranwandert, kommt ein anderer Wert heraus. Es gibt keine eindeutige Grenzlage.` },
        { t: r`Die Funktion ist an der Stelle 0 **nicht differenzierbar**.`, w: r`Der Grenzwert existiert nicht, weil links- und rechtsseitig verschiedene Werte herauskommen.` },
      ],
      plot: {
        x: [-2.5, 3.2], y: [-0.8, 2.8], u: 46,
        fns: [{ f: (x) => Math.abs(x) }],
        points: [[0, 0]],
        alt: 'Betragsfunktion mit Knick im Ursprung',
      },
      kern: r`Bei einem Knick gibt es keine Tangente: dort ist die Funktion nicht differenzierbar.`,
      check: { frage: r`Ist $|x|$ an der Stelle 2 differenzierbar?`, antwort: r`Ja. Dort ist kein Knick, der Graph ist eine Gerade mit Steigung 1, also $f'(2) = 1$.` },
      karten: ['vl11-betrag-mc'],
    },
  ],
};
