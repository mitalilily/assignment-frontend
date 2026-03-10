import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { marketingNavLinks } from "../utils/navLinks";

function MarketingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rose-200/70 bg-[rgba(252,246,240,0.92)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="min-w-0" onClick={closeMenu}>
            <p className="text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">IronManCourier</p>
            <p className="text-xs uppercase tracking-[0.24em] text-rose-500">Shipping made cleaner</p>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-stone-600 lg:flex">
            {marketingNavLinks.map((link) => (
              <a key={link.href} href={location.pathname === "/" ? link.href : `/${link.href}`} className="transition hover:text-rose-500">
                {link.label}
              </a>
            ))}
            <Link to="/auth" className="transition hover:text-rose-500">
              Sign in
            </Link>
            <Link to="/app/home" target="_blank" rel="noreferrer" className="rounded-full bg-stone-900 px-4 py-2 text-white transition hover:bg-rose-500">
              Get Started
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="grid h-11 w-11 place-items-center rounded-full border border-rose-200 bg-white text-stone-600 lg:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {menuOpen ? (
          <div className="mt-4 space-y-3 rounded-[1.75rem] border border-rose-200 bg-white p-4 lg:hidden">
            {marketingNavLinks.map((link) => (
              <a
                key={link.href}
                href={location.pathname === "/" ? link.href : `/${link.href}`}
                onClick={closeMenu}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-stone-600 transition hover:bg-rose-50 hover:text-rose-500"
              >
                {link.label}
              </a>
            ))}
            <Link to="/auth" onClick={closeMenu} className="block rounded-2xl px-4 py-3 text-sm font-medium text-stone-600 transition hover:bg-rose-50 hover:text-rose-500">
              Sign in
            </Link>
            <Link to="/app/home" target="_blank" rel="noreferrer" onClick={closeMenu} className="block rounded-2xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-500">
              Get Started
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default MarketingHeader;
