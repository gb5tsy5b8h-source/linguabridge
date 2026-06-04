const pptxgen = require("pptxgenjs");
const path = require("path");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Team 6 Individual Submission";
pptx.subject = "Week 12 Cryptography: VIC Cipher / Spy App";
pptx.title = "VIC Cipher / Spy App - Final Presentation";
pptx.company = "Information Security";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};

const C = {
  bg: "09111F",
  bg2: "111827",
  panel: "162033",
  ink: "172033",
  muted: "667085",
  white: "FFFFFF",
  cloud: "F6F8FC",
  line: "D6DDEC",
  blue: "2563EB",
  cyan: "0EA5E9",
  teal: "0EA5A7",
  amber: "F59E0B",
  green: "16A34A",
  red: "DC2626",
  violet: "6D28D9",
  paleBlue: "EAF1FF",
  paleCyan: "E6F7FF",
  paleAmber: "FFF5DA",
  paleGreen: "EAF8EF",
  paleRed: "FDECEC",
  darkText: "DDE8FA",
};

function footer(slide, n) {
  slide.addText("Week 12 Cryptography | Team 6 | VIC Cipher / Spy App", {
    x: 0.55,
    y: 7.08,
    w: 6.3,
    h: 0.16,
    fontSize: 7.4,
    color: C.muted,
    margin: 0,
  });
  slide.addText(String(n).padStart(2, "0"), {
    x: 12.1,
    y: 7.08,
    w: 0.58,
    h: 0.16,
    fontSize: 7.4,
    color: C.muted,
    align: "right",
    margin: 0,
  });
}

function title(slide, kicker, heading, sub) {
  slide.addText(kicker.toUpperCase(), {
    x: 0.62,
    y: 0.42,
    w: 7.2,
    h: 0.18,
    fontSize: 8.3,
    bold: true,
    color: C.blue,
    charSpace: 0.8,
    margin: 0,
  });
  slide.addText(heading, {
    x: 0.6,
    y: 0.72,
    w: 10.6,
    h: 0.5,
    fontSize: 25,
    bold: true,
    color: C.ink,
    margin: 0,
    fit: "shrink",
  });
  if (sub) {
    slide.addText(sub, {
      x: 0.62,
      y: 1.25,
      w: 9.4,
      h: 0.22,
      fontSize: 11.2,
      color: C.muted,
      margin: 0,
    });
  }
}

function card(slide, x, y, w, h, fill = C.white, line = C.line) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.055,
    fill: { color: fill },
    line: { color: line, width: 1 },
  });
}

function bullets(slide, items, x, y, w, h, size = 15, color = C.ink) {
  slide.addText(
    items.map((text) => ({ text, options: { bullet: { indent: 14 }, hanging: 4 } })),
    {
      x,
      y,
      w,
      h,
      fontSize: size,
      color,
      paraSpaceAfterPt: 9,
      breakLine: false,
      fit: "shrink",
    }
  );
}

function sectionTag(slide, text, x, y, color) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: 1.5,
    h: 0.34,
    rectRadius: 0.05,
    fill: { color },
    line: { color },
  });
  slide.addText(text, {
    x: x + 0.12,
    y: y + 0.09,
    w: 1.25,
    h: 0.12,
    fontSize: 8.2,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
}

function cover() {
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 5.55, w: 13.333, h: 1.95, fill: { color: "1D4ED8", transparency: 8 }, line: { color: "1D4ED8", transparency: 100 } });
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.16, h: 7.5, fill: { color: C.cyan }, line: { color: C.cyan } });
  s.addText("WEEK 12 CRYPTOGRAPHY", { x: 0.82, y: 0.72, w: 4.2, h: 0.2, fontSize: 10, bold: true, charSpace: 1, color: "67E8F9", margin: 0 });
  s.addText("VIC Cipher\nSpy App", { x: 0.78, y: 1.22, w: 6.2, h: 1.2, fontSize: 44, bold: true, color: C.white, breakLine: false, margin: 0, fit: "shrink" });
  s.addText("W5H1 + Python source-code demo + cracking possibilities", { x: 0.82, y: 2.75, w: 6.8, h: 0.28, fontSize: 18, color: C.darkText, margin: 0 });
  card(s, 8.3, 1.0, 3.75, 4.0, "0B1220", "334155");
  s.addText("MISSION CARD", { x: 8.7, y: 1.38, w: 1.8, h: 0.16, fontSize: 8.5, bold: true, color: "67E8F9", charSpace: 0.6, margin: 0 });
  s.addText("Assigned topic", { x: 8.72, y: 1.9, w: 1.9, h: 0.2, fontSize: 11, color: "AFC6E8", margin: 0 });
  s.addText("VIC Cipher / spy app", { x: 8.72, y: 2.2, w: 2.7, h: 0.4, fontSize: 20, bold: true, color: C.white, margin: 0, fit: "shrink" });
  s.addText("Required output", { x: 8.72, y: 3.02, w: 1.9, h: 0.2, fontSize: 11, color: "AFC6E8", margin: 0 });
  s.addText("PPT/PDF\nPython demo\nCracking analysis", { x: 8.72, y: 3.34, w: 2.6, h: 0.8, fontSize: 17, bold: true, color: C.white, margin: 0, fit: "shrink" });
  s.addText("Name / Student ID: ____________________", { x: 0.82, y: 6.35, w: 4.6, h: 0.22, fontSize: 12.5, bold: true, color: C.white, margin: 0 });
}

