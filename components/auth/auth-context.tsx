"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type UserRole = "student" | "industry" | "faculty" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  institution?: string
  company?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem("prashikshan_user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    let role: UserRole = "student"
    let institution = undefined
    let company = undefined

    // More robust role detection
    if (email.includes("faculty") || email.includes("prof") || email.includes("teacher")) {
      role = "faculty"
      institution = "Sample University"
    } else if (
      email.includes("company") ||
      email.includes("corp") ||
      email.includes("hr") ||
      email.includes("recruiter")
    ) {
      role = "industry"
      company = "Tech Corp Inc."
    } else if (email.includes("admin") || email.includes("administrator")) {
      role = "admin"
    } else {
      // Default to student for all other cases
      role = "student"
    }

    if (!role || !["student", "faculty", "industry", "admin"].includes(role)) {
      throw new Error("Invalid user role detected")
    }

    const mockUser: User = {
      id: "1",
      name: email
        .split("@")[0]
        .replace(".", " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      email,
      role,
      institution,
      company,
      avatar: `/placeholder.svg?height=40&width=40&query=user+avatar`,
    }

    setUser(mockUser)
    localStorage.setItem("prashikshan_user", JSON.stringify(mockUser))
    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("prashikshan_user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
