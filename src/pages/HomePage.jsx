import { BarChart3, CircleUserRound, FileStack, PackageOpen, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const summaryCards = [
  { title: "Active shipments", value: "128", note: "Across priority and standard lanes", icon: Truck },
  { title: "Profile completion", value: "92%", note: "Business and KYC details almost ready", icon: CircleUserRound },
  { title: "Courier partners", value: "12", note: "Available for comparison and booking", icon: PackageOpen },
];

const quickActions = [
  { title: "Complete your profile", description: "Keep business and banking details ready before dispatch work grows.", to: "/app/profile" },
  { title: "Review onboarding steps", description: "Make sure the account, documents, and contact details are aligned.", to: "/app/profile" },
  { title: "Start operating faster", description: "Use this home area as the lightweight hub for the rest of the workspace.", to: "/app/profile" },
];

const statusItems = [
  { label: "Profile", status: "Ready", icon: ShieldCheck },
  { label: "Bank", status: "Saved", icon: FileStack },
  { label: "KYC", status: "In review", icon: BarChart3 },
];

function HomePage() {
  const { user } = useAuth();

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
      <section className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="rounded-[2rem] bg-stone-900 p-8 text-white shadow-[0_30px_80px_rgba(28,25,23,0.18)] sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-rose-100">
            <Sparkles size={16} />
            Workspace Home
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Welcome back, {user?.name?.split(" ")[0] || "there"}.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-300">This app area is separate from the landing page so your team can focus on actual shipping work, profile details, and account readiness.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/app/profile" className="rounded-full bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">
              Open profile
            </Link>
            <Link to="/auth" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              View auth flow
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Account Status</p>
          <div className="mt-6 space-y-4">
            {statusItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center justify-between rounded-2xl bg-rose-50 px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-rose-500 shadow-sm">
                      <Icon size={18} />
                    </span>
                    <span>
                      <span className="block font-semibold text-stone-900">{item.label}</span>
                      <span className="text-sm text-stone-500">Current status</span>
                    </span>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-700">{item.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title} className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-500">
                <Icon size={20} />
              </span>
              <p className="mt-5 text-sm font-medium text-stone-500">{card.title}</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">{card.value}</p>
              <p className="mt-3 text-sm leading-6 text-stone-500">{card.note}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-8 rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Quick Actions</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900">A simple place to continue the work.</h2>
          </div>
          <Link to="/app/profile" className="text-sm font-semibold text-rose-500 transition hover:text-rose-600">
            Go to profile
          </Link>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {quickActions.map((action) => (
            <article key={action.title} className="rounded-[1.75rem] bg-[linear-gradient(180deg,#fff7f3_0%,#fff0f4_100%)] p-5">
              <h3 className="text-xl font-semibold text-stone-900">{action.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">{action.description}</p>
              <Link to={action.to} className="mt-5 inline-flex text-sm font-semibold text-rose-500 transition hover:text-rose-600">
                Open section
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
