import { useState, useEffect, useRef } from "react";
import { sendMessage, getHistory, markUseful } from "../services/chatApi";
import "./css/Chat.css";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [message, setMessage] = useState("");

  // 🔥 NEW STATES
  const [allChats, setAllChats] = useState([]);       // history
  const [currentChat, setCurrentChat] = useState([]); // current session

  const [useful, setUseful] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const studentId = 1;
  const navigate = useNavigate();

  // ✅ LOAD HISTORY (only left side)
  const loadHistory = async () => {
    try {
      const res = await getHistory(studentId);
      const history = res.history || [];

      setAllChats(history); // 🔥 only history
      setUseful(history.filter((c) => c.is_useful));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // ✅ SCROLL ONLY CURRENT CHAT
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  // ✅ SEND MESSAGE → only center
  const handleSend = async () => {
    if (!message.trim() || loading) return;

    setLoading(true);

    try {
      const res = await sendMessage({
        student_id: studentId,
        message,
      });

      const newChat = {
        chat_id: res.chat_id,
        message,
        response: res.response,
        is_useful: false,
      };

      setCurrentChat((prev) => [...prev, newChat]); // 🔥 only center
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ MARK USEFUL
  const handleMarkUseful = async (chatId, index) => {
    if (!chatId) return;

    await markUseful(chatId);

    const updated = [...currentChat];
    updated[index].is_useful = true;

    setCurrentChat(updated);
    setUseful((prev) => [...prev, updated[index]]);
  };

  return (
    <div className="main-container">

      {/* NAVBAR */}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 30px",
          background: "#6ea8a1"
        }}
      >
        <button onClick={() => navigate("/")} style={btnStyle}>
          ← Back
        </button>

        <h2 style={titleStyle}>LearnByEmotion</h2>

        <button onClick={() => navigate("/")} style={btnStyle}>
          🏠 Home
        </button>
      </div>

      {/* BODY */}
      <div className="container">

        {/* LEFT - HISTORY */}
        <div className="sidebar">
          <h2>History</h2>
          {allChats
            .slice()
            .reverse()
            .slice(0, 10)
            .map((c, i) => (
              <div key={i} className="history-item">
                {c.message?.slice(0, 40)}...
              </div>
            ))}
        </div>

        {/* CENTER - CURRENT CHAT */}
        <div className="chat-area">
          <div className="chat-box">
            {currentChat.map((c, i) => (
              <div key={i} className="chat-block">
                <div className="user-msg">{c.message}</div>
                <div className="bot-msg">{c.response}</div>

                {!c.is_useful && c.chat_id && (
                  <button
                    className="save-btn"
                    onClick={() => handleMarkUseful(c.chat_id, i)}
                  >
                    ⭐ Save
                  </button>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div className="input-area">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>

        {/* RIGHT - USEFUL */}
        <div className="sidebar">
          <h2>Useful</h2>
          {useful.map((c, i) => (
            <div key={i} className="useful-item">
              <b>Q:</b> {c.message}
              <br />
              <b>A:</b> {c.response}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// 🔥 styles
const btnStyle = {
  background: "#3b5d5a",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer"
};

const titleStyle = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  margin: 0,
  fontWeight: "bold"
};