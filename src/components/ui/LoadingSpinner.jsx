export default function LoadingSpinner({ size = "md", label = "Loading..." }) {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className={`${sizes[size]} border-2 border-white/10 border-t-cyan-400 rounded-full animate-spin`} />
      <p className="text-white/40 text-sm">{label}</p>
    </div>
  );
}
