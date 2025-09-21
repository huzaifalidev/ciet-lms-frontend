"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, BookOpen, Users, Settings, ChevronLeft, ChevronRight, GraduationCap } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Courses",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    title: "Students",
    href: "/dashboard/students",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "relative flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-sidebar-primary" />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold">CIET School</span>
              <span className="text-xs text-sidebar-foreground/70">Learning Management System</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10",
                    collapsed && "justify-center px-2",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Collapse Toggle */}
      <div className="border-t p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("w-full", collapsed && "justify-center px-2")}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="ml-2">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
