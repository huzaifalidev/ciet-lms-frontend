import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import {FullScreenLoader} from "@/components/FullScreenLoader";

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
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Suspense fallback={<FullScreenLoader />}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
