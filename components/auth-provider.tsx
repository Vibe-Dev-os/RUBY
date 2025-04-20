"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user database
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = users.find((u: any) => u.email === email)

    if (foundUser && foundUser.password === password) {
      // Remove password before storing in state
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("user", JSON.stringify(userWithoutPassword))

      toast({
        title: "Login successful",
        description: `Welcome back, ${foundUser.name}!`,
      })

      setIsLoading(false)
      return true
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      })

      setIsLoading(false)
      return false
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user database
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      toast({
        title: "Signup failed",
        description: "Email already in use",
        variant: "destructive",
      })

      setIsLoading(false)
      return false
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
    }

    // Add to "database"
    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))

    // Log user in (without password in state)
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))

    toast({
      title: "Signup successful",
      description: `Welcome, ${name}!`,
    })

    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")

    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    })
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
