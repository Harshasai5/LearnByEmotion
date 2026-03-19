import axios from "axios";

const API = "http://127.0.0.1:8000/quiz";

// 🔹 Get all quizzes (HOME)
export const getAllQuiz = () => {
  return axios.get(`${API}/all`);
};

// 🔹 Get recommended quizzes
export const getRecommendedQuiz = (studentId) => {
  return axios.post(`${API}/recommended`, null, {
    params: { student_id: studentId }
  });
};