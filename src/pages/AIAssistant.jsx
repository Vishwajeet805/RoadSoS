import { Bot, AlertCircle } from "lucide-react";
import AIChat from "../components/AIChat";

export default function AIAssistant() {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12 animate-slide-in-left">
          <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl">
            <Bot size={32} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="font-display text-5xl sm:text-6xl font-black tracking-tight">AI First Aid Assistant</h1>
            <p className="text-white/50 text-sm mt-2 font-semibold uppercase tracking-widest">Gemini-Powered Emergency Guidance</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* AI Assistant Card */}
          <div className="card-premium p-8 rounded-3xl border border-white/20 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <AIChat />
          </div>

          {/* Safety Disclaimer */}
          <div className="card-premium p-6 rounded-2xl border border-emergency/30 bg-gradient-to-r from-emergency/10 to-red-600/5 glass-md animate-slide-up" style={{ animationDelay: "150ms" }}>
            <div className="flex items-start gap-4">
              <AlertCircle size={20} className="text-emergency flex-shrink-0 mt-1" />
              <div>
                <p className="font-display font-bold text-white mb-2">Safety Notice</p>
                <p className="text-sm text-white/70 leading-relaxed">
                  This AI assistant provides basic first aid guidance and <strong>does not replace professional emergency services</strong>. Always call emergency services (112) for serious injuries, heavy bleeding, unconsciousness, or life-threatening situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
