export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Base gradient — enhanced depth */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #020818 0%, #0a1f4a 40%, #071640 50%, #0a0e1f 100%)"
      }} />

      {/* Grid pattern — enhanced visibility */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: "linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)",
        backgroundSize: "50px 50px"
      }} />

      {/* Cyan blob — top left (enhanced) */}
      <div
        className="absolute rounded-full blur-[140px] animate-float"
        style={{
          width: "550px", height: "550px",
          top: "-150px", left: "-150px",
          background: "radial-gradient(circle, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.04) 100%)",
          animationDuration: "8s",
        }}
      />

      {/* Emergency red blob — bottom right (enhanced) */}
      <div
        className="absolute rounded-full blur-[140px] animate-float"
        style={{
          width: "450px", height: "450px",
          bottom: "-120px", right: "-120px",
          background: "radial-gradient(circle, rgba(239,68,68,0.10) 0%, rgba(239,68,68,0.04) 100%)",
          animationDuration: "10s",
          animationDelay: "3s",
        }}
      />

      {/* Indigo blob — center (enhanced) */}
      <div
        className="absolute rounded-full blur-[180px] animate-float"
        style={{
          width: "700px", height: "350px",
          top: "35%", left: "25%",
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(99,102,241,0.02) 100%)",
          animationDuration: "12s",
          animationDelay: "5s",
        }}
      />

      {/* Accent blob — top right (subtle) */}
      <div
        className="absolute rounded-full blur-[100px] animate-float"
        style={{
          width: "300px", height: "300px",
          top: "10%", right: "-50px",
          background: "rgba(168,85,247,0.03)",
          animationDuration: "9s",
          animationDelay: "2s",
        }}
      />

      {/* Accent blob — bottom left (subtle) */}
      <div
        className="absolute rounded-full blur-[100px] animate-float"
        style={{
          width: "280px", height: "280px",
          bottom: "5%", left: "-40px",
          background: "rgba(14,165,233,0.03)",
          animationDuration: "11s",
          animationDelay: "4s",
        }}
      />

      {/* Optional: Subtle emergency pulse on dashboard */}
      {typeof window !== "undefined" && window.location.pathname === "/dashboard" && (
        <div
          className="absolute inset-0 animate-pulse pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(239,68,68,0.02) 0%, transparent 70%)",
            animationDuration: "3s",
            animationDelay: "0s",
          }}
        />
      )}
    </div>
  );
}
