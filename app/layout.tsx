import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ReduxProvider } from "@/redux/providers/redux-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <TooltipProvider delayDuration={200}>
              <Analytics />
              <Toaster
                richColors
                position="top-center"
                toastOptions={{
                  classNames: {
                    toast:
                      "bg-white text-black dark:bg-neutral-900 dark:text-white",
                    title: "font-semibold",
                    description:
                      "text-sm text-neutral-600 dark:text-neutral-400",
                  },
                }}
              />
              {children}
            </TooltipProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
