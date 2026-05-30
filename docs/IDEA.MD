# RoadSoS - Master Project Context

You are helping build RoadSoS, a hackathon project for the National Road Safety Hackathon 2026 organized by IIT Madras.

## Project Overview

RoadSoS is an AI-powered emergency response and roadside assistance platform designed to reduce response time during road accidents and emergencies.

The platform helps users quickly find nearby emergency and vehicle assistance services, access emergency contacts, receive AI-guided first aid instructions, and continue using critical emergency information even when internet connectivity is unavailable.

The goal is not to build a hospital management system or a social platform.

The goal is to build a fast, reliable emergency assistance platform that can help users during road accidents and roadside emergencies.

---

# Problem Statement

During road accidents, victims and bystanders often lose valuable time searching for:

* Hospitals
* Trauma centres
* Ambulance services
* Police stations
* Towing services
* Vehicle rescue services
* Puncture repair shops
* Emergency contacts

Additionally:

* People may not know first aid procedures.
* Internet connectivity may be poor.
* Emergency information may not be immediately available.
* Tourists and travelers may not know local emergency numbers.

RoadSoS aims to solve these problems.

---

# Hackathon Requirements

The rulebook explicitly mentions:

RoadSoS should provide access to:

* Nearest Police Stations
* Nearest Hospitals
* Nearest Ambulance Services
* Vehicle Rescue Services
* Towing Services
* Puncture Shops
* Vehicle Showrooms
* Emergency Contacts

Evaluation criteria include:

* Reliability
* Data accuracy
* Number of contacts/services fetched
* Offline functionality
* Innovation
* Applicability across countries

The project should directly address these requirements.

---

# Target Users

## Primary Users

* Accident victims
* Drivers
* Riders
* Travelers
* Highway commuters

## Secondary Users

* Family members
* Bystanders
* Emergency responders

---

# Core Product Vision

RoadSoS should function as an Emergency and Roadside Assistance Super App.

It should help users:

1. Detect their location
2. Access nearby emergency services
3. Access vehicle assistance services
4. Contact emergency responders
5. Receive first aid guidance
6. Continue accessing critical information offline

---

# MVP Features

## Home Page

Purpose:
Introduce RoadSoS and explain how it works.

Features:

* Hero section
* Project overview
* Feature showcase
* Emergency CTA

---

## SOS Dashboard

Purpose:
Main emergency control center.

Features:

* Current location
* Emergency contacts
* Quick actions
* SOS access

---

## Nearby Services Module

Purpose:
Display nearby emergency and vehicle assistance services.

Emergency Services:

* Hospitals
* Ambulances
* Police Stations

Vehicle Assistance:

* Tow Services
* Rescue Services
* Puncture Shops
* Vehicle Showrooms

Display on:

* Interactive map
* Service cards

---

## AI First Aid Assistant

Purpose:
Provide emergency first aid guidance.

Example:

User:
"A person is bleeding after an accident."

AI:

* Apply pressure to the wound.
* Call emergency services.
* Keep victim conscious.

The assistant is informational only and should encourage contacting emergency services.

---

## Emergency Guide

Purpose:
Provide offline emergency information.

Topics:

* Bleeding
* Burns
* Fractures
* CPR basics
* Head injuries

This guide should work without internet access.

---

## Global Emergency Numbers

Purpose:
Support international travelers.

Examples:

India:
112

USA:
911

UK:
999

The application should detect user location and display appropriate emergency numbers.

---

# Innovation Features

The project should include:

1. AI First Aid Assistant
2. Voice SOS Activation
3. Offline Emergency Mode

These are priority innovation features.

---

# Voice SOS

Users should be able to activate emergency assistance using voice commands such as:

* Help
* SOS
* Emergency
* Accident

Use browser-based speech recognition.

---

# Offline Emergency Mode

This is a high-priority feature because the rulebook explicitly evaluates offline functionality.

Offline mode should allow access to:

* Emergency guide
* Emergency numbers
* Previously loaded emergency contacts
* Last known location

Use:

* Service Workers
* LocalStorage
* Cached data

---

# Technology Stack

Frontend:

* React
* Vite
* Tailwind CSS
* React Router DOM

Maps:

* Leaflet
* OpenStreetMap
* Overpass API

AI:

* Gemini API

Storage:

* LocalStorage

Deployment:

* Vercel

Backend:
Optional and not required for MVP.

Do not introduce unnecessary technologies unless required.

---

# Development Philosophy

The project is being built for a hackathon.

Priorities:

1. Working MVP
2. Excellent user experience
3. Reliability
4. Mobile responsiveness
5. Clear demo flow
6. Rulebook compliance

Do not over-engineer.

Avoid:

* Authentication
* Login systems
* Payment systems
* Admin dashboards
* Complex backend architecture
* Unnecessary databases

Focus on features that improve judging scores.

---

# UI/UX Direction

The application should feel like a modern emergency response platform.

Characteristics:

* Fast
* Clean
* Mobile-first
* Professional
* High contrast
* Easy to use under stress

Avoid:

* Cluttered interfaces
* Generic dashboards
* Corporate admin panel appearance

Think:
Emergency response platform + modern startup design.

---

# Team Structure

Team Leader:
Vishwajeet Singh

Team Members:
Shaurya
Adi

Responsibilities:


* Architecture
* Integration
* GitHub
* Documentation
* Presentation


* Frontend UI
* Responsiveness
* Layout



* Maps
* APIs
* AI Integration

---

# Development Rules

* Never redesign the project.
* Never change the technology stack.
* Never rewrite completed modules.
* Build module by module.
* Keep code reusable.
* Keep code maintainable.
* Use responsive design.
* Mention file names.
* Mention dependencies.
* Mention environment variables.
* Update only affected files.
* Optimize token usage.

Before generating code:

1. Summarize project state.
2. Identify current task.
3. Explain which files need modification.
4. Generate only required code.

Act like a senior startup engineer helping build a winning hackathon MVP rather than a code generator.