function agenda() {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, "Professor checklist", "What This Presentation Covers", "Designed to match the Week 12 requirements directly.");
  const rows = [
    ["W5H1", "Who, What, When, Where, Why, How", C.blue],
    ["Algorithm", "VIC-inspired substitution + transposition", C.teal],
    ["Python Demo", "Source code and visual spy console", C.amber],
    ["Cracking", "How weak keys and patterns can be attacked", C.red],
    ["Ethics", "Educational and authorized use only", C.green],
  ];
  rows.forEach((r, i) => {
    const y = 1.75 + i * 0.82;
    card(s, 0.95, y, 10.8, 0.58, C.white, C.line);
    sectionTag(s, r[0], 1.22, y + 0.12, r[2]);
    s.addText(r[1], { x: 3.0, y: y + 0.18, w: 7.8, h: 0.16, fontSize: 14.5, bold: true, color: C.ink, margin: 0 });
  });
  footer(s, 2);
}

function w5h1() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Required analysis", "W5H1: VIC Cipher", "The required summary frame for the assigned cryptography topic.");
  const items = [
    ["Who", "Cold War intelligence users; connected to Reino Hayhanen.", C.blue],
    ["What", "A hand cipher that encrypts messages into number groups.", C.teal],
    ["When", "Cold War period; publicly known after espionage investigations.", C.amber],
    ["Where", "Covert communication contexts where messages could be intercepted.", C.violet],
    ["Why", "Protect secret messages without needing a computer.", C.green],
    ["How", "Secret key material drives numeric substitution and transposition.", C.red],
  ];
  items.forEach((it, i) => {
    const x = 0.72 + (i % 2) * 6.06;
    const y = 1.72 + Math.floor(i / 2) * 1.3;
    card(s, x, y, 5.36, 0.88, C.cloud, C.line);
    s.addText(it[0], { x: x + 0.25, y: y + 0.22, w: 0.9, h: 0.2, fontSize: 15, bold: true, color: it[2], margin: 0 });
    s.addText(it[1], { x: x + 1.14, y: y + 0.19, w: 3.9, h: 0.28, fontSize: 11.5, color: C.ink, margin: 0, fit: "shrink" });
  });
  footer(s, 3);
}

function history() {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, "Historical context", "What Is The VIC Cipher?", "A Cold War hand cipher known for being strong without computers.");
  [
    ["Paper-and-pencil", "Designed for secret communication without electronic tools.", C.paleBlue, C.blue],
    ["Number groups", "Readable text becomes digits that can be transmitted safely.", C.paleAmber, C.amber],
    ["Layered security", "Substitution and transposition hide patterns together.", C.paleGreen, C.green],
  ].forEach((a, i) => {
    const x = 0.82 + i * 4.08;
    card(s, x, 1.85, 3.45, 3.55, C.white, C.line);
    s.addShape(pptx.ShapeType.ellipse, { x: x + 0.35, y: 2.27, w: 0.62, h: 0.62, fill: { color: a[2] }, line: { color: a[3] } });
    s.addText(String(i + 1), { x: x + 0.56, y: 2.43, w: 0.18, h: 0.12, fontSize: 9, bold: true, color: a[3], align: "center", margin: 0 });
    s.addText(a[0], { x: x + 0.35, y: 3.15, w: 2.55, h: 0.25, fontSize: 18, bold: true, color: C.ink, margin: 0, fit: "shrink" });
    s.addText(a[1], { x: x + 0.35, y: 3.7, w: 2.55, h: 0.58, fontSize: 12.5, color: C.muted, margin: 0, fit: "shrink" });
  });
  footer(s, 4);
}

