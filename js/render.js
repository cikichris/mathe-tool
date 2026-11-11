// Text aus den Inhaltsdateien in HTML umwandeln und Formeln setzen.

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

function inline(s) {
  return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/**
 * Sehr kleines Markdown: Absätze (Leerzeile), Listen ("- " und "1. "),
 * **fett** und Zeilenumbrüche. Formeln stehen in $...$ bzw. $$...$$.
 */
export function fmt(text) {
  if (!text) return '';
  const blocks = String(text).trim().split(/\n{2,}/);
  return blocks.map((block) => {
    const lines = block.split('\n');
    const out = [];
    let list = null; // { tag, items }
    const flush = () => {
      if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${i}</li>`).join('')}</${list.tag}>`);
      list = null;
    };
    let para = [];
    const flushPara = () => {
      // Zeilen wie "a) ..." oder "(ii) ..." sind Teilaufgaben und bekommen etwas Abstand
      const html = para.map((line, i) => {
        const part = /^\(?[a-z]{1,3}\) /.test(line.raw);
        if (part) return `<span class="part">${line.html}</span>`;
        const next = para[i + 1];
        return line.html + (next && !/^\(?[a-z]{1,3}\) /.test(next.raw) ? '<br>' : '');
      }).join('');
      if (para.length) out.push(`<p>${html}</p>`);
      para = [];
    };
    for (const line of lines) {
      const ul = line.match(/^- (.*)$/);
      const ol = line.match(/^\d+\. (.*)$/);
      if (ul || ol) {
        flushPara();
        const tag = ul ? 'ul' : 'ol';
        if (list && list.tag !== tag) flush();
        list ||= { tag, items: [] };
        list.items.push(inline((ul || ol)[1]));
      } else {
        flush();
        para.push({ raw: line, html: inline(line) });
      }
    }
    flush();
    flushPara();
    return out.join('');
  }).join('');
}

/** Setzt alle Formeln innerhalb eines Elements mit KaTeX. */
export function typeset(el) {
  if (!globalThis.renderMathInElement) return;
  globalThis.renderMathInElement(el, {
    delimiters: [
      { left: '$$', right: '$$', display: true },
      { left: '$', right: '$', display: false },
    ],
    throwOnError: false,
  });
}
