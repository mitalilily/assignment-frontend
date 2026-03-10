import { ArrowRight, ChartNoAxesCombined, Clock3, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const heroHighlights = [
  "Compare courier options in one place",
  "Keep customer updates easier to manage",
  "Move from signup to dispatch without friction",
];

const featureCards = [
  {
    title: "Courier choices that stay clear",
    description: "Review delivery partners, pricing, and movement updates without jumping between tabs.",
    icon: PackageCheck,
  },
  {
    title: "A calmer operations flow",
    description: "Give your team one simple workspace for profile details, orders, and ongoing shipment activity.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Faster daily handoffs",
    description: "Keep account setup, dispatch prep, and tracking work close together so fewer steps get missed.",
    icon: Clock3,
  },
];

const workflowSteps = [
  "Create your account and save your business details",
  "Open the workspace in a separate tab for operational work",
  "Manage profile, shipment-ready information, and daily updates",
];

const faqs = [
  {
    question: "Who is this workspace built for?",
    answer: "Small teams, growing brands, and operators who want a cleaner shipping setup without unnecessary clutter.",
  },
  {
    question: "What opens after Get Started?",
    answer: "The app workspace opens in a separate tab with the home view, profile section, and account flow.",
  },
  {
    question: "Will my signup stay after refresh?",
    answer: "Yes. The client stores auth locally so your signed-in state remains until you log out.",
  },
];

function LandingPage() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-500 shadow-sm">
            <Sparkles size={16} />
            Modern courier workspace for small teams
          </span>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-stone-900 sm:text-6xl">
              One clean place to run shipping, account setup, and profile management.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">
              IronManCourier gives your team a lighter workspace for onboarding, courier decisions, and day-to-day shipping operations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/app/home"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
            >
              Get Started
              <ArrowRight size={16} />
            </Link>
            <a href="#features" className="inline-flex rounded-full border border-rose-200 bg-white px-6 py-3 text-sm font-semibold text-stone-700 transition hover:border-rose-300 hover:text-rose-500">
              Explore the flow
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {heroHighlights.map((item) => (
              <div key={item} className="rounded-3xl border border-rose-200/70 bg-white/80 px-4 py-5 text-sm font-medium leading-6 text-stone-600 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-rose-200/80 bg-white/80 p-6 shadow-[0_35px_80px_rgba(244,114,182,0.12)] sm:p-8">
          <div className="rounded-[1.75rem] bg-[linear-gradient(180deg,#fff7f2_0%,#fff0f3_100%)] p-6">
            <div className="flex items-center justify-between text-sm text-stone-500">
              <span>Workspace preview</span>
              <span className="rounded-full bg-rose-100 px-3 py-1 font-medium text-rose-500">Live-ready</span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-sm font-medium text-stone-500">Account progress</p>
                <p className="mt-3 text-3xl font-semibold text-stone-900">92%</p>
                <p className="mt-2 text-sm leading-6 text-stone-500">Profile, bank, and KYC details stay together inside the same workspace.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-stone-900 p-5 text-white">
                  <p className="text-sm text-stone-300">Daily orders</p>
                  <p className="mt-3 text-2xl font-semibold">128</p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-stone-500">Courier options</p>
                  <p className="mt-3 text-2xl font-semibold text-stone-900">12</p>
                </div>
              </div>
              <div className="rounded-3xl border border-dashed border-rose-200 bg-white px-5 py-4 text-sm leading-6 text-stone-500">
                Open the workspace in a separate tab, sign in once, and keep your setup saved through refresh.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Features</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">A more commercial workspace without a cluttered feel.</h2>
          <p className="mt-4 text-lg leading-8 text-stone-600">The product story stays simple: onboard faster, manage operations from one area, and keep profile details close to the work.</p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <article key={card.title} className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-7 shadow-sm">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-rose-100 text-rose-500">
                  <Icon size={22} />
                </span>
                <h3 className="mt-6 text-2xl font-semibold text-stone-900">{card.title}</h3>
                <p className="mt-3 text-base leading-7 text-stone-600">{card.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="why-us" className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] bg-stone-900 p-8 text-white shadow-[0_26px_70px_rgba(28,25,23,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-200">Why teams like it</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Light on friction, strong on clarity.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-stone-300">This is designed to feel commercial and professional without reading like a heavy enterprise product.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <div key={step} className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm">
                <p className="text-sm font-semibold text-rose-500">0{index + 1}</p>
                <p className="mt-4 text-base leading-7 text-stone-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-8 shadow-sm sm:p-10">
          <div className="flex items-center gap-3 text-rose-500">
            <ShieldCheck size={20} />
            <p className="text-sm font-semibold uppercase tracking-[0.28em]">Workflow</p>
          </div>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">Landing page for discovery. Workspace for action.</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">Your marketing page stays public and polished. The actual work happens inside a separate tab where users can manage home, profile, and ongoing tasks.</p>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-4 lg:grid-cols-3">
          {faqs.map((item) => (
            <details key={item.question} className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm">
              <summary className="cursor-pointer text-lg font-semibold text-stone-900">{item.question}</summary>
              <p className="mt-4 text-base leading-7 text-stone-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
