"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/",
      active: pathname === "/",
    },
    {
      title: "Routines",
      href: "/routines",
      active: pathname.startsWith("/routines"),
    },
    {
      title: "Exercises",
      href: "/exercises",
      active: pathname.startsWith("/exercises"),
    },
    {
      title: "History",
      href: "/history",
      active: pathname.startsWith("/history"),
    },
    {
      title: "Settings",
      href: "/settings",
      active: pathname.startsWith("/settings"),
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            item.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

