"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import the loading component
import TownhallLoading from "./loading"

// Fix: Correctly import the named export TownhallClient
const TownhallClientComponent = dynamic(
  () => import("@/components/townhall-client").then((mod) => ({ default: mod.TownhallClient })),
  {
    ssr: false,
    loading: () => <TownhallLoading />,
  },
)

export default function ClientPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading state until the component is mounted
  if (!mounted) {
    return <TownhallLoading />
  }

  return <TownhallClientComponent />
}
