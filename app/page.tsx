"use client"

import { useAuth } from "@/components/auth/auth-context"
import { LoginForm } from "@/components/auth/login-form"
import { AuthProvider } from "@/components/auth/auth-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { StudentDashboard } from "@/components/student/dashboard"
import { InternshipBrowser } from "@/components/student/internship-browser"
import { StudentApplications } from "@/components/student/applications"
import { StudentSchedule } from "@/components/student/schedule"
import { StudentCertificates } from "@/components/student/certificates"
import { StudentSettings } from "@/components/student/settings"
import { IndustryDashboard } from "@/components/industry/dashboard"
import { PostInternship } from "@/components/industry/post-internship"
import { CandidateManagement } from "@/components/industry/candidate-management"
import { MessageHub } from "@/components/communication/message-hub"
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard"
import { FacultyDashboard } from "@/components/faculty/dashboard"
import { InternshipManagement } from "@/components/internship/internship-management"
import { Button } from "@/components/ui/button"
import { useState } from "react"

function AppContent() {
  const { user, isLoading, logout } = useAuth()
  const [currentView, setCurrentView] = useState("dashboard")

  console.log("[v0] AppContent render - user:", user, "isLoading:", isLoading, "currentView:", currentView)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <LoginForm />
      </div>
    )
  }

  const renderContent = () => {
    if (!user?.role) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center p-8">
            <h2 className="text-xl font-semibold mb-2">Access Error</h2>
            <p className="text-muted-foreground">Unable to determine user role. Please contact support.</p>
            <Button onClick={logout} className="mt-4">
              Sign Out
            </Button>
          </div>
        </div>
      )
    }

    console.log("[v0] Rendering content for role:", user.role, "view:", currentView)

    if (user.role === "student") {
      switch (currentView) {
        case "dashboard":
          return <StudentDashboard />
        case "internships":
          return <InternshipBrowser />
        case "applications":
          return <StudentApplications />
        case "schedule":
          return <StudentSchedule />
        case "messages":
          return <MessageHub />
        case "certificates":
          return <StudentCertificates />
        case "settings":
          return <StudentSettings />
        default:
          return <StudentDashboard />
      }
    }

    if (user.role === "industry") {
      switch (currentView) {
        case "dashboard":
          return <IndustryDashboard />
        case "post-internships":
          return <PostInternship />
        case "candidates":
          return <CandidateManagement />
        case "messages":
          return <MessageHub />
        case "analytics":
          return <AnalyticsDashboard />
        default:
          return <IndustryDashboard />
      }
    }

    if (user.role === "faculty") {
      switch (currentView) {
        case "dashboard":
          return <FacultyDashboard />
        case "internships":
          return <InternshipManagement />
        case "messages":
          return <MessageHub />
        case "analytics":
          return <AnalyticsDashboard />
        default:
          return <FacultyDashboard />
      }
    }

    if (user.role === "admin") {
      switch (currentView) {
        case "dashboard":
          return (
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-balance">Welcome back, {user.name}!</h1>
                <p className="text-muted-foreground mt-2">Oversee the entire internship management system.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-2">Quick Stats</h3>
                  <p className="text-2xl font-bold text-primary">156</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-2">Recent Activity</h3>
                  <p className="text-sm text-muted-foreground">System maintenance completed successfully</p>
                </div>

                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-semibold mb-2">Upcoming</h3>
                  <p className="text-sm text-muted-foreground">Monthly system report generation</p>
                </div>
              </div>
            </div>
          )
        case "internships":
          return <InternshipManagement />
        case "analytics":
          return <AnalyticsDashboard />
        default:
          return <InternshipManagement />
      }
    }

    // Now returns proper error message for unrecognized roles
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center p-8">
          <h2 className="text-xl font-semibold mb-2">Unrecognized Role</h2>
          <p className="text-muted-foreground">
            Your account role ({user.role}) is not recognized. Please contact support.
          </p>
          <Button onClick={logout} className="mt-4">
            Sign Out
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar className="border-r flex-shrink-0" onNavigate={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
