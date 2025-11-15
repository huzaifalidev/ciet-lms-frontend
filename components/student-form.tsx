"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Phone, DollarSign } from "lucide-react";
import { toast } from "sonner";

export type StudentFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  parentPhoneNumber?: string;
  fees?: string;
};

type StudentFormProps = {
  initialData?: StudentFormData;
  onSubmit: (data: StudentFormData) => void;
  formId?: string; // Optional form ID for requestSubmit
};

export default function StudentForm({
  initialData,
  onSubmit,
  formId,
}: StudentFormProps) {
  const [form, setForm] = useState<StudentFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    parentPhoneNumber: "",
    fees: "",
    ...initialData,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email) {
      toast.error("Please fill all required fields.");
      return;
    }
    onSubmit(form);
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-4 px-4">
      {/* Name Fields */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative mt-2">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <div className="relative mt-2">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="lastName"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* Email + Password */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative mt-2">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative mt-2">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {/* Phone + Fees */}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="studentPhoneNumber">Student Phone</Label>
          <div className="relative mt-2">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="phoneNumber"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm({ ...form, phoneNumber: e.target.value })
              }
              className="pl-9"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="parentPhoneNumber">Parent Phone</Label>
          <div className="relative mt-2">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="parentPhoneNumber"
              value={form.parentPhoneNumber}
              onChange={(e) =>
                setForm({ ...form, parentPhoneNumber: e.target.value })
              }
              className="pl-9"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="fees">Fees</Label>
          <div className="relative mt-2">
            <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="fees"
              value={form.fees}
              onChange={(e) => setForm({ ...form, fees: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
