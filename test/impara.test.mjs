// Test automatico di impara.html. Uso:  node test/impara.test.mjs
// Serve Playwright con Chromium (installato qui sul computer o globalmente).
import { execSync } from 'node:child_process';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
import * as C from './casi-errori.mjs';

async function caricaPlaywright() {
  try { return await import('playwright'); } catch {}
  const radice = execSync('npm root -g').toString().trim();
  return await import(pathToFileURL(path.join(radice, 'playwright', 'index.mjs')).href);
}

const qui = path.dirname(fileURLToPath(import.meta.url));
const url = pathToFileURL(path.join(qui, '..', 'impara.html')).href;
const { chromium } = await caricaPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
// Gli errori dell'anteprima (iframe) sono voluti: si contano solo quelli della pagina principale,
// che si annotano con un ascoltatore installato prima che la pagina parta.
await page.addInitScript(() => {
  window.__erroriPagina = [];
  window.addEventListener('error', (e) => window.__erroriPagina.push(e.message));
  window.addEventListener('unhandledrejection', (e) => window.__erroriPagina.push(String(e.reason)));
});
await page.goto(url);

let ok = 0; const falliti = [];
const verifica = (nome, cond, dettaglio = '') => { if (cond) ok++; else falliti.push(`${nome}${dettaglio ? ' -> ' + dettaglio : ''}`); };
const sezione = (t) => console.log('\n' + t);

// ---- controllori di errori ----
sezione('Controllo degli errori');
const risH = await page.evaluate((casi) => casi.map(([c]) => window.__impara.controllaHtml(c)), C.HTML_SBAGLIATI);
C.HTML_SBAGLIATI.forEach(([c, riga, pezzo], i) => verifica(`HTML sbagliato n.${i + 1}`, risH[i][0] && risH[i][0].riga === riga && risH[i][0].msg.includes(pezzo), JSON.stringify(risH[i][0])));
const gH = await page.evaluate((casi) => casi.map((c) => window.__impara.controllaHtml(c)), C.HTML_GIUSTI);
C.HTML_GIUSTI.forEach((c, i) => verifica(`HTML giusto n.${i + 1} senza falsi errori`, gH[i].length === 0, JSON.stringify(gH[i])));
const risC = await page.evaluate((casi) => casi.map(([c]) => window.__impara.controllaCss(c)), C.CSS_SBAGLIATI);
C.CSS_SBAGLIATI.forEach(([c, riga, pezzo], i) => verifica(`CSS sbagliato n.${i + 1}`, risC[i][0] && risC[i][0].riga === riga && risC[i][0].msg.includes(pezzo), JSON.stringify(risC[i][0])));
const gC = await page.evaluate((casi) => casi.map((c) => window.__impara.controllaCss(c)), C.CSS_GIUSTI);
C.CSS_GIUSTI.forEach((c, i) => verifica(`CSS giusto n.${i + 1} senza falsi errori`, gC[i].length === 0, JSON.stringify(gC[i])));
const trad = await page.evaluate((casi) => casi.map(([m]) => window.__impara.traduciErroreJs({ m }).it), C.JS_MESSAGGI);
C.JS_MESSAGGI.forEach(([m, pezzo], i) => verifica(`JS tradotto n.${i + 1}`, trad[i].includes(pezzo), trad[i]));
const eseg = await page.evaluate(async (casi) => {
  const r = [];
  for (const [codice] of casi) {
    const s = await window.__impara.Anteprima.sonda({ html: '', css: '', js: codice }, 'test');
    const e = s.errori[0];
    r.push(e ? { l: e.l, it: window.__impara.traduciErroreJs(e).it } : null);
    s.chiudi();
  }
  return r;
}, C.JS_ESEGUITI);
C.JS_ESEGUITI.forEach(([c, riga, pezzo], i) => verifica(`JS eseguito n.${i + 1}`, eseg[i] && eseg[i].l === riga && eseg[i].it.includes(pezzo), JSON.stringify(eseg[i])));

// ---- riepilogo ----
const erroriPagina = await page.evaluate(() => window.__erroriPagina);
verifica('nessun errore nella console della pagina', erroriPagina.length === 0, erroriPagina.join(' | '));
await browser.close();
console.log(`\nVerifiche riuscite: ${ok}`);
if (falliti.length) { console.log(`Verifiche FALLITE: ${falliti.length}`); falliti.forEach((f) => console.log('  - ' + f)); process.exit(1); }
console.log('Tutto a posto.');
