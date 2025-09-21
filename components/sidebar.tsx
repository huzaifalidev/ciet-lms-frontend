"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  BookOpen,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  DoorClosed,
  LayoutDashboard,
  Grid,
  PanelRight,
  PanelLeftCloseIcon,
} from "lucide-react";

const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: Home },
  { title: "Courses", href: "/dashboard/courses", icon: BookOpen },
  { title: "Students", href: "/dashboard/students", icon: Users },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Collapse Button at Top */}
      <div className="flex items-center justify-between h-16 border-b px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="CIET School Logo" className="h-8 w-8" />
        </div>

        {/* Collapse/Expand Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0 flex items-center justify-center relative group"
        >
          {collapsed ? (
            <>
              {/* Logo shown by default */}
              <img
                src="/logo.png"
                alt="CIET School Logo"
                className="h-8 w-8 transition-opacity duration-200 group-hover:opacity-0 absolute"
              />
              {/* ChevronRight shows on hover */}
              <ChevronRight className="h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 absolute" />
            </>
          ) : (
            <PanelLeftCloseIcon className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4 mt-2">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    collapsed && "justify-center px-2",
                    isActive &&
                      "bg-sidebar-accent text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
