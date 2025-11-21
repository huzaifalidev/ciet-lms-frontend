"use client";

import { useEffect } from "react";
import { initializeAuth } from "@/lib/initializeAuth";
import { useAppDispatch } from "@/redux/store/store";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeAuth(dispatch);
  }, []);

  return <>{children}</>;
}
