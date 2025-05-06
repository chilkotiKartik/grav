"use client"

import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Shield } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        <Skeleton className="h-12 w-full max-w-md mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-[500px] w-full rounded-lg" />

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="flex flex-col items-center justify-center h-64 rounded-lg border border-dashed p-8 text-center"
            >
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Analyzing Fraud Patterns</h3>
                <p className="text-sm text-muted-foreground">Our AI is scanning databases and analyzing patterns...</p>
              </div>
            </motion.div>

            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
