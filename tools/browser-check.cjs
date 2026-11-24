// Browser-Durchlauf: öffnet alle Seiten, deckt alles auf, sucht ungesetzte
// Formeln und JavaScript-Fehler und spielt eine Abfrage durch.
//
//   python3 -m http.server 8765 &      (im Repository-Ordner)
//   node tools/browser-check.cjs
//
// Braucht Playwright mit Chromium (in Claude-Code-Cloud-Sitzungen vorinstalliert).
const { chromium, devices } = require('playwright');

const BASE = process.env.BASE || 'http://localhost:8765/';

(async () => {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ ...devices['iPhone 13'] })).newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  page.on('console', (m) => {
    // Supabase/CDN ist in der Sandbox oft gesperrt, das ist kein App-Fehler
    if (m.type() === 'error' && !/ERR_TUNNEL|ERR_CONNECTION|Failed to load resource/.test(m.text())) errs.push(m.text());
  });

  await page.goto(BASE);
  const { units, uebungen, durchgaenge } = await page.evaluate(async () => {
    const c = await import('/js/content.js');
    return {
      units: c.units.map((u) => u.id),
      uebungen: c.uebungen.map((u) => u.id),
      durchgaenge: c.units.filter((u) => u.durchgang).map((u) => [u.id, u.durchgang.abschnitte.length]),
    };
  });

  const routes = ['#/', '#/fortschritt', '#/skyline', '#/fokus', '#/atmen', '#/methoden', '#/inhalte', '#/formelblatt', '#/einstellungen',
    ...units.map((u) => `#/inhalte/${u}`), ...uebungen.map((u) => `#/uebung/${u}`), ...uebungen.map((u) => `#/live/${u}`)];
  const leftover = async () => page.evaluate(() => {
    const t = document.getElementById('view').innerText;
    return (t.match(/\$[^$\n]{0,40}\$|\\(frac|dfrac|sqrt|begin)\b/g) || []).length + document.querySelectorAll('.katex-error').length;
  });

  let raw = 0;
  for (const r of routes) {
    await page.goto(BASE + r);
    await page.waitForTimeout(150);
    await page.evaluate(() => document.querySelectorAll('details').forEach((d) => { d.open = true; }));
    const btn = page.locator('[data-action="prep-all"], [data-action="prep-answer"]');
    while (await btn.count()) await btn.first().click();
    const n = await leftover();
    if (n) { raw += n; console.log('ungesetzte Formeln in', r, n); }
  }

  // Vorlesung durchgehen: jeden Abschnitt öffnen und komplett aufdecken
  for (const [u, count] of durchgaenge) {
    await page.goto(`${BASE}#/durchgang/${u}`);
    for (let i = 0; i < count; i += 1) {
      await page.click(`[data-action="walk-go"][data-i="${i}"]`);
      const all = page.locator('[data-action="walk-all"]');
      if (await all.count()) await all.click();
      const n = await leftover();
      if (n) { raw += n; console.log('ungesetzte Formeln in', u, 'Abschnitt', i + 1, n); }
    }
  }

  // Eine Abfrage komplett durchspielen
  await page.goto(`${BASE}#/inhalte/${units[units.length - 1]}`);
  await page.click('[data-action="start-unit"]');
  for (let i = 0; i < 80; i += 1) {
    if (await page.locator('.summary').count()) break;
    const cls = await page.locator('.card').getAttribute('class');
    if (cls.includes('verstaendnis')) {
      await page.locator('.option').first().click();
      await page.locator('[data-action="rate"]').last().click();
    } else {
      await page.click('[data-action="reveal"]');
      if (await page.locator('[data-action="steps-all"]').count()) await page.click('[data-action="steps-all"]');
      await page.click('[data-action="rate"][data-r="3"]');
    }
  }
  const done = (await page.locator('.summary').count()) === 1;
  console.log(`Seiten: ${routes.length}, Durchgänge: ${durchgaenge.length}, Abfrage beendet: ${done}, ungesetzte Formeln: ${raw}, Fehler: ${JSON.stringify(errs)}`);
  await browser.close();
  process.exit(done && !raw && !errs.length ? 0 : 1);
})();
