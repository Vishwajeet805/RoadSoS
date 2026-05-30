// Phase 5: Gemini API integration for first aid guidance
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getFirstAidGuidance(query) {
  if (!API_KEY) {
    // Signal caller that no API key is available
    const err = new Error("NO_API_KEY");
    err.code = "NO_API_KEY";
    throw err;
  }

  const controller = new AbortController();
  const timeoutMs = 15000; // 15s timeout
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const endpoint = "https://generative.googleapis.com/v1/models/text-bison-001:generate";
    const body = {
      prompt: {
        text: `You are a concise, safety-first first-aid assistant for road accidents. Provide short, step-by-step emergency first-aid guidance focused on immediate actions a bystander can take. Always recommend contacting emergency services for serious cases and do NOT attempt to diagnose medical conditions. Keep the response clear and under 300 tokens. Query: ${query}`
      },
      maxOutputTokens: 300
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text();
      const err = new Error(`API_ERROR ${res.status} ${text}`);
      err.code = "API_ERROR";
      throw err;
    }

    const data = await res.json();

    // Try common response shapes from Generative APIs
    const candidate = data?.candidates?.[0]?.content ?? data?.outputs?.[0]?.content ?? data?.choices?.[0]?.message?.content ?? null;
    if (candidate) return candidate;

    // Fallback to stringified payload if shape differs
    return JSON.stringify(data);
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}
