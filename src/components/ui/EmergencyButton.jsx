export default function EmergencyButton({ label, number, icon: Icon, color = "text-cyan-400" }) {
  return (
    <a href={`tel:${number}`} className="card-glass p-4 flex items-center gap-3 hover:bg-white/10 transition-all group">
      {Icon && <Icon size={22} className={`${color} group-hover:scale-110 transition-transform`} />}
      <div>
        <p className="text-white/50 text-xs">{label}</p>
        <p className="font-display font-bold text-white text-lg">{number}</p>
      </div>
    </a>
  );
}
