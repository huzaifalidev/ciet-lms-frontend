"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Plus,
  User,
  Mail,
  Lock,
  Phone,
  Search,
  MoreHorizontal,
  GraduationCap,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  studentPhoneNumber?: string;
  parentPhoneNumber?: string;
  // UI fields below (not in schema)
  avatar?: string;
  enrolledCourses: number;
  completedCourses: number;
  status: "active" | "inactive";
  joinDate: string;
  lastActive: string;
  progress: number;
};

const initialStudents: Student[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    password: "••••••••",
    avatar: "/diverse-user-avatars.png",
    enrolledCourses: 3,
    completedCourses: 1,
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    progress: 78,
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    name: "Bob Smith",
    email: "bob.smith@email.com",
    password: "••••••••",
    avatar: "/diverse-user-avatars.png",
    enrolledCourses: 2,
    completedCourses: 2,
    status: "active",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19",
    progress: 92,
  },
  {
    id: 3,
    firstName: "Carol",
    lastName: "Davis",
    name: "Carol Davis",
    email: "carol.davis@email.com",
    password: "••••••••",
    avatar: "/diverse-user-avatars.png",
    enrolledCourses: 4,
    completedCourses: 3,
    status: "inactive",
    joinDate: "2023-11-01",
    lastActive: "2024-01-10",
    progress: 65,
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Wilson",
    name: "David Wilson",
    email: "david.wilson@email.com",
    password: "••••••••",
    avatar: "/diverse-user-avatars.png",
    enrolledCourses: 1,
    completedCourses: 0,
    status: "active",
    joinDate: "2024-02-01",
    lastActive: "2024-01-20",
    progress: 45,
  },
  {
    id: 5,
    firstName: "Eva",
    lastName: "Brown",
    name: "Eva Brown",
    email: "eva.brown@email.com",
    password: "••••••••",
    avatar: "/diverse-user-avatars.png",
    enrolledCourses: 5,
    completedCourses: 4,
    status: "active",
    joinDate: "2023-09-15",
    lastActive: "2024-01-20",
    progress: 88,
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");

  // drawer states
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // form states
  const emptyForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    studentPhoneNumber: "",
    parentPhoneNumber: "",
  };
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  // helpers
  const resetForm = () => setForm(emptyForm);

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    // basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    // unique email check on create
    const emailTaken =
      editingId === null &&
      students.some((s) => s.email.toLowerCase() === form.email.toLowerCase());
    if (emailTaken) {
      toast.error(`This email is already registered.`);
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!validate()) return;
    const nextId = (students.at(-1)?.id ?? 0) + 1;
    const now = new Date().toISOString().slice(0, 10);
    const newStudent: Student = {
      id: nextId,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      email: form.email.toLowerCase(),
      password: form.password,
      studentPhoneNumber: form.studentPhoneNumber || undefined,
      parentPhoneNumber: form.parentPhoneNumber || undefined,
      avatar: "/diverse-user-avatars.png",
      enrolledCourses: 0,
      completedCourses: 0,
      status: "active",
      joinDate: now,
      lastActive: now,
      progress: 0,
    };
    setStudents((prev) => [...prev, newStudent]);
    toast.success(`Student Added: ${newStudent.name}`);
    setCreateOpen(false);
    resetForm();
  };

  const onStartEdit = (id: number) => {
    const s = students.find((x) => x.id === id);
    if (!s) return;
    setEditingId(id);
    setForm({
      firstName: s.firstName,
      lastName: s.lastName,
      email: s.email,
      password: s.password,
      studentPhoneNumber: s.studentPhoneNumber || "",
      parentPhoneNumber: s.parentPhoneNumber || "",
    });
    setEditOpen(true);
  };

  const onEdit = () => {
    if (!validate() || editingId === null) return;
    setStudents((prev) =>
      prev.map((s) =>
        s.id === editingId
          ? {
              ...s,
              firstName: form.firstName.trim(),
              lastName: form.lastName.trim(),
              name: `${form.firstName.trim()} ${form.lastName.trim()}`,
              email: form.email.toLowerCase(),
              password: form.password,
              studentPhoneNumber: form.studentPhoneNumber || undefined,
              parentPhoneNumber: form.parentPhoneNumber || undefined,
            }
          : s
      )
    );
    const updated = `${form.firstName.trim()} ${form.lastName.trim()}`;
    setEditOpen(false);
    setEditingId(null);
    resetForm();
    toast.success(`${updated} has been updated.`);
  };

  const onConfirmDelete = () => {
    if (deletingId === null) return;
    const target = students.find((s) => s.id === deletingId);
    setStudents((prev) => prev.filter((s) => s.id !== deletingId));
    setDeleteOpen(false);
    setDeletingId(null);
    toast.success(`${target?.name || "Student"} has been removed.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <div className="text-muted-foreground flex items-center gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/dashboard">Dashboard</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/students">
                    Students
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <p className="text-muted-foreground">
            Manage and monitor student progress
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Students
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter((s) => s.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>
      </div>

      {/* Students Management */}
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>
            View and manage all enrolled students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Students Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={student.avatar || "/placeholder.svg"}
                          alt={student.name}
                        />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="font-medium">
                          {student.firstName} {student.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {student.enrolledCourses} enrolled
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {student.completedCourses} completed
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {student.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(student.lastActive).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => onStartEdit(student.id)}
                        >
                          Edit student
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setDeletingId(student.id);
                            setDeleteOpen(true);
                          }}
                          className="text-red-600"
                        >
                          Delete student
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Student Drawer */}
      <Drawer open={createOpen} onOpenChange={setCreateOpen} direction="bottom">
        <DrawerContent className="bg-background">
          <DrawerHeader>
            <DrawerTitle>Add Student</DrawerTitle>
            <DrawerDescription>
              Enter student details to create a new record.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 space-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onCreate();
              }}
              className="space-y-4"
            >
              {/* Name Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="mb-4" htmlFor="firstName">
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      className="pl-9"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-4" htmlFor="lastName">
                    Last Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      className="pl-9"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Email + Password */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Label className="mb-4" htmlFor="email">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      className="pl-9"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label className="mb-4" htmlFor="password">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter password"
                      className="pl-9"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="mb-4" htmlFor="studentPhoneNumber">
                    Student Phone
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="studentPhoneNumber"
                      placeholder="e.g. +1 234 567 8901"
                      className="pl-9"
                      value={form.studentPhoneNumber}
                      onChange={(e) =>
                        setForm({ ...form, studentPhoneNumber: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-4" htmlFor="parentPhoneNumber">
                    Parent Phone
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="parentPhoneNumber"
                      placeholder="e.g. +1 987 654 3210"
                      className="pl-9"
                      value={form.parentPhoneNumber}
                      onChange={(e) =>
                        setForm({ ...form, parentPhoneNumber: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <DrawerFooter className="flex justify-end space-x-2">
                <Button type="submit">Create</Button>
                <DrawerClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Edit Student Drawer */}
      <Drawer
        open={editOpen}
        onOpenChange={(open) => {
          setEditOpen(open);
          if (!open) {
            setEditingId(null);
            resetForm();
          }
        }}
      >
        <DrawerContent className="bg-background">
          <DrawerHeader>
            <DrawerTitle>Edit Student</DrawerTitle>
            <DrawerDescription>Update student details.</DrawerDescription>
          </DrawerHeader>
          <div className="px-6 pb-2">
            <form
              className="grid gap-4 md:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                onEdit();
              }}
            >
              <div className="grid gap-2">
                <Label htmlFor="edit-firstName">First Name</Label>
                <Input
                  id="edit-firstName"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-lastName">Last Name</Label>
                <Input
                  id="edit-lastName"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="edit-password">Password</Label>
                <Input
                  id="edit-password"
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-studentPhoneNumber">Student Phone</Label>
                <Input
                  id="edit-studentPhoneNumber"
                  value={form.studentPhoneNumber}
                  onChange={(e) =>
                    setForm({ ...form, studentPhoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-parentPhoneNumber">Parent Phone</Label>
                <Input
                  id="edit-parentPhoneNumber"
                  value={form.parentPhoneNumber}
                  onChange={(e) =>
                    setForm({ ...form, parentPhoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-2 pt-2">
                <DrawerClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DrawerClose>
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </div>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>

      {/* Delete Student AlertDialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete student?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The student will be permanently
              removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeletingId(null);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={onConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
