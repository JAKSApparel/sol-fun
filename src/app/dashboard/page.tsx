"use client"

import { motion } from "framer-motion"
import { BarChart2, Wallet, Bot, Shield, Coins, Image as ImageIcon } from "lucide-react"
import { TradingInterface } from "@/components/trading/trading-interface"
import { CreateToken } from "@/components/token/create-token"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="space-y-6 pt-4">
      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="bg-[#1E1B2E] border-purple-500/20">
          <TabsTrigger 
            value="tokens"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white"
          >
            Tokens
          </TabsTrigger>
          <TabsTrigger 
            value="nfts"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-white"
          >
            NFTs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tokens" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <Coins className="w-12 h-12 text-[#14F195]" />
                <h3 className="text-xl font-semibold">Launch New Token</h3>
                <p className="text-gray-400">Create and launch your own SPL token with custom tokenomics</p>
                <Link href="/dashboard/tokens/create">
                  <Button className="bg-[#14F195] text-black hover:bg-[#14F195]/90">
                    Create Token
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <Coins className="w-12 h-12 text-purple-500" />
                <h3 className="text-xl font-semibold">My Tokens</h3>
                <p className="text-gray-400">View and manage your created tokens</p>
                <Link href="/dashboard/tokens">
                  <Button variant="outline" className="border-purple-500/20">
                    View Tokens
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nfts" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <ImageIcon className="w-12 h-12 text-[#14F195]" />
                <h3 className="text-xl font-semibold">Create NFT Collection</h3>
                <p className="text-gray-400">Launch your own NFT collection with custom attributes</p>
                <Link href="/dashboard/nfts/create">
                  <Button className="bg-[#14F195] text-black hover:bg-[#14F195]/90">
                    Create Collection
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
              <div className="flex flex-col items-center text-center space-y-4">
                <ImageIcon className="w-12 h-12 text-purple-500" />
                <h3 className="text-xl font-semibold">My NFTs</h3>
                <p className="text-gray-400">View and manage your NFT collections</p>
                <Link href="/dashboard/nfts">
                  <Button variant="outline" className="border-purple-500/20">
                    View Collections
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
