import React from "react";
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
    </Route>
  ),
  {
    future: { v7_startTransition: true, v7_relativeSplatPath: true },
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
