// Casi di codice sbagliato per provare i controllori di errori di impara.html.
// Ogni caso: [codice, riga attesa del primo errore, pezzo di messaggio atteso].

export const HTML_SBAGLIATI = [
  ['<div>\n<p>ciao</p>\n', 1, 'mai chiuso'],
  ['<h1>Titolo</h2>', 1, 'mai aperto'],
  ['<div>\n  <button>Ok</div>\n</button>', 2, 'prima va chiuso'],
  ['<p>ciao</p>\n<dvi>x</dvi>', 2, 'Forse volevi scrivere «div»'],
  ['<p>\n  <b class="x"\n</p>', 2, 'manca il simbolo'],
  ['<a href="x>link</a>', 1, 'virgoletta'],
  ['<img src="a.png"></img>', 1, 'non si chiude'],
  ['<p>a</p>\n</div>', 2, 'mai aperto'],
  ['<!-- non chiuso\n<p>x</p>', 1, 'commento'],
];

export const HTML_GIUSTI = [
  '<h1>Titolo</h1>\n<p class="sub">Testo</p>\n<br>\n<img src="a.png" alt="x">',
  '<section id="home">\n  <button class="path" type="button">\n    <b>Estetica</b>\n    <span>Prepara</span>\n  </button>\n</section>',
  '<!-- un commento -->\n<div>\n  <svg viewBox="0 0 10 10"><path d="M0 0h10"/></svg>\n</div>',
];

export const CSS_SBAGLIATI = [
  ['h1 {\n  color: red;\n', 1, 'mai chiusa'],
  ['h1 {\n  color red;\n}', 2, 'Manca il «:»'],
  ['h1 {\n  colr: red;\n}', 2, 'Forse volevi scrivere «color»'],
  ['h1 {\n  color: rosso;\n}', 2, 'non va bene'],
  ['h1 {\n  color: red\n  margin: 0;\n}', 2, 'Manca il «;»'],
  ['h1 {\n  color: red;\n}\n}', 4, 'in più'],
  ['h1 {\n  color: red;\np {\n  margin: 0;\n}', 3, 'un’altra «{»'],
  ['.a {\n  width: 20;\n}', 2, 'unità'],
  ['/* aperto\nh1{color:red}', 1, 'non finisce mai'],
  ['{ color: red; }', 1, 'manca il selettore'],
];

export const CSS_GIUSTI = [
  'h1 {\n  color: red;\n}',
  ':root {\n  --bg: #0f1a17;\n}\nbody {\n  background: var(--bg);\n  font-family: \'Fira Sans\', system-ui, sans-serif;\n}',
  '.paths {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 18px;\n}\n.path:hover {\n  box-shadow: 0 0 0 4px var(--accent) inset;\n}\n@media (max-width: 900px) {\n  .paths {\n    grid-template-columns: 1fr;\n  }\n}',
];

// Messaggi di errore di JavaScript (come arrivano dal browser) e pezzo della traduzione attesa.
export const JS_MESSAGGI = [
  ['Uncaught ReferenceError: x is not defined', 'non esiste'],
  ["Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')", 'querySelector'],
  ['Uncaught TypeError: foo is not a function', 'non è una funzione'],
  ['Uncaught SyntaxError: Unexpected end of input', 'finisce troppo presto'],
  ['Uncaught SyntaxError: missing ) after argument list', 'parentesi'],
  ['Uncaught TypeError: Assignment to constant variable.', 'const'],
];

// Codice che gira davvero nell'anteprima: [codice, riga attesa, pezzo della traduzione].
export const JS_ESEGUITI = [
  ['let a = 1;\nlet b = 2;\nmancante();\n', 3, 'non esiste'],
  ['let a = 1;\nlet b = ;\n', 2, 'non dovrebbe stare qui'],
  ["document.querySelector('#nonce').addEventListener('click', () => {});\n", 1, 'querySelector'],
  ['const a = 1;\na = 2;\n', 2, 'const'],
  ['console.log("a";\n', 1, 'parentesi'],
];
