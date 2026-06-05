import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NearbyServices from "./pages/NearbyServices";
import AIAssistant from "./pages/AIAssistant";
import EmergencyGuide from "./pages/EmergencyGuide";
import About from "./pages/About";
import AccidentSeverity from "./pages/AccidentSeverity";
import EmergencyContacts from "./pages/EmergencyContacts";
import IntroAnimation from "./components/ui/IntroAnimation";
import "./styles/index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="nearby" element={<NearbyServices />} />
      <Route path="assistant" element={<AIAssistant />} />
      <Route path="guide" element={<EmergencyGuide />} />
      <Route path="about" element={<About />} />
      <Route path="accident-severity" element={<AccidentSeverity />} />
      <Route path="contacts" element={<EmergencyContacts />} />
    </Route>
  ),
  {
    future: { v7_startTransition: true, v7_relativeSplatPath: true },
  }
);

function Root() {
  const [showIntro, setShowIntro] = useState(() => {
    // Check for force reset flag (for testing)
    if (sessionStorage.getItem("roadsos_force_intro")) {
      sessionStorage.removeItem("roadsos_force_intro");
      return true;
    }

    // Skip in dev HMR after first load; show only once per session in prod
    if (import.meta.env.DEV) {
      return !sessionStorage.getItem("roadsos_intro_seen");
    }
    return !localStorage.getItem("roadsos_intro_seen");
  });

  const handleIntroComplete = () => {
    if (import.meta.env.DEV) {
      sessionStorage.setItem("roadsos_intro_seen", "true");
    } else {
      localStorage.setItem("roadsos_intro_seen", "true");
    }
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <RouterProvider router={router} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
