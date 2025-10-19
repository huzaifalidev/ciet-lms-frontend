"use client";

import { Suspense } from "react";
import {Spinner} from "@/components/ui/spinner";

export function ClientSuspenseWrapper({
  children,
  fallback = <Spinner />,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
