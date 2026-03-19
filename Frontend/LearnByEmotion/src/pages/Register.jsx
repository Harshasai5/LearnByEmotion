import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi";
import "./css/Auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await registerUser(form);

      if (res.message) {
        alert("Registration successful. Please login.");
        navigate("/login");
      } else {
        alert(res.detail || "Registration failed");
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join LearnByEmotion</p>

        <input
          className="auth-input"
          placeholder="Full Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="auth-input"
          type="email"
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

        <button className="auth-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="auth-text">
          Already have an account?
          <span
            className="auth-link"
            onClick={() => navigate("/login")}
          >
            {" "}Login
          </span>
        </p>
      </div>
    </div>
  );
}
