# 🚨 RoadSoS – AI-Powered Emergency & Roadside Assistance Platform

<div align="center">

![RoadSoS](https://img.shields.io/badge/RoadSoS-Road%20Safety%20Platform-red?style=for-the-badge)

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Latest-cyan?logo=tailwindcss)
![Leaflet](https://img.shields.io/badge/Leaflet-Maps-green?logo=leaflet)
![Gemini](https://img.shields.io/badge/Google-Gemini-orange?logo=google)

### Every Second Matters During an Emergency

An AI-powered emergency response and roadside assistance platform designed to reduce emergency response time, provide instant access to nearby help, and assist users during road accidents.

Built for **National Road Safety Hackathon 2026 – IIT Madras**

</div>

---

# 📌 Problem Statement

During road accidents and emergencies, victims and bystanders often face several challenges:

- Difficulty locating nearby hospitals
- Difficulty finding ambulance services
- Lack of immediate first-aid guidance
- Poor connectivity in remote areas
- Panic situations causing delays
- Difficulty finding police stations
- Lack of quick roadside assistance
- Multiple applications required during emergencies

RoadSoS solves these problems through a unified emergency assistance platform.

---

# 🎯 Project Objective

RoadSoS aims to:

- Reduce emergency response time
- Improve accessibility to emergency services
- Provide AI-assisted first-aid guidance
- Enable voice-based emergency activation
- Support emergency access in low-connectivity environments
- Deliver location-based roadside assistance
- Enhance road safety using modern web technologies and AI

---

# ✨ Key Features

## 📍 Live Location Detection

- Real-time location tracking
- Current latitude & longitude
- Location refresh functionality
- Permission handling
- Last known location storage

---

## 🗺️ Nearby Emergency Services

Find nearby:

- 🏥 Hospitals
- 🚑 Ambulance Services
- 👮 Police Stations
- 🔧 Vehicle Repair Centers
- 🛞 Tyre / Puncture Shops
- 🚗 Vehicle Showrooms

Powered by:

- OpenStreetMap
- Overpass API
- Leaflet Maps

---

## 🤖 AI First Aid Assistant

AI-powered emergency guidance system.

Provides assistance for:

- Bleeding
- Burns
- Fractures
- Head Injuries
- CPR Situations
- Unconscious Victims

Features:

- Gemini Integration
- Emergency Recommendations
- Safe Non-Diagnostic Responses
- Fallback Guidance System

---

## 🎙️ Voice SOS Activation

Hands-free emergency activation.

Supported commands:

- SOS
- Help
- Emergency
- Accident
- Ambulance
- Police

Features:

- Voice Recognition
- Emergency Mode Activation
- Quick Emergency Actions
- Voice Feedback Indicators

---

## 📞 Emergency Contact Management

Users can:

- Add Emergency Contacts
- Edit Contacts
- Delete Contacts
- Store Contacts Locally

Stored Information:

- Name
- Relationship
- Phone Number

---

## 🚨 Accident Severity Detection

AI-assisted accident severity analysis.

Input:

- Accident Description
- Symptom Selection
- Future-Ready Image Upload

Output:

- 🟢 Low Risk
- 🟡 Medium Risk
- 🔴 High Risk

Provides:

- Risk Assessment
- Emergency Recommendations
- Suggested Actions
- Safety Guidance

---

## 🚗 Crash Detection Simulation

Future-ready crash detection architecture.

Current MVP includes:

- Crash Simulation Trigger
- Emergency Mode Activation
- Emergency Contact Access
- Location Sharing
- Emergency Recommendations

Future Scope:

- Accelerometer Analysis
- GPS Anomaly Detection
- Speed Drop Detection
- Automatic Emergency Alerts

---

## 📴 Offline Emergency Mode

RoadSoS continues providing critical assistance even without internet access.

Offline Features:

- Emergency Guide
- Emergency Numbers
- Last Known Location
- Cached Emergency Data

---

## 📚 Emergency Guide

Offline-accessible emergency information:

- Bleeding Control
- Burn Treatment
- Fracture Support
- CPR Basics
- Head Injury Care
- Emergency Procedures

---

## 🎨 Premium User Experience

Modern Emergency Command Center UI.

Features:

- Sidebar Navigation
- Intro Animation
- Glassmorphism Design
- Bento Grid Layout
- Global Background Effects
- Mobile Responsive Design
- Smooth Animations
- Emergency-Focused UX

---

# 🏗️ System Architecture

## Emergency Response Flow

```text
User
 ↓
RoadSoS Dashboard
 ↓
Location Detection
 ↓
Emergency Services Discovery
 ↓
Emergency Assistance
```

## AI Assistant Flow

```text
User Query
 ↓
AI Assistant
 ↓
Gemini API / Fallback Engine
 ↓
First Aid Guidance
```

## Voice SOS Flow

```text
Voice Command
 ↓
Speech Recognition API
 ↓
Keyword Detection
 ↓
Emergency Mode Activation
```

## Crash Detection Flow

```text
Crash Detection Simulation
 ↓
Emergency Mode
 ↓
Location Sharing
 ↓
Emergency Actions
```

## Offline Flow

```text
Service Worker
 ↓
Local Storage
 ↓
Offline Emergency Access
```

---

# 🛠️ Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM

## Maps & Location

- Leaflet
- OpenStreetMap
- Overpass API
- Browser Geolocation API

## Artificial Intelligence

- Google Gemini API
- Rule-Based Emergency Fallback

## Browser APIs

- Web Speech API
- Geolocation API
- Local Storage API
- Service Workers

## Deployment

- Vercel

---

# 📂 Project Structure

```text
RoadSoS
│
├── public
│   ├── manifest.json
│   └── sw.js
│
├── src
│   ├── assets
│   ├── api
│   ├── components
│   ├── hooks
│   ├── pages
│   ├── services
│   ├── data
│   ├── utils
│   ├── App.jsx
│   └── main.jsx
│
├── docs
│   ├── HISTORY.md
│   ├── PROJECT_OVERVIEW.md
│   ├── SYSTEM_ARCHITECTURE.md
│   └── ...
│
├── .env.example
├── package.json
└── README.md
```

---

# 🚀 Installation

Clone Repository

```bash
git clone https://github.com/Vishwajeet805/RoadSoS.git
```

Navigate into project

```bash
cd RoadSoS
```

Install dependencies

```bash
npm install
```

Create environment file

```bash
cp .env.example .env
```

Add Gemini API key

```env
VITE_GEMINI_API_KEY=your_api_key_here
```

Run locally

```bash
npm run dev
```

Production build

```bash
npm run build
```

---

# 🔐 Environment Variables

```env
VITE_GEMINI_API_KEY=
```

Never commit actual API keys.

---

# 📱 Responsive Design

RoadSoS is optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

Tested for emergency accessibility and mobile-first usage.

---

# 🎯 Innovation Highlights

### 🤖 AI First Aid Assistant

Provides immediate first-aid guidance before professional help arrives.

### 🎙️ Voice SOS

Hands-free emergency activation during critical situations.

### 📴 Offline Emergency Mode

Critical emergency information remains accessible even without internet.

### 🚨 Accident Severity Detection

Provides intelligent risk assessment and emergency recommendations.

### 🚗 Crash Detection Simulation

Demonstrates future-ready automatic accident detection architecture.

---

# 📊 Future Scope

Planned future enhancements:

- Real-Time Ambulance Tracking
- Hospital Bed Availability
- Multi-Language Support
- Government Service Integration
- Mobile App Development
- Automatic Sensor-Based Crash Detection
- Emergency Contact Notifications
- Smart Wearable Integration
- AI Vision-Based Accident Analysis

---

# 🧪 Testing Status

| Module | Status |
|----------|---------|
| Location Detection | ✅ PASS |
| Nearby Services | ✅ PASS |
| Maps Integration | ✅ PASS |
| AI Assistant | ✅ PASS |
| Voice SOS | ✅ PASS |
| Emergency Contacts | ✅ PASS |
| Severity Detection | ✅ PASS |
| Crash Detection | ✅ PASS |
| Offline Mode | ✅ PASS |
| Responsive UI | ✅ PASS |

---

# 👨‍💻 Team

## Team Leader

**Vishwajeet Singh**

## Team Members

**Shaurya Jain**

**Aditya Jain**

---

# 🏆 Hackathon Alignment

RoadSoS directly addresses the National Road Safety Hackathon problem statement.

✅ Nearby Hospitals

✅ Nearby Ambulance Services

✅ Nearby Police Stations

✅ Vehicle Rescue Support

✅ Emergency Contacts

✅ Location-Based Emergency Access

✅ AI Integration

✅ Offline Support

✅ Voice Assistance

✅ Road Safety Innovation

---

# 📄 License

This project was developed for educational, research, and hackathon purposes.

---

# ❤️ Mission

### "Every Second Matters During an Emergency"

RoadSoS aims to make emergency assistance faster, smarter, more accessible, and more reliable through the power of AI, geolocation, and modern web technologies.

---

<div align="center">

Made with ❤️ for the National Road Safety Hackathon 2026

</div>