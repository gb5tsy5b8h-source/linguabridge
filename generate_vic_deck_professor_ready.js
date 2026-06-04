const pptxgen = require("pptxgenjs");
const path = require("path");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Team 6 Individual Submission";
pptx.subject = "VIC Cipher / Spy App";
pptx.title = "VIC Cipher: Professor-Ready Week 12 Deck";
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
  slide.addText("Week 12 Cryptography | VIC Cipher / Spy App", {
    x: 0.55,
    y: 7.1,
    w: 5.3,
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
    w: 6,
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
    w: 10.2,
    h: 0.52,
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
      w: 9.2,
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

function bullets(slide, items, x, y, w, h, size = 15) {
  slide.addText(
    items.map((text) => ({ text, options: { bullet: { indent: 14 }, hanging: 4 } })),
    {
      x,
      y,
      w,
      h,
      fontSize: size,
      color: C.ink,
      paraSpaceAfterPt: 10,
      fit: "shrink",
      breakLine: false,
    }
  );
}

function titleSlide() {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 5.65,
    w: 13.333,
    h: 1.85,
    fill: { color: "1E40AF", transparency: 10 },
    line: { color: "1E40AF", transparency: 100 },
  });
  s.addText("WEEK 12 CRYPTOGRAPHY", { x: 0.75, y: 0.72, w: 4, h: 0.22, fontSize: 10, bold: true, color: "67E8F9", charSpace: 1, margin: 0 });
  s.addText("VIC Cipher / Spy App", { x: 0.72, y: 1.22, w: 7.6, h: 0.62, fontSize: 39, bold: true, color: C.white, margin: 0, fit: "shrink" });
  s.addText("Professor-ready: W5H1 + Python source-code demo + cracking possibilities", { x: 0.77, y: 2.08, w: 7.4, h: 0.42, fontSize: 18, color: "D9E6FF", margin: 0 });
  card(s, 8.25, 1.0, 3.75, 3.75, "0B1220", "334155");
  s.addText("Assigned Topic", { x: 8.65, y: 1.38, w: 2.2, h: 0.2, fontSize: 10, bold: true, color: "67E8F9", margin: 0 });
  s.addText("Team 6\nVIC Cipher\n(spy app)", { x: 8.65, y: 1.9, w: 2.7, h: 1.25, fontSize: 25, bold: true, color: C.white, margin: 0, fit: "shrink" });
  s.addText("Name / Student ID: ____________________", { x: 0.77, y: 6.36, w: 4.4, h: 0.25, fontSize: 13, bold: true, color: C.white, margin: 0 });
}

function simpleSlide(n, kicker, heading, sub, body, accent = C.blue) {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, kicker, heading, sub);
  card(s, 0.8, 1.85, 7.0, 3.9, C.white, C.line);
  bullets(s, body, 1.15, 2.28, 6.1, 2.85, 16);
  card(s, 8.55, 1.85, 3.65, 3.9, C.white, accent);
  s.addText("Presentation point", { x: 8.95, y: 2.25, w: 2.5, h: 0.22, fontSize: 12, bold: true, color: accent, margin: 0 });
  s.addText("Say the main idea first, then connect it to the demo.", { x: 8.95, y: 2.78, w: 2.7, h: 0.8, fontSize: 18, bold: true, color: C.ink, margin: 0, fit: "shrink" });
  footer(s, n);
}

function w5h1Slide() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Required by professor", "W5H1: VIC Cipher", "Who, What, When, Where, Why, and How.");
  const items = [
    ["Who", "Soviet intelligence users; connected to Reino Hayhanen.", C.blue],
    ["What", "A hand cipher that encrypts messages into number groups.", C.teal],
    ["When", "Cold War period; publicly known after espionage investigations.", C.amber],
    ["Where", "Covert communication contexts where messages could be intercepted.", C.violet],
    ["Why", "To protect secret messages without needing a computer.", C.green],
    ["How", "Keyed alphabet, numeric substitution, transposition, and secret key material.", C.red],
  ];
  items.forEach((it, i) => {
    const x = 0.75 + (i % 2) * 6.05;
    const y = 1.7 + Math.floor(i / 2) * 1.35;
    card(s, x, y, 5.35, 0.9, C.cloud, C.line);
    s.addText(it[0], { x: x + 0.25, y: y + 0.23, w: 0.9, h: 0.22, fontSize: 15, bold: true, color: it[2], margin: 0 });
    s.addText(it[1], { x: x + 1.15, y: y + 0.2, w: 3.8, h: 0.3, fontSize: 11.5, color: C.ink, margin: 0, fit: "shrink" });
  });
  footer(s, 3);
}

