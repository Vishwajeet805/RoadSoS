/**
 * emergencyMessageService.js
 * Handles emergency message generation, sharing links, and location formatting.
 * Pure JS — no React. Works fully offline.
 */

function getGoogleMapsURL(location) {
  if (!location?.lat || !location?.lng) return null;
  return `https://maps.google.com/?q=${location.lat},${location.lng}`;
}

function generateMessage({ location, keyword, timestamp } = {}) {
  const mapsURL = getGoogleMapsURL(location);
  const time = timestamp
    ? new Date(timestamp).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

  const lines = [
    "🚨 EMERGENCY ALERT — RoadSoS 🚨",
    "",
    "I may need immediate assistance after a road accident or emergency.",
    keyword ? `Trigger: ${keyword.toUpperCase()}` : null,
    "",
    mapsURL
      ? `📍 My current location:\n${mapsURL}`
      : "📍 Location data unavailable. Please call me directly.",
    "",
    `🕒 Time: ${time}`,
    "",
    "Please contact me or call emergency services (112) immediately.",
    "",
    "— Sent via RoadSoS Emergency Response Platform",
  ].filter((l) => l !== null);

  return lines.join("\n");
}

/**
 * wa.me link for WhatsApp.
 * If phone is provided, opens a chat directly.
 * Without phone, opens share dialog (broadcast fallback).
 */
function getWhatsAppLink(phone, message) {
  const encoded = encodeURIComponent(message);
  if (phone) {
    const cleaned = phone.replace(/[^\d]/g, "");
    return `https://wa.me/${cleaned}?text=${encoded}`;
  }
  return `https://wa.me/?text=${encoded}`;
}

/**
 * sms: deep link.
 * Works on iOS and Android. Body param is iOS-compatible.
 */
function getSMSLink(phone, message) {
  const encoded = encodeURIComponent(message);
  return `sms:${phone || ""}?body=${encoded}`;
}

export const emergencyMessageService = {
  generateMessage,
  getWhatsAppLink,
  getSMSLink,
  getGoogleMapsURL,
};
