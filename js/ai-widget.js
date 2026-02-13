// ===========================================
// AI SIRTAKI WIDGET - С СОХРАНЕНИЕМ ИСТОРИИ
// ===========================================

document.body.insertAdjacentHTML('beforeend', `
<style>
/* Основная кнопка виджета */
.sirtaki-widget-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: #1C2E4A;
  color: #FFFFFF;
  padding: 12px 20px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 20px rgba(28, 46, 74, 0.3);
  transition: all 0.3s ease;
  z-index: 9999;
  border: none;
}
.sirtaki-widget-btn:hover {
  background: #152238;
  transform: translateY(-2px);
}

/* Меню выбора */
.sirtaki-menu {
  position: fixed;
  bottom: 90px;
  right: 24px;
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(28, 46, 74, 0.2);
  z-index: 9998;
  width: 280px;
  border: 1px solid #E5E1DB;
  display: none;
  overflow: hidden;
}
.sirtaki-menu.active { display: block; }
.sirtaki-menu-header {
  background: #1C2E4A;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sirtaki-menu-title {
  color: #FFFFFF !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  margin: 0 !important;
  padding: 0 !important;
}
.sirtaki-menu-close {
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 22px;
  cursor: pointer;
  opacity: 0.7;
  line-height: 1;
  padding: 0;
}
.sirtaki-menu-close:hover { opacity: 1; }
.sirtaki-menu-body { padding: 16px; }
.sirtaki-menu-options { display: flex; gap: 12px; }
.sirtaki-option-btn {
  flex: 1;
  padding: 16px 12px;
  border: 2px solid #E5E1DB;
  border-radius: 12px;
  background: #F7F4EF;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
}
.sirtaki-option-btn:hover {
  border-color: #B85C38;
  background: #FFFFFF;
}
.sirtaki-option-btn .icon { font-size: 28px; margin-bottom: 8px; }
.sirtaki-option-btn .label { font-size: 13px; font-weight: 600; color: #2A2A2A; }
.sirtaki-option-btn .sublabel { font-size: 11px; color: #6B7280; margin-top: 4px; }

/* ========================================= */
/* FULLSCREEN ЧАТ */
/* ========================================= */
.sirtaki-chat {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #FFFFFF;
  z-index: 10000;
  display: none;
  flex-direction: column;
  overflow: hidden;
}
.sirtaki-chat.active { display: flex; }

.sirtaki-chat-header {
  background: #1C2E4A;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}
.sirtaki-chat-title {
  color: #FFFFFF !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  margin: 0 !important;
}
.sirtaki-chat-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}
.sirtaki-chat-clear {
  background: rgba(255,255,255,0.15);
  border: none;
  color: #FFFFFF;
  font-size: 12px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 15px;
  opacity: 0.8;
}
.sirtaki-chat-clear:hover { opacity: 1; background: rgba(255,255,255,0.25); }
.sirtaki-chat-close {
  background: rgba(255,255,255,0.2);
  border: none;
  color: #FFFFFF;
  font-size: 24px;
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sirtaki-chat-close:hover { background: rgba(255,255,255,0.3); }

.sirtaki-chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: #F7F4EF;
  -webkit-overflow-scrolling: touch;
}
.sirtaki-message { margin-bottom: 12px; display: flex; }
.sirtaki-message.bot { justify-content: flex-start; }
.sirtaki-message.user { justify-content: flex-end; }
.sirtaki-message .bubble {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 15px;
  line-height: 1.4;
}
.sirtaki-message.bot .bubble {
  background: #FFFFFF;
  color: #2A2A2A;
  border: 1px solid #E5E1DB;
  border-bottom-left-radius: 4px;
}
.sirtaki-message.user .bubble {
  background: #1C2E4A;
  color: #FFFFFF;
  border-bottom-right-radius: 4px;
}

.sirtaki-chat-input {
  padding: 12px 16px;
  padding-bottom: max(12px, env(safe-area-inset-bottom));
  border-top: 1px solid #E5E1DB;
  display: flex;
  gap: 10px;
  background: #FFFFFF;
  flex-shrink: 0;
}
.sirtaki-chat-input input {
  flex: 1;
  padding: 14px 18px;
  border: 1px solid #E5E1DB;
  border-radius: 25px;
  font-size: 16px;
  outline: none;
  -webkit-appearance: none;
}
.sirtaki-chat-input input:focus { border-color: #B85C38; }
.sirtaki-chat-input button {
  background: #B85C38;
  color: #FFFFFF;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  cursor: pointer;
  font-size: 20px;
  flex-shrink: 0;
}
.sirtaki-chat-input button:hover { background: #9A4D30; }

/* ========================================= */
/* ПЛАВАЮЩАЯ КНОПКА "BEENDEN" */
/* ========================================= */
.sirtaki-call-active {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #DC2626;
  color: #FFFFFF;
  padding: 16px 32px;
  border-radius: 50px;
  cursor: pointer;
  display: none;
  align-items: center;
  gap: 12px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4);
  z-index: 10001;
  border: none;
  animation: pulse-red 2s infinite;
}
.sirtaki-call-active.active { display: flex; }
.sirtaki-call-active:hover { background: #B91C1C; }

@keyframes pulse-red {
  0%, 100% { box-shadow: 0 4px 20px rgba(220, 38, 38, 0.4); }
  50% { box-shadow: 0 4px 30px rgba(220, 38, 38, 0.7); }
}

/* ========================================= */
/* СТАТУС ПОДКЛЮЧЕНИЯ */
/* ========================================= */
.sirtaki-connecting {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(28, 46, 74, 0.95);
  color: #FFFFFF;
  padding: 24px 40px;
  border-radius: 16px;
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  z-index: 10002;
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}
.sirtaki-connecting.active { display: flex; }

.sirtaki-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.sirtaki-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 10001;
  display: none;
}
.sirtaki-overlay.active { display: block; }

/* Мобильная адаптация */
@media (max-width: 480px) {
  .sirtaki-widget-btn {
    padding: 10px 16px;
    font-size: 13px;
    bottom: 16px;
    right: 16px;
  }
  .sirtaki-menu {
    right: 16px;
    left: 16px;
    width: auto;
    bottom: 75px;
  }
  .sirtaki-call-active {
    bottom: 16px;
    padding: 14px 28px;
    font-size: 15px;
  }
}
</style>

<!-- Кнопка виджета -->
<button class="sirtaki-widget-btn" id="sirtakiWidgetBtn">
  <span style="font-size:20px">🤖</span>
  <span>AI Sirtaki</span>
</button>

<!-- Меню выбора -->
<div class="sirtaki-menu" id="sirtakiMenu">
  <div class="sirtaki-menu-header">
    <span class="sirtaki-menu-title">🤖 Wie kann ich Ihnen helfen?</span>
    <button class="sirtaki-menu-close" id="sirtakiMenuClose">×</button>
  </div>
  <div class="sirtaki-menu-body">
    <div class="sirtaki-menu-options">
      <button class="sirtaki-option-btn" id="chatOption">
        <div class="icon">💬</div>
        <div class="label">Schreiben</div>
        <div class="sublabel">Text-Chat</div>
      </button>
      <button class="sirtaki-option-btn" id="callOption">
        <div class="icon">🎤</div>
        <div class="label">Sprechen</div>
        <div class="sublabel">Sprach-KI</div>
      </button>
    </div>
  </div>
</div>

<!-- FULLSCREEN Текстовый чат -->
<div class="sirtaki-chat" id="sirtakiChat">
  <div class="sirtaki-chat-header">
    <span class="sirtaki-chat-title">🤖 AI Sirtaki Chat</span>
    <div class="sirtaki-chat-actions">
      <button class="sirtaki-chat-clear" id="sirtakiChatClear">🗑 Löschen</button>
      <button class="sirtaki-chat-close" id="sirtakiChatClose">✕</button>
    </div>
  </div>
  <div class="sirtaki-chat-messages" id="chatMessages"></div>
  <div class="sirtaki-chat-input">
    <input type="text" id="chatInput" placeholder="Nachricht schreiben..." autocomplete="off">
    <button id="sendMessage">➤</button>
  </div>
</div>

<!-- Плавающая кнопка "Beenden" -->
<button class="sirtaki-call-active" id="sirtakiCallActive">
  <span>📞</span>
  <span>Gespräch beenden</span>
</button>

<!-- Статус подключения -->
<div class="sirtaki-overlay" id="sirtakiOverlay"></div>
<div class="sirtaki-connecting" id="sirtakiConnecting">
  <div class="sirtaki-spinner"></div>
  <span>Verbindung wird hergestellt...</span>
</div>
`);

