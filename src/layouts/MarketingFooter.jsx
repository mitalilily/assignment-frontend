import { footerNavLinks } from "../utils/navLinks";

function MarketingFooter() {
  return (
    <footer className="border-t border-rose-200/70 bg-white/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 text-sm text-stone-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-base font-semibold text-stone-900">IronManCourier</p>
          <p className="mt-2 max-w-xl leading-6 text-stone-500">A lighter, more usable shipping workspace for teams that want speed, clarity, and a calmer daily flow.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {footerNavLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-rose-500">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default MarketingFooter;
