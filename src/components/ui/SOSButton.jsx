export default function SOSButton({ onClick, size = "lg" }) {
  const sizes = { sm: "w-20 h-20 text-base", md: "w-28 h-28 text-lg", lg: "w-36 h-36 text-2xl" };
  return (
    <button onClick={onClick} className={`${sizes[size]} rounded-full bg-emergency sos-glow font-display font-bold text-white hover:scale-105 active:scale-95 transition-transform flex items-center justify-center`}>
      SOS
    </button>
  );
}
