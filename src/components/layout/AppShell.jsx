import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import BackgroundEffects from "../ui/BackgroundEffects";
import PageTransition from "../ui/PageTransition";

export default function AppShell() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen relative" style={{ background: "#020818" }}>
      {/* Global background */}
      <BackgroundEffects />

      {/* Desktop sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Mobile sidebar */}
      <MobileSidebar />

      {/* Main content — offset by sidebar width on desktop */}
      <main
        className="relative z-10 min-h-screen transition-all duration-300"
        style={{
          marginLeft: `var(--sidebar-width, 0)`,
        }}
      >
        {/* Sidebar CSS variable injection */}
        <style>{`
          @media (min-width: 1024px) {
            :root { --sidebar-width: ${collapsed ? "72px" : "240px"}; }
          }
          @media (max-width: 1023px) {
            :root { --sidebar-width: 0px; }
          }
        `}</style>

        {/* Mobile top padding for hamburger button */}
        <div className="lg:hidden h-16" />

        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
    </div>
  );
}
