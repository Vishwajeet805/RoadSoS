// Phase F — Accident Severity Detection
// SeverityAnalyzer.jsx — Input form + analysis orchestrator

import { useState, useCallback } from "react";
import {
  ScanSearch,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  FileText,
} from "lucide-react";
import { symptomOptions } from "../data/severityRules";
import { analyzeSeverity, validateInput } from "../services/severityService";
import SeverityResultCard from "./SeverityResultCard";
import ImageUploadPlaceholder from "./ImageUploadPlaceholder";

// ─── Symptom chip risk colours ────────────────────────────────────────────────
const CHIP_STYLES = {
  high:   { base: "border-emergency/30 text-emergency/70 bg-emergency/10",       active: "border-emergency bg-emergency/25 text-emergency shadow-[0_0_10px_rgba(239,68,68,0.3)]" },
  medium: { base: "border-amber-500/30 text-amber-400/70 bg-amber-500/10",        active: "border-amber-400 bg-amber-500/25 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.25)]" },
  low:    { base: "border-emerald-500/30 text-emerald-400/70 bg-emerald-500/10",  active: "border-emerald-400 bg-emerald-500/25 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.2)]" },
};

const MAX_DESC = 1000;

export default function SeverityAnalyzer() {
  const [description,      setDescription]      = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [result,           setResult]           = useState(null);
  const [error,            setError]            = useState("");
  const [loading,          setLoading]          = useState(false);
  const [showImage,        setShowImage]        = useState(false);
  const [analysisCount,    setAnalysisCount]    = useState(0);

  // ── Symptom chip toggle ──────────────────────────────────────────────────
  const toggleSymptom = useCallback((option) => {
    setSelectedSymptoms((prev) => {
      const exists = prev.some((s) => s.id === option.id);
      return exists ? prev.filter((s) => s.id !== option.id) : [...prev, option];
    });
  }, []);

  const isSelected = (id) => selectedSymptoms.some((s) => s.id === id);

  // ── Analyse ───────────────────────────────────────────────────────────────
  const handleAnalyze = () => {
    setError("");
    const { valid, message } = validateInput({ description, selectedSymptoms });
    if (!valid) {
      setError(message);
      return;
    }

    setLoading(true);
    // Tiny delay so UI shows loading state (scoring is synchronous but instant)
    setTimeout(() => {
      const analysis = analyzeSeverity({ description, selectedSymptoms });
      setResult(analysis);
      setAnalysisCount((c) => c + 1);
      setLoading(false);
      // Scroll result into view
      setTimeout(() => {
        document.getElementById("severity-result")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }, 400);
  };

  // ── Reset ─────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setDescription("");
    setSelectedSymptoms([]);
    setResult(null);
    setError("");
    setLoading(false);
  };

  // ── Symptom groups for visual separation ─────────────────────────────────
  const highChips   = symptomOptions.filter((s) => s.risk === "high");
  const mediumChips = symptomOptions.filter((s) => s.risk === "medium");
  const lowChips    = symptomOptions.filter((s) => s.risk === "low");

  return (
    <div className="space-y-6">

      {/* ── 1. Description Input ──────────────────────────────────────────── */}
      <div className="card-glass p-6 rounded-2xl space-y-3">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-cyan-400" />
          <label htmlFor="accident-desc" className="text-sm font-semibold text-white/80 uppercase tracking-wider">
            Accident Description
          </label>
        </div>
        <textarea
          id="accident-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, MAX_DESC))}
          placeholder='Describe what happened. e.g. "Bike accident, person is unconscious and bleeding heavily."'
          rows={4}
          className="w-full bg-white/5 border border-white/15 focus:border-cyan-500/60 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 resize-none transition-colors"
        />
        <div className="flex justify-between items-center">
          <p className="text-xs text-white/30">
            Describe the victim's condition, injuries, and situation clearly.
          </p>
          <span className={`text-xs font-mono ${description.length >= MAX_DESC ? "text-emergency" : "text-white/30"}`}>
            {description.length}/{MAX_DESC}
          </span>
        </div>
      </div>

      {/* ── 2. Symptom Chips ──────────────────────────────────────────────── */}
      <div className="card-glass p-6 rounded-2xl space-y-4">
        <p className="text-sm font-semibold text-white/80 uppercase tracking-wider">Select Symptoms</p>

        {/* High risk chips */}
        <div>
          <p className="text-xs text-emergency/70 font-bold uppercase tracking-widest mb-2">High Risk</p>
          <div className="flex flex-wrap gap-2">
            {highChips.map((opt) => {
              const active = isSelected(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleSymptom(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 ${
                    active ? CHIP_STYLES.high.active : CHIP_STYLES.high.base
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Medium risk chips */}
        <div>
          <p className="text-xs text-amber-400/70 font-bold uppercase tracking-widest mb-2">Medium Risk</p>
          <div className="flex flex-wrap gap-2">
            {mediumChips.map((opt) => {
              const active = isSelected(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleSymptom(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 ${
                    active ? CHIP_STYLES.medium.active : CHIP_STYLES.medium.base
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Low risk chips */}
        <div>
          <p className="text-xs text-emerald-400/70 font-bold uppercase tracking-widest mb-2">Low Risk</p>
          <div className="flex flex-wrap gap-2">
            {lowChips.map((opt) => {
              const active = isSelected(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleSymptom(opt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 ${
                    active ? CHIP_STYLES.low.active : CHIP_STYLES.low.base
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected count summary */}
        {selectedSymptoms.length > 0 && (
          <div className="flex items-center gap-2 pt-1">
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30">
              {selectedSymptoms.length}
            </span>
            <span className="text-xs text-white/50">symptom{selectedSymptoms.length !== 1 ? "s" : ""} selected</span>
          </div>
        )}
      </div>

      {/* ── 3. Image Upload (collapsible) ─────────────────────────────────── */}
      <div className="card-glass rounded-2xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowImage((v) => !v)}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
        >
          <span className="text-sm font-semibold text-white/60 uppercase tracking-wider">
            Upload Scene Image (Optional)
          </span>
          {showImage ? (
            <ChevronUp size={16} className="text-white/40" />
          ) : (
            <ChevronDown size={16} className="text-white/40" />
          )}
        </button>
        {showImage && (
          <div className="px-6 pb-6 animate-fade-in">
            <ImageUploadPlaceholder />
          </div>
        )}
      </div>

      {/* ── 4. Validation error ───────────────────────────────────────────── */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-emergency/10 border border-emergency/30 animate-fade-in">
          <AlertCircle size={16} className="text-emergency flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emergency/90">{error}</p>
        </div>
      )}

      {/* ── 5. Action Buttons ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-navy-950 font-display font-black text-base transition-all duration-300 shadow-glow-cyan hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-navy-950/30 border-t-navy-950 rounded-full animate-spin" />
              Analysing…
            </>
          ) : (
            <>
              <ScanSearch size={18} />
              {analysisCount > 0 ? "Re-Analyse" : "Analyse Severity"}
            </>
          )}
        </button>

        {(description || selectedSymptoms.length > 0 || result) && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white/60 hover:text-white font-semibold text-sm transition-all duration-300"
          >
            <RotateCcw size={15} />
            Clear
          </button>
        )}
      </div>

      {/* ── 6. Result Card ────────────────────────────────────────────────── */}
      {result && (
        <div id="severity-result" className="animate-slide-up pt-2">
          <SeverityResultCard result={result} />
        </div>
      )}
    </div>
  );
}
