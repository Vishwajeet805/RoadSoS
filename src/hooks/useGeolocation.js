import { useState, useEffect, useCallback } from "react";
import { storage } from "../utils/storageUtils";

export default function useGeolocation(autoStart = true) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [accuracy, setAccuracy] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [isFromStorage, setIsFromStorage] = useState(false);

  const saveLocation = useCallback((lat, lng, acc, ts) => {
    storage.set("lastLocation", {
      lat,
      lng,
      accuracy: acc,
      timestamp: ts,
    });
  }, []);

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported on this device");
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy: acc } = pos.coords;
        setLocation({ lat: latitude, lng: longitude });
        setAccuracy(Math.round(acc));
        setTimestamp(new Date(pos.timestamp));
        setIsFromStorage(false);
        saveLocation(latitude, longitude, Math.round(acc), pos.timestamp);
        setLoading(false);
      },
      (err) => {
        let errorMsg = "Unable to get location";
        if (err.code === 1) errorMsg = "Permission denied. Please enable location access.";
        else if (err.code === 2) errorMsg = "Location unavailable";
        else if (err.code === 3) errorMsg = "Request timeout";
        setError(errorMsg);
        setLoading(false);
      },
      options
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [saveLocation]);

  useEffect(() => {
    const lastLocation = storage.get("lastLocation");
    if (lastLocation) {
      setLocation({ lat: lastLocation.lat, lng: lastLocation.lng });
      setAccuracy(lastLocation.accuracy);
      setTimestamp(new Date(lastLocation.timestamp));
      setIsFromStorage(true);
    }

    if (autoStart) {
      const cleanup = getLocation();
      return cleanup;
    }
  }, [autoStart, getLocation]);

  const clearError = useCallback(() => setError(null), []);

  return { location, error, loading, accuracy, timestamp, getLocation, clearError, isFromStorage };
}
