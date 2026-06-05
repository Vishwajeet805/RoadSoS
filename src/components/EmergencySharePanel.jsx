import { useState } from "react";
import { Phone, MessageCircle, Send, MapPin, Copy, CheckCircle, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { emergencyMessageService } from "../services/emergencyMessageService";
import useEmergencyContacts from "../hooks/useEmergencyContacts";

/**
 * EmergencySharePanel
 * Rendered inside the Dashboard SOS active section.
 * Shows all saved contacts with one-tap Call / WhatsApp / SMS buttons,
 * the generated emergency message, and a Maps link.
 *
 * @param {Object|null} location  - { lat, lng } from useGeolocation
 * @param {string}      keyword   - Trigger keyword (Voice, manual, crash, etc.)
 */
export default function EmergencySharePanel({ location, keyword }) {
  const { contacts } = useEmergencyContacts();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const message = emergencyMessageService.generateMessage({
    location,
    keyword,
    timestamp: Date.now(),
  });

  const mapsURL = emergencyMessageService.getGoogleMapsURL(location);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard not available — silent fail, user can still read the message
    }
  };

  return (
    <div className="space-y-5">
      {/* Panel Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/20 rounded-lg border border-emerald-500/30">
          <Send size={18} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="font-display font-bold text-white text-lg">Notify Emergency Contacts</h3>
          <p className="text-white/40 text-xs mt-0.5">One-tap alert with your live location</p>
        </div>
      </div>

      {/* Location Status Bar */}
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium ${
          mapsURL
            ? "border-emerald-500/30 bg-emerald-500/8 text-emerald-300"
            : "border-orange-500/30 bg-orange-500/8 text-orange-300"
        }`}
      >
        <MapPin size={15} className="flex-shrink-0" />
        <span>
          {mapsURL
            ? `Location attached: ${location?.lat?.toFixed(5)}, ${location?.lng?.toFixed(5)}`
            : "Location unavailable — using last known or omitted from message"}
        </span>
      </div>

      {/* Contact List */}
      {contacts.length === 0 ? (
        <div className="p-6 rounded-2xl border border-dashed border-white/20 bg-white/3 text-center">
          <Users size={32} className="text-white/25 mx-auto mb-3" />
          <p className="text-white/50 font-semibold text-sm mb-1">No emergency contacts saved</p>
          <p className="text-white/30 text-xs mb-4">
            Add trusted contacts so RoadSoS can alert them instantly during an emergency.
          </p>
          <button
            onClick={() => navigate("/contacts")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/35 text-cyan-300 text-sm font-bold transition-all hover:scale-105 active:scale-95"
          >
            + Add Emergency Contacts
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {contacts.map((contact) => {
            const whatsapp = emergencyMessageService.getWhatsAppLink(contact.phone, message);
            const sms = emergencyMessageService.getSMSLink(contact.phone, message);
            return (
              <div
                key={contact.id}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-white text-sm truncate">
                    {contact.name}
                  </p>
                  <p className="text-white/35 text-xs font-mono mt-0.5">
                    {contact.phone} · {contact.relationship}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  {/* Call */}
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-2.5 rounded-xl bg-emergency/18 hover:bg-emergency/30 border border-emergency/35 text-emergency transition-all hover:scale-110 active:scale-95"
                    title={`Call ${contact.name}`}
                    aria-label={`Call ${contact.name}`}
                  >
                    <Phone size={15} />
                  </a>
                  {/* WhatsApp */}
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-emerald-500/18 hover:bg-emerald-500/30 border border-emerald-500/35 text-emerald-400 transition-all hover:scale-110 active:scale-95"
                    title={`WhatsApp ${contact.name}`}
                    aria-label={`WhatsApp ${contact.name}`}
                  >
                    <MessageCircle size={15} />
                  </a>
                  {/* SMS */}
                  <a
                    href={sms}
                    className="p-2.5 rounded-xl bg-cyan-500/18 hover:bg-cyan-500/30 border border-cyan-500/35 text-cyan-400 transition-all hover:scale-110 active:scale-95"
                    title={`SMS ${contact.name}`}
                    aria-label={`SMS ${contact.name}`}
                  >
                    <Send size={15} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Emergency Message Preview + Copy */}
      <div className="p-4 rounded-2xl bg-white/4 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-white/45 uppercase tracking-widest">
            Auto-generated message
          </p>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              copied
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-white/8 text-white/55 hover:text-white border border-white/15 hover:bg-white/15"
            }`}
            aria-label="Copy emergency message"
          >
            {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="text-xs text-white/55 whitespace-pre-wrap font-mono leading-relaxed max-h-36 overflow-y-auto scrollbar-thin">
          {message}
        </pre>
      </div>

      {/* Open in Maps */}
      {mapsURL && (
        <a
          href={mapsURL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-cyan-500/12 hover:bg-cyan-500/22 border border-cyan-500/30 text-cyan-300 text-sm font-bold transition-all hover:scale-105 active:scale-95"
        >
          <MapPin size={16} />
          Open My Location on Google Maps
        </a>
      )}
    </div>
  );
}
