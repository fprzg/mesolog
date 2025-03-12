"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BarChart3, Dumbbell, Home, ListTodo, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
      active: pathname === "/",
    },
    {
      title: "Routines",
      href: "/routines",
      icon: ListTodo,
      active: pathname.startsWith("/routines"),
    },
    {
      title: "Exercises",
      href: "/exercises",
      icon: Dumbbell,
      active: pathname.startsWith("/exercises"),
    },
    {
      title: "History",
      href: "/history",
      icon: BarChart3,
      active: pathname.startsWith("/history"),
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      active: pathname.startsWith("/settings"),
    },
  ]

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6" />
          <span className="font-bold text-xl">GymTrack</span>
        </div>
        {/* 
        <SidebarTrigger />
        */}
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={item.active} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <ThemeToggle />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

