import { useEffect, useState } from "react";

export default function useOfflineStatus() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);
  const [wasOffline, setWasOffline] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        setNotificationMessage("Connection restored! Using live data.");
        setShowNotification(true);
        setWasOffline(false);
        setTimeout(() => setShowNotification(false), 4000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      setNotificationMessage("You are offline. Using cached data.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [wasOffline]);

  return {
    isOnline,
    wasOffline,
    showNotification,
    notificationMessage,
    isOffline: !isOnline,
  };
}
