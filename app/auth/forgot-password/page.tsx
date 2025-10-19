"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { AuthCardHeader } from "@/components/auth-card-header";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { startLoading, stopLoading } from "@/redux/slices/loading.slice";

function ForgotPasswordContent() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Prevent page reload first
    dispatch(startLoading());

    try {
      // Simulate backend delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock valid users
      const validUsers = ["admin@gmail.com", "student@gmail.com"];

      if (!validUsers.includes(email.trim())) {
        toast.error("User does not exist.");
        return;
      }

      // Simulate success response
      toast.success(
        "If this email is registered, you will receive a password reset link shortly."
      );

      console.log("Forgot password request:", { email });
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Forgot password error:", error);
    } finally {
      dispatch(stopLoading());
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-black  p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <Card className="w-full max-w-md">
          <AuthCardHeader
            title="Check Your Email"
            description="We've sent a password reset link to your email"
          />
          <CardContent>
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <Button
                variant="outline"
                onClick={() => setIsSubmitted(false)}
                className="w-full"
              >
                Try Again
              </Button>
              <Link href="/auth/signin" className="block">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-black  p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md">
        <AuthCardHeader
          title="Forgot Password"
          description="Enter your email to reset your password"
        />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? <Spinner /> : "Send Reset Link"}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/auth/signin"
              className="text-sm text-primary hover:underline"
            >
              <ArrowLeft className="mr-1 h-3 w-3 inline" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ForgotPasswordContent />
    </ThemeProvider>
  );
}
