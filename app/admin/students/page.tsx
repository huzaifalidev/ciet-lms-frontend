"use client";

import { useEffect, useState } from "react";
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
import StudentForm, { StudentFormData } from "@/components/student-form";
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
import { Users, Plus, Search, MoreHorizontal, TrendingUp } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { config } from "@/config/config";
import axios from "axios";

export type Student = StudentFormData & {
  id: string;
  avatar?: string;
  enrolledCourses?: number;
  completedCourses?: number;
  status?: "active" | "inactive";
  joinDate?: string;
  lastActive?: string;
  progress?: number;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Drawer & Form states
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudent, setDeletingStudent] = useState<Student | null>(null);
  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${config.API_URL}/student/get-all`);
      setStudents(res.data.students || []);
    } catch (error: any) {
      toast.error("Failed to fetch students");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (isActive?: boolean) => {
    if (isActive === true) {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    } else {
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    }
  };

  const handleCreate = async (data: StudentFormData, student?: Student) => {
    try {
      let res;
      if (student?._id) {
        // Edit mode
        res = await axios.post(
          `${config.API_URL}/student/create/${student._id}`,
          data
        );
        toast.success(res.data.msg || "Student updated");
        setEditingStudent(null);
        setEditOpen(false);
      } else {
        // Create mode
        res = await axios.post(`${config.API_URL}/student/create`, data);
        toast.success(res.data.msg || "Student created");
        setCreateOpen(false);
      }
      fetchStudents();
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Failed to save student");
    }
  };

  const handleDelete = async () => {
    if (!deletingStudent) return;
    try {
      const res = await axios.delete(
        `${config.API_URL}/student/delete/${deletingStudent._id}`
      );
      if (res.status === 200) {
        toast.success(
          `Student ${deletingStudent.firstName} ${deletingStudent.lastName} deleted`
        );
        fetchStudents();
        setDeletingStudent(null);
        setDeleteOpen(false);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Failed to delete student");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard">
                  Dashboard
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/students">Students</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <p className="text-muted-foreground">
            Manage and monitor student progress
          </p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle>Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between pb-2">
            <CardTitle>Active Students</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.filter((s) => s.isActive === true).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>View and manage all students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={s.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {s.firstName?.[0]}
                          {s.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {s.firstName} {s.lastName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {s.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(s.isActive)}>
                      {s.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingStudent(s);
                            setEditOpen(true);
                          }}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setDeletingStudent(s);
                            setDeleteOpen(true);
                          }}
                        >
                          Delete
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

      {/* Create Drawer */}
      <Drawer open={createOpen} onOpenChange={setCreateOpen}>
        <DrawerContent className="max-h-[90vh] flex flex-col bg-background">
          <DrawerHeader>
            <DrawerTitle>Add Student</DrawerTitle>
          </DrawerHeader>

          {/* Scrollable form area */}
          <div className="px-6 pb-4 overflow-y-auto flex-1">
            <StudentForm onSubmit={handleCreate} formId="create-student-form" />
          </div>

          <DrawerFooter className="flex justify-end space-x-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button
              type="button"
              onClick={() => {
                document.getElementById("create-student-form")?.requestSubmit();
              }}
            >
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Edit Drawer */}
      <Drawer open={editOpen} onOpenChange={setEditOpen}>
        <DrawerContent className="max-h-[90vh] flex flex-col bg-background">
          <DrawerHeader>
            <DrawerTitle>Edit Student</DrawerTitle>
          </DrawerHeader>

          {/* Scrollable form area */}
          <div className="px-6 pb-4 overflow-y-auto flex-1">
            {editingStudent && (
              <StudentForm
                initialData={editingStudent}
                onSubmit={handleCreate}
                formId="edit-student-form"
              />
            )}
          </div>

          <DrawerFooter className="flex justify-end space-x-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button
              type="button"
              onClick={() => {
                document.getElementById("edit-student-form")?.requestSubmit();
              }}
            >
              Save Changes
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Delete Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingStudent(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
