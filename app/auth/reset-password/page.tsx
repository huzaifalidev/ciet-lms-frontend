"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthCardHeader } from "@/components/auth-card-header";
import { ResetPasswordForm } from "@/components/reset-password-form";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [isReset, setIsReset] = useState(false);

  const handleReset = (values: { password: string; confirmPassword: string }) => {
    console.log("Password reset submitted:", values);
    setIsReset(true);
  };

  if (isReset) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <Card className="w-full max-w-md">
          <AuthCardHeader
            title="Password Reset"
            description="Your password has been successfully reset"
          />
          <div className="p-6">
            <Link href="/auth/signin">
              <Button className="w-full">Continue to Sign In</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <Card className="w-full max-w-md">
          <AuthCardHeader
            title="Reset Password"
            description="Enter your new password below"
          />

          <ResetPasswordForm onSubmit={handleReset} />
        </Card>
      </div>
    </ThemeProvider>
  );
}
