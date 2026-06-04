const pptxgen = require("pptxgenjs");
const path = require("path");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Team 6 Individual Submission";
pptx.subject = "VIC Cipher / Spy App";
pptx.title = "VIC Cipher: Cold War Spy Cryptography";
pptx.company = "Information Security";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};
pptx.defineLayout({ name: "LAYOUT_WIDE", width: 13.333, height: 7.5 });

const COLORS = {
  ink: "18212F",
  muted: "5C667A",
  blue: "2F6FEB",
  cyan: "13B5C8",
  amber: "F4B942",
  green: "32B768",
  red: "D94A4A",
  paleBlue: "EAF2FF",
  paleCyan: "E8FAFC",
  paleAmber: "FFF3D6",
  paleGreen: "EAF8EF",
  white: "FFFFFF",
  line: "D9E1EF",
};

const screenshot =
  "/var/folders/9k/3m2xb_ks5pj0v11brs_0ndfm0000gn/T/TemporaryItems/NSIRD_screencaptureui_0jrSmg/Screenshot 2026-05-17 at 11.28.52 PM.png";

function addFooter(slide, n) {
  slide.addText("Week 12 Cryptography | VIC Cipher / Spy App", {
    x: 0.55,
    y: 7.08,
    w: 6.2,
    h: 0.18,
    fontSize: 7.8,
    color: COLORS.muted,
    margin: 0,
  });
  slide.addText(String(n), {
    x: 12.25,
    y: 7.08,
    w: 0.45,
    h: 0.18,
    fontSize: 7.8,
    color: COLORS.muted,
    align: "right",
    margin: 0,
  });
}

function addTitle(slide, title, kicker) {
  if (kicker) {
    slide.addText(kicker.toUpperCase(), {
      x: 0.65,
      y: 0.42,
      w: 4.5,
      h: 0.22,
      fontSize: 8.5,
      bold: true,
      color: COLORS.blue,
      charSpace: 0.5,
      margin: 0,
    });
  }
  slide.addText(title, {
    x: 0.62,
    y: 0.74,
    w: 8.6,
    h: 0.58,
    fontSize: 26,
    bold: true,
    color: COLORS.ink,
    margin: 0,
    fit: "shrink",
  });
}

function bulletSlide(n, title, bullets, accent = COLORS.blue) {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.white };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 0.13,
    h: 7.5,
    fill: { color: accent },
    line: { color: accent },
  });
  addTitle(slide, title, "Core idea");
  slide.addText(
    bullets.map((b) => ({ text: b, options: { bullet: { indent: 14 }, hanging: 4 } })),
    {
      x: 0.82,
      y: 1.72,
      w: 7.2,
      h: 4.5,
      fontSize: 18,
      color: COLORS.ink,
      breakLine: false,
      paraSpaceAfterPt: 16,
      fit: "shrink",
    }
  );
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.55,
    y: 1.58,
    w: 3.95,
    h: 4.68,
    rectRadius: 0.08,
    fill: { color: COLORS.paleBlue },
    line: { color: COLORS.line, width: 1 },
  });
  slide.addText("Presenter reminder", {
    x: 8.9,
    y: 1.95,
    w: 3.2,
    h: 0.26,
    fontSize: 12,
    bold: true,
    color: accent,
    margin: 0,
  });
  slide.addText("Say the idea simply first, then show how the demo proves it.", {
    x: 8.9,
    y: 2.38,
    w: 3.2,
    h: 1.35,
    fontSize: 18,
    bold: true,
    color: COLORS.ink,
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide, n);
}

function titleSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.ink };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 5.78,
    w: 13.333,
    h: 1.72,
    fill: { color: COLORS.blue, transparency: 12 },
    line: { color: COLORS.blue, transparency: 100 },
  });
  slide.addText("WEEK 12 CRYPTOGRAPHY", {
    x: 0.75,
    y: 0.72,
    w: 4.4,
    h: 0.25,
    fontSize: 10,
    bold: true,
    color: COLORS.cyan,
    charSpace: 1,
    margin: 0,
  });
  slide.addText("VIC Cipher", {
    x: 0.72,
    y: 1.25,
    w: 7.5,
    h: 0.9,
    fontSize: 45,
    bold: true,
    color: COLORS.white,
    margin: 0,
  });
  slide.addText("Cold War spy cryptography and a Python spy-app demo", {
    x: 0.76,
    y: 2.25,
    w: 7.7,
    h: 0.42,
    fontSize: 19,
    color: "D7E2F2",
    margin: 0,
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.6,
    y: 1.0,
    w: 3.65,
    h: 4.25,
    rectRadius: 0.08,
    fill: { color: "0F1722" },
    line: { color: "2C3B52", width: 1.2 },
  });
  slide.addText("PLAINTEXT", { x: 9.02, y: 1.45, w: 2, h: 0.2, fontSize: 9, color: COLORS.cyan, bold: true, margin: 0 });
  slide.addText("MEET AT NOON", { x: 9.0, y: 1.76, w: 2.7, h: 0.26, fontSize: 17, color: COLORS.white, bold: true, margin: 0 });
  slide.addText("SECRET KEY", { x: 9.02, y: 2.35, w: 2, h: 0.2, fontSize: 9, color: COLORS.amber, bold: true, margin: 0 });
  slide.addText("secret-1970", { x: 9.0, y: 2.66, w: 2.7, h: 0.26, fontSize: 17, color: COLORS.white, bold: true, margin: 0 });
  slide.addText("CIPHERTEXT", { x: 9.02, y: 3.25, w: 2, h: 0.2, fontSize: 9, color: COLORS.green, bold: true, margin: 0 });
  slide.addText("04 09 03 22\n99 18 00 99\n25 22 17 22", {
    x: 9.0,
    y: 3.55,
    w: 2.75,
    h: 0.9,
    fontSize: 17,
    color: COLORS.white,
    bold: true,
    margin: 0,
    breakLine: false,
    fit: "shrink",
  });
  slide.addText("Individual Team 6 Work", {
    x: 0.75,
    y: 6.38,
    w: 3.4,
    h: 0.28,
    fontSize: 13,
    bold: true,
    color: COLORS.white,
    margin: 0,
  });
}

function workflowSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.white };
  addTitle(slide, "How The VIC Cipher Works At A High Level", "Process");
  const steps = [
    ["1", "Secret key material", "A phrase, date, or other shared secret starts the process.", COLORS.paleAmber, COLORS.amber],
    ["2", "Generate numbers", "The key creates number sequences used to transform the message.", COLORS.paleCyan, COLORS.cyan],
    ["3", "Convert message", "The readable message is converted into letters or number groups.", COLORS.paleBlue, COLORS.blue],
    ["4", "Mix and send", "Substitution and transposition make the final message hard to read.", COLORS.paleGreen, COLORS.green],
  ];
  steps.forEach((s, i) => {
    const x = 0.78 + i * 3.05;
    slide.addShape(pptx.ShapeType.roundRect, {
      x,
      y: 2.0,
      w: 2.45,
      h: 2.95,
      rectRadius: 0.08,
      fill: { color: s[3] },
      line: { color: s[4], width: 1.1 },
    });
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + 0.2,
      y: 2.25,
      w: 0.48,
      h: 0.48,
      fill: { color: s[4] },
      line: { color: s[4] },
    });
    slide.addText(s[0], { x: x + 0.33, y: 2.36, w: 0.22, h: 0.18, fontSize: 11, bold: true, color: COLORS.white, align: "center", margin: 0 });
    slide.addText(s[1], { x: x + 0.24, y: 3.02, w: 2, h: 0.35, fontSize: 17, bold: true, color: COLORS.ink, margin: 0, fit: "shrink" });
    slide.addText(s[2], { x: x + 0.24, y: 3.62, w: 1.95, h: 0.85, fontSize: 11.5, color: COLORS.muted, margin: 0, fit: "shrink" });
    if (i < steps.length - 1) {
      slide.addText("→", { x: x + 2.55, y: 3.25, w: 0.35, h: 0.35, fontSize: 24, bold: true, color: COLORS.muted, margin: 0 });
    }
  });
  slide.addText("My demo simplifies this into: message + key → encrypted number groups → same key recovers the message.", {
    x: 1.18,
    y: 5.65,
    w: 10.8,
    h: 0.32,
    fontSize: 16,
    bold: true,
    color: COLORS.ink,
    align: "center",
    margin: 0,
  });
  addFooter(slide, 5);
}

function demoSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: "F8FAFD" };
  addTitle(slide, "Python Demo: Correct Key vs Wrong Key", "Proof");
  slide.addImage({ path: screenshot, x: 0.65, y: 1.55, w: 7.6, h: 4.28 });
  const claims = [
    ["Encrypt", "The message becomes number groups.", COLORS.blue],
    ["Correct key", "Decrypts back to MEET AT NOON.", COLORS.green],
    ["Wrong key", "Produces unreadable text.", COLORS.red],
  ];
  claims.forEach((c, i) => {
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 8.72,
      y: 1.65 + i * 1.25,
      w: 3.55,
      h: 0.88,
      rectRadius: 0.08,
      fill: { color: COLORS.white },
      line: { color: c[2], width: 1.2 },
    });
    slide.addText(c[0], { x: 9.0, y: 1.82 + i * 1.25, w: 1.7, h: 0.18, fontSize: 12, bold: true, color: c[2], margin: 0 });
    slide.addText(c[1], { x: 9.0, y: 2.08 + i * 1.25, w: 2.8, h: 0.22, fontSize: 10.5, color: COLORS.ink, margin: 0, fit: "shrink" });
  });
  slide.addText("This proves the central cryptography idea: the secret key controls whether the ciphertext can be read.", {
    x: 8.78,
    y: 5.68,
    w: 3.42,
    h: 0.55,
    fontSize: 15,
    bold: true,
    color: COLORS.ink,
    margin: 0,
    fit: "shrink",
  });
  addFooter(slide, 6);
}

function closingSlide() {
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.ink };
  slide.addText("Conclusion", {
    x: 0.76,
    y: 0.78,
    w: 5,
    h: 0.6,
    fontSize: 34,
    bold: true,
    color: COLORS.white,
    margin: 0,
  });
  slide.addText(
    [
      "The VIC cipher shows that strong cryptography existed before modern computers.",
      "A secret key is the heart of encryption and decryption.",
      "My Python app demonstrates the core idea safely for education.",
    ].map((text) => ({ text, options: { bullet: { indent: 16 }, hanging: 4 } })),
    {
      x: 0.95,
      y: 2.0,
      w: 7.45,
      h: 2.6,
      fontSize: 21,
      color: "EAF2FF",
      paraSpaceAfterPt: 17,
      fit: "shrink",
    }
  );
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 8.95,
    y: 1.85,
    w: 3.35,
    h: 2.35,
    rectRadius: 0.08,
    fill: { color: "0F1722" },
    line: { color: "33445E", width: 1.1 },
  });
  slide.addText("Ethics", { x: 9.28, y: 2.18, w: 1.4, h: 0.24, fontSize: 15, bold: true, color: COLORS.amber, margin: 0 });
  slide.addText("Cryptography protects privacy and security. Demonstrations should stay educational and authorized.", {
    x: 9.28,
    y: 2.66,
    w: 2.45,
    h: 0.82,
    fontSize: 16,
    color: COLORS.white,
    margin: 0,
    fit: "shrink",
  });
  slide.addText("Thank you", { x: 0.78, y: 6.38, w: 2.2, h: 0.3, fontSize: 15, bold: true, color: COLORS.cyan, margin: 0 });
}

titleSlide();
bulletSlide(2, "What Is The VIC Cipher?", [
  "A hand cipher associated with Cold War espionage.",
  "Connected to Soviet spy Reino Hayhanen.",
  "Used numbers, secret key material, substitution, and transposition.",
  "Important because it was unusually strong for a paper-and-pencil cipher.",
], COLORS.blue);
bulletSlide(3, "Why Spies Used Ciphers", [
  "Messages could be protected without computers.",
  "Intercepted messages looked like random number groups.",
  "The receiver needed the same secret key to decrypt.",
  "The purpose was to hide both the words and the patterns.",
], COLORS.cyan);
bulletSlide(4, "Cryptography Terms I Use", [
  "Plaintext: the original readable message.",
  "Ciphertext: the encrypted message.",
  "Key: secret information used to encrypt and decrypt.",
  "Substitution and transposition: changing values and order to hide meaning.",
], COLORS.amber);
workflowSlide();
demoSlide();
bulletSlide(7, "What My Spy App Shows", [
  "The user enters a message and a secret key.",
  "The app converts the message into encrypted number groups.",
  "The same key recovers the original message.",
  "A wrong key gives wrong text, proving why the secret matters.",
], COLORS.green);
closingSlide();

pptx.writeFile({ fileName: path.resolve("VIC_Cipher_Spy_App_Team6.pptx") });
