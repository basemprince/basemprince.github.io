document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("chatbot-container");
  if (!container) return;

  // Inject widget HTML
  container.innerHTML = `
    <button id="chat-btn" class="chat-btn">LLM Chat</button>
    <div id="chat-popup" class="chat-popup" style="display: none;">
      <div class="chat-header">
        Basem's Assistant
        <div class="chat-note">⚠️ First response may take up to 50 seconds due to cold start</div>
      </div>
      <div id="chat-log" class="chat-log"></div>
      <div class="chat-input-area">
        <input id="chat-input" class="chat-input" placeholder="Ask me anything..." />
        <button id="send-btn" class="chat-send-btn">Send</button>
      </div>
    </div>
  `;

  const btn = document.getElementById("chat-btn");
  const popup = document.getElementById("chat-popup");
  const log = document.getElementById("chat-log");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  let loadingInterval;
  let sessionId = localStorage.getItem("basem_chat_session") || null;

  // Restore chat or reset on refresh
  if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
    localStorage.removeItem("basem_chat_log");
    localStorage.removeItem("basem_chat_session");
    sessionId = null;
  }

  const savedLog = localStorage.getItem("basem_chat_log");
  if (savedLog) {
    log.innerHTML = savedLog;
  } else {
    log.innerHTML = `<div><b>BasemBot:</b> Hi! I'm Basem's assistant. What would you like to know about him?</div>`;
    saveChatLog();
  }
  log.scrollTop = log.scrollHeight;

  function saveChatLog() {
    localStorage.setItem("basem_chat_log", log.innerHTML);
  }

  // Show/Hide Chat
  btn.addEventListener("click", () => {
    popup.style.display = popup.style.display === "block" ? "none" : "block";
  });

  // Hide popup when clicking outside
  document.addEventListener("click", (event) => {
    if (
      popup.style.display === "block" &&
      !popup.contains(event.target) &&
      !btn.contains(event.target)
    ) {
      popup.style.display = "none";
    }
  });

  async function fetchWithFallback(userText) {
    const payload = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userText, session_id: sessionId }),
    };

    try {
      const localRes = await fetch("http://127.0.0.1:8000/chat", payload);
      if (!localRes.ok) throw new Error("Local fetch failed");
      return await localRes.json();
    } catch {
      const cloudRes = await fetch(
        "https://basem-chatbot.onrender.com/chat",
        payload,
      );
      if (!cloudRes.ok) throw new Error("Cloud fetch failed");
      return await cloudRes.json();
    }
  }

  // Handle send
  async function handleSend() {
    const userText = input.value.trim();
    if (!userText) return;

    log.innerHTML += `<div><b>You:</b> ${userText}</div>`;
    input.value = "";

    const loadingId = `loading-${Date.now()}`;
    log.innerHTML += `<div id="${loadingId}"><b>BasemBot:</b> <span class="dots">Generating answer</span></div>`;
    const dotsSpan = document.querySelector(`#${loadingId} .dots`);

    let dotCount = 0;
    loadingInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      dotsSpan.textContent = "Generating answer" + ".".repeat(dotCount);
    }, 400);

    try {
      const response = await fetchWithFallback(userText);
      clearInterval(loadingInterval);

      sessionId = response.session_id || sessionId;
      localStorage.setItem("basem_chat_session", sessionId);

      document.getElementById(loadingId).innerHTML =
        `<b>BasemBot:</b> ${response.answer}`;
      log.scrollTop = log.scrollHeight;
      saveChatLog();
    } catch (err) {
      clearInterval(loadingInterval);
      document.getElementById(loadingId).innerHTML =
        `<b>BasemBot:</b> Error getting response.`;
      console.error(err);
    }
  }

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  });
});
