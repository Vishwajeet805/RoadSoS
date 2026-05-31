import { useState, useEffect } from "react";
import { MapPin, Map, Filter, AlertCircle, RefreshCw, WifiOff } from "lucide-react";
import MapView from "../components/map/MapView";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { mockServices, serviceCategories } from "../data/mockServices";
import { getAllServices, filterServices } from "../utils/serviceUtils";
import { formatDistance } from "../utils/locationUtils";
import { fetchNearbyServices, getCachedServices, cacheServices } from "../services/overpassService";
import useOfflineStatus from "../hooks/useOfflineStatus";
import { offlineService } from "../services/offlineService";

export default function NearbyServices() {
  const { isOnline, isOffline, showNotification, notificationMessage } = useOfflineStatus();
  const [userLocation, setUserLocation] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState(null); // 'api', 'cache', 'mock'
  const [apiSearchRadius, setApiSearchRadius] = useState(5000); // 5km in meters
  const [cachedTimestamp, setCachedTimestamp] = useState(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        () => {
          // Fallback to default location (New Delhi)
          setUserLocation([28.6139, 77.209]);
        }
      );
    } else {
      setUserLocation([28.6139, 77.209]);
    }
  }, []);

  // Fetch services when location is available
  useEffect(() => {
    if (!userLocation) return;

    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      let services = [];
      let source = null;

      try {
        // Check cache first
        const cached = getCachedServices(userLocation[0], userLocation[1]);
        if (cached?.services && cached.services.length > 0) {
          services = cached.services;
          source = "cache";
          console.log("Using cached services:", services.length);
        } else {
          // Fetch from Overpass API
          const result = await fetchNearbyServices(userLocation[0], userLocation[1], apiSearchRadius);

          if (result.success && result.services.length > 0) {
            services = result.services;
            source = "api";
            cacheServices(userLocation[0], userLocation[1], result);
            console.log("Fetched from Overpass API:", services.length);
          } else {
            // API failed or returned no results, use mock data
            services = mockServices;
            source = "mock";
            setError(
              result.error
                ? `API Error: ${result.error}. Using mock data.`
                : "No services found. Using mock data."
            );
            console.log("Using mock services as fallback");
          }
        }

        // Calculate distances
        const servicesWithDistance = services.map((service) => ({
          ...service,
          distance: calculateDistance(userLocation[0], userLocation[1], service.lat, service.lng),
        }));

        setAllServices(servicesWithDistance);
        setFilteredServices(servicesWithDistance);
        setDataSource(source);

        // Cache services for offline mode
        if (source === "api" || source === "cache") {
          offlineService.cacheNearbyServices(servicesWithDistance);
          setCachedTimestamp(new Date());
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        // Use mock data on any error
        const servicesWithDistance = mockServices.map((service) => ({
          ...service,
          distance: calculateDistance(userLocation[0], userLocation[1], service.lat, service.lng),
        }));
        setAllServices(servicesWithDistance);
        setFilteredServices(servicesWithDistance);
        setDataSource("mock");
        setError("Failed to fetch services. Using mock data.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [userLocation, apiSearchRadius]);

  // Calculate distance using Haversine formula
  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
  }

  // Filter services when categories change
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredServices(allServices);
    } else {
      const filtered = filterServices(allServices, selectedCategories);
      setFilteredServices(filtered);
    }
  }, [selectedCategories, allServices]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleDirections = (service) => {
    if (userLocation) {
      const mapsUrl = `https://www.google.com/maps/dir/${userLocation[0]},${userLocation[1]}/${service.lat},${service.lng}`;
      window.open(mapsUrl, "_blank");
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setUserLocation([userLocation[0], userLocation[1]]); // Trigger re-fetch
  };

  if (!userLocation) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-white/40">Detecting location...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Offline Notification */}
      {showNotification && (
        <div className={`mb-6 p-3 rounded-lg border-l-4 flex items-center gap-3 animate-fade-in ${
          isOffline
            ? "border-orange-400 bg-orange-500/10 text-orange-300"
            : "border-emerald-400 bg-emerald-500/10 text-emerald-300"
        }`}>
          {isOffline ? (
            <WifiOff size={20} className="flex-shrink-0" />
          ) : (
            <AlertCircle size={20} className="flex-shrink-0" />
          )}
          <p className="text-sm font-medium">{notificationMessage}</p>
        </div>
      )}

      {/* Offline Mode Banner */}
      {isOffline && (
        <div className="mb-6 p-4 rounded-lg border-2 border-orange-400 bg-orange-500/5">
          <div className="flex items-center gap-3">
            <WifiOff size={24} className="text-orange-400" />
            <div>
              <p className="font-display font-bold text-orange-300">Offline Mode Active</p>
              {cachedTimestamp && (
                <p className="text-xs text-white/60">Last updated: {cachedTimestamp.toLocaleTimeString()}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MapPin size={28} className="text-cyan-400" />
        <div className="flex-1">
          <h1 className="font-display text-3xl font-bold">Nearby Services</h1>
          {dataSource && (
            <p className="text-xs text-white/40 mt-1">
              Data: {dataSource === "api" ? "🌐 Live" : dataSource === "cache" ? "💾 Cached" : "📋 Mock"} {isOffline && "· Offline Mode"}
            </p>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 card-glass p-4 border border-emergency/50 bg-emergency/10 flex items-start gap-3">
          <AlertCircle size={20} className="text-emergency flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-emergency">{error}</p>
            <button
              onClick={handleRetry}
              className="text-xs text-cyan-400 hover:text-cyan-300 mt-2 flex items-center gap-1"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        </div>
      )}

      {/* Search Radius Adjustment */}
      <div className="mb-6 card-glass p-4">
        <label className="text-sm font-semibold flex items-center gap-2">
          <span>Search Radius:</span>
          <select
            value={apiSearchRadius}
            onChange={(e) => setApiSearchRadius(Number(e.target.value))}
            disabled={loading}
            className="bg-navy-800 text-cyan-400 px-2 py-1 rounded text-xs border border-cyan-500/30 disabled:opacity-50"
          >
            <option value={2000}>2 km</option>
            <option value={5000}>5 km (default)</option>
            <option value={10000}>10 km</option>
            <option value={15000}>15 km</option>
          </select>
        </label>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner />
          <p className="text-white/40 mt-4 text-sm">Fetching nearby services...</p>
        </div>
      )}

      {!loading && (
        <>
          {/* Map Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Map size={20} className="text-cyan-400" />
              <h2 className="text-lg font-semibold">Map View</h2>
            </div>
            <MapView center={userLocation} markers={allServices} />
          </div>

          {/* Filter Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-cyan-400" />
              <h2 className="text-lg font-semibold">Filter by Category</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {Object.entries(serviceCategories).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => toggleCategory(key)}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                    selectedCategories.includes(key)
                      ? "bg-cyan-500 text-white"
                      : "card-glass text-white/60 hover:text-white"
                  }`}
                >
                  <span className="mr-1">{value.icon}</span>
                  {value.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services List Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Services ({filteredServices.length})
              </h2>
            </div>

            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="card-glass p-4 hover:bg-white/8 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">
                            {serviceCategories[service.category]?.icon || "📍"}
                          </span>
                          <p className="font-semibold text-white text-sm">{service.name}</p>
                        </div>
                        <p className="text-white/40 text-xs capitalize">
                          {serviceCategories[service.category]?.label || service.category}
                        </p>
                      </div>
                      <span className="text-cyan-400 text-xs flex items-center gap-1 whitespace-nowrap">
                        <MapPin size={12} /> {formatDistance(service.distance)}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-col gap-2">
                      {service.address && (
                        <p className="text-xs text-white/50">{service.address}</p>
                      )}
                      {service.phone && (
                        <a
                          href={`tel:${service.phone}`}
                          className="text-xs text-white/50 hover:text-cyan-400 transition-colors"
                        >
                          📞 {service.phone}
                        </a>
                      )}
                      {service.opening_hours && (
                        <p className="text-xs text-white/40">⏰ {service.opening_hours}</p>
                      )}
                      {service.status && !service.opening_hours && (
                        <p className="text-xs text-white/40">
                          Status: <span className="text-cyan-300">{service.status}</span>
                        </p>
                      )}
                      <button
                        onClick={() => handleDirections(service)}
                        className="mt-2 w-full px-2 py-1 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 text-xs rounded transition-colors"
                      >
                        📍 Get Directions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-glass p-8 text-center text-white/40">
                <p className="text-sm">No services found for selected categories</p>
              </div>
            )}
          </div>

          {/* Info Footer */}
          <div className="mt-8 card-glass p-6 text-center text-white/40 border border-white/5">
            <p className="text-xs">
              {dataSource === "api"
                ? "✅ Real-time data from OpenStreetMap via Overpass API"
                : dataSource === "cache"
                ? "💾 Cached data from last 30 minutes"
                : "📋 Using demo data (API unavailable)"}
            </p>
            <p className="text-xs mt-2 text-white/20">Directions open in Google Maps</p>
          </div>
        </>
      )}
    </div>
  );
}


