export default function SOSButton({ onClick, size = "lg" }) {
  const sizes = {
    sm: "w-20 h-20 text-base",
    md: "w-28 h-28 text-lg",
    lg: "w-36 h-36 text-2xl",
  };

  return (
    <button
      onClick={onClick}
      className={`${sizes[size]} rounded-full bg-gradient-to-b from-emergency to-red-700 font-display font-black text-white hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center relative overflow-hidden group`}
    >
      {/* Background animated rings */}
      <div className="absolute inset-0 rounded-full border-2 border-emergency/30 animate-pulse-glow"></div>
      <div className="absolute inset-0 rounded-full border border-emergency/20" style={{
        animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) 0.5s infinite"
      }}></div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full shadow-emergency-glow-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Text */}
      <span className="relative z-10">SOS</span>
    </button>
  );
}
