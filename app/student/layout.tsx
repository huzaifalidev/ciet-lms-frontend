import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import { Sidebar } from "@/components/sidebar";
import { studentSidebarItems } from "@/lib/sidebar.routes";
import { ReactNode } from "react";

export default function StudentDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardLayout sidebar={<Sidebar items={studentSidebarItems} />}>
      {children}
    </DashboardLayout>
  );
}
