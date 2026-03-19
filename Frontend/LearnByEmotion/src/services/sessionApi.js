const API_BASE = "http://127.0.0.1:8000";

export async function startSession(data) {
  const params = new URLSearchParams(data).toString();
  const res = await fetch(`${API_BASE}/sessions/start?${params}`, {
    method: "POST",
  });
  return res.json();
}

export async function endSession(sessionId) {
  const res = await fetch(
    `${API_BASE}/sessions/end?session_id=${sessionId}`,
    { method: "POST" }
  );
  return res.json();
}
