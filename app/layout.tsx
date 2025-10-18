import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { FullScreenLoader } from "@/components/FullScreenLoader";
import { Toaster } from "@/components/ui/sonner"; 

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CIET School | LMS",
  description: "Modern Learning Management System for CIET School",
  generator: "huzaifali.tech",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<FullScreenLoader />}>
            {children}
          </Suspense>
          <Analytics />

          {/* 🔥 Now Toaster follows dark/light automatically */}
          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "bg-white text-black dark:bg-neutral-900 dark:text-white",
                title: "font-semibold",
                description: "text-sm text-neutral-600 dark:text-neutral-400",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
