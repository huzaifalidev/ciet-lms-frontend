'use client';

import { ReactNode, use, useEffect } from "react";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import { Sidebar } from "@/components/sidebar";
import { studentSidebarItems } from "@/lib/sidebar.routes";
import { ProtectedRoute } from "@/lib/middleware";

export default function StudentDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute roles={["STUDENT"]}>
      <DashboardLayout sidebar={<Sidebar items={studentSidebarItems} />}>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
