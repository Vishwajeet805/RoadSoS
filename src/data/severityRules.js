// Phase F — Accident Severity Detection
// severityRules.js — Static scoring rules, keyword lists, symptom options

// ─────────────────────────────────────────────────────────────
// CRITICAL factors → auto-force High Risk regardless of score
// ─────────────────────────────────────────────────────────────
export const criticalOverrideFactors = [
  "unconscious",
  "not breathing",
  "no pulse",
  "heavy bleeding",
  "head injury",
  "unresponsive",
  "not responding",
];

// ─────────────────────────────────────────────────────────────
// HIGH RISK keywords → +4 pts each
// ─────────────────────────────────────────────────────────────
export const highRiskFactors = [
  { keyword: "unconscious",         label: "Unconscious",            points: 4 },
  { keyword: "unresponsive",        label: "Unresponsive",           points: 4 },
  { keyword: "not breathing",       label: "Not Breathing",          points: 4 },
  { keyword: "no pulse",            label: "No Pulse",               points: 4 },
  { keyword: "heavy bleeding",      label: "Heavy Bleeding",         points: 4 },
  { keyword: "head injury",         label: "Head Injury",            points: 4 },
  { keyword: "chest pain",          label: "Chest Pain",             points: 4 },
  { keyword: "trapped",             label: "Person Trapped",         points: 4 },
  { keyword: "severe crash",        label: "Severe Crash",           points: 4 },
  { keyword: "multiple injuries",   label: "Multiple Injuries",      points: 4 },
  { keyword: "spinal",              label: "Spinal Injury Suspected", points: 4 },
  { keyword: "spine",               label: "Spine Injury",           points: 4 },
  { keyword: "seizure",             label: "Seizure",                points: 4 },
  { keyword: "not moving",          label: "Not Moving",             points: 4 },
];

// ─────────────────────────────────────────────────────────────
// MEDIUM RISK keywords → +2 pts each
// ─────────────────────────────────────────────────────────────
export const mediumRiskFactors = [
  { keyword: "fracture",      label: "Fracture",          points: 2 },
  { keyword: "broken bone",   label: "Broken Bone",       points: 2 },
  { keyword: "dizziness",     label: "Dizziness",         points: 2 },
  { keyword: "dizzy",         label: "Dizziness",         points: 2 },
  { keyword: "burn",          label: "Burns",             points: 2 },
  { keyword: "swelling",      label: "Swelling",          points: 2 },
  { keyword: "severe pain",   label: "Severe Pain",       points: 2 },
  { keyword: "vomiting",      label: "Vomiting",          points: 2 },
  { keyword: "bleeding",      label: "Bleeding",          points: 2 },
  { keyword: "bleed",         label: "Bleeding",          points: 2 },
  { keyword: "confusion",     label: "Confusion",         points: 2 },
  { keyword: "confused",      label: "Confusion",         points: 2 },
  { keyword: "numbness",      label: "Numbness",          points: 2 },
  { keyword: "numb",          label: "Numbness",          points: 2 },
];

// ─────────────────────────────────────────────────────────────
// LOW RISK keywords → +1 pt each
// ─────────────────────────────────────────────────────────────
export const lowRiskFactors = [
  { keyword: "small cut",       label: "Small Cut",         points: 1 },
  { keyword: "minor cut",       label: "Minor Cut",         points: 1 },
  { keyword: "scratch",         label: "Scratch",           points: 1 },
  { keyword: "bruise",          label: "Bruise",            points: 1 },
  { keyword: "minor pain",      label: "Minor Pain",        points: 1 },
  { keyword: "mild pain",       label: "Mild Pain",         points: 1 },
  { keyword: "minor injury",    label: "Minor Injury",      points: 1 },
  { keyword: "mild injury",     label: "Mild Injury",       points: 1 },
  { keyword: "vehicle damage",  label: "Vehicle Damage Only", points: 1 },
  { keyword: "property damage", label: "Property Damage",   points: 1 },
];

// ─────────────────────────────────────────────────────────────
// Severity thresholds
// ─────────────────────────────────────────────────────────────
export const SEVERITY_THRESHOLDS = {
  LOW_MAX:    2,   // 0–2  → Low Risk
  MEDIUM_MAX: 6,   // 3–6  → Medium Risk
  HIGH_MIN:   7,   // 7+   → High Risk
};