function terms() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Vocabulary", "Core Cryptography Terms", "These terms make the demo easy to follow.");
  const terms = [
    ["Plaintext", "Original readable message", C.blue],
    ["Ciphertext", "Encrypted protected message", C.green],
    ["Key", "Secret information required to decrypt", C.amber],
    ["Substitution", "Replace letters with other symbols or numbers", C.teal],
    ["Transposition", "Rearrange the order of symbols", C.violet],
    ["Cracking", "Trying to recover plaintext without the key", C.red],
  ];
  terms.forEach((t, i) => {
    const x = 0.75 + (i % 3) * 4.15;
    const y = 1.72 + Math.floor(i / 3) * 1.7;
    card(s, x, y, 3.55, 1.08, C.cloud, C.line);
    s.addText(t[0], { x: x + 0.28, y: y + 0.25, w: 2.4, h: 0.2, fontSize: 15.5, bold: true, color: t[2], margin: 0 });
    s.addText(t[1], { x: x + 0.28, y: y + 0.62, w: 2.75, h: 0.18, fontSize: 10.7, color: C.muted, margin: 0, fit: "shrink" });
  });
  footer(s, 5);
}

function process(activeCount, slideNo) {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, "Animated build", "How The Demo Encrypts A Message", "This sequence is split into build slides so it works on any computer.");
  const steps = [
    ["Normalize", "MEET AT NOON → MEETATNOON", C.blue],
    ["Keyed alphabet", "SECRET 1970 changes alphabet order", C.teal],
    ["Checkerboard", "Letters become one- or two-digit codes", C.amber],
    ["Transposition", "Digits are rearranged by key order", C.violet],
    ["Ciphertext", "00151 88722 59012 02597 20", C.green],
  ];
  steps.forEach((st, i) => {
    const x = 0.55 + i * 2.52;
    const active = i < activeCount;
    card(s, x, 2.05, 2.05, 2.35, active ? C.white : "EEF2F7", active ? st[2] : C.line);
    s.addText(String(i + 1), { x: x + 0.2, y: 2.26, w: 0.25, h: 0.16, fontSize: 10, bold: true, color: active ? st[2] : C.muted, margin: 0 });
    s.addText(st[0], { x: x + 0.28, y: 2.78, w: 1.48, h: 0.24, fontSize: 13.5, bold: true, color: active ? C.ink : C.muted, align: "center", margin: 0, fit: "shrink" });
    s.addText(active ? st[1] : " ", { x: x + 0.28, y: 3.23, w: 1.48, h: 0.52, fontSize: 9.4, color: C.muted, align: "center", margin: 0, fit: "shrink" });
  });
  const activeStep = steps[Math.max(0, activeCount - 1)];
  card(s, 1.65, 5.0, 9.8, 0.72, activeStep ? C.paleBlue : C.white, C.blue);
  s.addText(activeStep ? `${activeStep[0]}: ${activeStep[1]}` : "The process begins with plaintext and a secret key.", {
    x: 1.95,
    y: 5.25,
    w: 9.1,
    h: 0.18,
    fontSize: 14,
    bold: true,
    color: C.ink,
    align: "center",
    margin: 0,
  });
  footer(s, slideNo);
}

