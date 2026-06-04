const pptxgen = require("pptxgenjs");
const path = require("path");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Team 6 Individual Submission";
pptx.subject = "VIC Cipher / Spy App";
pptx.title = "VIC Cipher: Cold War Spy Cryptography";
pptx.company = "Information Security";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "en-US",
};

const screenshot =
  "/var/folders/9k/3m2xb_ks5pj0v11brs_0ndfm0000gn/T/TemporaryItems/NSIRD_screencaptureui_0jrSmg/Screenshot 2026-05-17 at 11.28.52 PM.png";

const C = {
  navy: "111827",
  ink: "172033",
  muted: "667085",
  blue: "2563EB",
  teal: "0EA5A7",
  amber: "F59E0B",
  green: "16A34A",
  red: "DC2626",
  violet: "6D28D9",
  white: "FFFFFF",
  cloud: "F5F7FB",
  line: "D6DDEC",
  paleBlue: "EAF1FF",
  paleTeal: "E7FAFA",
  paleAmber: "FFF5DA",
  paleGreen: "EAF8EF",
  paleRed: "FDECEC",
};

function footer(slide, n) {
  slide.addText("VIC Cipher / Spy App | Week 12 Cryptography", {
    x: 0.55,
    y: 7.1,
    w: 5.5,
    h: 0.16,
    fontSize: 7.5,
    color: C.muted,
    margin: 0,
  });
  slide.addText(String(n).padStart(2, "0"), {
    x: 12.1,
    y: 7.1,
    w: 0.6,
    h: 0.16,
    fontSize: 7.5,
    color: C.muted,
    align: "right",
    margin: 0,
  });
}

function title(slide, kicker, text, sub) {
  slide.addText(kicker.toUpperCase(), {
    x: 0.62,
    y: 0.42,
    w: 5.5,
    h: 0.2,
    fontSize: 8.5,
    bold: true,
    charSpace: 0.8,
    color: C.blue,
    margin: 0,
  });
  slide.addText(text, {
    x: 0.6,
    y: 0.72,
    w: 9.4,
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
      w: 8.8,
      h: 0.26,
      fontSize: 11.5,
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
    rectRadius: 0.06,
    fill: { color: fill },
    line: { color: line, width: 1 },
  });
}

function addBullets(slide, bullets, x, y, w, h, fontSize = 15) {
  slide.addText(
    bullets.map((b) => ({
      text: b,
      options: { bullet: { indent: 14 }, hanging: 4 },
    })),
    {
      x,
      y,
      w,
      h,
      fontSize,
      color: C.ink,
      paraSpaceAfterPt: 12,
      fit: "shrink",
      breakLine: false,
    }
  );
}

function slide1() {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.333,
    h: 7.5,
    fill: { color: C.navy },
    line: { color: C.navy },
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 5.65,
    w: 13.333,
    h: 1.85,
    fill: { color: "1E40AF", transparency: 10 },
    line: { color: "1E40AF", transparency: 100 },
  });
  s.addText("WEEK 12 CRYPTOGRAPHY", {
    x: 0.75,
    y: 0.72,
    w: 4,
    h: 0.22,
    fontSize: 10,
    bold: true,
    color: "67E8F9",
    charSpace: 1,
    margin: 0,
  });
  s.addText("VIC Cipher", {
    x: 0.72,
    y: 1.22,
    w: 5.8,
    h: 0.62,
    fontSize: 43,
    bold: true,
    color: C.white,
    margin: 0,
  });
  s.addText("Cold War spy cryptography\nwith a Python spy-app demo", {
    x: 0.77,
    y: 2.05,
    w: 5.8,
    h: 0.8,
    fontSize: 20,
    color: "D9E6FF",
    breakLine: false,
    margin: 0,
  });
  card(s, 7.35, 0.95, 4.85, 4.35, "0B1220", "334155");
  [
    ["PLAINTEXT", "MEET AT NOON", C.teal],
    ["SECRET KEY", "secret-1970", C.amber],
    ["CIPHERTEXT", "04 09 03 22 99 18\n00 99 25 22 17 22", C.green],
  ].forEach((row, i) => {
    const y = 1.36 + i * 1.22;
    s.addText(row[0], { x: 7.8, y, w: 1.8, h: 0.18, fontSize: 8.5, bold: true, color: row[2], margin: 0 });
    s.addText(row[1], { x: 7.78, y: y + 0.31, w: 3.5, h: 0.48, fontSize: 17, bold: true, color: C.white, margin: 0, fit: "shrink" });
  });
  s.addText("Name / Student ID: ____________________", {
    x: 0.77,
    y: 6.36,
    w: 4.4,
    h: 0.25,
    fontSize: 13,
    bold: true,
    color: C.white,
    margin: 0,
  });
}

