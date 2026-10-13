# Piano di lavoro

Due obiettivi:

1. **Commentare `index.html`** in modo che una persona senza competenze di
   programmazione capisca com'è fatto il sito e dove mettere le mani.
2. **Costruire `impara.html`**, una seconda pagina aperta da un pulsante della
   home, dove gli allievi del CFP ricostruiscono il sito un passo alla volta:
   scrivono codice in un editor dentro la pagina, vedono subito il risultato e,
   se sbagliano, la pagina indica la riga e spiega l'errore.

## 1. Decisioni prese

| Tema | Decisione | Perché |
|---|---|---|
| Pubblico | Allievi del CFP, in classe, al computer | Indicato dal committente |
| Linguaggi | HTML, CSS e JavaScript, gli stessi del sito | Si ricostruisce davvero il sito; il browser li esegue già |
| WebAssembly | Non serve | Nessun linguaggio da tradurre. Il «compilatore» è il browser più i controlli degli errori scritti a mano (sezione 5.3) |
| Cosa si ricostruisce | Home e gioco di Estetica | È il gioco con la logica più leggibile; la sua struttura (livelli come dati, una regola che li controlla) è la stessa degli altri due giochi, e l'ultimo capitolo lo mostra |
| Forma | Capitoli e passi guidati dal coach, come i capitoli di sito-feudo | Indicato dal committente. Niente quiz, niente pannello docente, niente traduzione |
| Internet | Non necessaria | Nessuna libreria esterna; solo il font si scarica, con font di riserva |
| Dispositivo | PC (da 920 px di larghezza in su) | Scrivere codice al telefono non è praticabile; sotto i 920 px la pagina funziona impilata e mostra un avviso |
| File | `impara.html` separato, un solo file | Stessa convenzione di `index.html`; il sito dell'open day resta leggero |
| Stile | Copiato da `index.html` | Un file condiviso costringerebbe a modificare `index.html`; il blocco copiato porta il commento «tenere allineato a index.html» |

Due scelte sono state fatte senza conferma esplicita e vanno riviste se il
committente non è d'accordo: **il gioco di esempio (Estetica)** e il
**funzionamento senza internet**.

## 2. Il pulsante in `index.html`

Nella home, accanto a «Non vuoi giocare? Vai ai contatti», un secondo pulsante
dello stesso stile (`.btn`, non `primary`): **«Scopri come è fatto questo
sito»**, che è un link a `impara.html`. Nessun'altra modifica al sito.

## 3. Le schermate di `impara.html`

Ricalcano le tre schermate di `index.html`, così chi ha giocato riconosce
subito dove si trova.

**Indice dei capitoli** (come la home del sito). Occhiello rosso «Costruisci
il sito», titolo grande «Rifai questo sito con le tue mani», sottotitolo, poi
una griglia di carte nello stile di `.path`, una per capitolo: numero, titolo,
una riga di descrizione e lo stato (da fare, in corso, finito). Tutti i
capitoli sono aperti: il docente può farne partire uno qualunque. In basso un
pulsante «Torna al gioco» verso `index.html`.

**Passo** (come la schermata di gioco `#play`). Stessa griglia: area di lavoro
a sinistra, colonna laterale di 360 px a destra.

- Barra in alto (`.top`): «Capitolo 3 · Passo 2: Il fondo della pagina», i
  pallini dei passi del capitolo (`.dots`, collegati da una linea), il
  pulsante del suono e la X per tornare all'indice.
- Area di lavoro (`.benchcard`), divisa in due metà affiancate:
  - **Editor**: schede «HTML», «CSS», «JS»; si scrive solo nella scheda del
    passo, le altre si leggono soltanto (con un lucchetto). Numeri di riga a
    sinistra. Sotto, il pulsante «Prova il codice».
  - **Anteprima**: il risultato dal vivo, su fondo bianco con bordo.
- Colonna laterale: la mascotte con il fumetto (`.coach`), poi il riquadro
  del compito sempre visibile, poi i pulsanti `Aiutami`, `Ricomincia` e
  `Avanti` (`.btns`).

**Fine capitolo** (come la schermata dei contatti): titolo, cosa si è
imparato in tre punti dentro un `.panel`, pulsanti «Capitolo successivo» e
«Torna all'indice».

## 4. Design

Valgono gli stessi elementi di `index.html`, senza nuovi colori.

