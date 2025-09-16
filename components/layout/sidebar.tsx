"use client"

import type React from "react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/components/auth/auth-context"
import {
  Building2,
  Calendar,
  FileText,
  GraduationCap,
  Home,
  MessageSquare,
  Settings,
  TrendingUp,
  Users,
  Briefcase,
  Award,
  BarChart3,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onNavigate?: (view: string) => void
}

const studentNavItems = [
  { icon: Home, label: "Dashboard", href: "dashboard" },
  { icon: Briefcase, label: "Find Internships", href: "internships" },
  { icon: FileText, label: "Applications", href: "applications" },
  { icon: Calendar, label: "Schedule", href: "schedule" },
  { icon: MessageSquare, label: "Messages", href: "messages" },
  { icon: Award, label: "Certificates", href: "certificates" },
  { icon: Settings, label: "Settings", href: "settings" },
]

const facultyNavItems = [
  { icon: Home, label: "Dashboard", href: "dashboard" },
  { icon: Users, label: "Students", href: "students" },
  { icon: Briefcase, label: "Internships", href: "internships" },
  { icon: BarChart3, label: "Analytics", href: "analytics" },
  { icon: FileText, label: "Reports", href: "reports" },
  { icon: MessageSquare, label: "Messages", href: "messages" },
  { icon: Settings, label: "Settings", href: "settings" },
]

const industryNavItems = [
  { icon: Home, label: "Dashboard", href: "dashboard" },
  { icon: Briefcase, label: "Post Internships", href: "post-internships" },
  { icon: Users, label: "Candidates", href: "candidates" },
  { icon: GraduationCap, label: "My Interns", href: "interns" },
  { icon: BarChart3, label: "Analytics", href: "analytics" },
  { icon: MessageSquare, label: "Messages", href: "messages" },
  { icon: Settings, label: "Settings", href: "settings" },
]

const adminNavItems = [
  { icon: Home, label: "Dashboard", href: "dashboard" },
  { icon: Users, label: "User Management", href: "users" },
  { icon: Building2, label: "Institutions", href: "institutions" },
  { icon: Briefcase, label: "Internships", href: "internships" },
  { icon: TrendingUp, label: "Analytics", href: "analytics" },
  { icon: FileText, label: "Reports", href: "reports" },
  { icon: Settings, label: "Settings", href: "settings" },
]

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const { user } = useAuth()
  const [currentView, setCurrentView] = useState("dashboard")

  const getNavItems = () => {
    switch (user?.role) {
      case "student":
        return studentNavItems
      case "faculty":
        return facultyNavItems
      case "industry":
        return industryNavItems
      case "admin":
        return adminNavItems
      default:
        return studentNavItems
    }
  }

  const navItems = getNavItems()

  const handleNavigation = (href: string) => {
    setCurrentView(href)
    if (onNavigate) {
      onNavigate(href)
    }
  }

  return (
    <div className={cn("pb-12 w-64 bg-card border-r", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-4 px-2">
            <GraduationCap className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-lg font-semibold text-primary">Prashikshan</h2>
          </div>
          <div className="space-y-1">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={currentView === item.href ? "secondary" : "ghost"}
                  className="w-full justify-start mb-1"
                  onClick={() => handleNavigation(item.href)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}
