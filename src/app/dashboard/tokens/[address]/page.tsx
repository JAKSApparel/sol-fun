'use client'

import { TokenChartDashboard } from "@/components/trading/token-chart-dashboard"
import { useParams } from "next/navigation"

export default function TokenDashboardPage() {
  const params = useParams()
  const address = params.address as string

  return (
    <div className="container max-w-7xl mx-auto py-6">
      <TokenChartDashboard tokenAddress={address} />
    </div>
  )
} 