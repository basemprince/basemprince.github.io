document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("chatbot-container");
  if (!container) return;

  container.innerHTML = `
    <!-- Basem Chatbot Widget -->
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

  // Restore chat log or reset on manual refresh
  if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
    localStorage.removeItem("basem_chat_log");
  }

  const saved = localStorage.getItem("basem_chat_log");
  if (saved) {
    log.innerHTML = saved;
    log.scrollTop = log.scrollHeight;
  } else {
    // Initial message
    log.innerHTML = `<div><b>BasemBot:</b> Hi! I'm Basem's assistant. What would you like to know about him?</div>`;
    saveChatLog();
  }

  let loadingInterval;

  function saveChatLog() {
    localStorage.setItem("basem_chat_log", log.innerHTML);
  }

  // Toggle popup reliably
  btn.addEventListener("click", () => {
    popup.style.display = popup.style.display === "block" ? "none" : "block";
  });

  // Hide popup when clicking outside of it
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
      body: JSON.stringify({ text: userText })
    };

    try {
      const localRes = await fetch("http://127.0.0.1:8000/chat", payload);
      if (!localRes.ok) throw new Error("Local fetch failed");
      return await localRes.json();
    } catch (err) {
      console.warn("Local server failed, trying Render endpoint...", err);
      const cloudRes = await fetch("https://basem-chatbot.onrender.com/chat", payload);
      if (!cloudRes.ok) throw new Error("Cloud fetch failed");
      return await cloudRes.json();
    }
  }

  // Send on button click or Enter key
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
      const data = await fetchWithFallback(userText);
      clearInterval(loadingInterval);
      document.getElementById(loadingId).innerHTML = `<b>BasemBot:</b> ${data}`;
      log.scrollTop = log.scrollHeight;
      saveChatLog();
    } catch (err) {
      clearInterval(loadingInterval);
      document.getElementById(loadingId).innerHTML = `<b>BasemBot:</b> Error getting response.`;
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
