'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TokenListingService } from '@/lib/services/token-listing-service'
import { TokenManagementService } from '@/lib/services/token-management-service'
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

type TokenInfo = {
  mint: string
  name: string
  symbol: string
  supply: number
  holders: number
  price?: number
}

export default function TokensPage() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [tokens, setTokens] = useState<TokenInfo[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (!publicKey) return

    const listingService = new TokenListingService(connection)
    const fetchTokens = async () => {
      try {
        setLoading(true)
        // Fetch user's created tokens
        const userTokens = await listingService.getUserTokens(publicKey.toString())
        setTokens(userTokens)
      } catch (error) {
        console.error('Failed to fetch tokens:', error)
        toast({
          title: "Error",
          description: "Failed to load tokens",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTokens()
  }, [publicKey, connection])

  return (
    <div className="container max-w-7xl mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Input
              placeholder="Search tokens..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <Link href="/dashboard/tokens/create">
          <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195]">
            <Plus className="w-4 h-4 mr-2" />
            Create Token
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Token cards that link to the dashboard */}
        <Link href="/dashboard/tokens/address-here">
          <Card className="p-4 bg-[#1E1B2E] border-purple-500/20 hover:border-purple-500/40 transition-colors">
            {/* Token card content */}
          </Card>
        </Link>
      </div>
    </div>
  )
} 