function sourceCode() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Required demo", "Python Source Code Demo", "The source code file is part of the deliverable.");
  card(s, 0.78, 1.65, 5.62, 4.2, C.bg2, "334155");
  s.addText("vic_cipher_professional_demo.py", { x: 1.12, y: 2.0, w: 3.7, h: 0.2, fontSize: 12, bold: true, color: "67E8F9", margin: 0 });
  s.addText("python3 vic_cipher_professional_demo.py encrypt \\\n  --key \"SECRET 1970\" \\\n  --text \"MEET AT NOON\" \\\n  --show-steps", {
    x: 1.12,
    y: 2.48,
    w: 4.65,
    h: 1.15,
    fontFace: "Menlo",
    fontSize: 12.5,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  s.addText("Shows the internal workflow: keyed alphabet, checkerboard substitution, transposition, and final ciphertext.", {
    x: 1.12,
    y: 4.35,
    w: 4.65,
    h: 0.55,
    fontSize: 13.2,
    bold: true,
    color: C.darkText,
    margin: 0,
    fit: "shrink",
  });
  bullets(s, [
    "Python source-code demo is available to inspect.",
    "Browser spy console gives a polished visual demo.",
    "Both use the same cryptography logic.",
    "Correct key and wrong-key behavior are shown.",
  ], 7.1, 2.0, 4.7, 2.7, 16);
  footer(s, 11);
}

function visualDemo() {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, "Visual demo", "Spy Console: Professional Demo Screen", "Use this browser app live, then keep this screenshot in the deck.");
  card(s, 0.55, 1.48, 8.2, 5.24, C.bg, "26364E");
  s.addText("VIC Cipher Spy Console", { x: 0.93, y: 1.82, w: 3.1, h: 0.25, fontSize: 19, bold: true, color: C.white, margin: 0 });
  s.addText("Week 12 Cryptography Demo", { x: 0.94, y: 2.16, w: 2.6, h: 0.16, fontSize: 8.5, bold: true, color: "67E8F9", charSpace: 0.8, margin: 0 });
  card(s, 0.95, 2.58, 2.55, 2.85, "111827", "334155");
  s.addText("Operator Input", { x: 1.18, y: 2.86, w: 1.5, h: 0.18, fontSize: 11, bold: true, color: C.white, margin: 0 });
  s.addText("Plain Message", { x: 1.18, y: 3.26, w: 1.2, h: 0.12, fontSize: 7, bold: true, color: "9CA8BD", margin: 0 });
  card(s, 1.17, 3.43, 1.92, 0.34, "0B1220", "334155");
  s.addText("MEET AT NOON", { x: 1.29, y: 3.55, w: 1.4, h: 0.1, fontSize: 7.8, color: C.white, margin: 0 });
  s.addText("Secret Key", { x: 1.18, y: 3.94, w: 1.2, h: 0.12, fontSize: 7, bold: true, color: "9CA8BD", margin: 0 });
  card(s, 1.17, 4.11, 1.92, 0.34, "0B1220", "334155");
  s.addText("SECRET 1970", { x: 1.29, y: 4.23, w: 1.4, h: 0.1, fontSize: 7.8, color: C.white, margin: 0 });
  card(s, 1.17, 4.72, 0.86, 0.34, "35D0DF", "35D0DF");
  s.addText("Encrypt", { x: 1.33, y: 4.84, w: 0.5, h: 0.08, fontSize: 6.8, bold: true, color: "07111F", align: "center", margin: 0 });
  card(s, 2.14, 4.72, 0.86, 0.34, "F8C35B", "F8C35B");
  s.addText("Decrypt", { x: 2.31, y: 4.84, w: 0.5, h: 0.08, fontSize: 6.8, bold: true, color: "07111F", align: "center", margin: 0 });
  card(s, 3.82, 2.58, 4.45, 0.88, "090F1E", "334155");
  s.addText("Mission Output", { x: 4.08, y: 2.82, w: 1.45, h: 0.14, fontSize: 9, bold: true, color: C.white, margin: 0 });
  s.addText("NUUICIOQQPA", { x: 4.08, y: 3.12, w: 2.1, h: 0.14, fontSize: 11, bold: true, color: "5EE28A", fontFace: "Menlo", margin: 0 });
  s.addText("Wrong-key test completed", { x: 6.62, y: 2.85, w: 1.25, h: 0.12, fontSize: 7.5, bold: true, color: "5EE28A", margin: 0 });
  s.addText("Algorithm Steps", { x: 4.0, y: 3.82, w: 1.8, h: 0.18, fontSize: 11, bold: true, color: C.white, margin: 0 });
  [
    ["Normalize", "MEETATNOON"],
    ["Keyed Alphabet", "SECRTABDFGHI..."],
    ["Substitution", "27115 75282 92928"],
    ["Transposition", "00151 88722 59012..."],
  ].forEach((step, i) => {
    const x = 4.0 + (i % 2) * 2.0;
    const y = 4.18 + Math.floor(i / 2) * 0.62;
    card(s, x, y, 1.72, 0.42, "162033", "334155");
    s.addText(step[0], { x: x + 0.12, y: y + 0.1, w: 1.0, h: 0.08, fontSize: 6.7, bold: true, color: "35D0DF", margin: 0 });
    s.addText(step[1], { x: x + 0.12, y: y + 0.26, w: 1.35, h: 0.08, fontSize: 6.1, color: C.white, fontFace: "Menlo", margin: 0, fit: "shrink" });
  });
  card(s, 9.15, 1.65, 3.0, 3.8, C.white, C.cyan);
  s.addText("Live flow", { x: 9.45, y: 2.0, w: 1.6, h: 0.22, fontSize: 15, bold: true, color: C.cyan, margin: 0 });
  bullets(s, [
    "Encrypt Message",
    "Point to Algorithm Steps",
    "Point to Keyed Checkerboard",
    "Decrypt Ciphertext",
    "Test Wrong Key",
  ], 9.48, 2.48, 2.05, 1.9, 12.8);
  s.addText("This looks more professional than a plain terminal and is easier for classmates to follow.", { x: 9.48, y: 4.78, w: 2.15, h: 0.38, fontSize: 10.8, bold: true, color: C.ink, margin: 0, fit: "shrink" });
  footer(s, 12);
}

