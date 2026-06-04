# Linguabridge Final Demo Guide

## Run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## 3-Minute Presentation Flow

1. Open the homepage.
2. Explain the problem: international teams speak different languages.
3. Point to the chat preview: one Bengali message, multiple receiver languages.
4. Click **Start Demo**.
5. Open the **Translate** page.
6. Select Rayhan as sender.
7. Type or speak: `আজকের আবহাওয়া কেমন?`
8. Click **Send / Translate**.
9. Open the **Conversation** page.
10. Switch **View as** to Jisu, Alex, Yuki, Maria, and Rayhan.
11. Show that everyone sees the same conversation in their own language.
12. Click **Listen** to play a translated message aloud.
13. Open **Summary** and click **Generate Summary**.
14. Click **Cloud Save Demo** and show `Saved successfully.`
15. Open **Export** and show **Download JSON**.
16. Mention the public Render URL deployment.

## Online Deployment

Use Render as a Node web service.

```text
Build Command: npm install
Start Command: npm start
```

Add environment variables in Render:

```text
AZURE_TRANSLATOR_KEY=your_translator_key_here
AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
AZURE_TRANSLATOR_REGION=koreacentral
```
