// Overpass API service for fetching nearby services
// Free OSM-based API, no API key needed

const OVERPASS_API = "https://overpass-api.de/api/interpreter";
const API_TIMEOUT = 15000; // 15 seconds
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

// Convert radius (meters) to bounding box coordinates
function radiusToBbox(lat, lng, radiusMeters) {
  const latOffset = radiusMeters / 111000; // 1 degree latitude ≈ 111 km
  const lngOffset = radiusMeters / (111000 * Math.cos((lat * Math.PI) / 180));

  return {
    south: lat - latOffset,
    west: lng - lngOffset,
    north: lat + latOffset,
    east: lng + lngOffset,
  };
}

// Build Overpass query for a category
function buildQuery(category, bbox) {
  const { south, west, north, east } = bbox;
  const bboxStr = `${south},${west},${north},${east}`;

  const queries = {
    hospital: `[bbox:${bboxStr}];(node["amenity"="hospital"];way["amenity"="hospital"];relation["amenity"="hospital"];);out center;`,
    police: `[bbox:${bboxStr}];(node["amenity"="police"];way["amenity"="police"];);out center;`,
    ambulance: `[bbox:${bboxStr}];(node["amenity"="ambulance_station"];way["amenity"="ambulance_station"];node["emergency"="ambulance"];);out center;`,
    car_repair: `[bbox:${bboxStr}];(node["shop"="car_repair"];way["shop"="car_repair"];);out center;`,
    tyres: `[bbox:${bboxStr}];(node["shop"="tyres"];way["shop"="tyres"];);out center;`,
    car_showroom: `[bbox:${bboxStr}];(node["shop"="car"];way["shop"="car"];);out center;`,
  };

  return queries[category] || "";
}

// Fetch services from Overpass API
async function fetchFromOverpass(query) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(OVERPASS_API, {
      method: "POST",
      body: query,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.elements || [];
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

// Parse Overpass element to service object
function parseElement(element, category) {
  const name = element.tags?.name || `${category.charAt(0).toUpperCase() + category.slice(1)} Service`;
  const lat = element.center?.lat || element.lat;
  const lng = element.center?.lon || element.lon;
  const address = element.tags?.["addr:street"] || "Address not available";
  const phone = element.tags?.phone || null;
  const opening_hours = element.tags?.opening_hours || null;

  return {
    id: `osm_${element.id}`,
    name,
    category,
    lat,
    lng,
    address,
    phone,
    opening_hours,
    distance: 0, // Will be calculated in NearbyServices component
  };
}

// Map Overpass category to internal category
function mapCategory(osmCategory) {
  const mapping = {
    hospital: "hospital",
    police: "police",
    ambulance: "ambulance",
    car_repair: "towing", // Vehicle repair includes towing potential
    tyres: "puncture",
    car_showroom: "showroom",
  };
  return mapping[osmCategory] || osmCategory;
}

// Main function to fetch nearby services
export async function fetchNearbyServices(lat, lng, radiusMeters = 5000) {
  try {
    const bbox = radiusToBbox(lat, lng, radiusMeters);
    const categories = ["hospital", "police", "ambulance", "car_repair", "tyres", "car_showroom"];
    const allServices = [];
    const failedCategories = [];

    // Fetch each category (with individual error handling)
    for (const category of categories) {
      try {
        const query = buildQuery(category, bbox);
        const elements = await fetchFromOverpass(query);

        const services = elements
          .filter((el) => el.lat && el.lon && el.tags?.name)
          .map((el) => parseElement(el, mapCategory(category)));

        allServices.push(...services);
      } catch (error) {
        console.warn(`Failed to fetch ${category}:`, error);
        failedCategories.push(category);
      }
    }

    // Return results even if some categories failed
    return {
      services: allServices,
      success: allServices.length > 0,
      failedCategories,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error in fetchNearbyServices:", error);
    return {
      services: [],
      success: false,
      error: error.message,
      timestamp: Date.now(),
    };
  }
}

// Cache management
export function getCachedServices(lat, lng) {
  try {
    const cached = localStorage.getItem(`roadsos_services_cache_${lat}_${lng}`);
    if (!cached) return null;

    const data = JSON.parse(cached);
    const now = Date.now();

    // Check if cache is still valid
    if (now - data.timestamp > CACHE_DURATION) {
      localStorage.removeItem(`roadsos_services_cache_${lat}_${lng}`);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export function cacheServices(lat, lng, data) {
  try {
    localStorage.setItem(`roadsos_services_cache_${lat}_${lng}`, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearCache(lat, lng) {
  try {
    localStorage.removeItem(`roadsos_services_cache_${lat}_${lng}`);
    return true;
  } catch {
    return false;
  }
}

