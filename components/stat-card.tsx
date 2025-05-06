"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  delay?: number
}

export function StatCard({ title, value, description, icon: Icon, trend, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full card-hover">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
              <h3 className="text-2xl font-bold mb-1">{value}</h3>

              {trend && (
                <div className="flex items-center text-xs">
                  <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
                    {trend.isPositive ? (
                      <ArrowUpRight className="h-3 w-3 inline mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 inline mr-1" />
                    )}
                    {trend.value}%
                  </span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
              )}
            </div>

            <div className="bg-primary/10 p-2 rounded-full">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-4">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