function slide2() {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, "Historical context", "What Is The VIC Cipher?", "A strong paper-and-pencil cipher used in Cold War espionage.");
  card(s, 0.75, 1.85, 3.65, 3.7, C.white);
  card(s, 4.85, 1.85, 3.65, 3.7, C.white);
  card(s, 8.95, 1.85, 3.65, 3.7, C.white);
  [
    ["Cold War", "Secret communication mattered because messages could be intercepted.", C.paleBlue, C.blue],
    ["Hand Cipher", "It could be done without a computer, using numbers and written steps.", C.paleAmber, C.amber],
    ["Advanced", "It combined multiple transformations, making analysis much harder.", C.paleTeal, C.teal],
  ].forEach((a, i) => {
    const x = 0.75 + i * 4.1;
    s.addShape(pptx.ShapeType.ellipse, { x: x + 0.33, y: 2.25, w: 0.72, h: 0.72, fill: { color: a[2] }, line: { color: a[3] } });
    s.addText(String(i + 1), { x: x + 0.56, y: 2.45, w: 0.24, h: 0.16, fontSize: 10, bold: true, color: a[3], align: "center", margin: 0 });
    s.addText(a[0], { x: x + 0.35, y: 3.2, w: 2.8, h: 0.3, fontSize: 20, bold: true, color: C.ink, margin: 0 });
    s.addText(a[1], { x: x + 0.35, y: 3.75, w: 2.85, h: 0.75, fontSize: 13, color: C.muted, margin: 0, fit: "shrink" });
  });
  footer(s, 2);
}

function slide3() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Why it matters", "Why Spies Used Ciphers", "The ciphertext should be useless to someone who does not have the key.");
  addBullets(s, [
    "Protect secret messages during transmission.",
    "Make intercepted communication look like random number groups.",
    "Allow the receiver to recover the original message with shared secret information.",
    "Hide patterns so the message is harder to analyze.",
  ], 0.9, 1.9, 5.3, 3.5, 17);
  card(s, 7.0, 1.72, 4.8, 3.9, "0F172A", "1E293B");
  s.addText("Intercepted message", { x: 7.45, y: 2.1, w: 2.7, h: 0.22, fontSize: 10, bold: true, color: "93C5FD", margin: 0 });
  s.addText("04 09 03 22\n99 18 00 99\n25 22 17 22", { x: 7.42, y: 2.6, w: 3.2, h: 1.0, fontSize: 24, bold: true, color: C.white, margin: 0, fit: "shrink" });
  s.addText("Without the key, these numbers should not reveal the message.", { x: 7.45, y: 4.28, w: 3.6, h: 0.45, fontSize: 14, color: "D8E3F8", margin: 0, fit: "shrink" });
  footer(s, 3);
}

