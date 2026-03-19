const API = "http://127.0.0.1:8000/auth";

export async function registerUser(data) {
  const params = new URLSearchParams(data).toString();
  const res = await fetch(`${API}/register?${params}`, { method: "POST" });
  return res.json();
}

export async function loginUser(data) {
  const params = new URLSearchParams(data).toString();
  const res = await fetch(`${API}/login?${params}`, { method: "POST" });
  return res.json();
}
