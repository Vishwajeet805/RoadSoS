import { useState, useEffect } from "react";
import { MapPin, Map, Filter } from "lucide-react";
import MapView from "../components/map/MapView";
import ServiceCard from "../components/ui/ServiceCard";
import { mockServices, serviceCategories } from "../data/mockServices";
import { getAllServices, filterServices } from "../utils/serviceUtils";
import { formatDistance } from "../utils/locationUtils";

export default function NearbyServices() {
  const [userLocation, setUserLocation] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setLoading(false);
        },
        () => {
          // Fallback to default location (New Delhi)
          setUserLocation([28.6139, 77.209]);
          setLoading(false);
        }
      );
    } else {
      setUserLocation([28.6139, 77.209]);
      setLoading(false);
    }
  }, []);

  // Calculate distances and prepare services when location is available
  useEffect(() => {
    if (userLocation) {
      const services = getAllServices(userLocation[0], userLocation[1]);
      setAllServices(services);
      setFilteredServices(services);
    }
  }, [userLocation]);

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

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-white/40">Loading location...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MapPin size={28} className="text-cyan-400" />
        <h1 className="font-display text-3xl font-bold">Nearby Services</h1>
      </div>

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
                        {serviceCategories[service.category].icon}
                      </span>
                      <p className="font-semibold text-white text-sm">{service.name}</p>
                    </div>
                    <p className="text-white/40 text-xs capitalize">
                      {serviceCategories[service.category].label}
                    </p>
                  </div>
                  <span className="text-cyan-400 text-xs flex items-center gap-1 whitespace-nowrap">
                    <MapPin size={12} /> {formatDistance(service.distance)}
                  </span>
                </div>

                <div className="mt-3 flex flex-col gap-2">
                  {service.phone && (
                    <a
                      href={`tel:${service.phone}`}
                      className="text-xs text-white/50 hover:text-cyan-400 transition-colors"
                    >
                      📞 {service.phone}
                    </a>
                  )}
                  {service.status && (
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
          💡 Using mock service data. Real data will be integrated with Overpass API
        </p>
        <p className="text-xs mt-2 text-white/20">Directions open in Google Maps</p>
      </div>
    </div>
  );
}