function slide4() {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, "Vocabulary", "Cryptography Terms", "These are the words I use during the demo.");
  const terms = [
    ["Plaintext", "Readable original message", C.paleBlue, C.blue],
    ["Ciphertext", "Encrypted protected message", C.paleGreen, C.green],
    ["Key", "Secret needed to decrypt", C.paleAmber, C.amber],
    ["Decryption", "Turning ciphertext back into plaintext", C.paleTeal, C.teal],
  ];
  terms.forEach((t, i) => {
    const x = 0.85 + (i % 2) * 5.85;
    const y = 1.85 + Math.floor(i / 2) * 1.75;
    card(s, x, y, 5.0, 1.18, C.white, C.line);
    s.addShape(pptx.ShapeType.rect, { x, y, w: 0.12, h: 1.18, fill: { color: t[3] }, line: { color: t[3] } });
    s.addText(t[0], { x: x + 0.38, y: y + 0.25, w: 2.1, h: 0.28, fontSize: 18, bold: true, color: C.ink, margin: 0 });
    s.addText(t[1], { x: x + 0.38, y: y + 0.65, w: 3.8, h: 0.2, fontSize: 12.5, color: C.muted, margin: 0 });
  });
  footer(s, 4);
}

function slide5() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Process", "VIC Cipher At A High Level", "The historical cipher is complex; this is the understandable class version.");
  const steps = [
    ["Secret key material", C.amber],
    ["Generate number sequences", C.teal],
    ["Convert message into numbers", C.blue],
    ["Substitute + transpose", C.violet],
    ["Send encrypted groups", C.green],
  ];
  steps.forEach((st, i) => {
    const x = 0.65 + i * 2.48;
    s.addShape(pptx.ShapeType.roundRect, { x, y: 2.2, w: 2.0, h: 1.2, rectRadius: 0.06, fill: { color: C.cloud }, line: { color: st[1], width: 1.2 } });
    s.addText(String(i + 1), { x: x + 0.15, y: 2.35, w: 0.26, h: 0.16, fontSize: 10, bold: true, color: st[1], margin: 0 });
    s.addText(st[0], { x: x + 0.35, y: 2.57, w: 1.25, h: 0.35, fontSize: 12.2, bold: true, color: C.ink, align: "center", margin: 0, fit: "shrink" });
    if (i < steps.length - 1) s.addText("→", { x: x + 2.08, y: 2.58, w: 0.35, h: 0.22, fontSize: 20, bold: true, color: C.muted, margin: 0 });
  });
  card(s, 1.45, 4.55, 10.2, 0.8, C.paleBlue, C.blue);
  s.addText("Simple explanation: the key controls how the message is changed, and the same key is required to reverse it.", { x: 1.85, y: 4.84, w: 9.3, h: 0.22, fontSize: 14.5, bold: true, color: C.ink, align: "center", margin: 0 });
  footer(s, 5);
}

function slide6() {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, "My build", "Python Spy App Demo", "A simplified VIC-inspired demo, made for education.");
  card(s, 0.85, 1.75, 5.2, 3.9, "0F172A", "1E293B");
  s.addText("Message + Secret Key", { x: 1.2, y: 2.08, w: 2.5, h: 0.24, fontSize: 15, bold: true, color: "93C5FD", margin: 0 });
  s.addText("encrypt(message, key)\n\nMEET AT NOON\nsecret-1970\n\n→ 04 09 03 22 99 18 00 99 25 22 17 22", {
    x: 1.2,
    y: 2.55,
    w: 4.35,
    h: 2.25,
    fontFace: "Menlo",
    fontSize: 15,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  addBullets(s, [
    "Cleans the message into uppercase letters.",
    "Creates repeatable key-based number shifts.",
    "Outputs two-digit encrypted number groups.",
    "Uses the same key to decrypt the message.",
  ], 7.05, 2.0, 4.7, 3.2, 16);
  footer(s, 6);
}

function slide7() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Live proof", "Correct Key vs Wrong Key", "Your terminal output shows that the demo actually works.");
  s.addImage({ path: screenshot, x: 0.55, y: 1.55, w: 7.65, h: 4.3 });
  [
    ["Encrypt", "Message becomes number groups.", C.blue],
    ["Correct key", "Returns MEET AT NOON.", C.green],
    ["Wrong key", "Returns unreadable text.", C.red],
  ].forEach((c, i) => {
    card(s, 8.65, 1.75 + i * 1.22, 3.6, 0.82, C.cloud, c[2]);
    s.addText(c[0], { x: 8.95, y: 1.92 + i * 1.22, w: 1.5, h: 0.18, fontSize: 12, bold: true, color: c[2], margin: 0 });
    s.addText(c[1], { x: 8.95, y: 2.17 + i * 1.22, w: 2.8, h: 0.18, fontSize: 10.5, color: C.ink, margin: 0, fit: "shrink" });
  });
  footer(s, 7);
}

