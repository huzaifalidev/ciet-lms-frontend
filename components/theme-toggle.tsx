"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative"
    >
      <Sun className={`h-4 w-4 transition-all ${currentTheme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
      <Moon className={`absolute h-4 w-4 transition-all ${currentTheme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
