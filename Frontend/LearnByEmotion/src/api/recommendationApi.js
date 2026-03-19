import axios from "axios";

const API = "http://127.0.0.1:8000/recommendations";

const getLatestRecommendation = (sessionId) => {
  return axios.get(`${API}/latest`, {
    params: { session_id: sessionId }
  });
};

export default {
  getLatestRecommendation
};