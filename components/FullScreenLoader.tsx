"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

export const FullScreenLoader: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-1/2">
        <Progress value={50} className="h-2" />
      </div>
    </div>
  );
};
