"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { HomeLoading } from "./loading-home"

// Create a client-only version of the home page with ssr: false
const HomeClient = dynamic(() => import("@/components/home-client"), {
  ssr: false,
  loading: () => <HomeLoading />,
})

export default function ClientPage() {
  const [mounted, setMounted] = useState(false)

  // Use React's useEffect to set mounted to true after the component mounts
  useState(() => {
    setMounted(true)
  }, [])

  // Show loading state until the component is mounted
  if (!mounted) {
    return <HomeLoading />
  }

  return <HomeClient />
}
