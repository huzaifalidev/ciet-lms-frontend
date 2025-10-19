"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  GraduationCap,
  TrendingUp,
  Calendar,
  Bell,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { startLoading, stopLoading } from "@/redux/slices/loading.slice";
import { DashboardSkeleton } from "@/components/skelton-dashboard";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const studentData = [
  { month: "Jan", students: 120 },
  { month: "Feb", students: 200 },
  { month: "Mar", students: 150 },
  { month: "Apr", students: 300 },
];

const courseData = [
  { name: "Completed", value: 12 },
  { name: "Remaining", value: 3 },
];

const COLORS = ["#4f46e5", "#e5e7eb"]; // primary + background for gauge

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loading);

  useEffect(() => {
    dispatch(startLoading());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => dispatch(stopLoading()), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, John!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your courses today.
          </p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {/* Course Progress Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your course completion overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-full h-[220px] sm:h-[250px]">
                <ChartContainer
                  id="courses-gauge"
                  config={{
                    completed: { color: "#4f46e5", label: "Completed" },
                    remaining: { color: "#e5e7eb", label: "Remaining" },
                  }}
                  className="w-full h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={courseData}
                        dataKey="value"
                        innerRadius="60%"
                        outerRadius="80%"
                        startAngle={180}
                        endAngle={0}
                        paddingAngle={2}
                      >
                        {courseData.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#4f46e5]" />
                  <span className="text-muted-foreground">
                    Completed:{" "}
                    <span className="font-semibold text-foreground">12</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#e5e7eb]" />
                  <span className="text-muted-foreground">
                    Remaining:{" "}
                    <span className="font-semibold text-foreground">3</span>
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Student Growth Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Student Growth</CardTitle>
            <CardDescription>Monthly student enrollment trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[220px] sm:h-[250px]">
              <ChartContainer
                id="students-line"
                config={{
                  students: { color: "#4f46e5", label: "Students" },
                }}
                className="w-full h-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={studentData}>
                    <XAxis
                      dataKey="month"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#4f46e5" }}
                    />
                    <ChartTooltip />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your courses and students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "New student enrolled in React Fundamentals",
                  time: "2 minutes ago",
                  type: "enrollment",
                },
                {
                  title: "Assignment submitted for JavaScript Basics",
                  time: "15 minutes ago",
                  type: "submission",
                },
                {
                  title: "Course completion: Advanced CSS",
                  time: "1 hour ago",
                  type: "completion",
                },
                {
                  title: "New discussion post in Python for Beginners",
                  time: "3 hours ago",
                  type: "discussion",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex h-2 w-2 rounded-full bg-blue-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start bg-transparent"
              variant="outline"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
            <Button
              className="w-full justify-start bg-transparent"
              variant="outline"
            >
              <Users className="mr-2 h-4 w-4" />
              Add Student
            </Button>
            <Button
              className="w-full justify-start bg-transparent"
              variant="outline"
            >
              <Bell className="mr-2 h-4 w-4" />
              Send Announcement
            </Button>
            <Button
              className="w-full justify-start bg-transparent"
              variant="outline"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div> */}

      {/* Upcoming Events */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Important dates and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "React Fundamentals - Assignment Due",
                date: "Tomorrow, 11:59 PM",
                type: "deadline",
              },
              {
                title: "Weekly Team Meeting",
                date: "Friday, 2:00 PM",
                type: "meeting",
              },
              {
                title: "JavaScript Basics - Final Exam",
                date: "Next Monday, 10:00 AM",
                type: "exam",
              },
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {event.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <Badge
                  variant={
                    event.type === "deadline" ? "destructive" : "secondary"
                  }
                >
                  {event.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
