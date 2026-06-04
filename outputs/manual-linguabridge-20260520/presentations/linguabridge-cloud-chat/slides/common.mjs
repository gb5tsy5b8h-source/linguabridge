const C = {
  bg: "#061526",
  bg2: "#09233e",
  ink: "#f4f9ff",
  muted: "#a8bed6",
  dim: "#6f89a6",
  azure: "#35a7ff",
  cyan: "#5ee7df",
  green: "#52e3a4",
  amber: "#ffd166",
  violet: "#8b7cff",
  line: "#2d5f8e",
  panel: "#0c2746",
  panel2: "#0f335a",
  transparent: "#00000000"
};

const slides = [
  {
    kicker: "TITLE",
    title: "Linguabridge Cloud Chat",
    subtitle: "Azure-Ready Multilingual AI Communication Platform",
    note: "Introduce Linguabridge as a software engineering and cloud AI project, not just a chat UI. The key idea is simple: people write naturally in their own language, while each receiver reads the conversation in their selected language.",
    type: "title"
  },
  {
    kicker: "PROBLEM",
    title: "Multilingual teams lose clarity when communication depends on one shared language.",
    proof: ["Language barriers slow collaboration", "Manual translation breaks conversation flow", "Important decisions are hard to recover later"],
    note: "Frame the problem around real collaboration: international classrooms, distributed teams, and cloud project reviews. The issue is not only translation accuracy; it is the loss of context, speed, and shared understanding."
  },
  {
    kicker: "OVERVIEW",
    title: "Linguabridge turns a chat room into a language-aware collaboration workspace.",
    proof: ["Multi-user chat", "Per-user language preference", "Receiver-specific translation", "Conversation memory", "AI-style summary"],
    note: "Explain the product in one sentence: it is a multilingual chat platform where messages are stored once, translated for each receiver, and summarized for review. Mention that the current version now integrates Azure Translator while keeping a fallback for demo reliability."
  },
  {
    kicker: "ARCHITECTURE",
    title: "The prototype separates the user interface, chat API, translation layer, and storage boundary.",
    proof: ["Frontend dashboard", "Node.js backend API", "Azure Translator API", "In-memory message store", "Future Azure services"],
    note: "Walk through the architecture from left to right. The browser sends messages to the backend. The backend calls Azure Translator Text API, stores the original message and generated translations, and falls back safely if the API is unavailable. In production, memory storage can become Azure Cosmos DB."
  },
  {
    kicker: "REAL TIME",
    title: "The chat experience is designed for live multilingual collaboration.",
    proof: ["Demo users stay online", "Typing and translation status", "New messages animate into the feed", "Each sender keeps their native language"],
    note: "Describe the live classroom scenario. Rayhan can write in Bangla, Jisu in Korean, Ahmed in Arabic, and Priya in Hindi. The UI makes the system feel like a real-time cloud app with status indicators and immediate message rendering."
  },
  {
    kicker: "TRANSLATION",
    title: "Each receiver gets the same message rendered in their own selected language.",
    proof: ["Original text is preserved", "Source language is shown", "Receiver language is shown", "Translated version changes by viewer"],
    note: "Emphasize receiver-specific translation. The message is not simply converted once. The backend stores translated versions so Korean, English, Arabic, and other users can each see the same message in their own language."
  },
  {
    kicker: "HISTORY",
    title: "Conversation memory makes the demo auditable and ready for persistent cloud storage.",
    proof: ["Sender name", "Sender language", "Original text", "Translated versions", "Timestamp", "JSON export"],
    note: "Explain that every message includes metadata. This is important for debugging, auditability, and future database design. The JSON export proves the conversation has a structured backend representation."
  },
  {
    kicker: "SUMMARY",
    title: "The summary feature converts raw chat into review-ready project notes.",
    proof: ["Main topic", "Key points", "Decisions made", "Action items", "Participants"],
    note: "Position the summary as an AI productivity feature. For the checkpoint, it uses a local mock summarizer. In the final architecture, this can be powered by Azure OpenAI or Azure AI Language while translation remains handled by Azure Translator."
  },
  {
    kicker: "AZURE ROADMAP",
    title: "The prototype is intentionally shaped for Azure AI and cloud database integration.",
    proof: ["Azure AI Translator", "Azure OpenAI", "Azure AI Language", "Azure Cosmos DB", "App Service or Static Web Apps"],
    note: "Describe the future Azure integration clearly. Translation moves to Azure AI Translator, summarization moves to Azure OpenAI or Azure AI Language, and chat persistence moves to Cosmos DB. The backend API already gives a natural place to connect those services."
  },
  {
    kicker: "CONCLUSION",
    title: "Linguabridge demonstrates a practical cloud AI pattern for inclusive communication.",
    proof: ["Natural multilingual input", "Receiver-specific understanding", "Structured conversation memory", "AI-generated recap", "Azure-ready architecture"],
    note: "Close with the engineering value: the project combines frontend design, backend API design, data modeling, and AI service integration. Invite questions about the demo, architecture, Azure services, or future improvements.",
    type: "closing"
  }
];