- Variabili colore di `:root` e `:root.lit`, font Fira Sans, `.btn`,
  `.btn.primary`, `.eyebrow`, `.panel`, `.dots`, `.coach`, `.benchcard`,
  pesi dei titoli e raggi degli angoli.
- **La metafora della luce**: mentre si lavora la pagina è «spenta» (scura);
  quando tutti i controlli del passo sono superati la pagina «si accende»
  (classe `lit` su `<html>`), parte il suono di vittoria con i coriandoli, la
  mascotte diventa felice e compare «Avanti». È lo stesso momento del gioco.
- Errore: la mascotte prende l'espressione `oops`, la riga sbagliata si colora
  di `--bad` nei numeri di riga, il fumetto spiega. Nessun riquadro «OPS!» a
  tutto schermo: un errore di battitura non va punito come un cortocircuito.
- Mascotte, suoni (`sfx`), vibrazione e coriandoli (`celebrate`) si copiano da
  `index.html`.
- L'editor usa un carattere a spaziatura fissa (`ui-monospace, Menlo,
  Consolas, monospace`) a 16 px; è l'unica aggiunta tipografica.
- L'anteprima ha sempre fondo bianco, perché mostra il sito degli allievi e
  non la pagina di `impara.html`.
- `prefers-reduced-motion` va rispettato come in `index.html`.

## 5. Il motore

### 5.1 Editor

- Una `<textarea>` per scheda, con una colonna dei numeri di riga che scorre
  insieme al testo. Tab inserisce due spazi; Invio mantiene il rientro della
  riga sopra. Controllo ortografico e correzione automatica disattivati.
- La colorazione della sintassi non è richiesta (vedi T15, facoltativo).
- Una riga può essere evidenziata (errore o aiuto) colorando il suo numero e
  una fascia dietro il testo.

### 5.2 Anteprima

- Un `<iframe>` riceve un documento costruito così: HTML dell'allievo, CSS in
  un `<style>` nell'`<head>`, JavaScript come `<script src="blob:...">` alla
  fine del `<body>`. Lo script in un blob separato fa sì che i numeri di riga
  degli errori corrispondano a quelli dell'editor. Prova fatta in Chromium da
  `file://`: funziona, l'errore arriva con la riga esatta e la pagina può
  leggere il documento dell'anteprima.
- Nell'`<head>` dell'anteprima si inserisce prima di tutto un piccolo script
  che intercetta gli errori (`window.onerror`) e i `console.log` e li manda
  alla pagina con `postMessage`.
- HTML e CSS si aggiornano da soli mentre si scrive, 400 ms dopo l'ultimo
  tasto. Il JavaScript gira solo premendo «Prova il codice», perché a metà
  scrittura è quasi sempre incompleto.
- I `console.log` compaiono in una striscia sotto l'anteprima: serve dal
  capitolo 6 in poi.
- **Ciclo infinito**: prima di eseguire il JavaScript si salva il codice e si
  mette un segnale in `sessionStorage`; lo si toglie quando l'anteprima ha
  finito di caricare. Se la pagina si blocca e l'allievo la ricarica, il
  segnale è ancora lì: il coach spiega che probabilmente c'era un ciclo che
  non finiva, e il codice salvato è al suo posto.

### 5.3 Controllo degli errori

Il browser non segnala gli errori di HTML e CSS: li aggiusta in silenzio. Per
questo servono tre controllori, scritti a mano in JavaScript. Ognuno
restituisce un elenco di `{ riga, messaggio }` in italiano semplice; si mostra
il primo.

- **HTML**: legge il testo tag per tag e segnala: tag aperto e mai chiuso;
  chiusura che non corrisponde all'ultimo tag aperto («Hai chiuso `</div>`
  ma l'ultimo aperto è `<button>`»); nome di tag sconosciuto (elenco dei tag
  comuni); `<` senza `>`; virgolette di un attributo non chiuse. I tag vuoti
  (`img`, `br`, `input`, `meta`, `link`, `hr`) non vanno chiusi.
- **CSS**: parentesi graffe che non tornano; dichiarazione senza `:`; punto e
  virgola mancante tra due dichiarazioni; proprietà o valore non validi,
  verificati con `CSS.supports(proprieta, valore)` (funziona già nel browser,
  provato). Per le variabili (`--nome`) e i valori con `var(...)` il controllo
  sul valore si salta.