// ===========================================
// JAVASCRIPT ЛОГИКА
// ===========================================

(async function () {
  // Элементы DOM
  const widgetBtn = document.getElementById('sirtakiWidgetBtn');
  const menu = document.getElementById('sirtakiMenu');
  const menuClose = document.getElementById('sirtakiMenuClose');
  const chatOption = document.getElementById('chatOption');
  const callOption = document.getElementById('callOption');
  const chat = document.getElementById('sirtakiChat');
  const chatClose = document.getElementById('sirtakiChatClose');
  const chatClear = document.getElementById('sirtakiChatClear');
  const chatInput = document.getElementById('chatInput');
  const sendBtn = document.getElementById('sendMessage');
  const chatMessages = document.getElementById('chatMessages');
  const callActiveBtn = document.getElementById('sirtakiCallActive');
  const connecting = document.getElementById('sirtakiConnecting');
  const overlay = document.getElementById('sirtakiOverlay');

  // Vapi переменные
  let vapiInstance = null;
  let isCallActive = false;

  // ===========================================
  // ИСТОРИЯ ЧАТА - localStorage
  // ===========================================
  const CHAT_STORAGE_KEY = 'sirtaki_chat_history';

  // Приветственное сообщение
  const welcomeMessage = { type: 'bot', text: 'Hallo! Wie kann ich Ihnen helfen?' };

  // Загрузить историю из localStorage
  function loadChatHistory() {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Ошибка загрузки истории:', e);
    }
    return [welcomeMessage]; // По умолчанию - приветствие
  }

  // Сохранить историю в localStorage
  function saveChatHistory(messages) {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Ошибка сохранения истории:', e);
    }
  }

  // Отрисовать все сообщения
  function renderMessages(messages) {
    chatMessages.innerHTML = messages.map(msg =>
      `<div class="sirtaki-message ${msg.type}">
        <div class="bubble">${msg.text}</div>
      </div>`
    ).join('');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Добавить сообщение
  function addMessage(type, text) {
    const messages = loadChatHistory();
    messages.push({ type, text });
    saveChatHistory(messages);
    renderMessages(messages);
  }

  // Очистить историю
  function clearChatHistory() {
    saveChatHistory([welcomeMessage]);
    renderMessages([welcomeMessage]);
  }

  // Загрузить историю при старте
  renderMessages(loadChatHistory());

  // ===========================================
  // SESSION ID ДЛЯ ЧАТА
  // ===========================================
  function getSessionId() {
    let sessionId = localStorage.getItem('sirtaki_session_id');
    if (!sessionId) {
      sessionId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sirtaki_session_id', sessionId);
    }
    return sessionId;
  }

  // ===========================================
  // ПОКАЗАТЬ/СКРЫТЬ СТАТУСЫ
  // ===========================================
  function showConnecting() {
    overlay.classList.add('active');
    connecting.classList.add('active');
  }

  function hideConnecting() {
    overlay.classList.remove('active');
    connecting.classList.remove('active');
  }

  function showCallActive() {
    callActiveBtn.classList.add('active');
    widgetBtn.style.display = 'none';
  }

  function hideCallActive() {
    callActiveBtn.classList.remove('active');
    widgetBtn.style.display = 'flex';
  }

  // ===========================================
  // ПРЕДЗАГРУЗКА VAPI
  // ===========================================
  async function preloadVapi() {
    try {
      const module = await import('https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest/+esm');
      const VapiClass = module.default.default;

      vapiInstance = new VapiClass("711e699a-a2e7-4eaf-91d4-542b04ba8a40");
      console.log('✅ Vapi готов');

      vapiInstance.on('call-start', () => {
        console.log('📞 Звонок начался');
        isCallActive = true;
        hideConnecting();
        showCallActive();
      });

      vapiInstance.on('call-end', () => {
        console.log('📞 Звонок завершён');
        isCallActive = false;
        hideConnecting();
        hideCallActive();
      });

      vapiInstance.on('error', (e) => {
        console.error('❌ Ошибка Vapi:', e);
        isCallActive = false;
        hideConnecting();
        hideCallActive();
      });

    } catch (e) {
      console.error('Ошибка загрузки Vapi:', e);
    }
  }

  await preloadVapi();

  // ===========================================
  // ОБРАБОТЧИКИ СОБЫТИЙ
  // ===========================================

  // Открыть/закрыть меню
  widgetBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    chat.classList.remove('active');
  });

  menuClose.addEventListener('click', () => menu.classList.remove('active'));

  // Открыть текстовый чат
  chatOption.addEventListener('click', () => {
    menu.classList.remove('active');
    chat.classList.add('active');
    renderMessages(loadChatHistory()); // Обновить историю
    setTimeout(() => chatInput.focus(), 100);
  });

  chatClose.addEventListener('click', () => {
    chat.classList.remove('active');
  });

  // Очистить историю
  chatClear.addEventListener('click', () => {
    if (confirm('Chat-Verlauf löschen?')) {
      clearChatHistory();
    }
  });

  // Голосовой AI
  callOption.addEventListener('click', async () => {
    menu.classList.remove('active');

    if (!vapiInstance) {
      alert('Голосовой AI загружается, подождите...');
      return;
    }

    showConnecting();

    try {
      await vapiInstance.start("57a7609b-82ed-4ffc-8b8f-41edd7581889");
    } catch (e) {
      console.error('Ошибка запуска:', e);
      hideConnecting();
      alert('Ошибка запуска. Разрешите микрофон.');
    }
  });

  // Завершить звонок
  callActiveBtn.addEventListener('click', () => {
    if (vapiInstance && isCallActive) {
      vapiInstance.stop();
    }
  });

  // ===========================================
  // ТЕКСТОВЫЙ ЧАТ
  // ===========================================
  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Добавить сообщение пользователя
    addMessage('user', message);
    chatInput.value = '';

    try {
      const response = await fetch('https://numuroparnoog.beget.app/webhook/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          sessionId: getSessionId()
        })
      });
      const data = await response.json();
      const reply = data.reply || data.message || data.text || data.output || 'OK';
      addMessage('bot', reply);
    } catch (e) {
      console.error('Ошибка чата:', e);
      addMessage('bot', 'Fehler. Bitte versuchen Sie es erneut.');
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  // Закрыть меню при клике вне
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !chat.contains(e.target) && !widgetBtn.contains(e.target)) {
      menu.classList.remove('active');
    }
  });

})();