'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Rocket } from "lucide-react"

export function TokenLaunchpad() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Launch Your Token</h2>
        <Link href="/dashboard/tokens/create">
          <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195]">
            <Plus className="w-4 h-4 mr-2" />
            Create Token
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
          <Rocket className="w-8 h-8 text-purple-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Create Token</h3>
          <p className="text-gray-400 text-sm mb-4">
            Launch your own token with custom parameters and metadata
          </p>
          <Link href="/dashboard/tokens/create">
            <Button variant="outline" className="w-full">Get Started</Button>
          </Link>
        </Card>

        <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
          <h3 className="text-lg font-semibold mb-2">My Tokens</h3>
          <p className="text-gray-400 text-sm mb-4">
            Manage and monitor your created tokens
          </p>
          <Link href="/dashboard/tokens">
            <Button variant="outline" className="w-full">View Tokens</Button>
          </Link>
        </Card>

        <Card className="p-6 bg-[#1E1B2E] border-purple-500/20">
          <h3 className="text-lg font-semibold mb-2">Token Analytics</h3>
          <p className="text-gray-400 text-sm mb-4">
            Track performance and holder statistics
          </p>
          <Button variant="outline" className="w-full">View Analytics</Button>
        </Card>
      </div>
    </div>
  )
} 