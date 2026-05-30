import { mockServices } from "../data/mockServices";
import { getDistanceKm } from "./locationUtils";

export function getServicesByCategory(category, userLat, userLng) {
  return mockServices
    .filter((service) => service.category === category)
    .map((service) => ({
      ...service,
      distance: getDistanceKm(userLat, userLng, service.lat, service.lng),
    }))
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
}

export function getAllServices(userLat, userLng) {
  return mockServices
    .map((service) => ({
      ...service,
      distance: getDistanceKm(userLat, userLng, service.lat, service.lng),
    }))
    .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
}

export function filterServices(services, selectedCategories) {
  if (!selectedCategories || selectedCategories.length === 0) {
    return services;
  }
  return services.filter((service) => selectedCategories.includes(service.category));
}
