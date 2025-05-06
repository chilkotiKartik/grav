"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/components/user-provider"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }

    // Redirect based on user role
    switch (user.role) {
      case "citizen":
        router.push("/citizen-dashboard")
        break
      case "officer":
        router.push("/officer-dashboard")
        break
      case "admin":
        router.push("/admin-dashboard")
        break
      default:
        router.push("/login")
    }
  }, [user, router])

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h1 className="text-2xl font-bold">Redirecting to your dashboard...</h1>
      </div>
    </div>
  )
}
