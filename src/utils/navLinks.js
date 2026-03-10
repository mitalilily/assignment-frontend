import { BarChart3, CircleUserRound, FileStack, Home, PackageOpen, ShieldCheck, Truck } from "lucide-react";

export const marketingNavLinks = [
  { label: "Features", href: "#features" },
  { label: "Why Us", href: "#why-us" },
  { label: "Workflow", href: "#workflow" },
  { label: "FAQ", href: "#faq" },
];

export const appNavLinks = [
  { label: "Home", to: "/app/home", icon: Home },
  { label: "Orders", to: "/app/home?view=orders", icon: PackageOpen },
  { label: "Shipments", to: "/app/home?view=shipments", icon: Truck },
  { label: "Tracking", to: "/app/home?view=tracking", icon: BarChart3 },
  { label: "Profile", to: "/app/profile", icon: CircleUserRound },
  { label: "Documents", to: "/app/profile?tab=kyc", icon: FileStack },
  { label: "Verification", to: "/app/profile?tab=kyc", icon: ShieldCheck },
];

export const footerNavLinks = [
  { label: "Home", href: "/" },
  { label: "Workspace", href: "/app/home" },
  { label: "Profile", href: "/app/profile" },
  { label: "Get Started", href: "/auth" },
];
