const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
loadEnvFile();

const AZURE_TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_TRANSLATOR_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
const AZURE_TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION || "koreacentral";

const languages = [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸", direction: "ltr" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷", direction: "ltr" },
  { code: "bn", name: "Bangla/Bengali", nativeName: "বাংলা", flag: "🇧🇩", direction: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦", direction: "rtl" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", direction: "ltr" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵", direction: "ltr" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳", direction: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸", direction: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷", direction: "ltr" }
];

const users = [
  { id: "rayhan", name: "Rayhan", language: "bn", role: "Bengali speaker" },
  { id: "jisu", name: "Jisu", language: "ko", role: "Korean speaker" },
  { id: "alex", name: "Alex", language: "en", role: "English speaker" },
  { id: "yuki", name: "Yuki", language: "ja", role: "Japanese speaker" },
  { id: "maria", name: "Maria", language: "es", role: "Spanish speaker" }
];

const canonicalDemoMessages = {
  weather_question: {
    en: "How is the weather today?",
    ko: "오늘 날씨가 어때요?",
    bn: "আজকের আবহাওয়া কেমন?",
    ar: "كيف حال الطقس اليوم؟",
    hi: "आज मौसम कैसा है?",
    ja: "今日の天気はどうですか？",
    zh: "今天天气怎么样？",
    es: "¿Cómo está el clima hoy?",
    fr: "Quel temps fait-il aujourd'hui ?"
  },
  project_intro: {
    en: "Welcome Professor to Linguabridge.",
    ko: "교수님, Linguabridge에 오신 것을 환영합니다.",
    bn: "প্রফেসর, Linguabridge-এ স্বাগতম।",
    ar: "مرحباً أستاذ في Linguabridge.",
    hi: "प्रोफेसर, Linguabridge में आपका स्वागत है।",
    ja: "教授、Linguabridgeへようこそ。",
    zh: "教授，欢迎来到 Linguabridge。",
    es: "Profesor, bienvenido a Linguabridge.",
    fr: "Professeur, bienvenue sur Linguabridge."
  },
  korean_response: {
    en: "The interface should clearly show the original message and the translated result.",
    ko: "인터페이스는 원문 메시지와 번역 결과를 명확하게 보여줘야 합니다.",
    bn: "ইন্টারফেসে মূল বার্তা এবং অনুবাদ ফলাফল স্পষ্টভাবে দেখানো উচিত।",
    ar: "يجب أن تعرض الواجهة الرسالة الأصلية ونتيجة الترجمة بوضوح.",
    hi: "इंटरफेस में मूल संदेश और अनुवादित परिणाम स्पष्ट रूप से दिखना चाहिए।",
    ja: "インターフェースでは元のメッセージと翻訳結果を明確に表示する必要があります。",
    zh: "界面应清楚显示原始消息和翻译结果。",
    es: "La interfaz debe mostrar claramente el mensaje original y el resultado traducido.",
    fr: "L'interface doit afficher clairement le message original et le résultat traduit."
  },
  english_response: {
    en: "We can explain that the backend uses Azure Translator API for reliable multilingual communication.",
    ko: "프로토타입은 모의 번역을 사용하며 Azure AI Translator로 확장할 준비가 되었다고 설명할 수 있습니다.",
    bn: "আমরা ব্যাখ্যা করতে পারি যে প্রোটোটাইপটি মক অনুবাদ ব্যবহার করে এবং Azure AI Translator-এর জন্য প্রস্তুত।",
    ar: "يمكننا توضيح أن النموذج الأولي يستخدم ترجمة تجريبية وهو جاهز لـ Azure AI Translator.",
    hi: "हम समझा सकते हैं कि प्रोटोटाइप मॉक अनुवाद का उपयोग करता है और Azure AI Translator के लिए तैयार है।",
    ja: "プロトタイプはモック翻訳を使用し、Azure AI Translator に対応できることを説明できます。",
    zh: "我们可以说明该原型使用模拟翻译，并已准备好接入 Azure AI Translator。",
    es: "Podemos explicar que el prototipo usa traducción simulada y está listo para Azure AI Translator.",
    fr: "Nous pouvons expliquer que le prototype utilise une traduction simulée et qu'il est prêt pour Azure AI Translator."
  },
  arabic_response: {
    en: "The conversation history should be stored and downloadable as JSON for the demo.",
    ko: "데모를 위해 대화 기록은 저장되고 JSON으로 다운로드할 수 있어야 합니다.",
    bn: "ডেমোর জন্য কথোপকথনের ইতিহাস সংরক্ষিত এবং JSON হিসেবে ডাউনলোডযোগ্য হওয়া উচিত।",
    ar: "يجب حفظ سجل المحادثة وإتاحته للتنزيل بصيغة JSON للعرض التوضيحي.",
    hi: "डेमो के लिए बातचीत का इतिहास संग्रहीत होना चाहिए और JSON के रूप में डाउनलोड किया जा सके।",
    ja: "デモ用に会話履歴を保存し、JSONとしてダウンロードできる必要があります。",
    zh: "演示中应保存聊天历史，并可作为 JSON 下载。",
    es: "El historial de conversación debe guardarse y poder descargarse como JSON para la demo.",
    fr: "L'historique de conversation doit être stocké et téléchargeable en JSON pour la démonstration."
  },
  hindi_response: {
    en: "The summary should list the topic, key points, decisions, action items, and participants.",
    ko: "요약에는 주제, 핵심 사항, 결정 사항, 실행 항목, 참여자가 포함되어야 합니다.",
    bn: "সারাংশে আলোচনার বিষয়, মূল পয়েন্ট, সিদ্ধান্ত, করণীয় এবং অংশগ্রহণকারীদের তালিকা থাকা উচিত।",
    ar: "يجب أن يتضمن الملخص الموضوع والنقاط الرئيسية والقرارات والمهام والمشاركين.",
    hi: "सारांश में विषय, मुख्य बिंदु, निर्णय, कार्य आइटम और प्रतिभागी शामिल होने चाहिए।",
    ja: "要約には、トピック、要点、決定事項、アクション項目、参加者を含める必要があります。",
    zh: "摘要应列出主题、关键点、决策、行动项和参与者。",
    es: "El resumen debe incluir el tema, puntos clave, decisiones, acciones y participantes.",
    fr: "Le résumé doit inclure le sujet, les points clés, les décisions, les actions et les participants."
  }
};

