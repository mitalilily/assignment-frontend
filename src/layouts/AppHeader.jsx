import { ArrowRight, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AppHeader({ user }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 border-b border-rose-200/80 bg-[rgba(255,249,244,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-rose-500">Workspace panel</p>
          <p className="mt-1 text-lg font-semibold text-stone-900">Welcome, {user?.name?.split(" ")[0] || "there"}</p>
        </div>

        <div className="hidden flex-1 items-center justify-center xl:flex">
          <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-rose-200 bg-white px-4 py-3 shadow-sm">
            <Search size={18} className="text-stone-400" />
            <input
              type="text"
              readOnly
              value="Search orders, tracking IDs, invoices, or profile details"
              className="w-full border-none bg-transparent p-0 text-sm text-stone-500 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-rose-200 bg-white text-stone-600 shadow-sm transition hover:bg-rose-50">
            <Bell size={18} />
          </button>
          <button
            type="button"
            onClick={() => navigate("/app/profile")}
            className="hidden items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500 sm:inline-flex"
          >
            Open profile
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
