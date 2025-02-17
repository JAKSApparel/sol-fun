"use client"

import { motion } from "framer-motion"
import { BarChart2, Wallet, Bot, Shield, Coins, Image as ImageIcon } from "lucide-react"
import { TradingInterface } from "@/components/trading/trading-interface"
import { CreateToken } from "@/components/token/create-token"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useWallet } from '@solana/wallet-adapter-react'
import { TokenChartDashboard } from "@/components/trading/token-chart-dashboard"
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview"
import { PortfolioChart } from "@/components/dashboard/portfolio-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"

// Sample data - replace with your actual data source
const sampleData = [
  { date: '2024-01', value: 400 },
  { date: '2024-02', value: 300 },
  { date: '2024-03', value: 600 },
  { date: '2024-04', value: 800 },
  { date: '2024-05', value: 700 },
  { date: '2024-06', value: 1000 }
]

export default function DashboardPage() {
  const { publicKey } = useWallet()

  return (
    <div className="container max-w-7xl mx-auto py-6 space-y-6">
      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-[#1E1B2E] border-purple-500/20">
          <div className="text-sm text-gray-400">Portfolio Value</div>
          <div className="text-2xl font-bold">$0.00</div>
          <div className="text-xs text-green-500">+0.00%</div>
        </Card>
        <Card className="p-4 bg-[#1E1B2E] border-purple-500/20">
          <div className="text-sm text-gray-400">24h Change</div>
          <div className="text-2xl font-bold text-green-500">+$0.00</div>
          <div className="text-xs text-green-500">+0.00%</div>
        </Card>
        <Card className="p-4 bg-[#1E1B2E] border-purple-500/20">
          <div className="text-sm text-gray-400">Total Assets</div>
          <div className="text-2xl font-bold">15</div>
          <div className="text-xs text-gray-400">Tokens: 10 | NFTs: 5</div>
        </Card>
        <Card className="p-4 bg-[#1E1B2E] border-purple-500/20">
          <div className="text-sm text-gray-400">SOL Balance</div>
          <div className="text-2xl font-bold">0.00 SOL</div>
          <div className="text-xs text-gray-400">≈ $0.00</div>
        </Card>
      </div>

      {/* Portfolio Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-[#1E1B2E] border-purple-500/20">
          <h2 className="text-lg font-semibold mb-4">Portfolio Performance</h2>
          <PortfolioChart data={sampleData} />
        </Card>
        
        <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
          <h2 className="text-lg font-semibold mb-4">Portfolio Breakdown</h2>
          <PortfolioOverview />
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <RecentActivity />
      </Card>
    </div>
  )
}
