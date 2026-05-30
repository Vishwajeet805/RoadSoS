import { Phone, AlertTriangle, Flame } from "lucide-react";
import { getNumbersByCountry } from "../services/emergencyNumbers";
import EmergencyButton from "./ui/EmergencyButton";

export default function EmergencyNumbersCard({ countryCode = "IN" }) {
  const numbers = getNumbersByCountry(countryCode);

  const emergencyContacts = [
    { label: "Police", number: numbers.police, icon: AlertTriangle, color: "text-emergency" },
    { label: "Ambulance", number: numbers.ambulance, icon: Phone, color: "text-emerald-400" },
    { label: "Fire", number: numbers.fire, icon: Flame, color: "text-orange-400" },
    { label: "Unified", number: numbers.unified, icon: AlertTriangle, color: "text-cyan-400" },
  ];

  return (
    <div className="card-glass p-6">
      <div className="flex items-center gap-2 mb-5">
        <Phone size={20} className="text-emergency" />
        <h3 className="font-display font-bold text-lg">Emergency Numbers</h3>
        <span className="text-white/50 text-sm ml-auto">{numbers.country}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {emergencyContacts.map(({ label, number, icon, color }) => (
          <EmergencyButton key={label} label={label} number={number} icon={icon} color={color} />
        ))}
      </div>
    </div>
  );
}
