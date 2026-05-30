import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { serviceCategories } from "../../data/mockServices";

export default function MapView({ center = [28.6139, 77.209], markers = [] }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map only once
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(center, 14);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Clear existing markers (keep only markers we're adding this render)
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add user location marker (blue)
    if (center && center.length === 2) {
      const userIcon = L.divIcon({
        html: `<div class="w-6 h-6 bg-blue-500 rounded-full border-2 border-blue-300 shadow-lg"></div>`,
        className: "user-marker",
        iconSize: [24, 24],
      });
      L.marker(center, { icon: userIcon }).addTo(map).bindPopup("Your Location");
    }

    // Add service markers
    markers.forEach((marker) => {
      const category = serviceCategories[marker.category];
      const color = category?.color || "#22d3ee";

      const markerIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-8 h-8 rounded-full text-white font-bold shadow-lg" style="background-color: ${color}; border: 2px solid white;">${category?.icon || "📍"}</div>`,
        className: "service-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const popup = `
        <div class="text-sm">
          <p class="font-semibold text-gray-900">${marker.name}</p>
          <p class="text-xs text-gray-600">${marker.distance || 0}km away</p>
          ${marker.phone ? `<p class="text-xs text-gray-600"><a href="tel:${marker.phone}" class="text-blue-600">${marker.phone}</a></p>` : ""}
        </div>
      `;

      L.marker([marker.lat, marker.lng], { icon: markerIcon })
        .addTo(map)
        .bindPopup(popup);
    });
  }, [center, markers]);

  return (
    <div
      ref={mapRef}
      className="w-full h-64 sm:h-96 rounded-lg overflow-hidden shadow-lg"
      style={{ backgroundColor: "#020818" }}
    />
  );
}
