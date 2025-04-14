
import { useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MerchantApprovalTable from "@/components/dashboard/admin/MerchantApprovalTable";
import AdminTransactionTable from "@/components/dashboard/admin/AdminTransactionTable";

const AdminDashboard = () => {
  useEffect(() => {
    document.title = "Admin Dashboard - SkyPay";
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader title="Admin Dashboard" />
      
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <MerchantApprovalTable />
        <AdminTransactionTable />
      </main>
    </div>
  );
};

export default AdminDashboard;
