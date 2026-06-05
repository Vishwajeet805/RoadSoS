import { useState, useCallback, useEffect } from "react";
import { emergencyContactService } from "../services/emergencyContactService";

/**
 * useEmergencyContacts
 * React state layer over emergencyContactService.
 * Reads from localStorage on mount; keeps state in sync after mutations.
 */
export default function useEmergencyContacts() {
  const [contacts, setContacts] = useState([]);

  // Load contacts on mount
  useEffect(() => {
    setContacts(emergencyContactService.getContacts());
  }, []);

  const addContact = useCallback((data) => {
    const result = emergencyContactService.addContact(data);
    if (result?.error) return result; // return error object to caller
    setContacts(emergencyContactService.getContacts());
    return result;
  }, []);

  const updateContact = useCallback((id, data) => {
    const result = emergencyContactService.updateContact(id, data);
    if (result?.error) return result;
    setContacts(emergencyContactService.getContacts());
    return result;
  }, []);

  const deleteContact = useCallback((id) => {
    emergencyContactService.deleteContact(id);
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { contacts, addContact, updateContact, deleteContact };
}
