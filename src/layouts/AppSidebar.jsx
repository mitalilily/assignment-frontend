import { ChevronLeft, ChevronRight, LogOut, Package2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { appNavLinks } from "../utils/navLinks";

function AppSidebar({ expanded, pinned, onOpen, onClose, onTogglePin, user, onLogout }) {
  return (
    <aside
      onMouseEnter={() => {
        if (!pinned) {
          onOpen();
        }
      }}
      onMouseLeave={() => {
        if (!pinned) {
          onClose();
        }
      }}
      className={`sticky top-0 hidden h-screen shrink-0 border-r border-rose-200/80 bg-[rgba(255,250,245,0.96)] px-3 py-4 backdrop-blur-xl transition-all duration-300 lg:flex lg:flex-col ${expanded ? "w-72" : "w-24"}`}
    >
      <div className="flex items-center justify-between gap-3 rounded-[1.75rem] bg-white px-3 py-3 shadow-sm">
        <div className="flex min-w-0 items-center gap-3 overflow-hidden">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-rose-100 text-rose-500">
            <Package2 size={20} />
          </span>
          {expanded ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-stone-900">IronManCourier</p>
              <p className="truncate text-xs uppercase tracking-[0.24em] text-stone-500">Workspace</p>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onTogglePin}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rose-200 bg-rose-50 text-stone-600 transition hover:bg-rose-100"
        >
          {pinned ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      <nav className="mt-6 space-y-2">
        {appNavLinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={`${link.label}-${link.to}`}
              to={link.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${
                  isActive ? "bg-stone-900 text-white shadow-[0_18px_40px_rgba(28,25,23,0.14)]" : "text-stone-600 hover:bg-rose-50 hover:text-rose-500"
                }`
              }
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white shadow-sm transition group-hover:bg-rose-100">
                <Icon size={18} />
              </span>
              {expanded ? <span className="truncate">{link.label}</span> : null}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[1.75rem] bg-white p-3 shadow-sm">
        <div className={`flex items-center gap-3 ${expanded ? "" : "justify-center"}`}>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-rose-100 text-sm font-semibold text-rose-500">
            {user?.name?.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "IM"}
          </span>
          {expanded ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-stone-900">{user?.name || "Workspace User"}</p>
              <p className="truncate text-xs text-stone-500">{user?.email || "Signed in"}</p>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          onClick={onLogout}
          className={`mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600 ${expanded ? "w-full" : "w-11 h-11 rounded-2xl px-0 py-0"}`}
        >
          <LogOut size={16} />
          {expanded ? "Logout" : null}
        </button>
      </div>
    </aside>
  );
}

export default AppSidebar;
