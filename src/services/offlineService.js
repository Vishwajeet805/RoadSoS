import { firstAidGuide } from "../data/firstAidGuide";
import { defaultContacts } from "../data/emergencyContacts";

const CACHE_KEYS = {
  LOCATION: "roadsos_offline_location",
  EMERGENCY_CONTACTS: "roadsos_offline_contacts",
  FIRST_AID_GUIDE: "roadsos_offline_guide",
  NEARBY_SERVICES: "roadsos_offline_services",
  SERVICES_TIMESTAMP: "roadsos_offline_services_ts",
};

export const offlineService = {
  // Cache user location
  cacheLocation: (location) => {
    try {
      localStorage.setItem(CACHE_KEYS.LOCATION, JSON.stringify({
        ...location,
        timestamp: Date.now(),
      }));
    } catch (e) {
      console.error("Failed to cache location:", e);
    }
  },

  // Get cached location
  getCachedLocation: () => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.LOCATION);
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      console.error("Failed to get cached location:", e);
      return null;
    }
  },

  // Cache emergency contacts (default ones)
  cacheEmergencyContacts: () => {
    try {
      localStorage.setItem(CACHE_KEYS.EMERGENCY_CONTACTS, JSON.stringify({
        contacts: defaultContacts,
        timestamp: Date.now(),
      }));
    } catch (e) {
      console.error("Failed to cache emergency contacts:", e);
    }
  },

  // Get cached emergency contacts
  getCachedEmergencyContacts: () => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.EMERGENCY_CONTACTS);
      if (cached) {
        const data = JSON.parse(cached);
        return data.contacts;
      }
      // Fallback to default
      offlineService.cacheEmergencyContacts();
      return defaultContacts;
    } catch (e) {
      console.error("Failed to get cached emergency contacts:", e);
      return defaultContacts;
    }
  },

  // Cache first aid guide
  cacheFirstAidGuide: () => {
    try {
      localStorage.setItem(CACHE_KEYS.FIRST_AID_GUIDE, JSON.stringify({
        guide: firstAidGuide,
        timestamp: Date.now(),
      }));
    } catch (e) {
      console.error("Failed to cache first aid guide:", e);
    }
  },

  // Get cached first aid guide
  getCachedFirstAidGuide: () => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.FIRST_AID_GUIDE);
      if (cached) {
        const data = JSON.parse(cached);
        return data.guide;
      }
      // Fallback to default
      offlineService.cacheFirstAidGuide();
      return firstAidGuide;
    } catch (e) {
      console.error("Failed to get cached first aid guide:", e);
      return firstAidGuide;
    }
  },

  // Cache nearby services
  cacheNearbyServices: (services) => {
    try {
      localStorage.setItem(CACHE_KEYS.NEARBY_SERVICES, JSON.stringify(services));
      localStorage.setItem(CACHE_KEYS.SERVICES_TIMESTAMP, Date.now().toString());
    } catch (e) {
      console.error("Failed to cache nearby services:", e);
    }
  },

  // Get cached nearby services
  getCachedNearbyServices: () => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.NEARBY_SERVICES);
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      console.error("Failed to get cached nearby services:", e);
      return null;
    }
  },

  // Get cached services timestamp
  getCachedServicesTimestamp: () => {
    try {
      const ts = localStorage.getItem(CACHE_KEYS.SERVICES_TIMESTAMP);
      return ts ? parseInt(ts) : null;
    } catch (e) {
      console.error("Failed to get services timestamp:", e);
      return null;
    }
  },

  // Clear all offline data
  clearAll: () => {
    try {
      Object.values(CACHE_KEYS).forEach(key => localStorage.removeItem(key));
    } catch (e) {
      console.error("Failed to clear offline data:", e);
    }
  },
};
