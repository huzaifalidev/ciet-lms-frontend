"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, User, LogOut, Settings, Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

// Breadcrumb component
function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const title = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { title, href, isLast: index === segments.length - 1 };
  });

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && <span className="mx-2">/</span>}
          <span
            className={
              item.isLast
                ? "text-foreground font-medium"
                : "hover:text-foreground"
            }
          >
            {item.title}
          </span>
        </div>
      ))}
    </nav>
  );
}

interface NavbarProps {
  className?: string;
  theme?: "light" | "dark";
}

export function Navbar({ className }: NavbarProps) {
  const Theme = useTheme();
  return (
    <header className="flex h-16 items-center justify-between border-b bg-sidebar px-6">
      {/* Left side - Breadcrumb */}
      <div className="flex items-center">
        {/* <Breadcrumb /> */}
        <div className="flex flex-col">
          <span className="text-lg font-bold">CIET School</span>
          <span className="text-xs text-sidebar-foreground/70">
            Learning Management System
          </span>
        </div>
      </div>

      {/* Right side - Search, Theme Toggle, Notifications, User Menu */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        {/* <Button
          onClick={() => console.log("Notifications clicked")}
          variant="ghost"
          size="sm"
          className="relative"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs"></span>
        </Button> */}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              onClick={() => console.log("User menu clicked")}
              variant="ghost"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/diverse-user-avatars.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 z-50" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john.doe@cietschool.edu
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                Theme.setTheme(Theme.theme === "light" ? "dark" : "light")
              }
            >
              {Theme.theme === "light" ? (
                <Moon className="mr-2 h-4 w-4" />
              ) : (
                <Sun className="mr-2 h-4 w-4" />
              )}
              <span>{Theme.theme === "light" ? "Dark" : "Light"} Mode</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
