import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AuthCardHeaderProps {
  title: string;
  description?: string;
  logoSrc?: string;
  logoWidth?: number;
  logoHeight?: number;
  altText?: string;
}

export const AuthCardHeader: React.FC<AuthCardHeaderProps> = ({
  title,
  description,
  logoSrc = "/logo.png",
  logoWidth = 100,
  logoHeight = 100,
  altText = "Logo",
}) => {
  return (
    <CardHeader className="space-y-1">
      <img
        className="mx-auto"
        width={logoWidth}
        height={logoHeight}
        src={logoSrc}
        alt={altText}
      />
      <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
      {description && (
        <CardDescription className="text-center">{description}</CardDescription>
      )}
    </CardHeader>
  );
};
