import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NearbyServices from "./pages/NearbyServices";
import AIAssistant from "./pages/AIAssistant";
import EmergencyGuide from "./pages/EmergencyGuide";
import About from "./pages/About";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nearby" element={<NearbyServices />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/guide" element={<EmergencyGuide />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
