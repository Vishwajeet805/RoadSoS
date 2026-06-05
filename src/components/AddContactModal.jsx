import { useState, useEffect } from "react";
import { X, User, Phone, Heart } from "lucide-react";
import { emergencyContactService } from "../services/emergencyContactService";

/**
 * AddContactModal
 * Dual-mode: add (editContact=null) and edit (editContact=contact object).
 *
 * @param {boolean}       isOpen        - Controls modal visibility
 * @param {Function}      onClose       - Close modal callback
 * @param {Function}      onSave        - Called with (data) for add, or (id, data) for edit
 * @param {Object|null}   editContact   - Contact to edit, null for add mode
 */
export default function AddContactModal({ isOpen, onClose, onSave, editContact = null }) {
  const [form, setForm] = useState({ name: "", relationship: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Populate form when editing; reset when adding
  useEffect(() => {
    if (editContact) {
      setForm({
        name: editContact.name,
        relationship: editContact.relationship,
        phone: editContact.phone,
      });
    } else {
      setForm({ name: "", relationship: "", phone: "" });
    }
    setError("");
  }, [editContact, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const trimmed = {
      name: form.name.trim(),
      relationship: form.relationship.trim(),
      phone: form.phone.trim(),
    };

    const result = editContact ? onSave(editContact.id, trimmed) : onSave(trimmed);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setLoading(false);
      onClose();
    }
  };

  const inputBase =
    "w-full bg-white/5 border border-white/15 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/60 focus:bg-white/8 transition-all text-sm";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={editContact ? "Edit emergency contact" : "Add emergency contact"}
    >
      <div className="w-full max-w-md card-premium rounded-3xl border border-white/20 p-8 animate-scale-in shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="font-display font-black text-2xl text-white">
              {editContact ? "Edit Contact" : "Add Contact"}
            </h2>
            <p className="text-white/40 text-sm mt-1">
              {editContact ? "Update trusted contact details" : "Add a trusted emergency contact"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-white/40 hover:text-white transition-all ml-4 flex-shrink-0"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-white/55 uppercase tracking-widest mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"
              />
              <input
                type="text"
                placeholder="e.g. Ravi Singh"
                value={form.name}
                onChange={handleChange("name")}
                className={inputBase}
                maxLength={50}
                autoComplete="name"
              />
            </div>
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-xs font-bold text-white/55 uppercase tracking-widest mb-2">
              Relationship *
            </label>
            <div className="relative">
              <Heart
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"
              />
              <select
                value={form.relationship}
                onChange={handleChange("relationship")}
                className={`${inputBase} appearance-none cursor-pointer`}
              >
                <option value="" disabled className="bg-navy-900 text-white/40">
                  Select relationship
                </option>
                {emergencyContactService.RELATIONSHIP_OPTIONS.map((r) => (
                  <option key={r} value={r} className="bg-navy-900 text-white">
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold text-white/55 uppercase tracking-widest mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 pointer-events-none"
              />
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={handleChange("phone")}
                className={`${inputBase} font-mono`}
                maxLength={20}
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
            <p className="text-white/25 text-xs mt-2 pl-1">
              Include country code for WhatsApp (e.g. +91 for India)
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emergency/12 border border-emergency/30 text-emergency text-sm">
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/65 hover:text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-display font-black text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-glow-sm"
            >
              {loading ? "Saving…" : editContact ? "Update Contact" : "Add Contact"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
