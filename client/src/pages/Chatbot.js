import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const sessionId = localStorage.getItem("chatSession") || Date.now();

  localStorage.setItem("chatSession", sessionId);

  // Inline CSS
  const styles = {
    container: {
      width: "380px",
      background: "white",
      padding: "15px",
      borderRadius: "12px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      fontFamily: "Arial",
    },
    title: {
      margin: 0,
      marginBottom: "10px",
      fontSize: "22px",
      fontWeight: "bold",
      textAlign: "center",
      color: "#333",
    },
    chatbox: {
      width: "100%",
      height: "360px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "10px",
      overflowY: "scroll",
      background: "#f8f8f8",
      marginBottom: "10px",
    },
    messageBot: {
      background: "#d1e8ff",
      padding: "8px",
      borderRadius: "7px",
      margin: "6px 0",
      maxWidth: "85%",
    },
    messageUser: {
      background: "#ffd1dc",
      padding: "8px",
      borderRadius: "7px",
      margin: "6px 0",
      marginLeft: "auto",
      maxWidth: "85%",
      textAlign: "right",
    },
    input: {
      width: "72%",
      padding: "8px",
      borderRadius: "5px",
      border: "1px solid #aaa",
      marginRight: "5px",
      outline: "none",
    },
    button: {
      padding: "8px 15px",
      borderRadius: "5px",
      background: "#4a4a4a",
      color: "white",
      border: "none",
      cursor: "pointer",
    },
  };

  const sendMessage = async () => {
    if (!input) return;

    setMessages((prev) => [...prev, { sender: "You", text: input }]);

    const res = await fetch("http://localhost:5000/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        userMessage: input,
      }),
    });

    const data = await res.json();

    if (data.completed) {
      setMessages((prev) => [
        ...prev,
        { sender: "Bot", text: "Event details collected successfully!" },
        {
          sender: "Bot",
          text: `
Event Name: ${data.summary.eventName}
Date: ${data.summary.date}
Time: ${data.summary.time}
Venue: ${data.summary.venue}
Coordinator: ${data.summary.coordinator}
Description: ${data.summary.description}
          `,
        },
      ]);
    } else {
      setMessages((prev) => [...prev, { sender: "Bot", text: data.question }]);
    }

    setInput("");
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Event Chatbot</h3>

      <div style={styles.chatbox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={msg.sender === "Bot" ? styles.messageBot : styles.messageUser}
          >
            <strong>{msg.sender}: </strong> {msg.text}
          </div>
        ))}
      </div>

      <input
        style={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here..."
      />

      <button style={styles.button} onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

// import React from 'react';

// const Chatbot = () => {
//   return (
//     <div className="container mx-auto px-4 py-10">
//       <div className="bg-white rounded-xl shadow-sm p-6">
//         <h1 className="text-2xl font-semibold mb-2">Chatbot / FAQ</h1>
//         <p className="text-gray-600">FAQ chatbot will be implemented here.</p>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;