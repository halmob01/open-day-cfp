# Istruzioni per gli agenti

Questo file vale per qualunque agente che lavora su questa repository.
Leggilo tutto prima di cominciare.

## Il progetto in breve

- `index.html` è il sito dell'open day del CFP AFOL Metropolitana di Rozzano:
  il visitatore sceglie un mestiere (Elettricità, Informatica, Estetica) e fa
  un gioco in tre missioni. È tutto in un solo file (HTML, CSS, JavaScript).
- `impara.html` (da costruire) è la seconda pagina: un percorso a capitoli in
  cui gli allievi del CFP ricostruiscono la home e il gioco di Estetica
  scrivendo codice dentro la pagina, con anteprima dal vivo ed errori spiegati.
- Il piano completo è in `docs/piano.md`. I compiti, in ordine, sono in
  `docs/compiti.md`.

## Come si lavora

1. Ti viene assegnato un compito per codice (per esempio «T05»). Svolgi **solo
   quello**. Se ti accorgi che serve altro, scrivilo nella sezione «Note per i
   compiti successivi» in fondo a `docs/compiti.md`, non farlo.
2. Leggi in `docs/piano.md` le sezioni citate dal compito prima di scrivere.
3. Quando hai finito, verifica ogni criterio di accettazione del compito e
   spunta la casella del compito in `docs/compiti.md`.
4. Un commit per compito, messaggio in italiano che inizia con il codice:
   `T05: editor con schede e numeri di riga`.
5. Se una decisione del piano si rivela impossibile o sbagliata, non inventare
   una strada diversa in silenzio: fermati, spiega il problema nella risposta
   e proponi l'alternativa.

## Regole fisse

- **Niente server, niente installazioni per l'utente.** Le pagine devono
  funzionare aprendo il file con doppio clic (`file://`) e da GitHub Pages.
- **Niente librerie esterne né CDN**, con l'unica eccezione del font Fira Sans
  da Google Fonts già usato da `index.html` (se manca internet si usa il font
  di riserva). Editor, anteprima e controllo degli errori si scrivono a mano.
- **Un file per pagina**: `impara.html` contiene HTML, CSS e JavaScript come
  `index.html`. Fanno eccezione solo i test in `test/`.
- **Non cambiare il comportamento di `index.html`**, salvo il pulsante previsto
  dal compito T04. Nei compiti sui commenti (T01, T02, T03) si aggiungono
  solo righe nuove: `git diff --numstat index.html` deve dare 0 righe tolte.
- **Lingua**: tutto in italiano (testi, commenti, nomi dei capitoli, messaggi
  di commit). Nomi di variabili e funzioni: segui lo stile già presente nel
  file in cui lavori.
- **Il personaggio che guida si chiama «il prof»**, mai «coach», in tutti i testi e
  commenti. Le classi CSS e gli id (`.coach`, `#mascot`) restano com'erano:
  sono nomi di codice, non si vedono.
- **Niente emoji** in commenti, documentazione e messaggi del prof. Le carte
  del gioco di Estetica le usano già: lì restano come sono.
- **Design**: `impara.html` usa gli stessi colori, font, pulsanti, mascotte,
  suoni e coriandoli di `index.html`. Vedi `docs/piano.md`, sezione «Design».
  Non introdurre nuovi colori o nuovi stili di pulsante.
- **Pubblico**: allievi di 14-17 anni che non hanno mai programmato. Frasi
  brevi, si dà del tu, ogni parola tecnica va spiegata la prima volta che
  compare. Lo stesso registro dei messaggi del gioco in `index.html`.
- **Testo senza refusi e senza frasi ripetute.** Rileggi sempre i testi che
  scrivi.

## Come si verifica

- Test automatici: `node test/impara.test.mjs` (dopo il compito T09). Devono
  passare prima di ogni commit che tocca `impara.html`.
- Controllo visivo: apri le pagine in Chromium a 1280x800 e a 390x844
  (telefono). Con Playwright puoi fare uno screenshot e guardarlo.
- In questo ambiente Playwright è installato globalmente:
  importalo con `import { chromium } from '<npm root -g>/playwright/index.mjs'`.