function addText(slide, ctx, text, x, y, w, h, size, color = C.ink, opts = {}) {
  return ctx.addText(slide, {
    text,
    x,
    y,
    w,
    h,
    fontSize: size,
    color,
    bold: opts.bold ?? false,
    typeface: opts.face ?? (opts.title ? ctx.fonts.title : ctx.fonts.body),
    align: opts.align ?? "left",
    valign: opts.valign ?? "top",
    insets: opts.insets ?? { left: 0, right: 0, top: 0, bottom: 0 },
    name: opts.name
  });
}

function addRect(slide, ctx, x, y, w, h, fill, line = C.transparent, width = 0, radius = "roundRect", name) {
  return ctx.addShape(slide, {
    geometry: radius,
    x,
    y,
    w,
    h,
    fill,
    line: ctx.line(line, width),
    name
  });
}

function addRule(slide, ctx, x, y, w, h = 2, fill = C.cyan) {
  return addRect(slide, ctx, x, y, w, h, fill, C.transparent, 0, "rect");
}

function background(slide, ctx, index) {
  addRect(slide, ctx, 0, 0, ctx.W, ctx.H, C.bg, C.transparent, 0, "rect");
  addRule(slide, ctx, 0, 284, ctx.W, 1, "#123d64");
  addRect(slide, ctx, 934, 0, 346, 280, "#123f6e", C.transparent, 0, "ellipse");
  addRect(slide, ctx, 0, 500, 250, 220, "#0f3b63", C.transparent, 0, "ellipse");
  for (let i = 0; i < 8; i += 1) {
    addRule(slide, ctx, 74 + i * 150, 156, 80, 1, "#1d4a73");
  }
  addText(slide, ctx, "LINGUABRIDGE · CLOUD AI DEMO", 54, 36, 310, 26, 13, C.cyan, { bold: true, name: `kicker-${index}-label` });
  addRule(slide, ctx, 54, 68, 118, 3, C.azure);
  addText(slide, ctx, String(index).padStart(2, "0"), 1180, 38, 46, 28, 15, C.muted, { bold: true, align: "right" });
}

function titleBlock(slide, ctx, data, index) {
  addText(slide, ctx, data.kicker, 74, 98, 320, 24, 13, C.cyan, { bold: true, name: `kicker-${index}-label-main` });
  addText(slide, ctx, data.title, 74, 132, 760, 132, 37, C.ink, { bold: true, title: true });
}

function footer(slide, ctx) {
  addRule(slide, ctx, 74, 668, 1030, 1, "#1a466e");
  addText(slide, ctx, "Translation uses Azure Translator API with fallback; summary is local mock AI; persistent storage target is Azure Cosmos DB.", 74, 676, 900, 20, 10, C.dim);
}

function metricRail(slide, ctx, items) {
  items.forEach((item, i) => {
    const x = 74 + i * 228;
    addText(slide, ctx, item.value, x, 577, 170, 40, 30, item.color || C.ink, { bold: true });
    addText(slide, ctx, item.label, x, 620, 170, 22, 11, C.muted, { bold: true });
  });
}

function proofPills(slide, ctx, items, x, y, w, gap = 14) {
  items.forEach((item, i) => {
    const yy = y + i * (56 + gap);
    addRect(slide, ctx, x, yy, w, 56, "#0d2b4c", "#265d8c", 1, "roundRect");
    addRule(slide, ctx, x, yy + 12, 4, 32, i % 2 ? C.green : C.cyan);
    addText(slide, ctx, item, x + 24, yy + 16, w - 40, 24, 17, C.ink, { bold: true });
  });
}

function architecture(slide, ctx) {
  const nodes = [
    ["User devices", "Browser UI", 84, 318, C.azure],
    ["Chat API", "Node backend", 318, 318, C.cyan],
    ["Translator", "Azure API + fallback", 552, 318, C.violet],
    ["Memory store", "Structured messages", 786, 318, C.green],
    ["Azure services", "Production target", 1020, 318, C.amber]
  ];
  nodes.forEach(([title, sub, x, y, color]) => {
    addRect(slide, ctx, x, y, 164, 112, "#0d2b4c", color, 1.4, "roundRect");
    addText(slide, ctx, title, x + 16, y + 22, 132, 28, 18, C.ink, { bold: true });
    addText(slide, ctx, sub, x + 16, y + 58, 132, 28, 12, C.muted);
  });
  for (let i = 0; i < nodes.length - 1; i += 1) {
    const x = nodes[i][2] + 174;
    addRule(slide, ctx, x, 372, 36, 3, C.cyan);
    addText(slide, ctx, "→", x + 39, 356, 28, 30, 25, C.cyan, { bold: true });
  }
}

