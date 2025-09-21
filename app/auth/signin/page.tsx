"use client";

import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { LoginForm } from "@/components/login-form";
import { AuthCardHeader } from "@/components/auth-card-header";
import Link from "next/link";

export default function LoginPage() {
  const handleLogin = (data: { email: string; password: string }) => {
    // TODO: replace this with your authentication API call
    console.log("Login attempt:", data);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
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
            <Link href="/auth/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </Card>
      </div>
    </ThemeProvider>
  );
}
