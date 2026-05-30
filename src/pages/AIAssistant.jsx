import { Bot } from "lucide-react";

export default function AIAssistant() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Bot size={28} className="text-emerald-400" />
        <h1 className="font-display text-3xl font-bold">AI First Aid Assistant</h1>
      </div>
      <div className="card-glass p-12 text-center">
        <Bot size={48} className="mx-auto mb-4 text-emerald-400/30" />
        <p className="text-white/40 text-sm">Gemini-powered first aid guidance</p>
        <p className="text-white/20 text-xs mt-2">Integration in Phase 3</p>
      </div>
    </div>
  );
}
