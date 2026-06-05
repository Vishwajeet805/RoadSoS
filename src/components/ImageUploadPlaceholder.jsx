// Phase F — Accident Severity Detection
// ImageUploadPlaceholder.jsx — Future-ready image upload UI (no real AI analysis yet)

import { useState, useRef } from "react";
import { Upload, ImagePlus, X, FlaskConical } from "lucide-react";

export default function ImageUploadPlaceholder() {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, WEBP, etc.).");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => handleFile(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e) => e.preventDefault();

  const clearImage = () => {
    setPreview(null);
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      {/* Label */}
      <div className="flex items-center gap-2">
        <ImagePlus size={16} className="text-cyan-400" />
        <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
          Scene Image
        </span>
        <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-accent-purple/20 text-accent-purple border border-accent-purple/30">
          Future Ready
        </span>
      </div>

      {/* Drop zone / preview */}
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => inputRef.current?.click()}
          className="relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/20 hover:border-cyan-500/50 bg-white/3 hover:bg-white/5 transition-all duration-300 cursor-pointer p-8 group"
        >
          <div className="p-3 rounded-xl bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
            <Upload size={24} className="text-white/40 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-white/60 group-hover:text-white/80 transition-colors">
              Drop image here or click to upload
            </p>
            <p className="text-xs text-white/30 mt-1">JPG, PNG, WEBP supported</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-navy-900">
          <img
            src={preview}
            alt="Scene upload preview"
            className="w-full max-h-48 object-cover"
          />
          {/* Overlay with filename */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950/90 to-transparent p-3 flex items-center justify-between">
            <span className="text-xs text-white/70 truncate max-w-[80%]">{fileName}</span>
            <button
              type="button"
              onClick={clearImage}
              className="p-1.5 rounded-lg bg-emergency/20 hover:bg-emergency/40 text-emergency transition-colors"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Future-ready notice */}
      <div className="flex items-start gap-3 p-3 rounded-xl bg-accent-purple/10 border border-accent-purple/20">
        <FlaskConical size={15} className="text-accent-purple flex-shrink-0 mt-0.5" />
        <p className="text-xs text-white/60 leading-relaxed">
          {preview
            ? "Image uploaded successfully. Vision-based severity detection can be connected in future versions."
            : "Image-based severity detection is future-ready and can be connected to a vision model later."}
        </p>
      </div>
    </div>
  );
}