function processSlide() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Algorithm explanation", "How The VIC-Inspired Demo Works", "The demo uses two serious classical cipher ideas.");
  const steps = [
    ["1", "Normalize", "MEET AT NOON → MEETATNOON", C.blue],
    ["2", "Keyed alphabet", "Alphabet order depends on SECRET 1970", C.teal],
    ["3", "Checkerboard", "Letters become variable-length digits", C.amber],
    ["4", "Transposition", "Digits are rearranged by key order", C.violet],
    ["5", "Ciphertext", "00151 88722 59012 02597 20", C.green],
  ];
  steps.forEach((st, i) => {
    const x = 0.55 + i * 2.52;
    card(s, x, 2.0, 2.05, 2.15, C.cloud, st[3]);
    s.addText(st[0], { x: x + 0.18, y: 2.25, w: 0.3, h: 0.18, fontSize: 11, bold: true, color: st[3], margin: 0 });
    s.addText(st[1], { x: x + 0.3, y: 2.72, w: 1.45, h: 0.25, fontSize: 14, bold: true, color: C.ink, align: "center", margin: 0, fit: "shrink" });
    s.addText(st[2], { x: x + 0.28, y: 3.18, w: 1.48, h: 0.45, fontSize: 9.2, color: C.muted, align: "center", margin: 0, fit: "shrink" });
  });
  footer(s, 6);
}

function sourceCodeSlide() {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, "Required by professor", "Python Source Code Demo", "File to submit/show: vic_cipher_professional_demo.py");
  card(s, 0.85, 1.72, 5.4, 3.95, "0F172A", "1E293B");
  s.addText("python3 vic_cipher_professional_demo.py encrypt \\\n  --key \"SECRET 1970\" \\\n  --text \"MEET AT NOON\" \\\n  --show-steps", {
    x: 1.18,
    y: 2.15,
    w: 4.55,
    h: 1.2,
    fontFace: "Menlo",
    fontSize: 13,
    color: C.white,
    margin: 0,
    fit: "shrink",
  });
  s.addText("The source code demonstrates substitution, transposition, encryption, correct-key decryption, and wrong-key behavior.", {
    x: 1.18,
    y: 4.15,
    w: 4.4,
    h: 0.6,
    fontSize: 14,
    bold: true,
    color: "D9E6FF",
    margin: 0,
    fit: "shrink",
  });
  bullets(s, [
    "Keyed straddling checkerboard substitution",
    "Keyed columnar transposition",
    "Correct key recovers MEETATNOON",
    "Wrong key produces incorrect text or decryption failure",
  ], 7.05, 2.0, 4.8, 2.7, 16);
  footer(s, 8);
}

function demoProofSlide() {
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Demo proof", "Correct Key vs Wrong Key", "Replace this screenshot with the new professional-demo screenshot after you run it.");
  s.addImage({ path: screenshot, x: 0.55, y: 1.55, w: 7.65, h: 4.3 });
  bullets(s, [
    "Correct key should recover the original message.",
    "Wrong key should not recover the original message.",
    "This proves why secret key control matters.",
  ], 8.75, 2.0, 3.2, 2.2, 15);
  footer(s, 9);
}

