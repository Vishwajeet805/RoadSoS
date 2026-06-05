# RoadSoS - Project State

## Project
RoadSoS is a road accident emergency and roadside assistance platform for the National Road Safety Hackathon 2026.

## Team
- Vishwajeet Singh - Team Leader
- Shaurya - Team Member
- Adi - Team Member

## Current Status
Phase 7 - Offline Emergency Mode **COMPLETE**. Voice SOS action integration is also complete.

## Completed Phases
- ✅ **Phase 1**: Project Foundation (React + Vite, Routing, Theme, Components)
- ✅ **Phase 2**: Live Location Detection & SOS Dashboard
- ✅ **Phase 3**: Leaflet Map & Nearby Services (Mock Data)
- ✅ **Phase 4**: Overpass API Integration & Real Services
- ✅ **Phase 5**: AI First Aid Assistant
- ✅ **Phase 6**: Voice SOS Activation
- ✅ **Phase 7**: Offline Emergency Mode

## Confirmed Decisions
- UI Theme: Dark Navy + Cyan + White
- Tech Stack: React + Vite, Tailwind CSS, React Router DOM, Leaflet, OpenStreetMap, Overpass API, Gemini API, LocalStorage, Vercel
- Storage: Browser localStorage with "roadsos_" prefix for persistence
- Location: Browser Geolocation API with watchPosition for continuous updates
- Emergency Numbers: Country-specific (India default, USA, UK, Australia, Germany, France supported)
- Innovation Features:
  1. ✅ AI First Aid Assistant
  2. ✅ Voice SOS
  3. ✅ Offline Emergency Mode

## MVP Status
MVP Phase 4 Complete. Real-time nearby services now functional with:
- ✅ Leaflet Map Integration
- ✅ User Location Marker
- ✅ Real Service Data from Overpass API
- ✅ 30-Minute Caching
- ✅ Graceful Fallback to Mock Data
- ✅ Category Filters
- ✅ Service Cards with Address & Hours
- ✅ Directions to Google Maps
- ✅ Dynamic Search Radius
- ✅ Loading & Error States
- ✅ Mobile Responsive Design

RoadSoS MVP Features:
1. ✅ Home Page (Foundation)
2. ✅ SOS Dashboard (Live Location + Emergency Numbers)
3. ✅ Nearby Services (Map + Real Data via Overpass API)
4. ✅ AI First Aid Assistant
5. ✅ Emergency Guide
6. ❌ Global Emergency Numbers Selector
7. ✅ Voice SOS
8. ✅ Offline Emergency Mode

## Next Tasks
- Global Emergency Numbers Selector (Phase 8)
- Testing & Bug Fixes
- Performance Optimization
- Deployment & Launch

---

## Phase F — Current State (2026-06-04)

**Module:** Accident Severity Detection
**Status:** ✅ Complete

**Route:** `/accident-severity`
**Nav Label:** Severity Check

**Active Features:**
- Rule-based scoring with high / medium / low keyword tiers
- Critical keyword override (forces High Risk)
- Symptom chip selector (16 chips across 3 risk tiers)
- Free-text description input (max 1000 chars)
- Future-ready image upload placeholder
- SeverityResultCard: risk badge, score, factors, recommendations, action buttons
- Emergency action buttons link to SOS Dashboard, Nearby Services, AI Assistant, Emergency Guide
- Safety disclaimer — visible on page load and inside result

**Not Yet Active:**
- Vision-model image analysis (placeholder only)
- AI-powered text analysis (rule-based only)

**Build:** `npm run build` passes with 0 errors.

---

## Phase G — Current State (2026-06-04)

**Module:** Automatic Crash Detection Simulation
**Status:** ✅ Complete

**Placement:** Dashboard page — after Voice SOS section

**Active Features:**
- Simulation trigger button with 3s animated countdown
- State machine: idle → detecting → crash-detected
- Crash alert panel with red glow, timestamp, location
- Google Maps link from live/cached coordinates
- WhatsApp + SMS share URLs with pre-filled emergency message
- Call 112 direct link
- Nearby Services + AI First Aid navigation buttons
- Reset at any stage
- Future architecture collapsible info panel
- Simulation disclaimer always shown

**Not Active (Future):**
- Real accelerometer-based crash detection
- GPS anomaly detection
- Automatic background notification
- DeviceMotion API integration

**Build:** `npm run build` passes with 0 errors.

---

## Phase A — Current State (2026-06-05)

**Module:** Emergency Contact Notifications
**Status:** ✅ Complete

**Route:** `/contacts`
**Nav Label:** Contacts

**Active Features:**
- Personal contact CRUD (add, edit, delete) with localStorage
- Phone number validation + duplicate prevention
- Relationship categories: Father, Mother, Spouse, Sibling, Friend, Guardian, Colleague, Other
- One-tap Call, WhatsApp, SMS per contact during SOS
- Auto-generated emergency message with live GPS location (Google Maps link)
- Copy-to-clipboard for emergency message
- EmergencySharePanel auto-appears when SOS is activated (button, voice, or crash detection)
- Full offline support (contacts + message generation + deep links work without internet)

**SOS Integration:**
- EmergencySharePanel rendered inside Dashboard `sosActive` block
- Triggered by: manual SOS button, Voice SOS, Crash Detection Simulator
- Voice SOS and Crash Detection flows NOT modified

**Build:** `npm run build` passes with 0 errors.
