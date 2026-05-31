import { Users } from "lucide-react";

const team = [
  { name: "Vishwajeet Singh", role: "Team Lead · Architecture · Integration" },
  { name: "Shaurya Dubey", role: "Frontend UI · Responsiveness" },
  { name: "Aditya Jain", role: "Maps · APIs · AI Integration" },
];

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
        <Users size={28} className="text-cyan-400" />
        <h1 className="font-display text-3xl font-bold">About RoadSoS</h1>
      </div>
      <p className="text-white/60 mb-8 leading-relaxed">
        RoadSoS is an AI-powered emergency response platform built for the National Road Safety Hackathon 2026 organized by IIT Madras. Our goal is to reduce emergency response time during road accidents.
      </p>
      <div className="space-y-3">
        {team.map(({ name, role }) => (
          <div key={name} className="card-glass p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center font-display font-bold text-cyan-400">
              {name[0]}
            </div>
            <div>
              <p className="font-semibold text-white">{name}</p>
              <p className="text-white/40 text-sm">{role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
