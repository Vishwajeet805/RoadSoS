import { Phone, MessageCircle, Edit2, Trash2, User } from "lucide-react";
import { emergencyMessageService } from "../services/emergencyMessageService";

const RELATIONSHIP_COLORS = {
  Father: "text-blue-400 bg-blue-500/15 border-blue-500/30",
  Mother: "text-pink-400 bg-pink-500/15 border-pink-500/30",
  Spouse: "text-rose-400 bg-rose-500/15 border-rose-500/30",
  Sibling: "text-purple-400 bg-purple-500/15 border-purple-500/30",
  Friend: "text-cyan-400 bg-cyan-500/15 border-cyan-500/30",
  Guardian: "text-amber-400 bg-amber-500/15 border-amber-500/30",
  Colleague: "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
  Other: "text-white/60 bg-white/10 border-white/20",
};

/**
 * EmergencyContactCard
 * @param {Object}   contact   - Contact object {id, name, relationship, phone}
 * @param {Function} onEdit    - Called with contact object to open edit modal
 * @param {Function} onDelete  - Called with contact id to trigger delete confirm
 * @param {boolean}  compact   - When true, hides Call/WhatsApp action buttons (used inside SOS panel)
 */
export default function EmergencyContactCard({ contact, onEdit, onDelete, compact = false }) {
  const relColor = RELATIONSHIP_COLORS[contact.relationship] || RELATIONSHIP_COLORS.Other;

  const handleWhatsApp = () => {
    const msg = emergencyMessageService.generateMessage({ keyword: "Manual SOS" });
    const link = emergencyMessageService.getWhatsAppLink(contact.phone, msg);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="card-premium p-5 rounded-2xl border border-white/10 hover-lift transition-all group">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 flex items-center justify-center">
          <User size={22} className="text-cyan-400" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <p className="font-display font-bold text-white text-lg truncate">{contact.name}</p>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${relColor}`}>
              {contact.relationship}
            </span>
          </div>
          <p className="text-white/55 text-sm font-mono tracking-wide">{contact.phone}</p>
        </div>

        {/* Edit / Delete — visible on hover */}
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
          <button
            onClick={() => onEdit(contact)}
            className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-cyan-400 transition-all"
            title="Edit contact"
            aria-label={`Edit ${contact.name}`}
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete(contact.id)}
            className="p-2 rounded-lg hover:bg-emergency/20 text-white/40 hover:text-emergency transition-all"
            title="Delete contact"
            aria-label={`Delete ${contact.name}`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Action Buttons — hidden in compact mode */}
      {!compact && (
        <div className="flex gap-2.5 mt-4">
          <a
            href={`tel:${contact.phone}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emergency/15 hover:bg-emergency/25 border border-emergency/35 text-emergency text-sm font-bold transition-all hover:scale-105 active:scale-95"
            aria-label={`Call ${contact.name}`}
          >
            <Phone size={14} />
            Call
          </a>
          <button
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-400 text-sm font-bold transition-all hover:scale-105 active:scale-95"
            aria-label={`WhatsApp ${contact.name}`}
          >
            <MessageCircle size={14} />
            WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
