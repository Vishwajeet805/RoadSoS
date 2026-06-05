import { useState } from "react";
import { Users, Plus, Phone, Shield, AlertCircle, UserCheck } from "lucide-react";
import useEmergencyContacts from "../hooks/useEmergencyContacts";
import EmergencyContactCard from "../components/EmergencyContactCard";
import AddContactModal from "../components/AddContactModal";

export default function EmergencyContacts() {
  const { contacts, addContact, updateContact, deleteContact } = useEmergencyContacts();
  const [modalOpen, setModalOpen] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // stores id to delete

  /* ── Modal helpers ─────────────────────────────────────── */
  const openAdd = () => {
    setEditContact(null);
    setModalOpen(true);
  };

  const openEdit = (contact) => {
    setEditContact(contact);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditContact(null);
  };

  /**
   * Unified save handler passed to AddContactModal.
   * In add mode:  called as onSave(data)
   * In edit mode: called as onSave(id, data)
   */
  const handleSave = (idOrData, maybeData) => {
    if (maybeData !== undefined) {
      // edit mode
      return updateContact(idOrData, maybeData);
    }
    // add mode
    return addContact(idOrData);
  };

  const requestDelete = (id) => setDeleteConfirm(id);

  const confirmDelete = () => {
    if (deleteConfirm) {
      deleteContact(deleteConfirm);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* ── Page Header ─────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-12 animate-slide-in-left">
          <div className="p-4 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl shadow-glow-md flex-shrink-0">
            <Users size={32} className="text-white" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              Emergency Contacts
            </h1>
            <p className="text-white/40 text-sm mt-2 font-semibold uppercase tracking-widest">
              Trusted people to alert in a crisis
            </p>
          </div>
        </div>

        {/* ── Stats Row ────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          {[
            {
              icon: UserCheck,
              label: "Saved Contacts",
              value: contacts.length,
              color: "text-cyan-400",
              ring: "border-cyan-500/20 bg-cyan-500/8",
            },
            {
              icon: Phone,
              label: "One-tap Call",
              value: "Ready",
              color: "text-emerald-400",
              ring: "border-emerald-500/20 bg-emerald-500/8",
            },
            {
              icon: Shield,
              label: "Offline Access",
              value: "✓ Active",
              color: "text-amber-400",
              ring: "border-amber-500/20 bg-amber-500/8",
            },
          ].map(({ icon: Icon, label, value, color, ring }) => (
            <div
              key={label}
              className={`card-premium p-6 rounded-2xl border ${ring} text-center hover-lift transition-all duration-300 group`}
            >
              <Icon size={24} className={`${color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">
                {label}
              </p>
              <p className={`font-display font-black text-2xl ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* ── How It Works Banner ──────────────────────────── */}
        <div
          className="mb-8 p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/8 flex flex-col sm:flex-row gap-4 items-start animate-slide-up"
          style={{ animationDelay: "150ms" }}
        >
          <AlertCircle size={20} className="text-cyan-400 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-cyan-300 text-base font-semibold">How it works</p>
            <p className="text-white/50 text-sm mt-2 leading-relaxed">
              When SOS is activated (button, voice, or crash detection), RoadSoS automatically
              generates an emergency message with your live GPS location and displays one-tap
              WhatsApp, SMS, and call buttons for every contact below.
            </p>
          </div>
        </div>

        {/* ── Add Button + Count ───────────────────────────── */}
        <div
          className="flex items-center justify-between mb-6 animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          <p className="text-white/40 text-sm font-semibold">
            {contacts.length === 0
              ? "No contacts saved yet"
              : `${contacts.length} contact${contacts.length !== 1 ? "s" : ""} saved`}
          </p>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-display font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-glow-sm"
          >
            <Plus size={16} />
            Add Contact
          </button>
        </div>

        {/* ── Contact Grid ─────────────────────────────────── */}
        {contacts.length === 0 ? (
          <div
            className="card-premium rounded-3xl p-16 text-center border border-dashed border-white/15 animate-slide-up"
            style={{ animationDelay: "250ms" }}
          >
            <Users size={56} className="text-white/18 mx-auto mb-6" />
            <h3 className="font-display font-bold text-2xl text-white/45 mb-3">
              No Emergency Contacts
            </h3>
            <p className="text-white/30 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
              Add trusted family members or friends who should be alerted immediately if you're in
              an accident or emergency.
            </p>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-display font-black text-sm transition-all hover:scale-105 active:scale-95"
            >
              <Plus size={18} />
              Add Your First Contact
            </button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up"
            style={{ animationDelay: "250ms" }}
          >
            {contacts.map((contact, idx) => (
              <div
                key={contact.id}
                className="animate-slide-up"
                style={{ animationDelay: `${300 + idx * 60}ms` }}
              >
                <EmergencyContactCard
                  contact={contact}
                  onEdit={openEdit}
                  onDelete={requestDelete}
                />
              </div>
            ))}
          </div>
        )}

        {/* ── Privacy Note ─────────────────────────────────── */}
        <div
          className="mt-12 p-5 rounded-2xl border border-white/8 bg-white/2 animate-slide-up"
          style={{ animationDelay: "400ms" }}
        >
          <p className="text-xs text-white/30 text-center leading-relaxed">
            🔒 All contact data is stored locally on your device only. Nothing is sent to any
            server. This feature works fully offline.
          </p>
        </div>
      </div>

      {/* ── Add / Edit Modal ─────────────────────────────────── */}
      <AddContactModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSave={handleSave}
        editContact={editContact}
      />

      {/* ── Delete Confirmation Modal ────────────────────────── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm card-premium rounded-3xl border border-emergency/25 p-8 animate-scale-in text-center shadow-2xl">
            <div className="w-14 h-14 bg-emergency/15 rounded-full flex items-center justify-center mx-auto mb-5 border border-emergency/25">
              <AlertCircle size={28} className="text-emergency" />
            </div>
            <h3 className="font-display font-black text-xl text-white mb-2">Remove Contact?</h3>
            <p className="text-white/45 text-sm mb-8 leading-relaxed">
              This contact will be permanently removed from your emergency list.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white/65 hover:text-white font-semibold text-sm transition-all hover:scale-105 active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-3.5 rounded-xl bg-emergency/18 hover:bg-emergency/28 border border-emergency/35 text-emergency font-display font-bold text-sm transition-all hover:scale-105 active:scale-95"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
