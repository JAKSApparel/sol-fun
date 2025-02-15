"use client"

import { motion } from "framer-motion"
import { BarChart2, Wallet, Bot, Shield } from "lucide-react"
import { TradingInterface } from "@/components/trading/trading-interface"
import { CreateToken } from "@/components/token/create-token"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Trading Dashboard</h1>
        <Tabs defaultValue="trade">
          <TabsList>
            <TabsTrigger value="trade">Trade</TabsTrigger>
            <TabsTrigger value="create">Create Token</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            title: "Portfolio Value",
            value: "$12,345.67",
            change: "+5.23%",
            icon: Wallet,
            color: "text-[#14F195]",
          },
          {
            title: "24h Trading Volume",
            value: "$45,678.90",
            change: "+12.34%",
            icon: BarChart2,
            color: "text-[#9945FF]",
          },
          {
            title: "AI Trades",
            value: "24",
            change: "+8",
            icon: Bot,
            color: "text-blue-500",
          },
          {
            title: "Risk Score",
            value: "Low",
            change: "Stable",
            icon: Shield,
            color: "text-green-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#1E1B2E] p-6 rounded-lg border border-purple-500/20"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-white">{stat.value}</h3>
                <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
              </div>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="trade">
        <TabsContent value="trade">
          <TradingInterface />
        </TabsContent>
        <TabsContent value="create">
          <CreateToken />
        </TabsContent>
      </Tabs>
    </div>
  )
}
