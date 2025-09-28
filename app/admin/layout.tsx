import { ReactNode } from "react";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import { Sidebar } from "@/components/sidebar";
import { adminSidebarItems } from "@/lib/sidebar.routes";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardLayout sidebar={<Sidebar items={adminSidebarItems} />}>
      {children}
    </DashboardLayout>
  );
}
