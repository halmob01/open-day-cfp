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

// ---- i passi dei capitoli ----
sezione('Passi dei capitoli');
const passi = await page.evaluate(() => window.__impara.CAPITOLI.map((c, ci) => ({
  titolo: c.titolo, descr: c.descr, intro: c.intro.map((s) => s.t), imparato: c.imparato,
  passi: c.passi.map((p, pi) => ({
    ci, pi, id: p.id, file: p.file, titolo: p.titolo, compito: p.compito, bravo: p.bravo,
    intro: (p.intro || []).map((s) => s.t), ini: p.codIni, sol: p.codSol,
    controlli: p.controlli.map((k) => ({ cosa: k.cosa, aiuto: k.aiuto })),
  })),
})));
const EMOJI = /\p{Extended_Pictographic}/u;
const testi = (v) => (Array.isArray(v) ? v : [v]).filter(Boolean);
const idVisti = new Set();
let totalePassi = 0;
for (const cap of passi) {
  const sigla = `Capitolo ${cap.passi[0].ci + 1}`;
  for (const t of [cap.titolo, cap.descr, ...cap.intro, ...cap.imparato]) {
    verifica(`${sigla}: testo senza emoji, senza «coach» e senza doppi spazi`, !EMOJI.test(t) && !/coach/i.test(t) && !/ {2}/.test(t), t);
  }
  verifica(`${sigla}: tre frasi su cosa si è imparato`, cap.imparato.length === 3);
  for (const p of cap.passi) {
    totalePassi++;
    verifica(`${p.id}: id unico e nel formato giusto`, !idVisti.has(p.id) && p.id === `c${p.ci + 1}p${p.pi + 1}`, p.id);
    idVisti.add(p.id);
    const tutti = [p.titolo, p.compito, p.bravo, ...p.intro, ...p.controlli.flatMap((k) => [k.cosa, k.aiuto])];
    verifica(`${p.id}: compito, frase finale, spiegazioni e controlli presenti`, !!p.compito && !!p.bravo && p.intro.length > 0 && p.controlli.length > 0 && p.controlli.every((k) => k.cosa && k.aiuto));
    verifica(`${p.id}: testi senza emoji, senza «coach» e senza doppi spazi`, tutti.every((t) => !EMOJI.test(t) && !/coach/i.test(t) && !/ {2}/.test(t)), tutti.find((t) => EMOJI.test(t) || /coach/i.test(t) || / {2}/.test(t)));
    // il codice di tutte le schede, in partenza e in soluzione, non deve contenere errori di HTML o CSS
    const nonDiPartenzaGiusta = await page.evaluate(({ ini, sol }) => {
      const I = window.__impara, r = [];
      for (const [nome, cod] of [['partenza', ini], ['soluzione', sol]]) {
        const h = I.controllaHtml(cod.html), c = I.controllaCss(cod.css);
        if (h.length) r.push(`${nome} HTML riga ${h[0].riga}: ${h[0].msg}`);
        if (c.length) r.push(`${nome} CSS riga ${c[0].riga}: ${c[0].msg}`);
      }
      return r;
    }, { ini: p.ini, sol: p.sol });
    verifica(`${p.id}: codice di partenza e soluzione senza errori di HTML e CSS`, nonDiPartenzaGiusta.length === 0, nonDiPartenzaGiusta.join(' | '));
    // con il codice di partenza almeno un controllo fallisce e non ci sono errori; con la soluzione passano tutti
    const ini = await page.evaluate(({ ci, pi, cod }) => { window.__impara.store.mem.codice = {}; return window.__impara.valutaPasso(ci, pi, cod); }, { ci: p.ci, pi: p.pi, cod: p.ini });
    verifica(`${p.id}: con il codice di partenza almeno un controllo fallisce`, ini.falliti && ini.falliti.length > 0 && !ini.won, JSON.stringify(ini));
    verifica(`${p.id}: il codice di partenza non mostra errori`, !ini.errore, JSON.stringify(ini.errore));
    const sol = await page.evaluate(({ ci, pi, cod }) => { window.__impara.store.mem.codice = {}; return window.__impara.valutaPasso(ci, pi, cod); }, { ci: p.ci, pi: p.pi, cod: p.sol });
    verifica(`${p.id}: con la soluzione passano tutti i controlli`, sol.won && !sol.errore && sol.falliti.length === 0, JSON.stringify(sol));
  }
  console.log(`  ${sigla}: ${cap.passi.length} passi controllati`);
}
verifica('almeno un capitolo con passi', totalePassi > 0);

// ---- riepilogo ----
const erroriPagina = await page.evaluate(() => window.__erroriPagina);
verifica('nessun errore nella console della pagina', erroriPagina.length === 0, erroriPagina.join(' | '));
await browser.close();
console.log(`\nVerifiche riuscite: ${ok}`);
if (falliti.length) { console.log(`Verifiche FALLITE: ${falliti.length}`); falliti.forEach((f) => console.log('  - ' + f)); process.exit(1); }
console.log('Tutto a posto.');
