# RoadSoS Development History

## Phase 1 - Project Foundation
**Date:** 2026-05-31

**Completed:**
- React + Vite setup
- Tailwind CSS configuration with dark navy + cyan theme
- React Router DOM routing setup
- Navbar component with navigation links
- Footer component with project info
- Placeholder pages (Home, Dashboard, NearbyServices, AIAssistant, EmergencyGuide, About)
- Component structure (UI, Layout, Map components)
- Hooks structure (useVoiceSOS, useGeolocation, useOfflineCache)
- Services structure (emergencyNumbers, geminiService, overpassService)
- Data files (firstAidGuide, emergencyContacts)
- Utility files (locationUtils, storageUtils)
- PWA setup with manifest and service worker configuration

**Files Created:**
- `src/App.jsx`
- `src/main.jsx`
- `src/styles/index.css`
- `src/components/layout/Navbar.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/ui/SOSButton.jsx`
- `src/components/ui/EmergencyButton.jsx`
- `src/components/ui/ServiceCard.jsx`
- `src/components/ui/LoadingSpinner.jsx`
- `src/components/map/MapView.jsx`
- `src/components/map/ServiceMarker.jsx`
- `src/hooks/useVoiceSOS.js`
- `src/hooks/useGeolocation.js` (skeleton)
- `src/hooks/useOfflineCache.js`
- `src/services/emergencyNumbers.js`
- `src/services/geminiService.js`
- `src/services/overpassService.js`
- `src/data/firstAidGuide.js`
- `src/data/emergencyContacts.js`
- `src/utils/locationUtils.js`
- `src/utils/storageUtils.js`
- `src/pages/Home.jsx`
- `src/pages/Dashboard.jsx`
- `src/pages/NearbyServices.jsx`
- `src/pages/AIAssistant.jsx`
- `src/pages/EmergencyGuide.jsx`
- `src/pages/About.jsx`
- `tailwind.config.js`
- `vite.config.js`
- `package.json`

**Files Modified:**
- N/A (new project)

