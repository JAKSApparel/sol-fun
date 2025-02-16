'use client'

import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, BarChart } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6 pt-4">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 16V8H21V16H3Z" className="fill-current" />
            <path d="M12 12H21V16H12V12Z" className="fill-current opacity-50" />
          </svg>
          Download Report
        </button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-[#1E1B2E] border-purple-500/20">
          <TabsTrigger 
            value="overview"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="analytics"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="tokens"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white"
          >
            Tokens
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Balance"
          value="$45,231.89"
          change="+20.1%"
          period="from last month"
          icon="$"
        />
        <StatCard
          title="Active Tokens"
          value="+12"
          change="+180.1%"
          period="from last month"
          icon="🪙"
        />
        <StatCard
          title="Trading Volume"
          value="+573"
          change="+201"
          period="since last hour"
          icon="📈"
        />
        <StatCard
          title="Active Now"
          value="+573"
          change="+201"
          period="since last hour"
          icon="⚡"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-2 p-6 bg-[#1E1B2E] border-purple-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">Overview</h3>
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            <LineChart className="w-6 h-6 mr-2" />
            Chart coming soon...
          </div>
        </Card>

        <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            <TransactionItem
              type="Token Purchase"
              address="0x1234...5678"
              amount="+$1,999.00"
              initials="OM"
            />
            <TransactionItem
              type="Token Sale"
              address="0x5678...9012"
              amount="+$39.00"
              initials="JL"
            />
            <TransactionItem
              type="Token Swap"
              address="0x9012...3456"
              amount="+$299.00"
              initials="WK"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

function StatCard({ title, value, change, period, icon }: {
  title: string
  value: string
  change: string
  period: string
  icon: string
}) {
  return (
    <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-2">{value}</h3>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="mt-4">
        <span className="text-green-400">{change}</span>
        <span className="text-sm text-muted-foreground ml-1">{period}</span>
      </div>
    </Card>
  )
}

function TransactionItem({ type, address, amount, initials }: {
  type: string
  address: string
  amount: string
  initials: string
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-white">
        {initials}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{type}</p>
        <p className="text-xs text-muted-foreground">{address}</p>
      </div>
      <p className="text-sm font-medium text-white">{amount}</p>
    </div>
  )
}