function slide8() {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, "Security analysis", "What The Demo Proves", "The most important lesson is key dependency.");
  const items = [
    ["Confidentiality", "The output hides the original words.", C.blue],
    ["Key dependency", "Correct key works; wrong key fails.", C.green],
    ["Pattern hiding", "The message becomes number groups.", C.violet],
    ["Education only", "Not for real-world secure messaging.", C.red],
  ];
  items.forEach((it, i) => {
    const x = 0.85 + (i % 2) * 5.85;
    const y = 1.8 + Math.floor(i / 2) * 1.7;
    card(s, x, y, 5.0, 1.12, C.white, C.line);
    s.addText(it[0], { x: x + 0.35, y: y + 0.25, w: 2.6, h: 0.24, fontSize: 17, bold: true, color: it[2], margin: 0 });
    s.addText(it[1], { x: x + 0.35, y: y + 0.65, w: 3.9, h: 0.18, fontSize: 11.5, color: C.muted, margin: 0 });
  });
  footer(s, 8);
}

function slide9() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Ethics and limits", "What This Is Not", "A good security presentation also explains boundaries.");
  card(s, 0.9, 1.85, 5.4, 3.55, C.paleRed, C.red);
  s.addText("Limitations", { x: 1.25, y: 2.25, w: 2.2, h: 0.3, fontSize: 21, bold: true, color: C.red, margin: 0 });
  addBullets(s, [
    "Not the full historical VIC cipher.",
    "Not secure enough for real private messages.",
    "Modern systems use reviewed algorithms like AES, RSA, and ECC.",
  ], 1.28, 2.9, 4.2, 1.7, 14);
  card(s, 7.05, 1.85, 5.4, 3.55, C.paleGreen, C.green);
  s.addText("Ethics", { x: 7.4, y: 2.25, w: 2.0, h: 0.3, fontSize: 21, bold: true, color: C.green, margin: 0 });
  addBullets(s, [
    "Use cryptography to protect privacy and security.",
    "Keep demos educational and authorized.",
    "Explain risks honestly instead of overstating claims.",
  ], 7.43, 2.9, 4.1, 1.7, 14);
  footer(s, 9);
}

function slide10() {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addText("Conclusion", { x: 0.75, y: 0.85, w: 4.3, h: 0.48, fontSize: 34, bold: true, color: C.white, margin: 0 });
  s.addText("The VIC cipher shows that cryptography was powerful before modern computers.", { x: 0.8, y: 1.75, w: 8.2, h: 0.42, fontSize: 23, bold: true, color: "E5EDFF", margin: 0, fit: "shrink" });
  addBullets(s, [
    "Historical ciphers used secret keys and layered transformations.",
    "My Python app demonstrates the core idea safely.",
    "The correct key recovers the message; the wrong key does not.",
  ], 1.05, 2.75, 6.4, 2.2, 19);
  card(s, 8.5, 2.25, 3.6, 2.25, "0B1220", "334155");
  s.addText("Final line to say", { x: 8.88, y: 2.63, w: 2.1, h: 0.22, fontSize: 11, bold: true, color: "67E8F9", margin: 0 });
  s.addText("Without the correct key, ciphertext should not reveal the original message.", { x: 8.88, y: 3.1, w: 2.55, h: 0.7, fontSize: 16, bold: true, color: C.white, margin: 0, fit: "shrink" });
  s.addText("Thank you", { x: 0.78, y: 6.38, w: 2.5, h: 0.3, fontSize: 16, bold: true, color: "67E8F9", margin: 0 });
}

slide1();
slide2();
slide3();
slide4();
slide5();
slide6();
slide7();
slide8();
slide9();
slide10();

pptx.writeFile({ fileName: path.resolve("VIC_Cipher_Spy_App_Team6_POLISHED.pptx") });
