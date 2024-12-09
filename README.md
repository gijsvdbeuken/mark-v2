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
2. Sleep de gedownloade folder (de ZIP-bestanden uitgepakt) naar VSCode om het project te openen.
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

   - Maak in de root van je project een bestand genaamd `.env`.
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

// Wordt binnekort toegevoegd...
