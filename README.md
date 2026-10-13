# Prova il mestiere

Sito per l'open day del CFP: una pagina unica dove si sceglie un mestiere
(Elettricità, Informatica, Estetica) e si fa un gioco guidato in tre missioni.
Alla fine si apre la pagina con i contatti della scuola, le date degli open day
e i laboratori aperti.

## File

- `index.html`: tutto il sito, in un solo file (HTML, CSS e JavaScript), con commenti
  che spiegano come è costruito.
- `impara.html`: la pagina «Costruisci il sito» per gli allievi. Raggiungibile dal pulsante
  «Scopri come è fatto questo sito» nella home. Otto capitoli in cui si ricostruisce una
  versione ridotta del sito scrivendo HTML, CSS e JavaScript in un editor dentro la pagina,
  con anteprima dal vivo ed errori spiegati in italiano. Funziona aprendo il file con
  doppio clic, senza server né internet (a parte il font Fira Sans).
- `test/`: test automatici di `impara.html`.
- `docs/`: piano di lavoro e compiti usati per costruire `impara.html`.

## Dati della scuola

Nel file `index.html` cerca il blocco `SCUOLA` e compila:

- `nome`, `indirizzo`, `telefono`, `email`, `sito`
- `date`: una riga per ogni open day, con `quando` e `note`
- `laboratori`: una descrizione per ogni mestiere (`el`, `net`, `est`)

Se `email` è vuota, il riquadro per scrivere alla scuola resta disabilitato.

## Uso

Basta aprire `index.html` in un browser. Non serve un server.

## Aggiungere o modificare un passo di `impara.html`

I capitoli sono nell'elenco `CAPITOLI` dentro `impara.html`; il codice che gli
allievi vedono negli editor sta nei blocchi `<script type="text/plain" data-k="nome">`
in fondo alla pagina (i «pezzi»). Un passo è un oggetto con:

- `id` (per esempio `c3p2`), `titolo`, `file` (`html`, `css` o `js`: la scheda in cui si scrive);
- `intro`: i fumetti del prof prima di cominciare (`riga` e `tab` evidenziano una riga);
- `compito`: la frase sempre visibile;
- `inizio` e `soluzione`: per ogni scheda il nome di un pezzo o un elenco di pezzi.
  Se manca, si parte dalla soluzione del passo prima;
- `controlli`: elenco di `{ cosa, ok(d, w, c), aiuto }`. `ok` riceve il documento
  dell'anteprima, la sua finestra e il codice delle tre schede, e restituisce vero o falso;
- `bravo`: la frase quando il passo riesce.

Dopo ogni modifica si lancia `node test/impara.test.mjs` (serve Playwright con Chromium):
per ogni passo verifica che con il codice di partenza almeno un controllo fallisca, che con
la soluzione passino tutti, e che non ci siano errori. Se il test fallisce, dice quale passo.
