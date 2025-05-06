"use client"

import dynamic from "next/dynamic"
import { HomeLoading } from "@/app/loading-home"

// Create a client-only version of the home page with ssr: false
const HomeClient = dynamic(() => import("@/components/home-client"), {
  ssr: false,
  loading: () => <HomeLoading />,
})

export default function HomeClientWrapper() {
  return <HomeClient />
}
