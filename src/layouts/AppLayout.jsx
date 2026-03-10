import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import AppSidebar from "./AppSidebar";
import { useAuth } from "../context/AuthContext";

function AppLayout() {
  const { isAuthenticated, user, logout } = useAuth();
  const [sidebarPinned, setSidebarPinned] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [shellReady, setShellReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShellReady(true);
    }, 220);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setSidebarExpanded(sidebarPinned);
  }, [sidebarPinned]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (!shellReady) {
    return (
      <div className="grid min-h-screen place-items-center bg-[linear-gradient(180deg,#fffaf3_0%,#fff5f5_55%,#fffefb_100%)] px-6">
        <div className="w-full max-w-md rounded-[2rem] border border-rose-200/80 bg-white/90 p-8 text-center shadow-sm">
          <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-rose-200" />
          <p className="mt-5 text-lg font-semibold text-stone-900">Opening workspace</p>
          <p className="mt-2 text-sm text-stone-500">Loading your saved session and workspace layout.</p>
        </div>
      </div>
    );
  }

  const handleTogglePin = () => {
    const nextPinned = !sidebarPinned;
    setSidebarPinned(nextPinned);
    setSidebarExpanded(nextPinned);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fffaf3_0%,#fff5f5_55%,#fffefb_100%)] text-stone-900">
      <div className="relative flex min-h-screen">
        <AppSidebar
          expanded={sidebarExpanded}
          pinned={sidebarPinned}
          onOpen={() => setSidebarExpanded(true)}
          onClose={() => setSidebarExpanded(false)}
          onTogglePin={handleTogglePin}
          user={user}
          onLogout={logout}
        />
        <div className="min-w-0 flex-1">
          <AppHeader user={user} />
          <Outlet />
          <AppFooter />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