// ─────────────────────────────────────────────────────────────
// Selectable symptom chip options shown in the UI
// ─────────────────────────────────────────────────────────────
export const symptomOptions = [
  // High risk chips
  { id: "heavy_bleeding",    label: "Heavy Bleeding",    keyword: "heavy bleeding",   risk: "high" },
  { id: "unconscious",       label: "Unconscious",       keyword: "unconscious",      risk: "high" },
  { id: "head_injury",       label: "Head Injury",       keyword: "head injury",      risk: "high" },
  { id: "not_breathing",     label: "Not Breathing",     keyword: "not breathing",    risk: "high" },
  { id: "chest_pain",        label: "Chest Pain",        keyword: "chest pain",       risk: "high" },
  { id: "trapped",           label: "Person Trapped",    keyword: "trapped",          risk: "high" },

  // Medium risk chips
  { id: "severe_pain",       label: "Severe Pain",       keyword: "severe pain",      risk: "medium" },
  { id: "fracture",          label: "Fracture",          keyword: "fracture",         risk: "medium" },
  { id: "burns",             label: "Burns",             keyword: "burn",             risk: "medium" },
  { id: "dizziness",         label: "Dizziness",         keyword: "dizziness",        risk: "medium" },
  { id: "bleeding",          label: "Bleeding",          keyword: "bleeding",         risk: "medium" },
  { id: "confusion",         label: "Confusion",         keyword: "confusion",        risk: "medium" },

  // Low risk chips
  { id: "minor_bleeding",    label: "Minor Bleeding",    keyword: "minor cut",        risk: "low" },
  { id: "small_cuts",        label: "Small Cuts",        keyword: "small cut",        risk: "low" },
  { id: "dizziness_mild",    label: "Mild Dizziness",    keyword: "mild pain",        risk: "low" },
  { id: "vehicle_damage",    label: "Vehicle Damage Only", keyword: "vehicle damage", risk: "low" },
];

// ─────────────────────────────────────────────────────────────
// Recommended actions per risk level
// ─────────────────────────────────────────────────────────────
export const recommendedActions = {
  HIGH: [
    "🚨 Call emergency services immediately (112)",
    "🚑 Request ambulance and police at once",
    "⛔ Do NOT move the injured person unless in immediate danger",
    "🩸 Apply gentle pressure to heavy bleeding wounds",
    "💬 Keep the victim calm and conscious if possible",
    "📍 Stay on the line with emergency services",
    "🤖 Use the AI First Aid Assistant for step-by-step guidance",
  ],
  MEDIUM: [
    "🏥 Seek medical evaluation as soon as possible",
    "🚶 Avoid unnecessary movement of the injured person",
    "👁️ Monitor symptoms closely — watch for worsening signs",
    "📞 Call a doctor or hospital helpline for advice",
    "📍 Use Nearby Services to locate the closest clinic or hospital",
    "📖 Check the Emergency Guide for first-aid steps",
  ],
  LOW: [
    "🧼 Clean minor wounds with clean water",
    "🩹 Apply a bandage or plaster if needed",
    "👀 Monitor the condition for any worsening signs",
    "📖 Use the Emergency Guide for basic first-aid tips",
    "🏥 Seek medical help if symptoms worsen or pain increases",
  ],
};

// ─────────────────────────────────────────────────────────────
// Emergency actions per risk level (button-level CTAs)
// ─────────────────────────────────────────────────────────────
export const emergencyActions = {
  HIGH: [
    { label: "🚨 Activate SOS",           action: "SOS",       variant: "emergency" },
    { label: "🏥 Nearby Hospitals",        action: "NEARBY",    variant: "cyan" },
    { label: "🤖 AI First Aid Assistant",  action: "ASSISTANT", variant: "secondary" },
  ],
  MEDIUM: [
    { label: "📍 Nearby Services",         action: "NEARBY",    variant: "cyan" },
    { label: "📖 Emergency Guide",         action: "GUIDE",     variant: "secondary" },
    { label: "🤖 AI First Aid Assistant",  action: "ASSISTANT", variant: "ghost" },
  ],
  LOW: [
    { label: "📖 Emergency Guide",         action: "GUIDE",     variant: "secondary" },
    { label: "📍 Nearby Services",         action: "NEARBY",    variant: "ghost" },
  ],
};

// ─────────────────────────────────────────────────────────────
// Safety disclaimer text (always visible)
// ─────────────────────────────────────────────────────────────
export const SAFETY_DISCLAIMER =
  "This tool provides basic accident risk estimation for emergency awareness only. It does not provide medical diagnosis. In serious or uncertain situations, contact emergency services immediately.";
