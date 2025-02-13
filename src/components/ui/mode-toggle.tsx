"use client"

import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const [theme, setThemeState] = useState<"theme-light" | "dark" | "system">("system")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "theme-light" | "dark" | "system" | null
    if (storedTheme) {
      setThemeState(storedTheme)
    } else {
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      setThemeState(isDarkMode ? "dark" : "theme-light")
    }
  }, [])

  useEffect(() => {
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList[isDark ? "add" : "remove"]("dark")
    localStorage.setItem("theme", theme) // persist theme
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prevTheme) => {
      if (prevTheme === "theme-light") return "dark"
      if (prevTheme === "dark") return "theme-light"
      return "theme-light"
    })
  }

  return (
    <Button size="icon" onClick={toggleTheme} className="h-7 w-7 rounded-full bg-foreground p-0 hover:bg-primary">
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-180 dark:scale-0" />
      <Moon className="absolute h-4 w-4 -rotate-180 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
