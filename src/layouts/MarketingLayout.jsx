import { Outlet } from "react-router-dom";
import MarketingHeader from "./MarketingHeader";
import MarketingFooter from "./MarketingFooter";

function MarketingLayout() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff9f4_0%,#fff6f7_48%,#fffdfb_100%)] text-stone-900">
      <MarketingHeader />
      <Outlet />
      <MarketingFooter />
    </div>
  );
}

export default MarketingLayout;
