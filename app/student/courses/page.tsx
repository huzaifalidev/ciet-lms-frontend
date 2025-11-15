"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, CheckCircle2 } from "lucide-react";
import { coursesCatalog, type Course } from "@/components/data/courses";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { fetchCurrentUser } from "@/lib/fetch.currentUser";
import { useAppDispatch } from "@/redux/store/store";

export default function CoursesCatalogPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState<number[]>([]);
  useEffect(() => {
    fetchCurrentUser(dispatch);
  }, []);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return coursesCatalog;
    return coursesCatalog.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.level.toLowerCase().includes(q)
    );
  }, [query]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearSelection = () => setSelected([]);

  const selectedCourses = useMemo<Course[]>(
    () => coursesCatalog.filter((c) => selected.includes(c.id)),
    [selected]
  );

  const total = useMemo(
    () => selectedCourses.reduce((sum, c) => sum + c.price, 0),
    [selectedCourses]
  );
  const goCheckout = () => {
    if (!selected.length) return;
    const ids = selected.join(",");
    router.push(`/student/courses/checkout?ids=${encodeURIComponent(ids)}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Course Catalog
          </h1>
          <p className="text-muted-foreground">
            Select courses to add to your bucket and proceed to checkout.
          </p>
        </div>
        <Button
          onClick={goCheckout}
          disabled={selected.length === 0}
          className="gap-2"
          aria-disabled={selected.length === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          Checkout
          {selected.length > 0 ? (
            <Badge variant="secondary" className="ml-1">
              {selected.length}
            </Badge>
          ) : null}
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Browse Courses</CardTitle>
          <CardDescription>
            Use search to quickly find relevant courses by title, topic, or
            level.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses by title, topic, or level..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search courses"
            />
          </div>
        </CardContent>
      </Card>

      {/* Course Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => {
          const isSelected = selected.includes(course.id);
          return (
            <Card
              key={course.id}
              data-selected={isSelected ? "true" : "false"}
              className="transition-colors data-[selected=true]:border-primary"
            >
              <CardHeader className="space-y-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-pretty">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-pretty">
                      {course.description}
                    </CardDescription>
                  </div>
                  <Checkbox
                    aria-label={`Select ${course.title}`}
                    checked={isSelected}
                    onCheckedChange={() => toggle(course.id)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{course.level}</Badge>
                  <Badge variant="outline">{course.durationWeeks} weeks</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-lg font-semibold">${course.price}</div>
                <Button
                  variant={isSelected ? "secondary" : "default"}
                  onClick={() => toggle(course.id)}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" /> Added
                    </>
                  ) : (
                    <>Add to Bucket</>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selection Summary Bar */}
      <Card className="sticky bottom-4 left-0 right-0 mx-auto max-w-4xl border-dashed">
        <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            <div className="text-sm text-muted-foreground">
              {selected.length > 0 ? (
                <>
                  {selected.length} course{selected.length > 1 ? "s" : ""}{" "}
                  selected •{" "}
                  <span className="font-medium text-foreground">${total}</span>{" "}
                  total
                </>
              ) : (
                <>No courses selected</>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={clearSelection}
              disabled={selected.length === 0}
            >
              Clear
            </Button>
            <Button onClick={goCheckout} disabled={selected.length === 0}>
              Proceed to Checkout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
