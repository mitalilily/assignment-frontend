import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  password: "",
  otp: "",
};

function AuthPage() {
  const navigate = useNavigate();
  const { isAuthenticated, setUser } = useAuth();

  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setGeneratedOtp("");
    setStatus({ type: "", message: "" });
    setForm((current) => ({ ...current, otp: "" }));
  }, [mode]);

  if (isAuthenticated) {
    return <Navigate to="/app/home" replace />;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const sendOtp = async () => {
    setStatus({ type: "", message: "" });
    setGeneratedOtp("");

    if (!form.email) {
      setStatus({ type: "error", message: "Enter your email first." });
      return;
    }

    try {
      setSendingOtp(true);
      const { data } = await api.post(
        "/auth/send-otp",
        { email: form.email, purpose: mode },
        { timeout: 60000 }
      );

      setGeneratedOtp(data.otp || "");
      setStatus({ type: "success", message: data.message || "OTP generated successfully." });
    } catch (error) {
      setStatus({ type: "error", message: error?.response?.data?.message || "Unable to generate OTP" });
    } finally {
      setSendingOtp(false);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "", message: "" });

    const endpoint = mode === "signup" ? "/auth/signup" : "/auth/signin";
    const payload =
      mode === "signup"
        ? {
            name: form.name,
            phone: form.phone,
            email: form.email,
            password: form.password,
            otp: form.otp,
          }
        : {
            email: form.email,
            password: form.password,
            otp: form.otp,
          };

    try {
      setSubmitting(true);
      const { data } = await api.post(endpoint, payload);
      setUser(data.user);
      navigate("/app/home");
    } catch (error) {
      setStatus({ type: "error", message: error?.response?.data?.message || "Authentication failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto grid min-h-[calc(100vh-170px)] w-full max-w-7xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
      <section className="rounded-[2rem] bg-stone-900 p-8 text-white shadow-[0_34px_80px_rgba(28,25,23,0.18)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-200">Authentication</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Sign in once and stay signed in.</h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-stone-300">The auth state is stored locally, so signup persists through refresh until you actively log out.</p>
        <div className="mt-8 space-y-4 text-sm leading-7 text-stone-300">
          <p>1. Generate the OTP inside the form.</p>
          <p>2. Enter the same OTP in the field below.</p>
          <p>3. Finish signup and continue into the workspace home.</p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm sm:p-8">
        <div className="grid grid-cols-2 rounded-full bg-rose-50 p-1">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`rounded-full px-4 py-3 text-sm font-semibold transition ${mode === "signin" ? "bg-stone-900 text-white" : "text-stone-600"}`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-full px-4 py-3 text-sm font-semibold transition ${mode === "signup" ? "bg-stone-900 text-white" : "text-stone-600"}`}
          >
            Sign Up
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          {mode === "signup" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" placeholder="Full name" value={form.name} onChange={onChange} required className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
              <input name="phone" placeholder="Phone number" value={form.phone} onChange={onChange} required className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
            </div>
          ) : null}

          <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required className="w-full rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required className="w-full rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />

          <div className="flex flex-col gap-3 sm:flex-row">
            <input name="otp" placeholder="Enter OTP" value={form.otp} onChange={onChange} required className="w-full rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
            <button type="button" onClick={sendOtp} disabled={sendingOtp} className="rounded-2xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-60">
              {sendingOtp ? "Generating..." : "Generate OTP"}
            </button>
          </div>

          {status.message ? (
            <p className={`rounded-2xl px-4 py-3 text-sm ${status.type === "error" ? "bg-red-50 text-red-600" : "bg-rose-50 text-rose-600"}`}>
              {status.message}
            </p>
          ) : null}

          {generatedOtp ? (
            <div className="rounded-[1.5rem] border border-rose-200 bg-[linear-gradient(180deg,#fff7f3_0%,#fff0f4_100%)] px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">Generated OTP</p>
              <p className="mt-3 text-3xl font-semibold tracking-[0.36em] text-stone-900">{generatedOtp}</p>
              <p className="mt-3 text-sm leading-6 text-stone-500">Use this OTP in the field above and continue. It appears right below the auth details as requested.</p>
            </div>
          ) : null}

          <button type="submit" disabled={submitting} className="w-full rounded-2xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:opacity-60">
            {submitting ? "Please wait..." : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AuthPage;