function crackingSlide() {
  const s = pptx.addSlide();
  s.background = { color: C.cloud };
  title(s, "Required by professor", "Cracking Possibilities", "How an attacker might try to break a classical cipher.");
  card(s, 0.85, 1.8, 5.4, 3.75, C.white, C.red);
  s.addText("Possible weaknesses", { x: 1.2, y: 2.15, w: 2.6, h: 0.24, fontSize: 18, bold: true, color: C.red, margin: 0 });
  bullets(s, [
    "Weak or guessed keys",
    "Human mistakes in encryption steps",
    "Reused keys or repeated messages",
    "Enough ciphertext for pattern analysis",
  ], 1.25, 2.75, 4.25, 1.7, 14);
  card(s, 7.05, 1.8, 5.4, 3.75, C.white, C.green);
  s.addText("Defense lesson", { x: 7.4, y: 2.15, w: 2.4, h: 0.24, fontSize: 18, bold: true, color: C.green, margin: 0 });
  bullets(s, [
    "Use strong, unique key material",
    "Avoid repeating keys",
    "Reduce predictable message patterns",
    "Use modern cryptography for real security",
  ], 7.45, 2.75, 4.25, 1.7, 14);
  footer(s, 10);
}

function finalSlide() {
  const s = pptx.addSlide();
  s.background = { color: C.navy };
  s.addText("Conclusion", { x: 0.75, y: 0.85, w: 4.3, h: 0.48, fontSize: 34, bold: true, color: C.white, margin: 0 });
  bullets(s, [
    "The VIC cipher shows strong pre-computer cryptography.",
    "The demo explains key-based substitution and transposition.",
    "Cracking becomes easier with weak keys, mistakes, or repeated patterns.",
    "For real security, modern reviewed algorithms are required.",
  ], 1.05, 2.0, 7.4, 3.0, 19);
  card(s, 8.95, 2.1, 3.1, 2.2, "0B1220", "334155");
  s.addText("Deliverables", { x: 9.3, y: 2.45, w: 1.8, h: 0.22, fontSize: 13, bold: true, color: "67E8F9", margin: 0 });
  s.addText("PPT/PDF\nPython source code\nLive demo commands", { x: 9.3, y: 2.9, w: 2.1, h: 0.75, fontSize: 15, bold: true, color: C.white, margin: 0, fit: "shrink" });
  s.addText("Thank you", { x: 0.78, y: 6.38, w: 2.5, h: 0.3, fontSize: 16, bold: true, color: "67E8F9", margin: 0 });
}

titleSlide();
simpleSlide(2, "Topic match", "Professor Requirement Match", "Week 12 asks for cryptography, Python demo, cracking possibilities, and presentation.", [
  "Assigned Team 6 topic: VIC Cipher / spy app.",
  "Presentation format: PPT/PDF.",
  "Demo format: Python source-code demo.",
  "Required analysis: W5H1 and cracking possibilities.",
], C.blue);
w5h1Slide();
simpleSlide(4, "Historical context", "What Is The VIC Cipher?", "A Cold War hand cipher used for covert communication.", [
  "Uses secret key material to protect messages.",
  "Turns readable text into number groups.",
  "Combines substitution and transposition ideas.",
  "Important as a strong paper-and-pencil cipher.",
], C.teal);
simpleSlide(5, "Vocabulary", "Core Cryptography Terms", "Terms needed to explain the demo.", [
  "Plaintext: original readable message.",
  "Ciphertext: encrypted protected message.",
  "Key: secret information used to encrypt and decrypt.",
  "Substitution and transposition: changing values and order.",
], C.amber);
processSlide();
simpleSlide(7, "Demo design", "Why My Demo Is VIC-Inspired", "It is not the full historical VIC cipher, but it models serious classical techniques.", [
  "It uses a keyed alphabet from the secret key.",
  "It uses straddling checkerboard substitution.",
  "It uses columnar transposition to rearrange digits.",
  "It demonstrates correct-key and wrong-key behavior.",
], C.violet);
sourceCodeSlide();
demoProofSlide();
crackingSlide();
simpleSlide(11, "Ethics", "Security And Ethics", "Cryptography protects privacy, but demos must stay educational.", [
  "Use demos only for legal and authorized learning.",
  "Do not claim a classroom cipher is real-world secure.",
  "Modern security requires reviewed algorithms like AES, RSA, and ECC.",
  "The lesson is understanding how keys protect messages.",
], C.green);
finalSlide();

pptx.writeFile({ fileName: path.resolve("VIC_Cipher_Team6_PROFESSOR_READY.pptx") });
