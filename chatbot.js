// chatbot.js - KrishiLink FAQ Assistant (rule-based, no API needed)
// Include this file + chatbot.css on any page to get the floating chat widget.

(function () {
  // ---------------------------------------------
  // 1. Inject widget HTML into the page
  // ---------------------------------------------
  const widgetHTML = `
    <button id="klChatBubble" aria-label="Open chat assistant">💬</button>
    <div id="klChatWindow">
      <div class="kl-chat-header">
        <div>
          <div class="kl-chat-header-title">KrishiLink Assistant</div>
          <div class="kl-chat-header-sub">Usually replies instantly</div>
        </div>
        <button class="kl-chat-close" id="klChatClose">✕</button>
      </div>
      <div class="kl-chat-body" id="klChatBody"></div>
      <div class="kl-quick-replies" id="klQuickReplies"></div>
      <div class="kl-chat-input">
        <input type="text" id="klChatInput" placeholder="Type your question..." />
        <button id="klChatSend">Send</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", widgetHTML);

  // ---------------------------------------------
  // 2. FAQ knowledge base — keyword: response
  // ---------------------------------------------
  const faqRules = [
    {
      keywords: ["price", "rate", "mandi", "bhav", "kimat"],
      reply: "You can check today's mandi prices on your Dashboard, or open 'Price Intelligence' from the sidebar for price trends by crop."
    },
    {
      keywords: ["buyer", "kharidar", "verified"],
      reply: "All buyers on KrishiLink are verified. Open 'Verified Buyers' from the sidebar to see names, location, and contact numbers."
    },
    {
      keywords: ["sell", "list", "crop", "fasal", "bech"],
      reply: "To sell your crop, go to 'Sell My Crop' from the sidebar and fill in your name, crop, quantity, and location. Buyers will be able to see your listing."
    },
    {
      keywords: ["payment", "paisa", "paise", "money", "bhugtan"],
      reply: "If a buyer hasn't paid after pickup, please raise a complaint from the 'Help & Support' page with your transaction details. Our team will follow up."
    },
    {
      keywords: ["transaction", "order", "status", "pickup"],
      reply: "You can track all your sales and pickup status under the 'Transactions' page from the sidebar."
    },
    {
      keywords: ["complaint", "problem", "issue", "shikayat", "dispute"],
      reply: "You can raise a complaint anytime from the 'Help & Support' page — just select the issue type and describe what happened."
    },
    {
      keywords: ["contact", "phone", "call", "support", "help"],
      reply: "You can reach our support team at 1800-266-0000 (toll-free), or via WhatsApp/email listed on the 'Help & Support' page."
    },
    {
      keywords: ["fpo", "group", "society"],
      reply: "The FPO Hub helps farmer groups pool their harvest together for better prices. You can find it in the sidebar."
    },
    {
      keywords: ["free", "cost", "charge", "fees"],
      reply: "KrishiLink is completely free for farmers — listing your crop and checking prices costs nothing."
    },
    {
      keywords: ["hello", "hi", "namaste", "hey"],
      reply: "Namaste! 👋 I'm the KrishiLink Assistant. Ask me about prices, buyers, selling your crop, or payments."
    },
  ];

  const fallbackReply = "I'm not sure about that yet — for anything specific, please visit the 'Help & Support' page or call 1800-266-0000.";

  const quickReplyOptions = [
    "Today's price",
    "Find a buyer",
    "How to sell my crop?",
    "Payment issue",
  ];

  // ---------------------------------------------
  // 3. Core chat logic
  // ---------------------------------------------
  const chatBody = document.getElementById("klChatBody");
  const chatInput = document.getElementById("klChatInput");
  const quickRepliesEl = document.getElementById("klQuickReplies");

  function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `kl-msg ${sender}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function getReply(userText) {
    const text = userText.toLowerCase();
    for (const rule of faqRules) {
      if (rule.keywords.some(k => text.includes(k))) {
        return rule.reply;
      }
    }
    return fallbackReply;
  }

  function handleUserMessage(text) {
    if (!text.trim()) return;
    addMessage(text, "user");
    chatInput.value = "";
    setTimeout(() => {
      addMessage(getReply(text), "bot");
    }, 400);
  }

  function renderQuickReplies() {
    quickRepliesEl.innerHTML = quickReplyOptions
      .map(q => `<button class="kl-quick-btn">${q}</button>`)
      .join("");
    quickRepliesEl.querySelectorAll(".kl-quick-btn").forEach(btn => {
      btn.addEventListener("click", () => handleUserMessage(btn.textContent));
    });
  }

  // ---------------------------------------------
  // 4. Wire up open/close/send
  // ---------------------------------------------
  const bubble = document.getElementById("klChatBubble");
  const chatWindow = document.getElementById("klChatWindow");
  const closeBtn = document.getElementById("klChatClose");
  const sendBtn = document.getElementById("klChatSend");

  bubble.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
    if (chatBody.childElementCount === 0) {
      addMessage("Namaste! 👋 I'm the KrishiLink Assistant. Ask me about prices, buyers, selling your crop, or payments.", "bot");
      renderQuickReplies();
    }
  });

  closeBtn.addEventListener("click", () => chatWindow.classList.remove("open"));
  sendBtn.addEventListener("click", () => handleUserMessage(chatInput.value));
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleUserMessage(chatInput.value);
  });
})();