const demoSeed = [
  { senderId: "rayhan", language: "bn", text: canonicalDemoMessages.weather_question.bn, key: "weather_question" }
];

let messages = [];

function loadEnvFile() {
  const envPath = path.join(__dirname, ".env");
  if (!fs.existsSync(envPath)) return;

  const envLines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of envLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const equalsIndex = trimmed.indexOf("=");
    if (equalsIndex === -1) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    const rawValue = trimmed.slice(equalsIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

async function initializeDemoMessages() {
  messages = [];
  const startedAt = Date.now();
  for (let index = 0; index < demoSeed.length; index += 1) {
    const item = demoSeed[index];
    const sender = users.find((user) => user.id === item.senderId) || users[0];
    messages.push({
      id: `${startedAt}-${index}-${item.key}`,
      senderName: sender.name,
      senderId: sender.id,
      senderLanguage: item.language,
      originalText: item.text,
      translatedVersions: { ...canonicalDemoMessages[item.key] },
      timestamp: new Date(startedAt + index * 1000).toISOString()
    });
  }
}

async function createMessage(senderId, originalText, senderLanguage, knownKey, indexOffset = 0) {
  const sender = users.find((user) => user.id === senderId) || users[0];
  const sourceLanguage = senderLanguage || sender.language;
  const translationKey = knownKey || detectDemoMessage(originalText, sourceLanguage);
  const translatedVersions = {};

  for (const language of languages) {
    translatedVersions[language.code] = await translateText(originalText, sourceLanguage, language.code, translationKey);
  }

  return {
    id: `${Date.now()}-${indexOffset}-${Math.random().toString(16).slice(2)}`,
    senderName: sender.name,
    senderId: sender.id,
    senderLanguage: sourceLanguage,
    originalText,
    translatedVersions,
    timestamp: new Date(Date.now() + indexOffset * 1000).toISOString()
  };
}

function detectDemoMessage(text, sourceLanguage) {
  const normalized = text.trim().toLowerCase();
  return Object.keys(canonicalDemoMessages).find((key) => {
    const candidate = canonicalDemoMessages[key][sourceLanguage];
    return candidate && candidate.trim().toLowerCase() === normalized;
  });
}

async function translateText(text, sourceLanguage, targetLanguage, translationKey) {
  if (sourceLanguage === targetLanguage) return text;

  try {
    const azureTranslation = await translateWithAzure(text, sourceLanguage, targetLanguage);
    if (azureTranslation) return azureTranslation;
  } catch (error) {
    console.warn(`Azure Translator fallback used: ${error.message}`);
  }

  if (translationKey && canonicalDemoMessages[translationKey][targetLanguage]) {
    return canonicalDemoMessages[translationKey][targetLanguage];
  }

  return fallbackTranslateText(text, sourceLanguage, targetLanguage);
}

async function translateWithAzure(text, sourceLanguage, targetLanguage) {
  if (!AZURE_TRANSLATOR_KEY || !AZURE_TRANSLATOR_ENDPOINT) {
    return null;
  }

  const endpoint = AZURE_TRANSLATOR_ENDPOINT.replace(/\/+$/, "");
  const from = azureLanguageCode(sourceLanguage);
  const to = azureLanguageCode(targetLanguage);
  const translateUrl = new URL(`${endpoint}/translate`);
  translateUrl.searchParams.set("api-version", "3.0");
  translateUrl.searchParams.set("from", from);
  translateUrl.searchParams.set("to", to);

  const response = await fetch(translateUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": AZURE_TRANSLATOR_KEY,
      "Ocp-Apim-Subscription-Region": AZURE_TRANSLATOR_REGION,
      "X-ClientTraceId": crypto.randomUUID()
    },
    body: JSON.stringify([{ Text: text }])
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Azure Translator returned ${response.status}: ${errorText.slice(0, 180)}`);
  }

  const data = await response.json();
  return data?.[0]?.translations?.[0]?.text || null;
}

function azureLanguageCode(languageCode) {
  const azureCodes = {
    zh: "zh-Hans"
  };
  return azureCodes[languageCode] || languageCode;
}

function fallbackTranslateText(text, sourceLanguage, targetLanguage) {
  const target = languages.find((language) => language.code === targetLanguage);
  const source = languages.find((language) => language.code === sourceLanguage);

  return `[Fallback ${source?.name || sourceLanguage} to ${target?.name || targetLanguage}] ${text}`;
}

function summarizeConversation() {
  const participants = [...new Set(messages.map((message) => message.senderName))];
  const activeLanguages = [...new Set(messages.map((message) => message.senderLanguage))]
    .map((code) => getLanguage(code).name);
  const keyPoints = messages.slice(-5).map((message) => {
    const englishText = message.translatedVersions.en || message.originalText;
    return `${message.senderName}: ${englishText}`;
  });

  // In production, connect this endpoint to Azure OpenAI or Azure AI Language.
  return {
    generatedAt: new Date().toISOString(),
    mainDiscussionTopic: "Linguabridge multilingual group chat with AI translation, conversation history, and meeting notes.",
    keyPoints,
    decisionsMade: [
      "Use Azure Translator Text API for multilingual message translation.",
      "Show original and receiver-specific translated messages in the interface."
    ],
    actionItems: [
      "Replace memory storage with Azure Cosmos DB for persistence.",
      "Connect the summary button to Azure OpenAI or Azure AI Language."
    ],
    participants,
    activeLanguages
  };
}

function getLanguage(code) {
  return languages.find((language) => language.code === code) || languages[0];
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(JSON.stringify(data, null, 2));
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        request.destroy();
        reject(new Error("Request body is too large."));
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function serveStaticFile(request, response) {
  const parsedUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  const safePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath === "/" ? "index.html" : safePath);
  const extension = path.extname(filePath).toLowerCase();
  const contentType = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml"
  }[extension] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("File not found");
      return;
    }

    response.writeHead(200, { "Content-Type": contentType });
    response.end(content);
  });
}

const server = http.createServer(async (request, response) => {
  const parsedUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  try {
    if (request.method === "GET" && parsedUrl.pathname === "/api/health") {
      sendJson(response, 200, {
        status: "ok",
        service: "Linguabridge",
        azureTranslatorConfigured: Boolean(AZURE_TRANSLATOR_KEY && AZURE_TRANSLATOR_ENDPOINT)
      });
      return;
    }

    if (request.method === "GET" && parsedUrl.pathname === "/api/bootstrap") {
      sendJson(response, 200, { users, languages, messages, summary: summarizeConversation() });
      return;
    }

    if (request.method === "POST" && parsedUrl.pathname === "/api/users/language") {
      const body = await readJsonBody(request);
      const user = users.find((candidate) => candidate.id === body.userId);
      const languageExists = languages.some((language) => language.code === body.language);

      if (!user || !languageExists) {
        sendJson(response, 400, { error: "Invalid user or language." });
        return;
      }

      user.language = body.language;
      sendJson(response, 200, { users });
      return;
    }

    if (request.method === "POST" && parsedUrl.pathname === "/api/messages") {
      const body = await readJsonBody(request);
      const sender = users.find((user) => user.id === body.senderId);

      if (!sender || !body.text || !body.text.trim()) {
        sendJson(response, 400, { error: "Sender and message text are required." });
        return;
      }

      const message = await createMessage(sender.id, body.text.trim(), sender.language);
      messages.push(message);
      sendJson(response, 201, { message, messages });
      return;
    }

    if (request.method === "POST" && parsedUrl.pathname === "/api/translate") {
      const body = await readJsonBody(request);
      const text = String(body.text || "").trim();
      const sourceLanguage = String(body.sourceLanguage || "en");
      const targetLanguage = String(body.targetLanguage || "ko");
      const sourceExists = languages.some((language) => language.code === sourceLanguage);
      const targetExists = languages.some((language) => language.code === targetLanguage);

      if (!text) {
        sendJson(response, 400, { error: "Message text is required." });
        return;
      }

      if (!sourceExists || !targetExists) {
        sendJson(response, 400, { error: "Invalid source or target language." });
        return;
      }

      const translatedText = await translateText(text, sourceLanguage, targetLanguage);
      sendJson(response, 200, {
        originalText: text,
        translatedText,
        sourceLanguage: getLanguage(sourceLanguage),
        targetLanguage: getLanguage(targetLanguage),
        translatedAt: new Date().toISOString()
      });
      return;
    }

    if (request.method === "GET" && parsedUrl.pathname === "/api/messages") {
      sendJson(response, 200, { messages });
      return;
    }

    if (request.method === "GET" && parsedUrl.pathname === "/api/summary") {
      sendJson(response, 200, { summary: summarizeConversation() });
      return;
    }

    if (request.method === "GET" && parsedUrl.pathname === "/api/history/download") {
      response.writeHead(200, {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": "attachment; filename=\"linguabridge-chat-history.json\""
      });
      response.end(JSON.stringify({ exportedAt: new Date().toISOString(), users, languages, messages }, null, 2));
      return;
    }

    serveStaticFile(request, response);
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
});

initializeDemoMessages()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      if (!AZURE_TRANSLATOR_KEY || !AZURE_TRANSLATOR_ENDPOINT) {
        console.log("Azure Translator credentials not found. Local fallback is active.");
      }
    });
  })
  .catch((error) => {
    console.error("Failed to initialize demo messages:", error);
    process.exit(1);
  });
