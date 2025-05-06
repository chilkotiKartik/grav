"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { mockUsers } from "@/lib/mock-data"
import { useToast } from "@/components/ui/use-toast"

export type UserRole = "citizen" | "admin" | "officer" | "analyst" | null

export interface User {
  id: number
  name: string
  role: UserRole
  points?: number
  avatar?: string
  email?: string
  phone?: string
  address?: string
  joinDate?: string
  bio?: string
  badges?: string[]
  preferences?: {
    notifications: boolean
    emailUpdates: boolean
    smsAlerts: boolean
  }
}

interface UserContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>
  isLoading: boolean
  demoLogin: (role: UserRole) => Promise<boolean>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("grievx-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true)

    // For demo purposes, find a matching user from mock data
    const foundUser = mockUsers.find((u) => u.email === email)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem("grievx-user", JSON.stringify(foundUser))
      setIsLoading(false)

      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      })

      return true
    }

    setIsLoading(false)

    toast({
      title: "Login failed",
      description: "Invalid email or password. Please try again.",
      variant: "destructive",
    })

    return false
  }

  const demoLogin = async (role: UserRole) => {
    setIsLoading(true)

    // Find a user with the specified role
    const demoUser = mockUsers.find((u) => u.role === role)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (demoUser) {
      setUser(demoUser)
      localStorage.setItem("grievx-user", JSON.stringify(demoUser))
      setIsLoading(false)

      toast({
        title: "Demo login successful",
        description: `You are now logged in as ${demoUser.name} (${role}).`,
      })

      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("grievx-user")
  }

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // Simulate API call
    setIsLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create new user
    const newUser: User = {
      id: mockUsers.length + 1,
      name,
      email,
      role: role || "citizen",
      points: 0,
      avatar: "/avatars/default.png",
      joinDate: new Date().toISOString().split("T")[0],
      preferences: {
        notifications: true,
        emailUpdates: true,
        smsAlerts: false,
      },
    }

    setUser(newUser)
    localStorage.setItem("grievx-user", JSON.stringify(newUser))
    setIsLoading(false)

    toast({
      title: "Registration successful",
      description: "Your account has been created successfully.",
    })

    return true
  }

  return (
    <UserContext.Provider value={{ user, login, logout, register, isLoading, demoLogin }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
