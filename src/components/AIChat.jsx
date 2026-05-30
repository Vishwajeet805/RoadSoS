import React, { useEffect, useRef, useState } from "react";
import { getFirstAidGuidance } from "../services/geminiService";
import LoadingSpinner from "./ui/LoadingSpinner";

const STORAGE_KEY = "roadsos_ai_chat_history_v1";
const MAX_HISTORY = 30;

const fallbackRules = {
  Bleeding: `- Apply firm pressure to the wound with a clean cloth or bandage.
- Elevate the injured area if possible.
- Keep the person calm and still.
- Call emergency services for heavy bleeding or if bleeding does not stop.

Call emergency services if bleeding is severe or spurting.`,
  "Unconscious Person": `- Check responsiveness and breathing. Gently shout and shake shoulder.
- If not breathing normally, start CPR and call emergency services immediately.
- If breathing, place in recovery position and monitor airway.
- Do not give food or drink.

Call emergency services for any loss of consciousness.`,
  Fracture: `- Immobilize the injured limb; avoid moving it unnecessarily.
- Apply a splint if trained and available; pad it to avoid pressure points.
- Apply ice (wrapped cloth) to reduce swelling, not directly on skin.
- Keep the person still and seek professional medical care.

Call emergency services for open fractures or severe deformity.`,
  Burns: `- Cool the burn under running cool (not cold) water for at least 10 minutes.
- Remove any restrictive clothing or jewelry near the burn.
- Cover with a sterile, non-fluffy dressing or clean cloth.
- Do not apply creams, oils, or ice directly.

Call emergency services for large, deep, or chemical burns.`,
  "Head Injury": `- Keep the person still; avoid moving their neck.
- Monitor consciousness and breathing.
- Look for signs of confusion, vomiting, unequal pupils, or seizures.
- If any concerning signs, call emergency services immediately.

Always err on side of caution with head injuries.`
};

export default function AIChat() {
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function pushMessage(msg) {
    setMessages((m) => [...m, { ...msg, id: Date.now() + Math.random() }]);
  }

  function safeAssistantText(text) {
    const safety = "\n\nNote: This assistant provides basic first aid guidance and does not replace professional emergency services. Call emergency services for serious cases.";
    // Ensure recommendation to call emergency services appears
    if (!/emergency services/i.test(text)) {
      return text + safety;
    }
    return text;
  }

  async function handleSend(text) {
    if (!text || loading) return;
    setError(null);
    pushMessage({ sender: "user", text });
    setInput("");
    setLoading(true);

    try {
      const aiText = await getFirstAidGuidance(text);
      pushMessage({ sender: "assistant", text: safeAssistantText(aiText) });
    } catch (err) {
      // If API key missing or API failed, use fallback rules heuristics
      console.warn("AI error", err);
      const code = err?.code;
      // Try simple mapping by keywords
      const key = Object.keys(fallbackRules).find((k) => new RegExp(k, "i").test(text));
      if (code === "NO_API_KEY" || (!code && !err?.ok) || key) {
        const reply = key ? fallbackRules[key] : `I'm unable to connect to the AI service right now. Here is some general guidance:\n\n- Stay calm.\n- Ensure scene safety.\n- Call emergency services if the situation is serious.\n\nFor quick help, try the buttons above (Bleeding, Unconscious Person, Fracture, Burns, Head Injury).`;
        pushMessage({ sender: "assistant", text: safeAssistantText(reply) });
      } else {
        pushMessage({ sender: "assistant", text: safeAssistantText("An error occurred while contacting the AI service. Please try again later.") });
      }
      setError(err?.message || "AI request failed");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e?.preventDefault();
    handleSend(input.trim());
  }

  function handleQuickPrompt(label) {
    const sample = label;
    // Add the user message and immediately respond (will call AI/fallback)
    handleSend(sample);
  }

  return (
    <div className="card-glass p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">AI First Aid Assistant</h2>
        <p className="text-xs text-white/50">This assistant provides basic first aid guidance and does not replace professional emergency services.</p>
      </div>

      <div className="flex gap-2 mb-4">
        {Object.keys(fallbackRules).map((k) => (
          <button
            key={k}
            onClick={() => handleQuickPrompt(k)}
            className="px-3 py-1 bg-emerald-600/20 text-emerald-300 rounded text-sm hover:bg-emerald-600/30"
          >
            {k}
          </button>
        ))}
      </div>

      <div className="h-64 overflow-y-auto mb-4 p-3 bg-white/5 rounded">
        {messages.length === 0 && <p className="text-sm text-white/40">Ask for simple first-aid steps or use a quick prompt.</p>}
        {messages.map((m) => (
          <div key={m.id} className={`mb-3 ${m.sender === "user" ? "text-right" : "text-left"}`}>
            <div className={`${m.sender === "user" ? "inline-block bg-cyan-500/10 text-cyan-200" : "inline-block bg-white/6 text-white/90"} px-3 py-2 rounded max-w-[85%]`}>{m.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && <div className="text-red-400 text-sm mb-2">Error: {error}</div>}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded bg-white/5 placeholder:text-white/30"
          placeholder="Describe the situation briefly (e.g. 'person bleeding from leg')"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-emerald-500 rounded disabled:opacity-50"
        >
          {loading ? <LoadingSpinner /> : "Send"}
        </button>
      </form>
    </div>
  );
}