function cracking() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Required analysis", "Cracking Possibilities", "How a classical cipher can become vulnerable.");
  card(s, 0.82, 1.78, 5.45, 3.9, C.paleRed, C.red);
  s.addText("Attack opportunities", { x: 1.15, y: 2.14, w: 2.8, h: 0.22, fontSize: 18, bold: true, color: C.red, margin: 0 });
  bullets(s, [
    "Weak or guessable keys",
    "Repeated key material",
    "Human mistakes while encrypting",
    "Repeated messages or predictable wording",
    "Enough ciphertext for pattern analysis",
  ], 1.18, 2.7, 4.4, 1.8, 13.5);
  card(s, 7.05, 1.78, 5.45, 3.9, C.paleGreen, C.green);
  s.addText("Defense lesson", { x: 7.4, y: 2.14, w: 2.5, h: 0.22, fontSize: 18, bold: true, color: C.green, margin: 0 });
  bullets(s, [
    "Use strong, unique keys",
    "Never reuse keys for many messages",
    "Avoid predictable message formats",
    "Use modern reviewed cryptography for real systems",
  ], 7.43, 2.7, 4.4, 1.8, 13.5);
  footer(s, 13);
}

function ethics() {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, "Security practice", "Ethics And Limits", "A professional demo also states what it should not be used for.");
  bullets(s, [
    "This is a classroom demonstration, not real-world secure encryption.",
    "Cryptography protects privacy, banking, messaging, and national security.",
    "Security tools and demos should be used only in legal, authorized settings.",
    "Modern security should use reviewed algorithms and libraries.",
  ], 1.05, 2.0, 6.2, 2.7, 18);
  card(s, 8.1, 1.88, 3.65, 3.3, C.white, C.green);
  s.addText("Presenter line", { x: 8.45, y: 2.25, w: 1.8, h: 0.2, fontSize: 12, bold: true, color: C.green, margin: 0 });
  s.addText("The purpose is to understand how keys protect information, not to claim this demo is modern secure encryption.", { x: 8.45, y: 2.8, w: 2.5, h: 0.9, fontSize: 16, bold: true, color: C.ink, margin: 0, fit: "shrink" });
  footer(s, 14);
}

function close() {
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 0.16, h: 7.5, fill: { color: C.cyan }, line: { color: C.cyan } });
  s.addText("Conclusion", { x: 0.8, y: 0.82, w: 4.4, h: 0.5, fontSize: 34, bold: true, color: C.white, margin: 0 });
  bullets(s, [
    "The VIC cipher shows strong pre-computer cryptography.",
    "My demo uses keyed substitution and transposition to model the idea.",
    "The correct key recovers the message; the wrong key does not.",
    "Cracking risk comes from weak keys, mistakes, and repeated patterns.",
  ], 1.08, 2.0, 7.3, 2.8, 19, C.darkText);
  card(s, 8.9, 2.05, 3.2, 2.3, "0B1220", "334155");
  s.addText("Final deliverables", { x: 9.22, y: 2.43, w: 2, h: 0.2, fontSize: 12, bold: true, color: "67E8F9", margin: 0 });
  s.addText("PPT/PDF\nPython source\nBrowser demo\nDemo commands", { x: 9.22, y: 2.85, w: 2.1, h: 0.9, fontSize: 15.5, bold: true, color: C.white, margin: 0, fit: "shrink" });
  s.addText("Thank you", { x: 0.82, y: 6.35, w: 2.5, h: 0.28, fontSize: 16, bold: true, color: "67E8F9", margin: 0 });
}

cover();
agenda();
w5h1();
history();
terms();
process(1, 6);
process(2, 7);
process(3, 8);
process(4, 9);
process(5, 10);
sourceCode();
visualDemo();
cracking();
ethics();
close();

pptx.writeFile({ fileName: path.resolve("VIC_Cipher_Team6_FINAL_ANIMATED_STYLE.pptx") });
