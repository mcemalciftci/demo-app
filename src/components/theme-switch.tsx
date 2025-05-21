"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [isDark, setIsDark] = React.useState(theme === "dark")

  React.useEffect(() => {
    setIsDark(theme === "dark")
  }, [theme])

  const handleToggle = (checked: boolean) => {
    setIsDark(checked)
    setTheme(checked ? "dark" : "light")
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" />
      <Switch checked={isDark} className="bg-regal-blue" onCheckedChange={handleToggle} />
      <Moon className="h-4 w-4" />
    </div>
  )
}
