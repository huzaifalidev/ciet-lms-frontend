"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[]; // allowed roles
  redirectIfAuthenticated?: boolean; // for login/signup pages
}

export const ProtectedRoute = ({
  children,
  roles,
  redirectIfAuthenticated = false,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const { data: user, isAuthenticated } = useAppSelector((state) => state.user);

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // Case 1: Login/Signup page - redirect logged-in users
    if (redirectIfAuthenticated && token && isAuthenticated && user) {
      if (user.role === "ADMIN") router.replace("/admin/dashboard");
      else if (user.role === "STUDENT") router.replace("/student/courses");
      else router.replace("/");
      return;
    }

    // Case 2: Protected dashboard route
    if (!token || !isAuthenticated || !user) {
      if (!redirectIfAuthenticated) {
        router.replace("/auth/signin");
      }
      return;
    }

    // Case 3: Role-based protection
    if (roles && user && !roles.includes(user.role)) {
      router.replace("/auth/signin");
      return;
    }

    // User is allowed
    setAuthorized(true);
  }, [isAuthenticated, user, roles, redirectIfAuthenticated, router]);

  // Only render children if authorized
  if (!authorized) return null;

  return <>{children}</>;
};
