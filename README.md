# Mark / AI marketing assistant

## Inhoudsopgave

1. [Vereisten](#vereisten)
2. [Setup](#setup)
3. [Gebruik](#gebruik)

## Vereisten

Voor dit project is het aan te raden om de volgende software te installeren:

2. **Node.js** – Een JavaScript runtime-omgeving die nodig is om het project te draaien.
   - Download het hier: [Node.js](https://nodejs.org/)
1. **Visual Studio Code (VSCode)** – Een krachtige en veelzijdige editor voor code. Het gebruik van VSCode is optioneel, maar het wordt wel aanbevolen voor een betere ervaring.
   - Download het hier: [Visual Studio Code](https://code.visualstudio.com/)

## Setup

Volg de onderstaande stappen om het project op te zetten:

### Stap 1: Downloaden van het project

1. Ga naar de GitHub-pagina van het project.
2. Klik op de groene knop **"Code"** en kies **"Download ZIP"**.
3. Zet het ZIP-bestand op je bureaublad of een andere locatie op je computer.

### Stap 2: Het project openen in VSCode (optioneel)

1. Open **Visual Studio Code** (VSCode).
2. Sleep de gedownloade folder (het ZIP-bestand uitgepakt) naar VSCode om het project te openen.
3. VSCode zal nu het project openen en je kunt de volgende stappen uitvoeren.

### Stap 3: OpenAI API-account instellen en configureren

1. **Open een OpenAI-account:**

   - Ga naar de [OpenAI website](https://platform.openai.com/signup).
   - Maak een account aan of log in als je al een account hebt.

2. **API-tegoed opwaarderen:**

   - Navigeer naar de **Billing**-pagina in het OpenAI-dashboard.
   - Voeg betaalgegevens toe en waardeer je account op met het gewenste tegoed.

3. **API-sleutel genereren:**

   - Ga naar de **API Keys**-sectie in het dashboard.
   - Klik op **Create new secret key** en kopieer de gegenereerde sleutel. **Let op:** Je kunt deze sleutel later niet opnieuw bekijken, dus sla deze veilig op.

4. **.env-bestand aanmaken:**

   - Maak in de `back-end` folder van je project een bestand genaamd `.env` aan.
   - Voeg de API-sleutel toe in het bestand in de volgende vorm:

     ```env
     OPENAI_API_KEY=je-api-sleutel-hier
     ```

### Stap 4: Installeren van de benodigde afhankelijkheden

1. Zorg ervoor dat je in VSCode de **Terminal** opent (via **View > Terminal** of `Ctrl + ~`).
2. In de terminal kun je de benodigde afhankelijkheden installeren door het volgende commando uit te voeren:

   ```bash
   npm install
   ```

   Dit installeert alle benodigde afhankelijkheden voor het project.

3. Voer daarna het volgende commando uit om Mark in de browser te openen:
   ```bash
   npm run start
   ```

### Stap 5: De server draaien

1. Na Mark te hebben geopend in de browser kun je de server starten door het volgende commando uit te voeren in de terminal:
   ```bash
   npm run server
   ```
2. Dit start een lokale server waarop Mark draait. Je kunt nu met Mark chatten.

## Gebruik

De functionaliteit van Mark kan worden onderverdeeld in drie hoofdaspecten:

- Chatten met Mark
- Corpora aanmaken en toevoegen
- Taken toevoegen en afvinken

### Chatten met Mark

Bij het opstarten van Mark word je automatisch naar de chatpagina geleid. Hier kun je direct met Mark communiceren, gebaseerd op de parameters die je via het menu onderaan de pagina hebt ingesteld. Je kunt bijvoorbeeld een model selecteren (zoals GPT-4o Turbo of GPT-4o) en de gewenste mate van originaliteit kiezen (voorspelbaar, genuanceerd of creatief). Daarnaast kun je een specifiek corpus selecteren, waardoor Mark toegang krijgt tot de kennis die in dat corpus is opgenomen. Dit maakt Mark geschikt voor context-specifieke gesprekken.

### Corpora aanmaken en toevoegen

Via de zijbalk kun je navigeren naar de corpora-pagina. Hier kun je bedrijfsspecifieke corpora toevoegen, vooral voor kleinere bedrijven die niet expliciet in de kennisbasis van OpenAI-modellen voorkomen. Nadat je de benodigde gegevens hebt ingevoerd, klik je op "corpus aanmaken". Dit genereert een JSON-bestand met alle ingevoerde informatie.

Om dit bestand beschikbaar te maken in de applicatie, navigeer je naar de projectmap en plaats je het JSON-bestand in de map `front-end > src > data > corpora`. Vanaf dat moment is de data toegankelijk voor Mark.

Het is niet verplicht om de corpora-pagina te gebruiken voor het aanmaken van JSON-bestanden. Je kunt ook handmatig een JSON-bestand samenstellen en het op dezelfde locatie plaatsen als hierboven vermeld. Dit is handig als je meer of gedetailleerdere data wilt toevoegen.

### Taken toevoegen en afvinken

De takenpagina, bereikbaar via de zijbalk, stelt je in staat om werkzaamheden toe te voegen en deze te koppelen aan een van de eerder toegevoegde corpora. Zo weet Mark welke specifieke kennis nodig is om je met deze taken te ondersteunen.

Houd er rekening mee dat Mark nieuwe taken alleen kan verwerken nadat de server opnieuw is opgestart. Zonder herstart blijft Mark werken met de taken die actief waren bij de vorige opstart van de server.
