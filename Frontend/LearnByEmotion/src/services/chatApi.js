import axios from "axios";

// ✅ Create reusable axios instance
const api = axios.create({
  baseURL: "http://localhost:8000/chat",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

// ✅ Send message
export const sendMessage = async (data) => {
  try {
    const res = await api.post("/send", data);
    return res.data;
  } catch (error) {
    console.error("Send Message Error:", error);
    return { response: "Something went wrong. Please try again." };
  }
};

// ✅ Get chat history
export const getHistory = async (studentId) => {
  try {
    const res = await api.get(`/history/${studentId}`);
    return res.data;
  } catch (error) {
    console.error("History Error:", error);
    return { history: [] };
  }
};

// ✅ Mark useful
export const markUseful = async (chatId) => {
  try {
    const res = await api.post("/mark-useful", { chat_id: chatId });
    return res.data;
  } catch (error) {
    console.error("Mark Useful Error:", error);
    return null;
  }
};