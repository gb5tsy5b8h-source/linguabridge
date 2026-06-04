# Linguabridge

Everyone speaks. Everyone understands.

Linguabridge is an AI-powered multilingual collaboration platform that enables users speaking different languages to communicate seamlessly using Azure AI Translator, conversation history, speech support, and automated meeting summarization.

## Run Commands

### Local Demo

```bash
npm install
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

## PUBLIC DEMO URL

After Render deployment, paste the live link here:

```text
https://your-linguabridge-app.onrender.com
```

The deployed app will open the full Linguabridge chat interface from any browser. Voice input works best in Chrome or Edge over HTTPS. Voice output uses the browser's built-in speech engine.

## Azure Translator Setup

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Add your Azure Translator credentials:

```text
AZURE_TRANSLATOR_KEY=your_translator_key_here
AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
AZURE_TRANSLATOR_REGION=koreacentral
```

Then restart the server:

```bash
npm run dev
```

When these values are present, the backend calls the Azure Translator Text API for message translations. If the API key, endpoint, region, or network request fails, the app keeps a safe local fallback for demo stability.

## How to Deploy Online

Use Render so the Node.js backend can keep the Azure Translator key private.

1. Push this project to GitHub.
2. Go to [render.com](https://render.com).
3. Click **New +**.
4. Click **Web Service**.
5. Connect your GitHub repo.
6. Select the Linguabridge repository.
7. Use these settings:

```text
Name: linguabridge
Build Command: npm install
Start Command: npm start
```

8. Add environment variables:

```text
AZURE_TRANSLATOR_KEY
AZURE_TRANSLATOR_ENDPOINT
AZURE_TRANSLATOR_REGION
```

9. Click **Deploy Web Service**.
10. Wait for Render to finish building and deploying.
11. Copy the public `https://...onrender.com` URL.
12. Paste it in the **PUBLIC DEMO URL** section above.

The final demo does not require localhost. Render gives the app a public HTTPS URL that can be opened from any computer. HTTPS also helps browser voice input work correctly in Chrome and Edge.

## What Is Included

- Multi-user multilingual chat
- Demo users: Rayhan, Jisu, Alex, Yuki, Maria
- Receiver-specific translations
- Navigation: Home, Translate, Conversation, Summary, Export
- User and language selection
- Clean translation result card
- Voice input with browser SpeechRecognition
- Voice output with browser SpeechSynthesis
- JSON export and summary download
- Cloud Save Demo
- Conversation summary
- Premium light SaaS UI

## Cloud Notes

This checkpoint version now supports Azure Translator Text API integration while keeping local fallbacks so it is beginner friendly and easy to run in class.

- Translation uses Azure Translator Text API when `.env` credentials are configured.
- A local fallback keeps the demo stable if Azure credentials or network access are unavailable.
- The browser never receives the Azure key.
- Online deployment uses Render environment variables instead of `.env`.
- Future chat history can be stored in Azure Cosmos DB.
- Future summaries can use Azure OpenAI or Azure AI Language.

## Project Files

```text
package.json
package-lock.json
server.js
public/index.html
public/styles.css
public/app.js
README.md
.env.example
.gitignore
render.yaml
TEAM_C_03_Linguabridge_Cloud_Chat_Azure_FINAL.pptx
TEAM_C_03_Linguabridge_Final_Project_Ready.zip
```

## Beginner-Friendly Architecture

The app uses only built-in Node.js modules for the backend. There are no required npm packages, so `npm install` completes quickly and `npm run dev` starts the server directly.

The main backend API routes are:

- `GET /api/bootstrap` loads supported languages.
- `POST /api/messages` stores a new chat message and creates receiver translations.
- `POST /api/translate` supports direct backend translation.
- `GET /api/summary` generates the local conversation summary.
- `GET /api/history/download` exports chat history as JSON.
- `GET /api/health` confirms the online service is running.

## Final Demo Guide

1. Start on **Home** and click **Start Demo**.
2. In **Translate**, pick a user, source language, and target receiver.
3. Type a message or click **Speak**.
4. Click **Translate**.
5. In **Conversation**, show the receiver-specific translated chat.
6. In **Summary**, click **Generate Summary** or **Cloud Save Demo**.
7. In **Export**, download JSON or use the public Render link.
