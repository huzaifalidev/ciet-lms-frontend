"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Users, Plus, Search, MoreHorizontal, GraduationCap, BookOpen, TrendingUp } from "lucide-react"

const students = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
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
    name: "Bob Smith",
    email: "bob.smith@email.com",
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
    name: "Carol Davis",
    email: "carol.davis@email.com",
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
    name: "David Wilson",
    email: "david.wilson@email.com",
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
    name: "Eva Brown",
    email: "eva.brown@email.com",
    avatar: "/diverse-user-avatars.png",
    enrolledCourses: 5,
    completedCourses: 4,
    status: "active",
    joinDate: "2023-09-15",
    lastActive: "2024-01-20",
    progress: 88,
  },
]

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage and monitor student progress</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.filter((s) => s.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(students.reduce((sum, student) => sum + student.enrolledCourses, 0) / students.length)}
            </div>
            <p className="text-xs text-muted-foreground">Per student</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(students.reduce((sum, student) => sum + student.progress, 0) / students.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Average progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Students Management */}
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>View and manage all enrolled students</CardDescription>
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
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{student.enrolledCourses} enrolled</div>
                      <div className="text-sm text-muted-foreground">{student.completedCourses} completed</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(student.status)}>{student.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">{student.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{new Date(student.lastActive).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View profile</DropdownMenuItem>
                        <DropdownMenuItem>View progress</DropdownMenuItem>
                        <DropdownMenuItem>Send message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Remove student</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
