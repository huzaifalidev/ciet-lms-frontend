'use client';

import { ReactNode, useEffect } from "react";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import { Sidebar } from "@/components/sidebar";
import { adminSidebarItems } from "@/lib/sidebar.routes";
import { ProtectedRoute } from "@/lib/middleware";
import { fetchCurrentUser } from "@/lib/fetch.currentUser";
import { useAppDispatch } from "@/redux/store/store";

export default function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchCurrentUser(dispatch);
  }, [dispatch]);
  return (
    <ProtectedRoute roles={["ADMIN"]}>
      <DashboardLayout sidebar={<Sidebar items={adminSidebarItems} />}>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
