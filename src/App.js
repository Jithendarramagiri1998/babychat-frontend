import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'You', text: input };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await axios.post('/api/message', { text: input });
      const babyMsg = { sender: 'Baby', text: res.data.reply };
      setMessages(prev => [...prev, babyMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'Baby', text: "Oops! I'm not available right now 💔" }]);
    }

    setInput('');
  };

  return (
    <div className="chat-container">
      <h1>💬 Chat with Baby</h1>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'Baby' ? 'baby-msg' : 'user-msg'}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

