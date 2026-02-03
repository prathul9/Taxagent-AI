import { useState } from "react";
import AvatarCanvas from "./components/AvatarCanvas";
import "./index.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("Click mic and ask about tax");

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    setStatus("Listening...");

    recognition.onresult = (event) => {
      const userText = event.results[0][0].transcript;
      setMessages((prev) => [...prev, { from: "user", text: userText }]);
      fakeAIReply(userText);
    };
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    document.body.classList.add("talking");
    utterance.onend = () => {
      document.body.classList.remove("talking");
    };
  };

  const fakeAIReply = () => {
    const reply = "You can claim deductions under Section 80C.";
    setMessages((prev) => [...prev, { from: "ai", text: reply }]);
    setStatus("Assistant: " + reply);
    speak(reply);
  };

  return (
    <div className="page">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">TaxAI</div>
        <div className="nav-links">
          <span>Home</span>
          <span>Features</span>
          <span>Chat</span>
          <button className="login">Log in</button>
          <button className="signup">Sign up</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-left">
          <h1>
            Explore the <span>Future</span> of Tax with AI
          </h1>
          <p>
            A voice-based AI assistant that helps you understand deductions,
            savings, and financial planning.
          </p>

          <button className="cta" onClick={startListening}>
            🎤 Start Talking
          </button>

          <p className="status">{status}</p>
        </div>

        <div className="hero-right">
          <div className="avatar-card">
            <AvatarCanvas />
          </div>
        </div>
      </div>
    </div>
  );
}
