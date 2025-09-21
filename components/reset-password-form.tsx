"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Lock } from "lucide-react";

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordFormProps {
  onSubmit?: (values: ResetPasswordFormValues) => void;
}

const validationSchema = Yup.object({
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const initialValues: ResetPasswordFormValues = { password: "", confirmPassword: "" };

  const handleSubmit = (values: ResetPasswordFormValues) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      console.log("Password reset attempt:", values);
    }
  };

  return (
    <CardContent>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form className="space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    errors.password && touched.password ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </div>
              {errors.password && touched.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                    errors.confirmPassword && touched.confirmPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </Button>
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </Form>
        )}
      </Formik>
    </CardContent>
  );
};