function translationMatrix(slide, ctx) {
  const rows = [
    ["Rayhan", "Bangla", "Korean", "English", "Arabic"],
    ["Jisu", "Korean", "Bangla", "English", "Hindi"],
    ["Alex", "English", "Korean", "French", "Spanish"]
  ];
  addText(slide, ctx, "Sender", 98, 306, 120, 22, 13, C.dim, { bold: true });
  addText(slide, ctx, "Original", 280, 306, 120, 22, 13, C.dim, { bold: true });
  addText(slide, ctx, "Receiver views", 502, 306, 260, 22, 13, C.dim, { bold: true });
  rows.forEach((row, r) => {
    const y = 342 + r * 76;
    addRect(slide, ctx, 84, y, 1012, 58, r % 2 ? "#0a2340" : "#0d2b4c", "#224f79", 1, "roundRect");
    addText(slide, ctx, row[0], 112, y + 18, 130, 22, 17, C.ink, { bold: true });
    addText(slide, ctx, row[1], 282, y + 18, 130, 22, 17, C.cyan, { bold: true });
    row.slice(2).forEach((lang, i) => {
      addRect(slide, ctx, 502 + i * 148, y + 12, 124, 34, "#061526", "#316894", 1, "roundRect");
      addText(slide, ctx, lang, 518 + i * 148, y + 20, 94, 18, 12, C.ink, { bold: true, align: "center" });
    });
  });
}

function timeline(slide, ctx) {
  const items = [
    ["Prototype", "Azure Translator + memory store"],
    ["AI services", "Azure OpenAI summary"],
    ["Persistence", "Azure Cosmos DB conversation model"],
    ["Deployment", "App Service or Static Web Apps"],
    ["Scale", "Auth, monitoring, reliability"]
  ];
  addRule(slide, ctx, 130, 382, 940, 4, "#255f8e");
  items.forEach((item, i) => {
    const x = 126 + i * 230;
    addRect(slide, ctx, x, 366, 34, 34, i < 1 ? C.cyan : C.panel2, C.cyan, 2, "ellipse");
    addText(slide, ctx, item[0], x - 48, 424, 130, 26, 16, C.ink, { bold: true, align: "center" });
    addText(slide, ctx, item[1], x - 62, 454, 160, 44, 11, C.muted, { align: "center" });
  });
}

function summaryPanel(slide, ctx) {
  const labels = ["Main topic", "Key points", "Decisions", "Action items", "Participants"];
  labels.forEach((label, i) => {
    const x = 114 + (i % 3) * 324;
    const y = 318 + Math.floor(i / 3) * 118;
    addRect(slide, ctx, x, y, 274, 78, "#0d2b4c", i === 0 ? C.cyan : "#27597f", 1, "roundRect");
    addText(slide, ctx, label, x + 20, y + 20, 230, 24, 18, C.ink, { bold: true });
    addText(slide, ctx, "Structured output", x + 20, y + 48, 220, 18, 11, C.muted);
  });
}

function makeTitle(slide, ctx, data) {
  addRect(slide, ctx, 0, 0, ctx.W, ctx.H, C.bg, C.transparent, 0, "rect");
  addRect(slide, ctx, 700, 0, 430, 430, "#104372", C.transparent, 0, "ellipse");
  addRect(slide, ctx, 854, 118, 290, 290, "#08233f", C.cyan, 2, "ellipse");
  addText(slide, ctx, "LB", 942, 206, 112, 88, 54, C.cyan, { bold: true, title: true, align: "center" });
  addText(slide, ctx, "LINGUABRIDGE CLOUD CHAT", 74, 82, 420, 26, 14, C.cyan, { bold: true });
  addText(slide, ctx, data.title, 74, 160, 690, 98, 49, C.ink, { bold: true, title: true });
  addText(slide, ctx, data.subtitle, 78, 282, 660, 64, 24, C.muted);
  addText(slide, ctx, "Team C_03 · Hossain Enam · Ju Minjun · Rayhan B M Zidan Istiak", 78, 410, 650, 30, 16, C.cyan, { bold: true });
  addRule(slide, ctx, 78, 374, 210, 5, C.azure);
  metricRail(slide, ctx, [
    { value: "9", label: "supported languages", color: C.cyan },
    { value: "5", label: "demo participants", color: C.green },
    { value: "JSON", label: "structured export", color: C.amber },
    { value: "Azure", label: "translator integrated", color: C.azure }
  ]);
}

