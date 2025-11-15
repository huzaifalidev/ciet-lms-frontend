"use client";

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
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAppDispatch, useAppSelector } from "@/redux/store/store";
import { logout } from "@/redux/slices/user.slice";
import { useRouter } from "next/navigation";

export function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const Theme = useTheme();
  const user = useAppSelector((state) => state.user.data);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-sidebar px-4 sm:px-6">
      <div className="flex flex-1 items-center justify-center sm:justify-start">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <span className="block text-lg font-bold">CIET School</span>
          <span className="block text-xs text-sidebar-foreground/70">
            Learning Management System
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger >
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/diverse-user-avatars.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56 z-[100] mt-2"
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

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

            <DropdownMenuItem
              onClick={() => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                dispatch(logout());
                router.push("/auth/signin");
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
