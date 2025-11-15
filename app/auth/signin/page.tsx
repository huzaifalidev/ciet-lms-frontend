"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/store/store";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { LoginForm } from "@/components/login-form";
import { AuthCardHeader } from "@/components/auth-card-header";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);

  // Track whether we checked login state
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token && isAuthenticated && user) {
      // Redirect logged-in users
      if (user.role === "ADMIN") router.replace("/admin/dashboard");
      else if (user.role === "STUDENT") router.replace("/student/courses");
      else router.replace("/auth/signin"); // fallback
    } else {
      // Not logged in → show the form
      setCheckingAuth(false);
    }
  }, [isAuthenticated, user, router]);

    const handleLogin = (data: { email: string; password: string }) => {
  };

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
      <div className="min-h-screen flex items-center justify-center dark:bg-black p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
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
