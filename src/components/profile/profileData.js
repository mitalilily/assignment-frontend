import {
  Building2,
  CreditCard,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const profileTabs = [
  { id: "user", label: "User", icon: UserRound },
  { id: "company", label: "Company", icon: Building2 },
  { id: "bank", label: "Bank", icon: CreditCard },
  { id: "kyc", label: "KYC", icon: ShieldCheck },
];

export const profileStorageKey = "imc-profile-state";
export const kycDocumentIds = ["pan", "aadhaar", "cheque"];

export function createInitialProfileState(user) {
  return {
    userForm: {
      fullName: user?.name || "IronMan User",
      email: user?.email || "demo@ironmancourier.com",
      phone: user?.phone || "+91 98765 43210",
    },
    avatar: null,
    companyLogo: null,
    companyForm: {
      brandName: "IronMan Retail",
      businessName: "IronMan Retail Private Limited",
      website: "https://yourbrand.com",
      contactNumber: "+91 98765 43210",
      supportEmail: user?.email || "support@ironmancourier.com",
      address: "21 Market Road, Business District",
      pincode: "110001",
      city: "New Delhi",
      state: "Delhi",
    },
    bankForm: {
      accountHolderName: user?.name || "IronMan User",
      bankName: "HDFC Bank",
      accountNumber: "50200012345678",
      ifscCode: "HDFC0001234",
      branch: "Connaught Place",
      accountType: "Current",
    },
    kyc: {
      businessStructure: "Individual",
      selfie: null,
      documents: {
        pan: null,
        aadhaar: null,
        cheque: null,
      },
    },
  };
}

export const kycDocumentDefinitions = [
  { id: "pan", label: "PAN Card" },
  { id: "aadhaar", label: "Aadhaar Card" },
  { id: "cheque", label: "Cancelled Cheque" },
];
