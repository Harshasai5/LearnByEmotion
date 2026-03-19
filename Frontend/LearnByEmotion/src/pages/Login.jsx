import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";
import "./css/auth.css"; // ✅ IMPORT CSS

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(form);

      if (res.student_id) {
        localStorage.setItem("student_id", res.student_id);
        localStorage.setItem("student_name", res.name);
        navigate("/");
      } else {
        alert(res.detail || "Invalid credentials");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">LearnByEmotion</h2>
        <p className="auth-subtitle">Login to continue learning</p>

        <input
          className="auth-input"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="auth-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="auth-text">
          New user?
          <span
            className="auth-link"
            onClick={() => navigate("/register")}
          >
            {" "}Register
          </span>
        </p>
      </div>
    </div>
  );
}
