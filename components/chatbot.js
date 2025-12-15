class ChatBot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.messages = [];
    this.isOpen = false;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    this.render();
  }

  async sendMessage() {
    const input = this.shadowRoot.querySelector('#chat-input');
    const message = input.value.trim();
    
    if (message) {
      // Add user message
      this.messages.push({ sender: 'user', text: message });
      input.value = '';
      this.renderMessages();
      
      // Add bot response placeholder
      this.messages.push({ sender: 'bot', text: 'Processing your question...' });
      this.renderMessages();

      // TODO: Replace with actual API call
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   body: JSON.stringify({ question: message })
      // });
      // const data = await response.json();
      
      // Simulate API delay
      setTimeout(() => {
        this.messages.pop(); // Remove processing message
        this.messages.push({ 
          sender: 'bot', 
          text: 'Thanks for your question! A custom API will be implemented here to provide real responses.' 
        });
        this.renderMessages();
      }, 1500);
    }
  }

  renderMessages() {
    const messagesContainer = this.shadowRoot.querySelector('#messages');
    messagesContainer.innerHTML = this.messages.map(msg => `
      <div class="message ${msg.sender}">
        <div class="bubble">${msg.text}</div>
      </div>
    `).join('');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  setupEventListeners() {
    this.shadowRoot.querySelector('#toggle-chat').addEventListener('click', () => this.toggleChat());
    this.shadowRoot.querySelector('#chat-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendMessage();
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          font-family: 'Lato', sans-serif;
        }
        
        .chat-container {
          width: ${this.isOpen ? '320px' : '0'};
          height: ${this.isOpen ? '400px' : '0'};
          background: white;
          border-radius: 8px;
          box-shadow: 0 5px 30px rgba(0,0,0,0.2);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .chat-header {
          background: var(--accent);
          color: white;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .chat-title {
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
        }
        
        #messages {
          height: 280px;
          padding: 15px;
          overflow-y: auto;
          background: #f9f9f9;
        }
        
        .message {
          margin-bottom: 15px;
          display: flex;
        }
        
        .message.bot {
          justify-content: flex-start;
        }
        
        .message.user {
          justify-content: flex-end;
        }
        
        .bubble {
          max-width: 80%;
          padding: 10px 15px;
          border-radius: 18px;
          line-height: 1.4;
        }
        
        .bot .bubble {
          background: white;
          border: 1px solid #eee;
          color: #333;
        }
        
        .user .bubble {
          background: var(--accent);
          color: white;
        }
        
        .chat-input-container {
          display: flex;
          padding: 10px;
          border-top: 1px solid #eee;
          background: white;
        }
        
        #chat-input {
          flex: 1;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 20px;
          outline: none;
        }
        
        .send-btn {
          background: var(--accent);
          color: white;
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          margin-left: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .toggle-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background: var(--accent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          border: none;
          color: white;
        }
        
        .toggle-btn:focus {
          outline: none;
        }
      </style>
      
      <div class="chat-container" style="display: ${this.isOpen ? 'block' : 'none'}">
        <div class="chat-header">
          <div class="chat-title">Wedding Assistant</div>
          <button class="close-btn" id="toggle-chat">×</button>
        </div>
        <div id="messages"></div>
        <form id="chat-form" class="chat-input-container">
          <input type="text" id="chat-input" placeholder="Ask your question..." required>
          <button type="submit" class="send-btn">→</button>
        </form>
      </div>
      
      <button class="toggle-btn" id="toggle-chat" style="display: ${this.isOpen ? 'none' : 'flex'}">
        💬
      </button>
    `;
    
    if (this.isOpen) {
      this.renderMessages();
    }
  }
}

customElements.define('chat-bot', ChatBot);