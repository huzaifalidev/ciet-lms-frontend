"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import axios from "axios";
import { config } from "@/config/config";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { startLoading, stopLoading } from "@/redux/slices/loading.slice";
import { setUser } from "@/redux/slices/user.slice";

interface LoginFormValues {
  email: string;
  password: string;
  validUsers?: any;
}
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);

  const handleSubmit = async (values: LoginFormValues) => {
    dispatch(startLoading());
    try {
      const res = await axios.post(`${config.API_URL}/auth/login`, {
        email: values.email,
        password: values.password,
      });

      if (res.status === 200) {
        dispatch(setUser(res.data.user));
        window.localStorage.setItem("accessToken", res.data.user.accessToken);
        window.localStorage.setItem("refreshToken", res.data.user.refreshToken);
        toast.success(res.data.msg || "Login successful!");
        if (res.data.user.role === "STUDENT") {
          router.push("/student/courses");
        } else if (res.data.user.role === "ADMIN") {
          router.push("/admin/dashboard");
        }
      }
    } catch (error : any) {
      console.error("Login failed", error);
      toast.error(
        error.response.data.msg || "Something went wrong. Please try again."
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <CardContent>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`pl-10 ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && touched.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="pl-10 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Forgot password link */}
            <div className="flex items-center justify-between">
              <a
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Sign In"}
            </Button>
          </Form>
        )}
      </Formik>
    </CardContent>
  );
};
