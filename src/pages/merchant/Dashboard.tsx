
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ApiKeySection from "@/components/dashboard/merchant/ApiKeySection";
import TransactionTable from "@/components/dashboard/merchant/TransactionTable";
import AccountInfoCard from "@/components/dashboard/merchant/AccountInfoCard";

const MerchantDashboard = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    document.title = "Merchant Dashboard - SkyPay";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader title="Merchant Dashboard" />
      
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <ApiKeySection />
          <AccountInfoCard />
        </div>

        <TransactionTable />
      </main>
    </div>
  );
};

export default MerchantDashboard;
