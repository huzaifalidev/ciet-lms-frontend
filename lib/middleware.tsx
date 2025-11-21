"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";

export const ProtectedRoute = ({
  children,
  roles,
  redirectIfAuthenticated = false,
}) => {
  const router = useRouter();
  const { data: user, isAuthenticated } = useAppSelector((s) => s.user);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // Wait until initializer runs
    if (token && !isAuthenticated && !user) {
      return;
    }

    // Case 1: public routes like login
    if (redirectIfAuthenticated) {
      if (token && isAuthenticated && user) {
        if (user.role === "ADMIN") router.replace("/admin/dashboard");
        else router.replace("/student/courses");
      }
      setReady(true);
      return;
    }

    // Case 2: protected routes
    if (!token || !isAuthenticated || !user) {
      router.replace("/auth/signin");
      return;
    }

    // Case 3: role check
    if (roles && !roles.includes(user.role)) {
      router.replace("/auth/signin");
      return;
    }

    setReady(true);
  }, [isAuthenticated, user, roles, redirectIfAuthenticated]);

  if (!ready) return null;

  return <>{children}</>;
};
