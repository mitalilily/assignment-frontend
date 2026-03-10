import { Building2, CreditCard, ShieldCheck, Upload, UserRound } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createInitialProfileState, kycDocumentDefinitions, kycDocumentIds, profileStorageKey, profileTabs } from "../components/profile/profileData";
import { useAuth } from "../context/AuthContext";

function buildInitialProfileState(user) {
  const storedValue = window.localStorage.getItem(profileStorageKey);

  if (!storedValue) {
    return createInitialProfileState(user);
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    window.localStorage.removeItem(profileStorageKey);
    return createInitialProfileState(user);
  }
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve({ name: file.name, type: file.type, url: reader.result });
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ProfilePage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("user");
  const [profileState, setProfileState] = useState(() => buildInitialProfileState(user));

  const avatarInputRef = useRef(null);
  const companyLogoInputRef = useRef(null);
  const selfieInputRef = useRef(null);
  const documentInputRefs = useRef({});

  useEffect(() => {
    window.localStorage.setItem(profileStorageKey, JSON.stringify(profileState));
  }, [profileState]);

  const initials = useMemo(() => {
    return (
      profileState.userForm.fullName
        ?.split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") || "IM"
    );
  }, [profileState.userForm.fullName]);

  const updateSection = (sectionKey, fieldId, value) => {
    setProfileState((current) => ({
      ...current,
      [sectionKey]: {
        ...current[sectionKey],
        [fieldId]: value,
      },
    }));
  };

  const handleFileSelect = async (event, updater) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const asset = await readFile(file);
    setProfileState((current) => updater(current, asset));
    event.target.value = "";
  };

  const renderUserTab = () => (
    <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
      <div className="rounded-[2rem] border border-rose-200/70 bg-[linear-gradient(180deg,#fff7f3_0%,#fff1f4_100%)] p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Profile photo</p>
        <div className="mt-6 flex flex-col items-center text-center">
          <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-3xl font-semibold text-stone-700 shadow-sm">
            {profileState.avatar?.url ? <img src={profileState.avatar.url} alt="Profile" className="h-full w-full rounded-full object-cover" /> : initials}
          </div>
          <button type="button" onClick={() => avatarInputRef.current?.click()} className="mt-5 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500">Upload photo</button>
          <p className="mt-3 text-sm leading-6 text-stone-500">Keep a personal profile image for the workspace account.</p>
        </div>
      </div>
      <div className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">User details</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <input value={profileState.userForm.fullName} onChange={(event) => updateSection("userForm", "fullName", event.target.value)} placeholder="Full name" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
          <input value={profileState.userForm.phone} onChange={(event) => updateSection("userForm", "phone", event.target.value)} placeholder="Phone" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
          <input value={profileState.userForm.email} onChange={(event) => updateSection("userForm", "email", event.target.value)} placeholder="Email" className="sm:col-span-2 rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
        </div>
      </div>
    </div>
  );

  const renderCompanyTab = () => (
    <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
      <div className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Company logo</p>
        <div className="mt-6 rounded-[1.75rem] border border-dashed border-rose-200 bg-rose-50/60 p-6 text-center">
          {profileState.companyLogo?.url ? <img src={profileState.companyLogo.url} alt="Company logo" className="mx-auto h-20 w-20 rounded-3xl object-cover" /> : <Building2 className="mx-auto text-rose-400" size={42} />}
          <button type="button" onClick={() => companyLogoInputRef.current?.click()} className="mt-5 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500">Upload logo</button>
        </div>
      </div>
      <div className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Company details</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <input value={profileState.companyForm.brandName} onChange={(event) => updateSection("companyForm", "brandName", event.target.value)} placeholder="Brand name" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
          <input value={profileState.companyForm.businessName} onChange={(event) => updateSection("companyForm", "businessName", event.target.value)} placeholder="Business name" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
          <input value={profileState.companyForm.website} onChange={(event) => updateSection("companyForm", "website", event.target.value)} placeholder="Website" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
          <input value={profileState.companyForm.contactNumber} onChange={(event) => updateSection("companyForm", "contactNumber", event.target.value)} placeholder="Contact number" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
          <input value={profileState.companyForm.supportEmail} onChange={(event) => updateSection("companyForm", "supportEmail", event.target.value)} placeholder="Support email" className="sm:col-span-2 rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
          <textarea value={profileState.companyForm.address} onChange={(event) => updateSection("companyForm", "address", event.target.value)} placeholder="Address" rows={4} className="sm:col-span-2 rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
          <input value={profileState.companyForm.city} onChange={(event) => updateSection("companyForm", "city", event.target.value)} placeholder="City" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
          <input value={profileState.companyForm.state} onChange={(event) => updateSection("companyForm", "state", event.target.value)} placeholder="State" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
        </div>
      </div>
    </div>
  );

  const renderBankTab = () => (
    <div className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Bank details</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input value={profileState.bankForm.accountHolderName} onChange={(event) => updateSection("bankForm", "accountHolderName", event.target.value)} placeholder="Account holder name" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
        <input value={profileState.bankForm.bankName} onChange={(event) => updateSection("bankForm", "bankName", event.target.value)} placeholder="Bank name" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
        <input value={profileState.bankForm.accountNumber} onChange={(event) => updateSection("bankForm", "accountNumber", event.target.value)} placeholder="Account number" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
        <input value={profileState.bankForm.ifscCode} onChange={(event) => updateSection("bankForm", "ifscCode", event.target.value)} placeholder="IFSC code" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
        <input value={profileState.bankForm.branch} onChange={(event) => updateSection("bankForm", "branch", event.target.value)} placeholder="Branch" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
        <input value={profileState.bankForm.accountType} onChange={(event) => updateSection("bankForm", "accountType", event.target.value)} placeholder="Account type" className="rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
      </div>
    </div>
  );

  const renderKycTab = () => (
    <div className="grid gap-6 lg:grid-cols-[0.44fr_0.56fr]">
      <div className="space-y-6">
        <div className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Selfie</p>
          <div className="mt-5 rounded-[1.75rem] border border-dashed border-rose-200 bg-rose-50/60 p-6 text-center">
            {profileState.kyc.selfie?.url ? <img src={profileState.kyc.selfie.url} alt="Selfie" className="mx-auto h-36 w-36 rounded-3xl object-cover" /> : <ShieldCheck className="mx-auto text-rose-400" size={42} />}
            <button type="button" onClick={() => selfieInputRef.current?.click()} className="mt-5 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500">Upload selfie</button>
          </div>
        </div>
        <div className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Business structure</p>
          <input value={profileState.kyc.businessStructure} onChange={(event) => setProfileState((current) => ({ ...current, kyc: { ...current.kyc, businessStructure: event.target.value } }))} className="mt-5 w-full rounded-2xl border border-rose-200 bg-rose-50/60 px-4 py-3 outline-none transition focus:border-rose-400" />
        </div>
      </div>
      <div className="rounded-[2rem] border border-rose-200/70 bg-white/85 p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-500">Documents</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {kycDocumentDefinitions.map((document) => (
            <div key={document.id} className="rounded-[1.75rem] bg-rose-50/70 p-4">
              <p className="font-semibold text-stone-900">{document.label}</p>
              <button type="button" onClick={() => documentInputRefs.current[document.id]?.click()} className="mt-4 inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500">
                <Upload size={14} />
                Upload
              </button>
              {profileState.kyc.documents[document.id]?.name ? <p className="mt-3 break-all text-xs leading-5 text-stone-500">{profileState.kyc.documents[document.id].name}</p> : <p className="mt-3 text-xs leading-5 text-stone-400">No file selected yet.</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const tabContent = {
    user: renderUserTab(),
    company: renderCompanyTab(),
    bank: renderBankTab(),
    kyc: renderKycTab(),
  };

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-10">
      <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleFileSelect(event, (current, asset) => ({ ...current, avatar: asset }))} />
      <input ref={companyLogoInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleFileSelect(event, (current, asset) => ({ ...current, companyLogo: asset }))} />
      <input ref={selfieInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleFileSelect(event, (current, asset) => ({ ...current, kyc: { ...current.kyc, selfie: asset } }))} />
      {kycDocumentIds.map((documentId) => (
        <input
          key={documentId}
          ref={(element) => {
            documentInputRefs.current[documentId] = element;
          }}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) =>
            handleFileSelect(event, (current, asset) => ({
              ...current,
              kyc: {
                ...current.kyc,
                documents: {
                  ...current.kyc.documents,
                  [documentId]: asset,
                },
              },
            }))
          }
        />
      ))}

      <section className="rounded-[2rem] bg-stone-900 p-8 text-white shadow-[0_30px_80px_rgba(28,25,23,0.18)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-rose-200">Profile Workspace</p>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Profile and account setup</h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-stone-300">Keep personal, business, banking, and KYC details in one lighter workspace. Changes stay saved locally for this assignment flow.</p>
          </div>
          <div className="rounded-[1.5rem] bg-white/10 px-5 py-4 text-sm text-stone-100">
            Signed in as {user?.email || profileState.userForm.email}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-rose-200/70 bg-white/85 p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap gap-3">
          {profileTabs.map((tab) => {
            const iconMap = {
              user: UserRound,
              company: Building2,
              bank: CreditCard,
              kyc: ShieldCheck,
            };
            const Icon = iconMap[tab.id];

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition ${activeTab === tab.id ? "bg-stone-900 text-white" : "bg-rose-50 text-stone-600 hover:text-rose-500"}`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-8">{tabContent[activeTab]}</section>
    </main>
  );
}

export default ProfilePage;
