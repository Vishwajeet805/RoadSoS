// Phase F — Accident Severity Detection
// severityService.js — Pure scoring logic (no React, no side effects)

import {
  criticalOverrideFactors,
  highRiskFactors,
  mediumRiskFactors,
  lowRiskFactors,
  SEVERITY_THRESHOLDS,
  recommendedActions,
  emergencyActions,
  SAFETY_DISCLAIMER,
} from "../data/severityRules";

/**
 * Normalise text for keyword matching:
 * lower-case, collapse whitespace, strip punctuation.
 */
function normalise(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Scan a normalised corpus string for a list of keyword rules.
 * Returns an array of matched { label, points, keyword } objects.
 * Prevents the same label from being counted more than once.
 */
function matchFactors(corpus, factors) {
  const seen = new Set();
  const matches = [];
  for (const factor of factors) {
    if (seen.has(factor.label)) continue;
    if (corpus.includes(normalise(factor.keyword))) {
      seen.add(factor.label);
      matches.push(factor);
    }
  }
  return matches;
}

/**
 * Build a combined text corpus from:
 *  - the free-text description
 *  - the keywords of all selected symptom chips
 */
function buildCorpus(description, selectedSymptoms) {
  const parts = [description];
  for (const sym of selectedSymptoms) {
    parts.push(sym.keyword ?? sym.label ?? "");
  }
  return normalise(parts.join(" "));
}

/**
 * Main public API
 *
 * analyzeSeverity({ description, selectedSymptoms })
 *
 * @param {string}   description      Free-text accident description
 * @param {Array}    selectedSymptoms Array of symptomOption objects (from severityRules.js)
 *
 * @returns {{
 *   level: "Low Risk" | "Medium Risk" | "High Risk",
 *   score: number,
 *   detectedFactors: string[],
 *   recommendations: string[],
 *   emergencyButtons: Array<{label, action, variant}>,
 *   disclaimer: string,
 *   criticalOverride: boolean,
 * }}
 */
export function analyzeSeverity({ description = "", selectedSymptoms = [] }) {
  const corpus = buildCorpus(description, selectedSymptoms);

  // 1. Detect matches across all tiers
  const highMatches   = matchFactors(corpus, highRiskFactors);
  const mediumMatches = matchFactors(corpus, mediumRiskFactors);
  const lowMatches    = matchFactors(corpus, lowRiskFactors);

  // 2. Calculate raw score
  const score =
    highMatches.reduce((s, f) => s + f.points, 0) +
    mediumMatches.reduce((s, f) => s + f.points, 0) +
    lowMatches.reduce((s, f) => s + f.points, 0);

  // 3. Critical-keyword override check
  const criticalOverride = criticalOverrideFactors.some((kw) =>
    corpus.includes(normalise(kw))
  );

  // 4. Determine level
  let level;
  if (criticalOverride || score >= SEVERITY_THRESHOLDS.HIGH_MIN) {
    level = "High Risk";
  } else if (score >= SEVERITY_THRESHOLDS.LOW_MAX + 1) {
    level = "Medium Risk";
  } else {
    level = "Low Risk";
  }

  // 5. Build detected-factors list (deduplicated labels, high → medium → low)
  const allMatches = [...highMatches, ...mediumMatches, ...lowMatches];
  const detectedFactors = [...new Set(allMatches.map((f) => f.label))];

  // 6. Pick level key for action lookup
  const levelKey = level === "High Risk" ? "HIGH"
    : level === "Medium Risk" ? "MEDIUM"
    : "LOW";

  return {
    level,
    score,
    detectedFactors,
    recommendations: recommendedActions[levelKey],
    emergencyButtons: emergencyActions[levelKey],
    disclaimer: SAFETY_DISCLAIMER,
    criticalOverride,
  };
}

/**
 * Validate that there is at least some meaningful input before analysis.
 * Returns { valid: bool, message: string }
 */
export function validateInput({ description, selectedSymptoms }) {
  const trimmed = description?.trim() ?? "";
  const hasSymptoms = selectedSymptoms?.length > 0;

  if (!trimmed && !hasSymptoms) {
    return {
      valid: false,
      message: "Please enter an accident description or select at least one symptom.",
    };
  }
  if (trimmed.length > 0 && trimmed.length < 5) {
    return {
      valid: false,
      message: "Description is too short. Please provide more detail.",
    };
  }
  return { valid: true, message: "" };
}
