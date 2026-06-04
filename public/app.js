const state = {
  users: [],
  languages: [],
  messages: [],
  selectedReceiverId: "jisu",
  latestTranslation: "",
  latestTranslationLanguage: "ko",
  summary: null,
  recognition: null,
  isListening: false
};

const elements = {
  tabButtons: document.querySelectorAll("[data-tab]"),
  views: document.querySelectorAll(".view"),
  startDemoButton: document.querySelector("#startDemoButton"),
  senderSelect: document.querySelector("#senderSelect"),
  sourceLanguageSelect: document.querySelector("#sourceLanguageSelect"),
  receiverSelect: document.querySelector("#receiverSelect"),
  conversationReceiverSelect: document.querySelector("#conversationReceiverSelect"),
  receiverBadge: document.querySelector("#receiverBadge"),
  messageInput: document.querySelector("#messageInput"),
  micButton: document.querySelector("#micButton"),
  translateButton: document.querySelector("#translateButton"),
  clearButton: document.querySelector("#clearButton"),
  typingIndicator: document.querySelector("#typingIndicator"),
  successToast: document.querySelector("#successToast"),
  translationOutputCard: document.querySelector("#translationOutputCard"),
  translationOutput: document.querySelector("#translationOutput"),
  listenOutputButton: document.querySelector("#listenOutputButton"),
  messagesList: document.querySelector("#messagesList"),
  summaryButton: document.querySelector("#summaryButton"),
  summaryContent: document.querySelector("#summaryContent"),
  downloadSummaryButton: document.querySelector("#downloadSummaryButton"),
  exportSummaryButton: document.querySelector("#exportSummaryButton"),
  cloudSaveButton: document.querySelector("#cloudSaveButton"),
  saveStatus: document.querySelector("#saveStatus")
};

const speechLanguageMap = {
  en: "en-US",
  ko: "ko-KR",
  bn: "bn-BD",
  ar: "ar-SA",
  hi: "hi-IN",
  ja: "ja-JP",
  zh: "zh-CN",
  es: "es-ES",
  fr: "fr-FR"
};

async function bootstrap() {
  const data = await fetchJson("/api/bootstrap");
  state.users = data.users;
  state.languages = data.languages;
  state.messages = data.messages;
  state.summary = data.summary;
  renderSelectors();
  renderReceiverBadge();
  renderMessages();
  setupSpeechRecognition();
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed." }));
    throw new Error(error.error || "Request failed.");
  }
  return response.json();
}

function showView(viewId) {
  elements.views.forEach((view) => view.classList.toggle("active", view.id === viewId));
  elements.tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === viewId));
}

function renderSelectors() {
  elements.senderSelect.innerHTML = state.users.map((user) => (
    `<option value="${user.id}">${user.name}</option>`
  )).join("");

  const receiverOptions = state.users.map((user) => (
    `<option value="${user.id}" ${user.id === state.selectedReceiverId ? "selected" : ""}>${user.name}</option>`
  )).join("");
  elements.receiverSelect.innerHTML = receiverOptions;
  elements.conversationReceiverSelect.innerHTML = receiverOptions;

  renderSourceLanguages();
}

function renderSourceLanguages() {
  const sender = getSender();
  elements.sourceLanguageSelect.innerHTML = state.languages.map((language) => (
    `<option value="${language.code}" ${language.code === sender.language ? "selected" : ""}>${language.flag} ${language.name}</option>`
  )).join("");
}

function renderReceiverBadge() {
  const receiver = getReceiver();
  const language = getLanguage(receiver.language);
  elements.receiverBadge.textContent = `${receiver.name} sees ${language.name}`;
}

function renderMessages() {
  const receiver = getReceiver();
  const receiverLanguage = getLanguage(receiver.language);
  const recentMessages = state.messages.slice(-8);

  elements.messagesList.innerHTML = recentMessages.map((message) => {
    const senderLanguage = getLanguage(message.senderLanguage);
    const translatedText = message.translatedVersions[receiver.language] || message.originalText;
    return `
      <article class="chat-message">
        <div class="chat-avatar">${message.senderName.slice(0, 1)}</div>
        <div class="chat-bubble">
          <div class="message-head">
            <strong>${message.senderName}</strong>
            <span>${senderLanguage.name} to ${receiverLanguage.name}</span>
          </div>
          <p class="original" dir="${senderLanguage.direction}">${escapeHtml(message.originalText)}</p>
          <p class="translated" dir="${receiverLanguage.direction}">${escapeHtml(translatedText)}</p>
          <button class="listen-message" type="button" data-speak="${escapeAttribute(translatedText)}" data-lang="${receiver.language}">Listen</button>
        </div>
      </article>
    `;
  }).join("");

  elements.messagesList.scrollTop = elements.messagesList.scrollHeight;
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    elements.micButton.disabled = true;
    elements.micButton.title = "Speech recognition is not supported in this browser.";
    return;
  }

  state.recognition = new SpeechRecognition();
  state.recognition.continuous = false;
  state.recognition.interimResults = true;

  state.recognition.onstart = () => {
    state.isListening = true;
    elements.micButton.textContent = "Listening";
    elements.micButton.classList.add("listening");
  };

  state.recognition.onresult = (event) => {
    let transcript = "";
    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      transcript += event.results[index][0].transcript;
    }
    elements.messageInput.value = transcript.trim();
  };

  state.recognition.onend = () => {
    state.isListening = false;
    elements.micButton.textContent = "Speak";
    elements.micButton.classList.remove("listening");
  };
}

