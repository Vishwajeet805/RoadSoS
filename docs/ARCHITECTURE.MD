# RoadSoS Architecture

## Overview
RoadSoS is a React-based emergency and roadside assistance platform.

## Frontend
The frontend is built using React + Vite and Tailwind CSS.

## Routing
React Router DOM manages navigation between:
- Home
- Dashboard
- Nearby Services
- AI Assistant
- Emergency Guide
- About

## Location System
Browser Geolocation API is used to fetch the user's current latitude and longitude.

## Map System
Leaflet and OpenStreetMap are used for displaying maps.

## Nearby Services
Overpass API is used to fetch nearby emergency and vehicle assistance services.

Service categories:
- Hospitals
- Ambulance Services
- Police Stations
- Towing Services
- Puncture Shops
- Vehicle Showrooms

## AI System
Gemini API is used for first aid guidance.

## Voice SOS
Web Speech API is used to detect voice commands like:
- help
- accident
- emergency
- sos

## Offline System
Emergency guide, emergency numbers, and last known location are stored locally for offline access.

## Storage
LocalStorage is used for MVP.