function makeClosing(slide, ctx, data, index) {
  background(slide, ctx, index);
  addText(slide, ctx, data.kicker, 90, 126, 240, 24, 13, C.cyan, { bold: true });
  addText(slide, ctx, data.title, 90, 174, 790, 136, 42, C.ink, { bold: true, title: true });
  proofPills(slide, ctx, data.proof, 90, 328, 500, 10);
  addRect(slide, ctx, 724, 330, 372, 190, "#0d2b4c", C.cyan, 1.2, "roundRect");
  addText(slide, ctx, "Q&A", 786, 374, 250, 72, 58, C.cyan, { bold: true, title: true, align: "center" });
  addText(slide, ctx, "Architecture · AI services · demo workflow", 766, 458, 290, 28, 15, C.muted, { align: "center" });
  footer(slide, ctx);
}

function addSpeakerNotes(slide, data) {
  slide.speakerNotes.setText(data.note);
}

export async function buildSlide(presentation, ctx, index) {
  const data = slides[index - 1];
  const slide = presentation.slides.add();
  addSpeakerNotes(slide, data);

  if (data.type === "title") {
    makeTitle(slide, ctx, data);
    return slide;
  }

  if (data.type === "closing") {
    makeClosing(slide, ctx, data, index);
    return slide;
  }

  background(slide, ctx, index);
  titleBlock(slide, ctx, data, index);

  if (index === 2) {
    proofPills(slide, ctx, data.proof, 86, 306, 468);
    addRect(slide, ctx, 660, 306, 370, 240, "#0d2b4c", C.azure, 1.2, "roundRect");
    addText(slide, ctx, "Communication gap", 704, 340, 270, 28, 23, C.ink, { bold: true });
    addRule(slide, ctx, 704, 386, 240, 4, C.amber);
    addText(slide, ctx, "A multilingual project team needs shared understanding without forcing everyone into one language.", 704, 418, 260, 74, 20, C.muted);
  } else if (index === 3) {
    proofPills(slide, ctx, data.proof, 84, 314, 1010, 10);
  } else if (index === 4) {
    architecture(slide, ctx);
  } else if (index === 5) {
    addRect(slide, ctx, 92, 310, 290, 170, "#0d2b4c", C.green, 1, "roundRect");
    addText(slide, ctx, "Rayhan writes in Bangla", 124, 346, 226, 34, 24, C.ink, { bold: true });
    addText(slide, ctx, "The conversation remains natural for the sender.", 124, 398, 220, 42, 15, C.muted);
    addText(slide, ctx, "→", 424, 362, 54, 54, 42, C.cyan, { bold: true });
    addRect(slide, ctx, 504, 310, 260, 170, "#0d2b4c", C.cyan, 1, "roundRect");
    addText(slide, ctx, "Translation status", 536, 346, 206, 34, 24, C.ink, { bold: true });
    addText(slide, ctx, "Typing dots and message animation signal live processing.", 536, 398, 200, 46, 15, C.muted);
    addText(slide, ctx, "→", 800, 362, 54, 54, 42, C.cyan, { bold: true });
    addRect(slide, ctx, 880, 310, 290, 170, "#0d2b4c", C.azure, 1, "roundRect");
    addText(slide, ctx, "Jisu reads Korean", 912, 346, 226, 34, 24, C.ink, { bold: true });
    addText(slide, ctx, "The receiver sees their selected language immediately.", 912, 398, 220, 42, 15, C.muted);
  } else if (index === 6) {
    translationMatrix(slide, ctx);
  } else if (index === 7) {
    addRect(slide, ctx, 92, 304, 470, 254, "#061526", "#28608d", 1, "roundRect");
    addText(slide, ctx, "{", 126, 328, 42, 52, 38, C.cyan, { bold: true });
    const fields = ["senderName", "senderLanguage", "originalText", "translatedVersions", "timestamp"];
    fields.forEach((field, i) => addText(slide, ctx, `"${field}"`, 178, 332 + i * 38, 250, 24, 18, i === 3 ? C.green : C.ink, { face: ctx.fonts.mono }));
    addText(slide, ctx, "}", 126, 502, 42, 52, 38, C.cyan, { bold: true });
    proofPills(slide, ctx, data.proof.slice(0, 4), 650, 306, 390, 8);
  } else if (index === 8) {
    summaryPanel(slide, ctx);
  } else if (index === 9) {
    timeline(slide, ctx);
  }

  footer(slide, ctx);
  return slide;
}
