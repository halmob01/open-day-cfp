# Compiti

Si svolgono in ordine, uno per sessione. Prima di cominciare leggi
`AGENTS.md` e le sezioni di `docs/piano.md` indicate nel compito. Alla fine
spunta la casella e fai un commit che inizia con il codice del compito.

I compiti T01-T03 (commenti) e T04-T14 (pagina `impara.html`) sono
indipendenti: i due gruppi si possono svolgere in parallelo.

## Commenti a `index.html`

- [ ] **T01 · Commenti: stile e struttura (righe 1-290 circa)**
  Piano: sezione 7.
  Mappa del file in testa; commenti su ogni gruppo di regole CSS (colori di
  luce spenta e accesa, pulsanti, home, gioco, Estetica, contatti, versione per
  telefono) e sulle tre `section` dell'HTML.
  Accettazione: `git diff --numstat index.html` con 0 righe tolte; il sito si
  apre e funziona come prima (prova un livello per gioco); i commenti si
  capiscono senza sapere cos'è il CSS.

- [ ] **T02 · Commenti: dati e motori dei giochi**
  Piano: sezione 7.
  Da `SCUOLA` fino alla simulazione di rete compresa: blocco `SCUOLA` con
  istruzioni «Puoi modificare qui», livelli `EL`, `NET`, `EST` (cosa
  significano `intro`, `comps`, `sol`, `ordered`, `early`, `why`), stato del
  gioco, caricamento dei livelli, simulazione elettrica (spiegare l'idea dei
  pallini collegati e del cortocircuito senza la matematica), simulazione di
  rete.
  Accettazione: come T01.

- [ ] **T03 · Commenti: disegni, interazione e schermate**
  Piano: sezione 7.
  Dal disegno del banco fino alla fine: cosa sono gli SVG generati da codice,
  `render`, gioco di Estetica, scene, mascotte, suoni, salvavita, gestione
  dei tocchi, immagine da salvare, schermate, contatti, ritorno automatico
  alla home.
  Accettazione: come T01. Inoltre segnala in «Note per i compiti successivi»
  il codice che non viene mai usato (il deviatore `dev` e il messaggio per
  `li===3`) senza toglierlo.

## Pagina `impara.html`

- [ ] **T04 · Pulsante nella home e scheletro di `impara.html`**
  Piano: sezioni 2, 3, 4.
  Il pulsante in `index.html` (unica modifica al comportamento consentita).
  `impara.html` con lo stile copiato da `index.html`, le tre schermate
  (indice, passo, fine capitolo) e la navigazione tra loro, mascotte, suoni e
  coriandoli. Un elenco `CAPITOLI` di prova con un capitolo e un passo finto.
  Editor e anteprima per ora sono riquadri vuoti.
  Accettazione: dalla home di `index.html` si arriva a `impara.html` e si
  torna indietro; a 1280x800 il passo ha la stessa griglia e gli stessi
  componenti della schermata di gioco; a 390x844 la pagina si impila e mostra
  l'avviso «Questa attività è pensata per il computer»; screenshot confrontati
  a occhio con quelli di `index.html`.

- [ ] **T05 · Editor**
  Piano: sezione 5.1.
  Schede HTML/CSS/JS, scheda bloccata con lucchetto, numeri di riga allineati
  anche con righe lunghe e scorrimento, Tab e Invio come da piano, funzione
  per evidenziare una riga.
  Accettazione: si scrive solo nella scheda del passo; con 60 righe i numeri
  restano allineati scorrendo; Tab non porta via il cursore dall'editor.

- [ ] **T06 · Anteprima**
  Piano: sezione 5.2.
  Costruzione del documento, aggiornamento automatico di HTML e CSS, pulsante
  «Prova il codice», script di ascolto di errori e `console.log`, striscia dei
  messaggi, protezione dal ciclo infinito.
  Accettazione: un errore JavaScript alla riga 7 dell'editor arriva con riga 7;
  funziona aprendo il file con doppio clic in Chromium **e in Firefox** (se
  Firefox non è disponibile, scrivilo nella risposta); `while(true){}` seguito
  da ricarica della pagina mostra il messaggio sul ciclo e il codice salvato.

- [ ] **T07 · Controllo degli errori**
  Piano: sezione 5.3.
  I tre controllori e la tabella di traduzione degli errori JavaScript.
  Il primo errore evidenzia la riga e fa parlare il prof con l'espressione
  `oops`.
  Accettazione: una funzione di prova (da riusare in T09) con almeno 8 casi
  di HTML sbagliato, 8 di CSS e 5 di JavaScript, ciascuno con la riga attesa;
  il codice giusto di tutti i passi non produce falsi errori.

- [ ] **T08 · Passi, controlli, aiuto, salvataggio**
  Piano: sezioni 5.4 e 5.5.
  Lettura di `CAPITOLI`, codice di partenza ereditato, esecuzione dei
  controlli (anche nell'`iframe` nascosto), accensione della pagina, pulsanti
  `Aiutami`, `Ricomincia`, `Avanti`, pallini dei passi, stato dei capitoli
  nell'indice, salvataggio, cancellazione dei progressi.
  Accettazione: con il passo finto di T04 si completa tutto il giro; ricaricando
  la pagina il codice e i passi finiti restano; con `localStorage` bloccato la
  pagina funziona comunque.

- [ ] **T09 · Test automatico**
  Piano: sezione 5.4.
  `test/impara.test.mjs` con Playwright e Chromium. Trova Playwright da solo
  (anche installato globalmente). Per ogni passo di `CAPITOLI`: con il codice
  di partenza almeno un controllo fallisce; con la soluzione passano tutti e
  i controllori non segnalano errori; nessun errore nella console della
  pagina. Include i casi di T07.
  Accettazione: `node test/impara.test.mjs` termina con codice 0 e stampa un
  riepilogo leggibile; rompendo apposta una soluzione il test fallisce e dice
  quale passo.

- [x] **T10 · Contenuti: capitoli 1 e 2**
  Piano: sezione 6.
  Fumetti, compiti, codice di partenza, soluzioni, controlli e messaggi.
  Accettazione: test di T09 verde; ogni passo provato a mano facendo un errore
  tipico (un tag non chiuso, una parola sbagliata) e verificando che il
  messaggio aiuti davvero.

- [x] **T11 · Contenuti: capitoli 3 e 4**
  Come T10.

- [x] **T12 · Contenuti: capitoli 5 e 6**
  Come T10.

- [x] **T13 · Contenuti: capitoli 7 e 8**
  Come T10. L'ultimo passo del capitolo 8 chiude con il confronto con
  `GAMES` in `index.html`.

- [x] **T14 · Revisione finale**
  Rilettura di tutti i testi (refusi, frasi ripetute, registro uguale a quello
  del gioco), accessibilità di base (etichette dei pulsanti, focus visibile,
  editor usabile da tastiera), `prefers-reduced-motion`, aggiornamento del
  `README.md` con la nuova pagina e con come aggiungere un passo a `CAPITOLI`.
  Accettazione: test verdi; screenshot di indice, passo, errore e passo
  riuscito a 1280x800 allegati alla risposta.

- [ ] **T15 · Facoltativo: colori della sintassi nell'editor**
  Colorazione leggera di tag, proprietà e parole chiave con uno strato dietro
  la `textarea`, nei colori del sito. Solo se tutto il resto è finito.

## Note per i compiti successivi

(Gli agenti scrivono qui quello che hanno notato ma che non rientrava nel
loro compito.)