- **JavaScript**: l'errore arriva dall'anteprima con tipo, messaggio e riga.
  Una tabella traduce i casi più comuni: nome che non esiste
  (`ReferenceError`), funzione che non esiste o chiamata su `null`
  (`TypeError`, spesso un `querySelector` che non trova niente), parentesi o
  virgolette mancanti (`SyntaxError`). Il messaggio originale inglese resta
  visibile in piccolo sotto quello italiano.

Gli errori hanno la precedenza sui controlli del passo: finché c'è un errore,
il coach parla di quello.

### 5.4 Passi e controlli

Ogni passo è un oggetto in un unico elenco `CAPITOLI` nel file, come `SCUOLA`
e i livelli in `index.html`. Formato:

```js
{
  id: 'c3p2',                     // capitolo 3, passo 2
  titolo: 'Il fondo della pagina',
  intro: [                        // fumetti del coach prima di cominciare,
    { t: 'Testo del fumetto.' },  // come level.intro in index.html;
    { t: '...', riga: 4 }         // riga: evidenzia una riga dell'editor
  ],
  compito: 'Dai al body il colore di fondo var(--bg).',  // sempre visibile
  file: 'css',                    // scheda in cui si scrive: html, css o js
  inizio: { html: '...', css: '...', js: '...' },  // codice di partenza;
                                  // se manca, è la soluzione del passo prima
  soluzione: { css: '...' },      // solo le schede che cambiano
  controlli: [
    { ok: (d, w, s) => ..., aiuto: 'Frase che guida senza dare la soluzione.' }
  ],
  bravo: 'Messaggio quando il passo riesce.'
}
```

- Ogni controllo riceve `d` (il documento dell'anteprima), `w` (la sua
  `window`) e `s` (il codice delle tre schede). Si preferiscono controlli sul
  risultato (`getComputedStyle`, `querySelector`) a quelli sul testo, così
  sono valide anche soluzioni scritte in modo diverso.
- I controlli che simulano clic girano in un secondo `iframe` nascosto, creato
  dallo stesso codice, così l'anteprima visibile non cambia sotto gli occhi
  dell'allievo. Possono essere `async`.
- I controlli girano dopo ogni aggiornamento dell'anteprima. Quando passano
  tutti, la pagina si accende (sezione 4).

### 5.5 Aiuto, ricomincia, salvataggio

- **Aiutami**: la prima pressione mostra l'`aiuto` del primo controllo non
  superato; la seconda evidenzia la riga dove intervenire (la prima riga in
  cui codice e soluzione differiscono); dalla terza compare anche «Mostra la
  soluzione», che la carica nell'editor.
- Come nel gioco, dopo 30 secondi senza digitare e con un controllo non
  superato, il pulsante `Aiutami` pulsa, senza aprire l'aiuto da solo.
- **Ricomincia** riporta il codice del passo all'inizio, chiedendo conferma
  se l'allievo aveva già scritto.
- Il codice di ogni passo e i passi finiti si salvano in `localStorage`,
  sempre dentro `try/catch`: la pagina deve funzionare anche se il salvataggio
  è bloccato. Un pulsante nell'indice cancella tutto, con conferma (serve
  quando il PC passa a un altro allievo).
- Ogni passo parte dalla soluzione del passo precedente, non dal codice
  dell'allievo: così un errore non si trascina nei passi successivi.

## 6. I capitoli

Alla fine l'allievo ha costruito una versione ridotta del sito: home con tre
carte, schermata di gioco con carte, vassoio e messaggi, il cambio di luce e
due livelli di Estetica. La scena con il viso di Giulia e le carte degli altri
mestieri non si ricostruiscono.

Ogni capitolo apre con 2-3 fumetti che spiegano l'idea nuova con un paragone
quotidiano, poi passa ai passi. I termini tecnici si introducono uno alla volta.

