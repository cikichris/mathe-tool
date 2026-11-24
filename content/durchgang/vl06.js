// Vorlesung 6 (27.10.2026) durchgehen: Exponentialgleichungen, Symmetrie, Definitionsbereich bei Logarithmen
const r = String.raw;

export default {
  unit: 'vl06',
  abschnitte: [
    {
      id: 'vl06-d01',
      folien: '3',
      titel: 'Strategien für Exponentialgleichungen',
      folie: r`- umstellen, sodass auf einer Seite eine Potenz und auf der anderen eine Zahl steht, dann Logarithmus anwenden
- umstellen, sodass links und rechts je eine Potenz steht, dann Logarithmus anwenden
- Potenz- bzw. Logarithmengesetze anwenden
- Potenz substituieren
- Satz vom Nullprodukt`,
      kern: r`Ziel ist immer, das $x$ aus dem Exponenten zu holen. Dafür braucht man den Logarithmus.`,
      karten: ['vl06-exp-strategien'],
    },
    {
      id: 'vl06-d02',
      folien: '4 und Notizseite',
      titel: r`Beispiel 1: $3 \cdot \left(\frac{1}{2}\right)^{2x} - 12$`,
      folie: r`Nullstellen von $f(x) = 3 \cdot \left(\frac{1}{2}\right)^{2x} - 12$`,
      notizen: [
        { t: r`$f(x) = 0 \iff 3 \cdot \left(\frac{1}{2}\right)^{2x} - 12 = 0 \quad | +12$`, w: r`` },
        { t: r`$\iff 3 \cdot \left(\frac{1}{2}\right)^{2x} = 12 \quad | :3 \iff \left(\frac{1}{2}\right)^{2x} = 4 \quad | \log_{\frac{1}{2}}$`, w: r`Potenz allein, dann den Logarithmus zur **gleichen** Basis $\frac{1}{2}$ nehmen (gelb markiert).` },
        { t: r`$\iff 2x = \log_{\frac{1}{2}}(4) \iff 2x = -2 \quad | :2$`, w: r`$\log_{\frac{1}{2}}(4) = -2$, weil $\left(\frac{1}{2}\right)^{-2} = 2^2 = 4$.` },
        { t: r`$\iff x = -1$`, w: r`Probe: $3 \cdot \left(\frac{1}{2}\right)^{-2} = 3 \cdot 4 = 12$. ✓` },
      ],
      kern: r`Potenz isolieren, dann $\log$ zur passenden Basis: $a^{u} = c \iff u = \log_a(c)$.`,
      karten: ['vl06-exp-bsp1'],
    },
    {
      id: 'vl06-d03',
      folien: '4 und Notizseite',
      titel: r`Beispiel 2: $2^x + 4 \cdot 2^{-x} - 5$ (Substitution)`,
      folie: r`Nullstellen von $f(x) = 2^x + 4 \cdot 2^{-x} - 5$`,
      notizen: [
        { t: r`$f(x) = 0 \iff 2^x + 4 \cdot 2^{-x} - 5 = 0 \iff 2^x + 4 \cdot \frac{1}{2^x} - 5 = 0$`, w: r`$2^{-x} = \frac{1}{2^x}$. Jetzt kommt nur noch $2^x$ vor.` },
        { t: r`Substitution: $z = 2^x$ $$\iff z + 4 \cdot \frac{1}{z} - 5 = 0 \quad | \cdot z$$`, w: r`Mit der Abkürzung $z$ sieht man eine einfachere Gleichung.` },
        { t: r`$\iff z^2 + 4 - 5z = 0 \iff z^2 - 5z + 4 = 0$`, w: r`Mit $z$ malnehmen beseitigt den Bruch. Sortieren ergibt eine quadratische Gleichung.` },
        { t: r`$\iff z_{1,2} = \frac{5}{2} \pm \sqrt{\left(-\frac{5}{2}\right)^2 - 4} = \frac{5}{2} \pm \frac{3}{2} \iff z_1 = 4, \; z_2 = 1$`, w: r`p-q-Formel mit $p = -5$, $q = 4$: $\frac{25}{4} - \frac{16}{4} = \frac{9}{4}$, Wurzel $\frac{3}{2}$.` },
        { t: r`Rücksubstitution: $2^x = 4 \;\vee\; 2^x = 1 \quad | \log_2$`, w: r`$z$ wieder durch $2^x$ ersetzen, sonst hat man nur $z$ ausgerechnet.` },
        { t: r`$\iff x_1 = \log_2(4) = 2, \quad x_2 = \log_2(1) = 0$`, w: r`` },
      ],
      kern: r`Kommen $a^x$ und $a^{-x}$ (oder $a^{2x}$) vor: $z = a^x$ substituieren, quadratische Gleichung lösen, zurück substituieren.`,
      karten: ['vl06-exp-bsp2'],
    },
    {
      id: 'vl06-d04',
      folien: '4 und Notizseiten',
      titel: r`Beispiel 3: $e^{x+1} - 2^x$, zwei Rechenwege`,
      folie: r`Nullstellen von $f(x) = e^{x+1} - 2^x$`,
      notizen: [
        { t: r`$f(x) = 0 \iff e^{x+1} - 2^x = 0 \quad | +2^x \iff e^{x+1} = 2^x \quad | \log_2$`, w: r`Je eine Potenz auf jeder Seite, aber verschiedene Basen.` },
        { t: r`$\iff \log_2(e^{x+1}) = x$ | Logarithmengesetz $\iff (x+1) \cdot \log_2(e) = x$`, w: r`$\log_a(u^r) = r \cdot \log_a(u)$. Rechts: $\log_2(2^x) = x$.` },
        { t: r`$\iff x \cdot \log_2(e) + \log_2(e) = x \quad | -x \cdot \log_2(e) \iff \log_2(e) = x - x \cdot \log_2(e)$`, w: r`Alle Terme mit $x$ auf eine Seite.` },
        { t: r`$\iff \log_2(e) = x \cdot (1 - \log_2(e)) \quad | :(1 - \log_2(e)) \iff x = \frac{\log_2(e)}{1 - \log_2(e)}$`, w: r`$x$ ausklammern, dann teilen.` },
        { t: r`**Alternativer Rechenweg** mit $\ln$: $e^{x+1} = 2^x \quad | \ln \iff x + 1 = \ln(2^x)$`, w: r`$\ln(e^{x+1}) = x + 1$. So wird die linke Seite einfacher.` },
        { t: r`$\iff x + 1 = x \cdot \ln(2) \quad | -x \iff 1 = x \cdot \ln(2) - x$ | Ausklammern`, w: r`` },
        { t: r`$\iff 1 = x \cdot (\ln(2) - 1) \quad | :(\ln(2) - 1) \iff x = \frac{1}{\ln(2) - 1}$`, w: r`Beide Ergebnisse sind gleich, etwa $-3{,}26$.` },
      ],
      kern: r`Bei verschiedenen Basen einen Logarithmus auf beide Seiten anwenden. Mit $\ln$ wird es oft kürzer, wenn $e$ vorkommt.`,
      check: { frage: r`Warum ist der Weg mit $\ln$ kürzer?`, antwort: r`Weil $\ln(e^{x+1}) = x + 1$ direkt herauskommt, ohne den Faktor $\log_2(e)$.` },
      karten: ['vl06-exp-bsp3'],
    },
    {
      id: 'vl06-d05',
      folien: '4 und Notizseite',
      titel: r`Beispiel 4: $(e^x - 1) \cdot (e^x - 2)$`,
      folie: r`Nullstellen von $f(x) = (e^x - 1) \cdot (e^x - 2)$`,
      notizen: [
        { t: r`$f(x) = 0 \iff (e^x - 1) \cdot (e^x - 2) = 0$ | Satz vom Nullprodukt`, w: r`Ein Produkt ist 0, wenn ein Faktor 0 ist. Nicht ausmultiplizieren!` },
        { t: r`$\iff e^x - 1 = 0 \;\vee\; e^x - 2 = 0 \iff e^x = 1 \;\vee\; e^x = 2 \quad | \ln$`, w: r`` },
        { t: r`$\iff x_1 = \ln(1) = 0, \quad x_2 = \ln(2)$`, w: r`` },
      ],
      kern: r`Steht schon ein Produkt da: Satz vom Nullprodukt, jeden Faktor einzeln null setzen.`,
      karten: ['vl06-exp-bsp4'],
    },
    {
      id: 'vl06-d06',
      folien: '5–6',
      titel: 'Symmetrie von Exponentialfunktionen',
      folie: r`Reine Exponentialfunktionen $a^x$ sind weder gerade noch ungerade, allgemeinere können es sein.

Beispiele: 1) $e^{-2x}$ 2) $e^{x^2 + 1}$ 3) $e^x - e^{-x}$`,
      notizen: [
        { t: r`1) $f(1) = e^{-2} \approx 0{,}135$, $f(-1) = e^2 \approx 7{,}389$ $\Rightarrow$ weder gerade noch ungerade`, w: r`Ein Gegenbeispiel reicht: Die Werte sind weder gleich noch entgegengesetzt.` },
        { t: r`2) $f(1) = e^2$, $f(-1) = e^2$. $f(-x) = e^{(-x)^2 + 1} = e^{x^2 + 1} = f(x)$ für alle $x \Rightarrow$ gerade`, w: r`Zahlenbeispiel als Vermutung, dann allgemein mit $-x$ nachweisen.` },
        { t: r`3) Vermutung: $f$ ist ungerade. $f(-x) = e^{-x} - e^{-(-x)} = e^{-x} - e^x$`, w: r`` },
        { t: r`$-f(x) = -(e^x - e^{-x}) = -e^x + e^{-x}$. Beides stimmt überein: $f(-x) = -f(x)$ für alle $x \Rightarrow f$ ist ungerade.`, w: r`Für „ungerade“ $f(-x)$ und $-f(x)$ getrennt ausrechnen und vergleichen.` },
      ],
      kern: r`Gegenbeispiel genügt für „nicht symmetrisch“. Für „gerade“/„ungerade“ braucht man den allgemeinen Nachweis mit $-x$.`,
      karten: ['vl06-exp-symmetrie'],
    },
    {
      id: 'vl06-d07',
      folien: '7',
      titel: 'Maximaler Definitionsbereich bei Logarithmen',
      folie: r`Bei $f(x) = \log_a(p(x))$ muss man die Ungleichung $p(x) > 0$ lösen.

Achtung: Beim Multiplizieren oder Dividieren mit einer negativen Zahl dreht sich das Relationszeichen um. Manchmal hilft es, erst die Gleichung $p(x) = 0$ zu lösen.`,
      kern: r`Definitionsbereich: Argument des Logarithmus $> 0$ setzen und die Ungleichung lösen.`,
      check: { frage: r`Definitionsbereich von $\ln(4 - 2x)$?`, antwort: r`$4 - 2x > 0 \iff -2x > -4 \iff x < 2$ (Zeichen dreht sich beim Teilen durch $-2$). Also $D = (-\infty; 2)$.` },
      karten: ['vl06-log-defbereich', 'vl06-ungleichung-mc'],
    },
    {
      id: 'vl06-d08',
      folien: '8–9 und Notizseite',
      titel: r`Logarithmengleichung: $\ln(3x - 4) - 2$`,
      folie: r`Strategien wie bei Exponentialgleichungen, nur umgekehrt: Logarithmus isolieren, dann Exponentialfunktion anwenden. Lösungen auf den Definitionsbereich prüfen!

Beispiel 1: $f(x) = \ln(3x - 4) - 2$`,
      notizen: [
        { t: r`Max. Definitionsbereich: $3x - 4 > 0 \quad | +4 \iff 3x > 4 \quad | :3 \iff x > \frac{4}{3} \Rightarrow D = \left(\frac{4}{3}; \infty\right)$`, w: r`` },
        { t: r`$f(x) = 0 \iff \ln(3x - 4) - 2 = 0 \quad | +2 \iff \ln(3x - 4) = 2 \quad | e^{(\,)}$`, w: r`„$e$ hoch“ beide Seiten hebt den $\ln$ auf.` },
        { t: r`$\iff 3x - 4 = e^2 \quad | +4 \iff 3x = e^2 + 4 \quad | :3 \iff x = \frac{e^2 + 4}{3} \in D$`, w: r`$\frac{e^2 + 4}{3} \approx 3{,}8 > \frac{4}{3}$, die Lösung ist gültig.` },
      ],
      kern: r`Logarithmus isolieren, $e^{(\,)}$ anwenden, Lösung mit dem Definitionsbereich prüfen.`,
      karten: ['vl06-log-strategien', 'vl06-log-bsp1'],
    },
  ],
};
