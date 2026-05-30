import { Bot } from "lucide-react";
import AIChat from "../components/AIChat";

export default function AIAssistant() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-6">
        <Bot size={28} className="text-emerald-400" />
        <h1 className="font-display text-3xl font-bold">AI First Aid Assistant</h1>
      </div>

      <div className="space-y-6">
        <AIChat />

        <div className="text-xs text-white/40">
          <strong>Safety disclaimer:</strong> This assistant provides basic first aid guidance and does not replace professional emergency services. Always call emergency services for serious cases.
        </div>
      </div>
    </div>
  );
}
