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
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 font-semibold">Detecting location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Offline Notification */}
        {showNotification && (
          <div className={`mb-6 p-4 rounded-xl border-l-4 flex items-center gap-3 animate-fade-in glass-md ${
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
          <div className="mb-6 p-6 rounded-2xl border-2 border-orange-400/50 bg-gradient-to-r from-orange-500/10 to-orange-600/5 glass-md">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-xl">
                <WifiOff size={24} className="text-orange-400" />
              </div>
              <div>
                <p className="font-display font-bold text-orange-300 text-lg">Offline Mode Active</p>
                {cachedTimestamp && (
                  <p className="text-sm text-white/60 mt-1">Last updated: {cachedTimestamp.toLocaleTimeString()}</p>
                )}
              </div>
            </div>
          </div>
        )}

      {/* Header */}
      <div className="flex items-center gap-4 mb-12 animate-slide-in-left">
        <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-2xl">
          <Map size={32} className="text-cyan-400" />
        </div>
        <div>
          <h1 className="font-display text-5xl sm:text-6xl font-black tracking-tight">Nearby Services</h1>
          <p className="text-white/50 text-sm mt-2 font-semibold uppercase tracking-widest">Real-time emergency facilities</p>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 card-premium p-6 rounded-3xl border border-emergency/30 bg-gradient-to-r from-emergency/10 to-red-600/10 glass-md flex flex-col gap-4 animate-slide-up">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-emergency/15 rounded-2xl">
              <AlertCircle size={24} className="text-emergency" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-emergency">Error loading services</p>
              <p className="text-sm text-white/70 mt-2">{error}</p>
            </div>
          </div>
          <button
            onClick={handleRetry}
            className="self-start px-5 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-sm rounded-2xl transition-all shadow-glow-cyan"
          >
            <RefreshCw size={14} className="inline-block mr-2" /> Retry
          </button>
        </div>
      )}

      {/* Search Radius Adjustment */}
      <div className="mb-8 card-premium p-6 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <p className="text-sm text-white/70 mb-2">Refine your search range for nearby help.</p>
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Current radius</p>
          </div>
          <select
            value={apiSearchRadius}
            onChange={(e) => setApiSearchRadius(Number(e.target.value))}
            disabled={loading}
            className="bg-white/10 text-cyan-300 px-4 py-3 rounded-2xl text-sm border border-cyan-500/20 outline-none focus:ring-2 focus:ring-cyan-400/30 disabled:opacity-50 transition"
          >
            <option value={2000}>2 km</option>
            <option value={5000}>5 km (default)</option>
            <option value={10000}>10 km</option>
            <option value={15000}>15 km</option>
          </select>
        </div>
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
          <div className="mb-8 card-premium rounded-3xl border border-white/10 overflow-hidden shadow-glow-cyan">
            <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10 bg-white/5">
              <Map size={20} className="text-cyan-400" />
              <h2 className="text-lg font-semibold">Map View</h2>
            </div>
            <div className="h-[420px] bg-navy-950/70">
              <MapView center={userLocation} markers={allServices} />
            </div>
          </div>

          {/* Filter Section */}
          <div className="mb-8 card-premium p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-4">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-cyan-400" />
                <h2 className="text-lg font-semibold">Filter by Category</h2>
              </div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/40">Tap categories to refine the list</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Object.entries(serviceCategories).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => toggleCategory(key)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    selectedCategories.includes(key)
                      ? "bg-cyan-500 text-navy-950 shadow-glow-cyan"
                      : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{value.icon}</span>
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
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 max-h-[32rem] overflow-y-auto pr-2 pb-2">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="card-premium p-6 rounded-3xl border border-white/10 bg-white/5 transition-all hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-glow-cyan"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 text-cyan-300 grid place-items-center text-xl">
                            {serviceCategories[service.category]?.icon || "📍"}
                          </div>
                          <div>
                            <p className="font-semibold text-white text-base">{service.name}</p>
                            <p className="text-white/40 text-xs capitalize">{serviceCategories[service.category]?.label || service.category}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-cyan-300 text-xs font-semibold uppercase tracking-[0.16em]">
                        <span className="flex items-center justify-end gap-1">
                          <MapPin size={12} />
                          {formatDistance(service.distance)} km
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-white/60">
                      {service.address && <p>{service.address}</p>}
                      {service.phone && (
                        <a
                          href={`tel:${service.phone}`}
                          className="block text-white/70 hover:text-cyan-300 transition-colors"
                        >
                          📞 {service.phone}
                        </a>
                      )}
                      {service.opening_hours && <p>⏰ {service.opening_hours}</p>}
                      {service.status && !service.opening_hours && (
                        <p>
                          Status: <span className="text-white">{service.status}</span>
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDirections(service)}
                      className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500/15 px-4 py-3 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/30 transition-all"
                    >
                      📍 Get Directions
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-premium p-8 rounded-3xl border border-white/10 bg-white/5 text-center text-white/50">
                <p className="text-sm">No services found for selected categories</p>
              </div>
            )}
          </div>

          {/* Info Footer */}
          <div className="mt-8 card-premium p-6 rounded-3xl border border-white/10 bg-white/5 text-center text-white/40">
            <p className="text-xs leading-6">
              {dataSource === "api"
                ? "✅ Real-time data from OpenStreetMap via Overpass API"
                : dataSource === "cache"
                ? "💾 Cached data from last 30 minutes"
                : "📋 Using demo data (API unavailable)"}
            </p>
            <p className="text-xs mt-2 text-white/30">Directions open in Google Maps</p>
          </div>
        </>
      )}
      </div>
    </div>
  );
}