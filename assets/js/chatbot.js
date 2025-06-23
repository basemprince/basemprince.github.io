const btn = document.getElementById("chat-btn");
const popup = document.getElementById("chat-popup");
const log = document.getElementById("chat-log");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

// Restore chat log
window.onload = () => {
  const saved = localStorage.getItem("basem_chat_log");
  if (saved) {
    log.innerHTML = saved;
    log.scrollTop = log.scrollHeight;
  }

  // Inform user about first-time load delay
//   if (!localStorage.getItem("basem_notice_shown")) {
//     alert("Note: The first response may take up to 50 seconds as the assistant is waking up.");
//     localStorage.setItem("basem_notice_shown", "true");
//   }
};

let loadingInterval;

function saveChatLog() {
  localStorage.setItem("basem_chat_log", log.innerHTML);
}

// Toggle popup reliably
btn.addEventListener("click", () => {
  popup.style.display = popup.style.display === "block" ? "none" : "block";
});

// Send on button click or Enter key
async function handleSend() {
  const userText = input.value.trim();
  if (!userText) return;

  log.innerHTML += `<div><b>You:</b> ${userText}</div>`;
  input.value = "";

  // Show flashing loading message
  const loadingId = `loading-${Date.now()}`;
  log.innerHTML += `<div id="${loadingId}"><b>BasemBot:</b> <span class="dots">Generating answer</span></div>`;
  const dotsSpan = document.querySelector(`#${loadingId} .dots`);

  let dotCount = 0;
  loadingInterval = setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dotsSpan.textContent = "Generating answer" + ".".repeat(dotCount);
  }, 400);

  try {
    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userText })
    });

    const data = await res.json();

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

// Press Enter to send
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    handleSend();
  }
});


// https://basem-chatbot.onrender.com/chat
// http://127.0.0.1:8000/chat
