import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useState, useEffect } from "react"

export function ModeToggle() {
  const [theme, setThemeState] = useState<"theme-light" | "dark" | "system">(
    "system"
  )

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setThemeState(isDarkMode ? "dark" : "theme-light")
  }, [])

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList[isDark ? "add" : "remove"]("dark")
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prevTheme) => {
      if (prevTheme === "theme-light") return "dark"
      if (prevTheme === "dark") return "theme-light"
      return "theme-light"
    })
  }

  return (
    <Button
      size="icon"
      onClick={toggleTheme}
      className="h-7 w-7 rounded-full p-0 hover:bg-primary bg-foreground transition-colors duration-300"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 -rotate-180 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
