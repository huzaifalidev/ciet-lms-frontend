'use client';

import { ReactNode, use, useEffect } from "react";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import { Sidebar } from "@/components/sidebar";
import { studentSidebarItems } from "@/lib/sidebar.routes";
import { ProtectedRoute } from "@/lib/middleware";
import { fetchCurrentUser } from "@/lib/fetch.currentUser";
import { useAppDispatch } from "@/redux/store/store";

export default function StudentDashboardLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchCurrentUser(dispatch);
  }, [dispatch]);
  return (
    <ProtectedRoute roles={["STUDENT"]}>
      <DashboardLayout sidebar={<Sidebar items={studentSidebarItems} />}>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
