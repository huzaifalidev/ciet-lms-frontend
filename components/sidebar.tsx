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
  ChevronRight,
  PanelLeftCloseIcon,
  CheckSquare,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<any>> = {
  home: Home,
  book: BookOpen,
  users: Users,
  settings: Settings,
};

interface SidebarProps {
  className?: string;
  items: {
    title: string;
    href: string;
    icon: string; // now a string instead of a component
  }[];
}

export function Sidebar({ className, items }: SidebarProps) {
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
      {/* Collapse Button */}
      <div className="flex items-center justify-between h-16 border-b px-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 p-0 flex items-center justify-center relative group"
        >
          {collapsed ? (
            <>
              <img
                src="/logo.png"
                alt="Logo"
                className="h-8 w-8 transition-opacity duration-200 group-hover:opacity-0 absolute"
              />
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
          {items.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = pathname === item.href;

            return (
              <Button
                asChild
                key={item.href}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-10",
                  collapsed && "justify-center px-2",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <Link href={item.href}>
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
