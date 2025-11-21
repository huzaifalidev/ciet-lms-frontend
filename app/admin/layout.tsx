'use client';

import { ReactNode, useEffect } from "react";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import { Sidebar } from "@/components/sidebar";
import { adminSidebarItems } from "@/lib/sidebar.routes";
import { ProtectedRoute } from "@/lib/middleware";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <DashboardLayout sidebar={<Sidebar items={adminSidebarItems} />}>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
