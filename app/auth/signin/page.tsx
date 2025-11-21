"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/store/store";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { LoginForm } from "@/components/login-form";
import { AuthCardHeader } from "@/components/auth-card-header";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { setUser } from "@/redux/slices/user.slice";
import axios from "axios";
import { config } from "@/config/config";

export default function LoginPage({}: {
  onSubmit?: (data: { email: string; password: string }) => void;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data: user, isAuthenticated } = useAppSelector((state) => state.user);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const redirectUser = (role: string) => {
      if (role === "ADMIN") router.replace("/admin/dashboard");
      else if (role === "STUDENT") router.replace("/student/courses");
      else router.replace("/");
    };

    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      // Case 1: User already logged in in Redux + localStorage
      if (user && isAuthenticated && accessToken) {
        redirectUser(user.role);
        return;
      }

      // Case 2: Try refresh token
      if (refreshToken) {
        try {
          // Refresh access token
          const res = await axios.get(`${config.API_URL}/auth/refresh-token`, {
            headers: { Authorization: `Bearer ${refreshToken}` },
          });

          const newAccessToken = res.data.accessToken;
          localStorage.setItem("accessToken", newAccessToken);

          // Fetch user info
          const userRes = await axios.get(`${config.API_URL}/auth/fetch-user`, {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });

          // Update Redux
          dispatch(
            setUser({ ...userRes.data.user, accessToken: newAccessToken })
          );

          // Redirect
          redirectUser(userRes.data.user.role);
          return;
        } catch (err) {
          console.warn("Refresh token failed", err);
          // If refresh fails, we continue to login form
        }
      }

      // Case 3: Not logged in, show login form
      setCheckingAuth(false);
    };

    checkAuth();
  }, [dispatch, isAuthenticated, router, user]);

  const handleLogin = (data: { email: string; password: string }) => {
    // handled inside LoginForm
  };

  // Show spinner until auth check finishes
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {" "}
      <div className="min-h-screen flex items-center justify-center dark:bg-black p-4">
        {" "}
        <div className="absolute top-4 right-4">
          {" "}
          <ThemeToggle />{" "}
        </div>
        <Card className="w-full max-w-md">
          <AuthCardHeader
            title="Welcome Back"
            description="Sign in to your account"
          />

          <LoginForm onSubmit={handleLogin} />

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}