**Decisions:**
- React Router DOM selected for client-side routing
- Tailwind CSS selected with custom color theme (navy-950, cyan-400, emergency-red)
- Display font: Exo 2, Body font: DM Sans
- Dark navy (#020818) background with cyan (#22d3ee) accents
- Glass morphism UI components with backdrop blur and transparency
- Modular component architecture with separate concerns

**Pending:**
- Live Location Detection (Phase 2A)
- SOS Dashboard Integration (Phase 2B)
- Global Emergency Numbers (Phase 2C)

---

## Phase 2 - Live Location & SOS Dashboard
**Date:** 2026-05-31

**Completed:**
- Enhanced useGeolocation hook with watchPosition API for continuous location updates
- Implemented permission handling with user-friendly error messages
- Added loading, error, and clearing states with callbacks
- Location accuracy tracking (in meters)
- Timestamp for last update
- localStorage persistence for last known location
- Automatic fallback to cached location when geolocation unavailable
- LocationCard component with glassmorphic design
- Coordinate display with 6 decimal precision
- Accuracy and update time display
- Storage status indicator (Database icon for cached location)
- Error recovery with retry functionality
- QuickActionsCard component with Refresh and Share buttons
- Refresh Location button with loading state
- Share Location button with Web Share API (fallback to clipboard)
- EmergencyNumbersCard component displaying country-specific emergency numbers
- Color-coded emergency buttons (Police: red, Ambulance: green, Fire: orange, Unified: cyan)
- Dashboard integration with real-time location display
- Status indicator showing location state (Active, Detecting, Error)
- Mobile-responsive grid layout for status cards
- Full SOS Dashboard with location, status, emergency numbers, and SOS button

**Files Created:**
- `src/components/LocationCard.jsx`
- `src/components/QuickActionsCard.jsx`
- `src/components/EmergencyNumbersCard.jsx`

**Files Modified:**
- `src/hooks/useGeolocation.js` - Enhanced with watchPosition, localStorage persistence, accuracy tracking, and error handling
- `src/pages/Dashboard.jsx` - Full SOS Dashboard integration with all features
- `src/components/LocationCard.jsx` - Updated to show storage status

**Decisions:**
- Used Geolocation API's watchPosition for continuous updates instead of one-time getCurrentPosition
- Set enableHighAccuracy to true for better precision on mobile devices
- Implemented visual feedback for loading, active, and error states
- Color-coded status: cyan for active, emergency red for errors, white/60 for detecting
- Accuracy displayed in meters with ± symbol for clarity
- Timestamp in local Indian standard time format
- localStorage used for persistence of last known location
- Web Share API with clipboard fallback for location sharing
- India (IN) set as default country for emergency numbers
- Quick actions placed prominently below location card for easy access


## Phase 3 - Leaflet Map + Nearby Services
**Date:** 2026-05-31

**Completed:**
- Leaflet map integration with OpenStreetMap tiles
- User location marker (blue circle) displayed on map
- Service markers with category-based color coding and icons
- 6 service categories with mock data (50 total services)
  - Hospitals (10 services with coordinates around New Delhi)
  - Ambulance Services (10 services)
  - Police Stations (10 services)
  - Towing Services (10 services)
  - Puncture Shops (10 services)
  - Vehicle Showrooms (10 services)
- Category filter buttons for easy filtering
- Service list with responsive grid layout (scrollable)
- Distance calculation based on user location (Haversine formula)
- Service cards displaying:
  - Service name with category icon
  - Category label
  - Distance from user location (formatted as km or m)
  - Contact phone number (clickable tel: link)
  - Service status/operating hours
  - "Get Directions" button
- Directions button opens Google Maps with navigation from user location to service
- Automatic geolocation with fallback to default New Delhi coordinates
- Category filtering with multi-select capability
- Show/hide filtered or all services based on selection
- Dark theme customization for Leaflet UI components
- Responsive design for mobile and desktop
- Mock data system with serviceUtils.js for future Overpass API integration

**Files Created:**
- `src/data/mockServices.js` - Mock service data (50 services across 6 categories)
- `src/utils/serviceUtils.js` - Service filtering and sorting utilities

**Files Modified:**
- `src/components/map/MapView.jsx` - Full Leaflet map implementation
- `src/pages/NearbyServices.jsx` - Complete page with map, filters, and service list
- `src/styles/index.css` - Leaflet dark theme customization
- `package.json` - Added leaflet and react-leaflet dependencies

**Decisions:**
- Used Leaflet with OpenStreetMap (free, no API key needed)
- Color-coded markers by category for visual distinction
- Geolocation with fallback to New Delhi (default for India hackathon)
- Mock data uses realistic coordinates around New Delhi NCR
- Service cards use category icons (emoji) for quick identification
- Get Directions uses Google Maps for universal availability
- Multi-select filtering allows users to view multiple service types simultaneously
- Grid layout for service cards provides better mobile readability
- Dark theme customization maintains app's design consistency with Leaflet components



## Phase 4 - Real Nearby Services via Overpass API
**Date:** 2026-05-31

**Completed:**
- Overpass API integration for real-time nearby services
- Bounding box query generation from user location + radius
- Service category mapping from OSM tags to app categories:
  - Hospitals: `amenity=hospital`
  - Police: `amenity=police`
  - Ambulance: `amenity=ambulance_station`
  - Vehicle Repair: `shop=car_repair`
  - Puncture Shops: `shop=tyres`
  - Vehicle Showrooms: `shop=car`
- Dynamic search radius (2km, 5km default, 10km, 15km options)
- 30-minute localStorage caching to reduce API calls
- Fallback to mock services on API failure or timeout
- Loading state with spinner during API fetch
- Error state with user-friendly messages and retry button
- Data source indicator (🌐 Live, 💾 Cached, 📋 Mock)
- Service cards display real OSM data:
  - Name
  - Category
  - Distance
  - Address (from OSM)
  - Phone number (if available)
  - Opening hours (if available from OSM)
- Timeout protection (15-second API call timeout)

---

## Phase 5 - AI First Aid Assistant
**Date:** 2026-05-31

**Completed:**
- Gemini API integration (service wrapper with timeout and error handling)
- Chat UI component with input box, quick prompts, loading state, and localStorage persistence
- Fallback rule-based first aid responses when API is unavailable
- Safety-first guidance and mandatory recommendation to contact emergency services
- Documentation updates and Phase 5 project state entries

**Files Created/Modified:**
- `src/components/AIChat.jsx` (new)
- `src/services/geminiService.js` (updated)
- `src/pages/AIAssistant.jsx` (updated)
- `docs/HISTORY.md`, `docs/PROJECT_STATE.md`, `docs/TASKS.md` (updated)

**Notes:**
- The assistant provides basic, non-diagnostic guidance and always encourages contacting emergency services.
- Voice SOS feature deferred to a later phase.

- Graceful degradation (partial failures per category)
- Individual category fetch error handling
- No excessive API requests (caching + timeout)
- All services deduplicated and sorted by distance
- Mobile responsive with improved UX for network states

**Files Created:**
- N/A (enhanced existing files)

**Files Modified:**
- `src/services/overpassService.js` - Full Overpass API implementation with caching
- `src/pages/NearbyServices.jsx` - Integrated API, caching, fallback, loading/error states

**Decisions:**
- Overpass API chosen (free, no API key, OSM community-maintained)
- 30-minute cache duration balances freshness vs. API load
- Individual category queries allow partial success on API degradation
- 15-second timeout prevents hanging requests
- Search radius adjustable by user (better UX than fixed)
- Mock data as graceful fallback ensures app always functional
- Data source indicator helps users understand data freshness
- Haversine formula used for accurate distance calculations
- Error messages include retry option for user control

**Pending:**
- Advanced caching strategies (LRU, per-category cache)
- Overpass API rate limiting (if needed at scale)
- Service detail modal with full OSM data
- AI First Aid Assistant (Phase 5A)
- Voice SOS Feature (Phase 5B)
- Emergency Guide (Phase 5C)
- Offline Emergency Mode (Phase 5D)


## Phase 6 - Voice SOS Action Integration
**Date:** 2026-05-31

**Completed:**
- Added Voice SOS emergency action flow in Dashboard
- Activated emergency mode on keyword detection
- Displayed red emergency alert banner with detected command text
- Added emergency support section with quick call buttons and direct navigation actions
- Implemented automatic scroll into emergency section after voice detection
- Kept existing `useVoiceSOS` hook behavior intact

**Files Modified:**
- `src/pages/Dashboard.jsx`

**Pending:**
- Add optional emergency mode reset UX
- Validate voice detection on more device/browser combinations


**Completed:**
- Web Speech API integration via useVoiceSOS hook
- Continuous speech recognition with interim results display
- Emergency keyword detection (SOS, Help, Emergency, Accident, Ambulance, Police)
- VoiceSOS component with microphone button and status indicators
- Listening state animation with pulsing cyan color
- Status messages: Listening, Processing, Detected, No Command, Error
- Transcript display of recognized speech
- Emergency mode activation banner on Dashboard
- Browser support detection with fallback message
- Permission handling (microphone permission denied, no speech detected errors)
- Mobile-friendly voice button with touch-responsive states
- Accessibility support with aria-labels
- Voice command integration with Dashboard emergency alert
- Responsive design for all screen sizes

**Files Created:**
- `src/components/VoiceSOS.jsx` - Voice SOS UI component with microphone button, status display, and status messages

**Files Modified:**
- `src/hooks/useVoiceSOS.js` - Full Web Speech API implementation with keyword detection
- `src/pages/Dashboard.jsx` - Integrated VoiceSOS component, emergency mode banner, voice command handling

**Decisions:**
- Web Speech API chosen for browser-native voice recognition (no backend needed)
- Continuous recognition mode for natural conversation flow
- Emergency keywords: SOS, Help, Emergency, Accident, Ambulance, Police (6 keywords)
- Status color coding: cyan for listening, green for detected, red for errors
- Transcript displayed for user confidence in recognition accuracy
- Emergency mode auto-dismisses after 5 seconds
- Browser support fallback message for unsupported browsers
- en-US locale as default (can be extended for multilingual)
- Microphone button scales and glows during active listening
- Manual SOS button still available as alternative (not replacing)

**Notes:**
- Requires HTTPS in production (Web Speech API security requirement)
- Microphone permission required (browser will prompt)
- Works best with clear speech and low background noise
- Single-word commands work (e.g., "help") and multi-word phrases (e.g., "call ambulance")
- No internet connection required for speech recognition (browser-side processing)

**Pending:**
- Multilingual support (detect user language)
- Advanced voice commands (e.g., "location", "directions")
- Voice feedback (audio confirmation of detected commands)
- Emergency Guide (Phase 7)
- Offline Emergency Mode (Phase 8)


## Phase 7 - Offline Emergency Mode
**Date:** 2026-05-31

**Completed:**
- Online/offline status detection via useOfflineStatus hook
- Connection state change notifications (online, offline, reconnected)
- Offline notification banner on Dashboard, NearbyServices, EmergencyGuide
- Offline Mode Active indicator showing cached data is being used
- Emergency data caching system (offlineService):
  - Emergency contacts cached on app load
  - First aid guide cached on app load
  - User location updated and cached continuously
  - Nearby services cached after successful API fetch
- Enhanced Service Worker with:
  - Network-first strategy for API calls
  - Cache-first strategy for assets
  - Graceful fallback to offline pages
  - Cache cleanup on activation
- EmergencyGuide page implementation:
  - First aid guide display with step-by-step instructions
  - Guide selection interface with icon indicators
  - Detailed view with numbered steps
  - Emergency warning banner with call-to-action
  - Offline-ready guide (no internet required)
- NearbyServices offline support:
  - Shows cached services when offline
  - Displays "last updated" timestamp
  - Automatically uses cached data with offline indicator
- Dashboard offline mode:
  - Displays offline status with icon
  - Shows emergency numbers (always cached)
  - Voice SOS continues to work offline
  - Location continues to show last known position
- Animations and notifications:
  - Fade-in animation for notifications
  - Color-coded notifications (orange for offline, green for online)
  - Auto-dismiss notifications after 4 seconds
- Last known location persistence and display

**Files Created:**
- `src/hooks/useOfflineStatus.js` - Online/offline status detection and notification management
- `src/services/offlineService.js` - Offline data caching for emergency info, contacts, location, services

**Files Modified:**
- `src/pages/Dashboard.jsx` - Integrated offline status, notifications, data caching
- `src/pages/NearbyServices.jsx` - Integrated offline support, cached services display
- `src/pages/EmergencyGuide.jsx` - Implemented full first aid guide with offline support
- `public/sw.js` - Enhanced Service Worker with network/cache strategies
- `src/styles/index.css` - Added fade-in animation for notifications

**Decisions:**
- Online/offline detection via navigator.onLine and window online/offline events
- LocalStorage used for offline data persistence (no quota issues for emergency data)
- Service Worker uses network-first for APIs (fresh data when available) and cache-first for assets
- Emergency data cached proactively to ensure availability offline
- User location continuously cached as it updates
- Nearby services cached whenever successfully fetched (automatic offline support)
- Notifications auto-dismiss to keep UI clean
- Orange color (#f97316) chosen for offline indicators (distinct from cyan and red)
- First aid guide implemented as interactive list with detailed step-by-step view
- All offline features are non-intrusive (don't redesign existing pages)
- Emergency Guide pages are fully functional offline

**Notes:**
- All emergency functions work offline: SOS button, emergency numbers, voice SOS, location display
- Nearby services gracefully fall back to cached data when offline
- First aid guide is fully available offline
- Cached data timestamp shown to help users understand freshness
- App remains usable with any internet connectivity state
- Service Worker caches automatically improve load times even when online

**Browser Compatibility:**
- Service Workers supported in all modern browsers
- Navigator.onLine API supported in all modern browsers
- LocalStorage supported in all modern browsers
- Falls back gracefully if any feature unavailable

**Pending:**
- Service worker update notifications (notify user when new version available)
- Offline map caching (currently uses online tile server)
- Background sync for logging (when connectivity restored)
- Emergency Guide (Phase 8)


---

## Phase F — Accident Severity Detection
**Date:** 2026-06-04

**Goal:**
Create an accident severity analysis module that helps users or bystanders estimate the seriousness of an accident based on description and selected symptoms.

**Completed:**
- Rule-based severity scoring engine (`severityService.js`)
- Static rules/data layer (`severityRules.js`) with high / medium / low risk keyword tables
- Critical keyword override (unconscious, not breathing, heavy bleeding, head injury → always High Risk)
- Scoring thresholds: 0–2 = Low Risk, 3–6 = Medium Risk, 7+ = High Risk
- Selectable symptom chips grouped by risk tier (high / medium / low) in UI
- Free-text accident description textarea with 1000-char limit
- Future-ready image upload placeholder with drag-and-drop, preview, and clear (no real AI analysis)
- `SeverityResultCard` with risk-level badge, score, detected factors, recommendations list, emergency action buttons
- `SeverityAnalyzer` form that orchestrates all inputs, validates, calls service, renders result
- `AccidentSeverity` page with header, risk legend, safety disclaimer, info strip, analyzer
- `ImageUploadPlaceholder` collapsible section marked Future Ready
- Emergency action buttons inside result card navigate to SOS Dashboard, Nearby Services, AI Assistant, Emergency Guide
- Prominent safety disclaimer on page and inside result card
- Route `/accident-severity` added to router
- "Severity Check" navigation link added to Navbar
- "Check Accident Severity" quick-action button added to Dashboard emergency support section

**Files Created:**
- `src/data/severityRules.js`
- `src/services/severityService.js`
- `src/components/ImageUploadPlaceholder.jsx`
- `src/components/SeverityResultCard.jsx`
- `src/components/SeverityAnalyzer.jsx`
- `src/pages/AccidentSeverity.jsx`

**Files Modified:**
- `src/main.jsx` — added AccidentSeverity import + `/accident-severity` route
- `src/components/layout/Navbar.jsx` — added "Severity Check" nav link
- `src/pages/Dashboard.jsx` — added "Check Accident Severity" and "Emergency Guide" quick actions
- `docs/HISTORY.md` (this file)
- `docs/PROJECT_STATE.MD`
- `docs/TASKS.MD`

**Important Decisions:**
- Rule-based scoring chosen over AI for reliability, offline support, and zero API cost
- Critical override ensures `unconscious` / `not breathing` / `heavy bleeding` / `head injury` always yield High Risk
- Image upload UI added as placeholder only; clearly marked Future Ready with no fake AI analysis
- Module is fully independent — zero changes to overpassService, geminiService, useVoiceSOS, useGeolocation
- Safety disclaimer appears in three places: page header, info strip, inside result card
- All emergency action buttons inside result card navigate to existing RoadSoS pages (no duplication)

**Safety Approach:**
- No medical diagnosis claims anywhere in code or UI
- Disclaimer shown before and after analysis
- High Risk result always prompts immediate emergency services call
- Critical override bypasses score to ensure worst-case is always escalated
- Image analysis clearly labelled as not implemented

**Pending / Future Work:**
- Vision model integration for image-based severity detection
- AI-powered description analysis (replace/augment rule-based scoring)
- Multilingual keyword detection
- Injury location body-map selector
- Share severity report via WhatsApp/SMS emergency alert


---

## Phase G — Automatic Crash Detection Simulation
**Date:** 2026-06-04

**Goal:**
Create a future-ready crash detection module that simulates automatic accident detection and triggers emergency mode.

**Completed:**
- `crashDetectionService.js` with active `simulateCrashDetection()` and `generateCrashAlertMessage()`
- Future-ready stub functions: `analyzeAccelerometerData()`, `detectGPSAnomaly()`, `calculateSpeedDrop()`, `requestMotionPermission()` — all safe, non-breaking, return descriptive placeholders
- `CrashDetectionSimulator` component with full 3-state machine: idle → detecting (3s countdown) → crash-detected
- Animated countdown ring on detecting state
- Red-glow crash alert panel with timestamp
- Location capture — uses live location if available, fallback message if not
- Google Maps link generated from coordinates
- Alert message preview (collapsible)
- WhatsApp share URL (`wa.me/?text=`)
- SMS share URL (`sms:?body=`)
- Call 112 direct link
- Nearby Services and AI First Aid navigation buttons
- Reset simulation button at all stages
- Future Sensor Architecture collapsible info panel (5 items: Accelerometer, Speed Drop, GPS Anomaly, DeviceMotion API, Auto Notification)
- Simulation disclaimer always visible
- Dashboard `handleCrashDetected` callback — reuses existing `handleEmergencyActivated()` + `setSosActive()` flow
- Dashboard emergency banner now shows "Crash Detection Simulation" as trigger type
- `CrashDetectionSimulator` inserted in Dashboard after VoiceSOS section
- `npm run build` passes — 0 errors

**Files Created:**
- `src/services/crashDetectionService.js`
- `src/components/CrashDetectionSimulator.jsx`

**Files Modified:**
- `src/pages/Dashboard.jsx` — added import, `handleCrashDetected` handler, CrashDetectionSimulator section
- `docs/HISTORY.md` (this file)
- `docs/PROJECT_STATE.MD`
- `docs/TASKS.MD`

**Important Decisions:**
- Simulation label ("SIM" badge, "Simulation Mode" subtitle) is permanently visible — never misrepresents as real detection
- State machine kept inside component; Dashboard only receives a callback, preventing duplication of emergency logic
- `generateCrashAlertMessage` lives in the service (not component) so future AI or real-sensor code can reuse it
- DeviceMotion API intentionally not wired in MVP — browser compatibility and permission complexity out of scope
- Future stub functions use `void param` to suppress linting warnings without breaking tree-shaking
- WhatsApp and SMS links built from the same message string, keeping them consistent

**Simulation Limitations:**
- No real accelerometer data used
- No real GPS anomaly detection
- Crash event is 100% user-triggered (button click)
- Countdown is aesthetic — no sensor polling behind it

**Future Real-Sensor Architecture:**
- Replace `simulateCrashDetection()` with sensor pipeline output from `analyzeAccelerometerData()` + `detectGPSAnomaly()`
- Wire `requestMotionPermission()` on app start for iOS 13+ devices
- Add background service worker or PWA background sync for automatic notification
- Connect `calculateSpeedDrop()` to GPS speed stream

**Pending / Future Work:**
- Real DeviceMotion/DeviceOrientation API integration
- Background crash monitoring (service worker)
- Automatic SMS/WhatsApp without user tap
- Multilingual emergency messages
- Crash history log

---

## Phase A — Emergency Contact Notifications
**Date:** 2026-06-05

**Goal:**
Allow users to save trusted contacts and notify them instantly during SOS activation via WhatsApp, SMS, and direct call — with live location auto-attached.

**Completed:**
- `emergencyContactService.js` — Full CRUD (add, update, delete, validate) with localStorage persistence
- `emergencyMessageService.js` — Message generation, WhatsApp (wa.me) links, SMS (sms:) deep links, Google Maps URL
- `useEmergencyContacts.js` — React hook state layer over the service
- `EmergencyContactCard.jsx` — Individual card with name, relationship badge, phone; Call + WhatsApp action buttons; Edit + Delete hover controls
- `AddContactModal.jsx` — Dual-mode (add / edit) modal with name, relationship select, phone validation; inline error feedback
- `EmergencySharePanel.jsx` — Shown inside Dashboard SOS section; lists all contacts with one-tap Call / WhatsApp / SMS; auto-generated message preview with copy button; Google Maps link
- `EmergencyContacts.jsx` — Dedicated management page at `/contacts`; stats row; how-it-works banner; add/edit/delete flow; empty state
- Route `/contacts` added to React Router
- "Contacts" nav link added to Navbar
- `EmergencySharePanel` inserted into Dashboard `sosActive` block — zero disruption to existing SOS flow

**Files Created:**
- `src/services/emergencyContactService.js`
- `src/services/emergencyMessageService.js`
- `src/hooks/useEmergencyContacts.js`
- `src/components/EmergencyContactCard.jsx`
- `src/components/AddContactModal.jsx`
- `src/components/EmergencySharePanel.jsx`
- `src/pages/EmergencyContacts.jsx`

**Files Modified:**
- `src/main.jsx` — `/contacts` route + import
- `src/components/layout/Navbar.jsx` — "Contacts" nav link
- `src/pages/Dashboard.jsx` — `EmergencySharePanel` inside `sosActive` block

**Important Decisions:**
- No global state / context — `useEmergencyContacts` hook used directly in each consumer
- Storage key: `roadsos_personal_contacts` (via existing `storage` util with `roadsos_` prefix)
- WhatsApp link uses `wa.me/{phone}?text=...` format — works mobile and desktop
- SMS link uses `sms:{phone}?body=...` — iOS and Android compatible
- Duplicate phone detection prevents redundant contacts
- All message generation is pure JS — works fully offline
- EmergencySharePanel reads contacts fresh on each SOS activation via hook's `useEffect`
- Dashboard changes are purely additive — existing Voice SOS, Crash Detection, and SOS button flows are untouched

**Offline Behaviour:**
- Contacts: stored in localStorage, available with no internet
- Message generation: pure JS, zero network calls
- WhatsApp/SMS links: open device app, work offline
- Location: falls back to `storage.get("lastLocation")` via existing `useGeolocation` hook

**Pending / Future Work:**
- Broadcast WhatsApp to all contacts in one tap (WhatsApp does not support multi-recipient deep links natively; workaround: loop and open each)
- Web Share API integration for native share sheet
- Notification badge on Contacts nav link showing contact count
- Export/import contacts (JSON backup)
