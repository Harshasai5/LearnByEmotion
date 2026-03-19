import { useState, useEffect, useRef } from "react";
import { sendMessage, getHistory, markUseful } from "../services/chatApi";

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [useful, setUseful] = useState([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const studentId = 1;

  // ✅ LOAD HISTORY
  const loadHistory = async () => {
    try {
      const res = await getHistory(studentId);

      const history = res.history || [];

      setChat(history);
      setUseful(history.filter((c) => c.is_useful));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // ✅ SEND MESSAGE
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

      setChat((prev) => [...prev, newChat]);
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

    const updated = [...chat];
    updated[index].is_useful = true;

    setChat(updated);
    setUseful((prev) => [...prev, updated[index]]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* 🔵 LEFT - HISTORY */}
      <div style={{ width: "20%", borderRight: "1px solid gray", padding: "10px" }}>
        <h3>History</h3>

        {chat
          .slice()
          .reverse()
          .slice(0, 10)
          .map((c, i) => (
            <div key={i}>
              <p style={{ fontSize: "12px" }}>
                {c.message?.slice(0, 30)}...
              </p>
            </div>
          ))}
      </div>

      {/* 🟢 CENTER - CHAT */}
      <div style={{ width: "60%", padding: "10px" }}>
        <h3>Chat</h3>

        {chat.map((c, i) => (
          <div key={i} style={{ marginBottom: "15px" }}>
            <p><b>You:</b> {c.message}</p>
            <p><b>Bot:</b> {c.response}</p>

            {!c.is_useful && c.chat_id && (
              <button onClick={() => handleMarkUseful(c.chat_id, i)}>
                ⭐ Save
              </button>
            )}
          </div>
        ))}

        <div ref={chatEndRef} />

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask something..."
        />

        <button onClick={handleSend} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      {/* 🟡 RIGHT - USEFUL */}
      <div style={{ width: "20%", borderLeft: "1px solid gray", padding: "10px" }}>
        <h3>Useful</h3>

        {useful.map((c, i) => (
          <div key={i}>
            <p><b>Q:</b> {c.message}</p>
            <p><b>A:</b> {c.response}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;