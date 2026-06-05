import { storage } from "../utils/storageUtils";

const CONTACTS_KEY = "personal_contacts";

const RELATIONSHIP_OPTIONS = [
  "Father",
  "Mother",
  "Spouse",
  "Sibling",
  "Friend",
  "Guardian",
  "Colleague",
  "Other",
];

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function validateContact(data) {
  const errors = [];
  if (!data.name?.trim()) {
    errors.push("Name is required.");
  }
  if (!data.relationship?.trim()) {
    errors.push("Relationship is required.");
  }
  if (!data.phone?.trim()) {
    errors.push("Phone number is required.");
  } else if (!/^[+\d\s\-().]{7,20}$/.test(data.phone.trim())) {
    errors.push("Enter a valid phone number (7–20 digits, may include + or spaces).");
  }
  return { valid: errors.length === 0, errors };
}

function getContacts() {
  return storage.get(CONTACTS_KEY) || [];
}

function addContact(data) {
  const validation = validateContact(data);
  if (!validation.valid) return { error: validation.errors[0] };

  const contacts = getContacts();
  const normalised = data.phone.replace(/\s/g, "");
  if (contacts.some((c) => c.phone.replace(/\s/g, "") === normalised)) {
    return { error: "A contact with this phone number already exists." };
  }

  const contact = {
    id: generateId(),
    name: data.name.trim(),
    relationship: data.relationship.trim(),
    phone: data.phone.trim(),
    createdAt: Date.now(),
  };

  storage.set(CONTACTS_KEY, [...contacts, contact]);
  return contact;
}

function updateContact(id, data) {
  const validation = validateContact(data);
  if (!validation.valid) return { error: validation.errors[0] };

  const contacts = getContacts();
  const normalised = data.phone.replace(/\s/g, "");
  if (contacts.some((c) => c.id !== id && c.phone.replace(/\s/g, "") === normalised)) {
    return { error: "A contact with this phone number already exists." };
  }

  const updated = contacts.map((c) =>
    c.id === id
      ? {
          ...c,
          name: data.name.trim(),
          relationship: data.relationship.trim(),
          phone: data.phone.trim(),
        }
      : c
  );

  storage.set(CONTACTS_KEY, updated);
  return updated.find((c) => c.id === id) || null;
}

function deleteContact(id) {
  const contacts = getContacts();
  storage.set(
    CONTACTS_KEY,
    contacts.filter((c) => c.id !== id)
  );
  return true;
}

export const emergencyContactService = {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
  validateContact,
  RELATIONSHIP_OPTIONS,
};