function startVoiceInput() {
  if (!state.recognition || state.isListening) return;
  state.recognition.lang = speechLanguageMap[elements.sourceLanguageSelect.value] || "en-US";
  state.recognition.start();
}

async function translateMessage() {
  const text = elements.messageInput.value.trim();
  if (!text) {
    elements.messageInput.focus();
    return;
  }

  await updateSenderLanguage();
  setBusy(true);
  const data = await fetchJson("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senderId: elements.senderSelect.value, text })
  });

  state.messages = data.messages;
  const receiver = getReceiver();
  const receiverLanguage = getLanguage(receiver.language);
  const translatedText = data.message.translatedVersions[receiver.language] || data.message.originalText;
  state.latestTranslation = translatedText;
  state.latestTranslationLanguage = receiver.language;
  elements.translationOutput.textContent = translatedText;
  elements.translationOutput.dir = receiverLanguage.direction;
  elements.translationOutputCard.hidden = false;
  showSuccess();
  elements.messageInput.value = "";
  renderMessages();
  setBusy(false);
  window.setTimeout(() => showView("conversation"), 750);
}

async function updateSenderLanguage() {
  const sender = getSender();
  const selectedLanguage = elements.sourceLanguageSelect.value;
  if (sender.language === selectedLanguage) return;

  const data = await fetchJson("/api/users/language", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: sender.id, language: selectedLanguage })
  });
  state.users = data.users;
}

async function summarizeConversation() {
  setBusy(true);
  const data = await fetchJson("/api/summary");
  state.summary = data.summary;
  renderSummary(data.summary);
  setBusy(false);
}

function renderSummary(summary) {
  elements.summaryContent.innerHTML = `
    <article><span>Main topic</span><p>${escapeHtml(summary.mainDiscussionTopic)}</p></article>
    <article><span>Key points</span><ul>${summary.keyPoints.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
    <article><span>Action items</span><ul>${summary.actionItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></article>
    <article><span>Participants</span><p>${summary.participants.join(", ")}</p></article>
  `;
}

function downloadSummary() {
  if (!state.summary) {
    summarizeConversation().then(downloadSummary).catch(showError);
    return;
  }

  const body = [
    "Linguabridge Summary",
    "",
    `Main topic: ${state.summary.mainDiscussionTopic}`,
    "",
    "Key points:",
    ...state.summary.keyPoints.map((item) => `- ${item}`),
    "",
    "Action items:",
    ...state.summary.actionItems.map((item) => `- ${item}`),
    "",
    `Participants: ${state.summary.participants.join(", ")}`
  ].join("\n");

  downloadTextFile("linguabridge-summary.txt", body);
}

function cloudSaveDemo() {
  localStorage.setItem("linguabridge-cloud-save-demo", JSON.stringify({
    savedAt: new Date().toISOString(),
    messages: state.messages,
    summary: state.summary
  }));
  elements.saveStatus.textContent = "Saved successfully";
}

function downloadTextFile(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function speakText(text, languageCode) {
  if (!text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = speechLanguageMap[languageCode] || "en-US";
  utterance.rate = 0.95;
  window.speechSynthesis.speak(utterance);
}

function clearMessage() {
  elements.messageInput.value = "";
  elements.translationOutputCard.hidden = true;
  elements.successToast.hidden = true;
  state.latestTranslation = "";
}

function showSuccess() {
  elements.successToast.hidden = false;
  window.setTimeout(() => {
    elements.successToast.hidden = true;
  }, 2400);
}

function syncReceiver(receiverId) {
  state.selectedReceiverId = receiverId;
  elements.receiverSelect.value = receiverId;
  elements.conversationReceiverSelect.value = receiverId;
  renderReceiverBadge();
  renderMessages();
}

function setBusy(isBusy) {
  elements.translateButton.disabled = isBusy;
  elements.summaryButton.disabled = isBusy;
  elements.typingIndicator.hidden = !isBusy;
}

function getSender() {
  return state.users.find((user) => user.id === elements.senderSelect.value) || state.users[0];
}

function getReceiver() {
  return state.users.find((user) => user.id === state.selectedReceiverId) || state.users[0];
}

function getLanguage(code) {
  return state.languages.find((language) => language.code === code) || state.languages[0] || { code: "en", name: "English", flag: "🇺🇸", direction: "ltr" };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}

function showError(error) {
  setBusy(false);
  window.alert(error.message);
}

elements.tabButtons.forEach((button) => {
  button.addEventListener("click", () => showView(button.dataset.tab));
});

elements.startDemoButton.addEventListener("click", () => showView("translate"));
elements.senderSelect.addEventListener("change", renderSourceLanguages);
elements.receiverSelect.addEventListener("change", (event) => syncReceiver(event.target.value));
elements.conversationReceiverSelect.addEventListener("change", (event) => syncReceiver(event.target.value));
elements.micButton.addEventListener("click", startVoiceInput);
elements.translateButton.addEventListener("click", () => translateMessage().catch(showError));
elements.clearButton.addEventListener("click", clearMessage);
elements.listenOutputButton.addEventListener("click", () => speakText(state.latestTranslation, state.latestTranslationLanguage));
elements.summaryButton.addEventListener("click", () => summarizeConversation().catch(showError));
elements.downloadSummaryButton.addEventListener("click", downloadSummary);
elements.exportSummaryButton.addEventListener("click", downloadSummary);
elements.cloudSaveButton.addEventListener("click", cloudSaveDemo);
elements.messagesList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-speak]");
  if (button) speakText(button.dataset.speak, button.dataset.lang);
});

bootstrap().catch(showError);