| Cap. | Titolo | Passi (scheda) | Idee nuove |
|---|---|---|---|
| 1 | Come è fatto un sito | 1.1 Cambia il testo del titolo (html) · 1.2 Cambia il colore del titolo (css) · 1.3 Cambia il messaggio che appare premendo il pulsante (js) | I tre linguaggi: struttura, aspetto, comportamento |
| 2 | Lo scheletro della home | 2.1 Titolo `h1` e sottotitolo `p` con classe `sub` (html) · 2.2 Una carta: `button` con `b` e `span` dentro (html) · 2.3 Tre carte dentro `div.paths` (html) · 2.4 Gli attributi `data-path` e `type` (html) | Tag, apertura e chiusura, annidamento, classi, attributi |
| 3 | Colori e forme | 3.1 Variabili in `:root` e `background` del `body` con `var()` (css) · 3.2 Il font Fira Sans (css) · 3.3 La carta: fondo, angoli arrotondati, spazi interni (css) · 3.4 Tre colonne con `grid` (css) · 3.5 L'effetto al passaggio del mouse con `:hover` (css) | Selettori, proprietà, valori, variabili, griglia |
| 4 | Luce spenta, luce accesa | 4.1 Valori chiari in `:root.lit` (css) · 4.2 Transizione morbida (css) · 4.3 Un pulsante che accende e spegne con `classList.toggle` (js) | Classi che cambiano l'aspetto; primo JavaScript |
| 5 | Cambiare schermata | 5.1 Due `section`, `home` e `play`, la seconda `hidden` (html) · 5.2 La funzione `show(id)` (js) · 5.3 Clic su Estetica porta al gioco (js) · 5.4 La X riporta alla home (js) | Funzioni, eventi, `querySelector` |
| 6 | I dati del gioco | 6.1 Un prodotto come oggetto `{ e, t }` (js) · 6.2 Quattro prodotti in un elenco (js) · 6.3 Le carte disegnate dall'elenco con `map` (js) · 6.4 Il livello come oggetto con `title`, `goal`, `items` (js) | Oggetti, elenchi, codice che crea HTML, `console.log` |
| 7 | La regola del gioco | 7.1 L'elenco `picked` e il clic sulle carte (js) · 7.2 Ordine giusto: `if (i === picked.length)` (js) · 7.3 Ordine sbagliato: la carta trema e il coach spiega (js) · 7.4 Il vassoio si riempie (js) · 7.5 Vittoria: la pagina si accende (js) | Condizioni, stato del gioco, ridisegnare dopo ogni mossa |
| 8 | Più livelli, stessa regola | 8.1 Elenco dei livelli e «Avanti» (js) · 8.2 Il livello Igiene, senza ordine, con `ok: true` sui prodotti giusti (js) · 8.3 Un livello nuovo scritto solo come dati: Le unghie (js) | Separare dati e regole. Chiusura: il coach mostra che `index.html` fa lo stesso con `GAMES = { el, net, est }` per tutti e tre i mestieri |

Il codice dei capitoli 5-8 riprende nomi e struttura di `index.html`
(`show`, `level`, `items`, `picked`, `ordered`, `done`, `early`, `win`), in
forma semplificata, così l'allievo che poi apre `index.html` commentato
riconosce quello che ha scritto.

## 7. Commenti a `index.html`

- Destinatario: una persona che non programma, per esempio un docente che
  vuole cambiare un testo o capire il sito con la classe.
- In testa al file, un commento «Mappa del file» con le grandi parti e
  dove si trovano (stile, pagine, dati della scuola, livelli, motore dei
  giochi, disegni, suoni, schermate).
- Prima di ogni blocco, un commento che dice **cosa fa** e **perché**, non
  come lo fa riga per riga. Dentro le funzioni lunghe, commenti brevi sui
  passaggi importanti.
- Le parti che si possono modificare senza rischi (`SCUOLA`, i testi dei
  livelli, i colori) hanno un commento «Puoi modificare qui» che spiega cosa
  cambiare e cosa non toccare.
- Parole tecniche spiegate la prima volta (variabile, funzione, elenco,
  oggetto, evento, classe CSS, SVG).
- Commenti nel linguaggio del punto in cui si trovano: `<!-- -->` in HTML,
  `/* */` in CSS e JavaScript. Ogni commento su righe nuove, mai in coda a una
  riga esistente.
- Nessuna riga esistente modificata o tolta: `git diff --numstat index.html`
  deve dare 0 righe tolte.

## 8. Limiti noti

- Firefox e Safari non sono stati provati: va fatto nel compito T06.
- Un ciclo infinito blocca la scheda del browser; si rimedia ricaricando
  (sezione 5.2).
- I controlli di HTML e CSS coprono gli errori più comuni, non tutti.
- Il codice degli allievi gira nella stessa origine della pagina. È un
  rischio accettabile in una pagina didattica senza dati personali.
