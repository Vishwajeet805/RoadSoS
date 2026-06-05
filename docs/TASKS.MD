# RoadSoS Tasks

## Phase 0 - Setup
- [x] Finalize MVP scope
- [x] Create GitHub repository
- [x] Create documentation files
- [x] Lock folder structure
- [x] Test required APIs
- [x] Prepare Claude prompts

## Phase 1 - Frontend Setup
- [x] Create React + Vite app
- [x] Install Tailwind CSS
- [x] Install React Router DOM
- [x] Create base layout
- [x] Create theme system

## Phase 2 - Core Pages & Location
- [x] Home Page
- [x] SOS Dashboard
- [x] Nearby Services Page (placeholder)
- [x] AI Assistant Page (placeholder)
- [x] Emergency Guide Page (placeholder)
- [x] About Page (placeholder)
- [x] Live Location Detection
- [x] Location Persistence (localStorage)
- [x] Refresh Location Button
- [x] Share Location Button
- [x] Emergency Numbers Display
- [x] Status Indicators

## Phase 4 - Real Nearby Services
- [x] Overpass API Integration
- [x] Dynamic Service Fetching
- [x] Search Radius Configuration
- [x] Caching (30-minute localStorage)
- [x] Fallback to Mock Data
- [x] Loading State
- [x] Error State with Retry
- [x] Data Source Indicator
- [x] OSM Data Display (Address, Hours, Phone)
- [x] API Timeout Protection (15s)
- [x] Graceful Category-Level Failure Handling

## Phase 4 - Innovation Features
- [x] AI First Aid Assistant
- [x] Voice SOS
- [ ] Offline Emergency Mode

## Phase 5 - Final Submission
- [ ] README
- [ ] 7-slide PPT
- [ ] Word document
- [ ] Software packages list
- [ ] Assumptions list
- [ ] Deployment to Vercel

---

## Phase F Tasks — Accident Severity Detection

### ✅ Completed

- [x] Create `src/data/severityRules.js` — keyword tables, thresholds, symptom options, action maps
- [x] Create `src/services/severityService.js` — `analyzeSeverity()` and `validateInput()`
- [x] Create `src/components/ImageUploadPlaceholder.jsx` — drag-drop, preview, future-ready note
- [x] Create `src/components/SeverityResultCard.jsx` — risk card with badge, score, factors, buttons
- [x] Create `src/components/SeverityAnalyzer.jsx` — full input form + orchestrator
- [x] Create `src/pages/AccidentSeverity.jsx` — page wrapper with header, legend, disclaimer
- [x] Add `/accident-severity` route to `src/main.jsx`
- [x] Add "Severity Check" nav link to `src/components/layout/Navbar.jsx`
- [x] Add "Check Accident Severity" quick action to `src/pages/Dashboard.jsx`
- [x] Verify `npm run build` passes — ✅

### 🔜 Future / Pending

- [ ] Vision model integration for image-based severity (image upload UI is ready)
- [ ] Replace / augment rule-based scoring with AI text analysis
- [ ] Multilingual keyword detection (Hindi, Marathi, Tamil, etc.)
- [ ] Body-map injury location selector
- [ ] Share severity report via WhatsApp/SMS emergency alert
- [ ] Animation on risk-level change when re-analysing

---

## Phase G Tasks — Automatic Crash Detection Simulation

### ✅ Completed
- [x] Create `src/services/crashDetectionService.js` — simulation + future stubs
- [x] Create `src/components/CrashDetectionSimulator.jsx` — full state machine component
- [x] Dashboard: add `handleCrashDetected` callback handler
- [x] Dashboard: insert `<CrashDetectionSimulator>` after VoiceSOS section
- [x] WhatsApp + SMS share links with pre-filled crash alert message
- [x] Future architecture collapsible section
- [x] Simulation disclaimer
- [x] Verify `npm run build` passes — ✅

### 🔜 Future / Pending
- [ ] Real DeviceMotion/DeviceOrientation API crash detection
- [ ] GPS speed-drop anomaly detection
- [ ] Background monitoring via Service Worker
- [ ] Automatic emergency notification (no tap required)
- [ ] Crash history log in localStorage
- [ ] Multilingual emergency messages

---

## Phase A Tasks — Emergency Contact Notifications

### ✅ Completed
- [x] Create `src/services/emergencyContactService.js` — CRUD + validation + localStorage
- [x] Create `src/services/emergencyMessageService.js` — message generation, WhatsApp/SMS links, Maps URL
- [x] Create `src/hooks/useEmergencyContacts.js` — React state layer
- [x] Create `src/components/EmergencyContactCard.jsx` — contact card with actions
- [x] Create `src/components/AddContactModal.jsx` — add/edit modal with validation
- [x] Create `src/components/EmergencySharePanel.jsx` — SOS notification panel
- [x] Create `src/pages/EmergencyContacts.jsx` — full contacts management page
- [x] Add `/contacts` route to `src/main.jsx`
- [x] Add "Contacts" nav link to `src/components/layout/Navbar.jsx`
- [x] Add `EmergencySharePanel` to `src/pages/Dashboard.jsx` inside `sosActive` block
- [x] Update `docs/HISTORY.md`, `docs/PROJECT_STATE.MD`, `docs/TASKS.MD`

### 🔜 Future / Pending
- [ ] Web Share API for native share sheet (mobile)
- [ ] Contact count badge on Navbar
- [ ] JSON export/import for contact backup
- [ ] Multi-recipient broadcast shortcut
