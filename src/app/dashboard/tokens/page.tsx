'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TokenListingService } from '@/lib/services/token-listing-service'
import { TokenManagementService } from '@/lib/services/token-management-service'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

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
        toast.error('Failed to load tokens')
      } finally {
        setLoading(false)
      }
    }

    fetchTokens()
  }, [publicKey, connection])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tokens</h1>
        <Link href="/dashboard/tokens/create">
          <Button>Create New Token</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : tokens.length === 0 ? (
        <Card className="bg-[#1E1B2E] border-purple-500/20">
          <CardContent className="text-center py-8">
            <p>You haven&apos;t created any tokens yet.</p>
            <Link href="/dashboard/tokens/create">
              <Button className="mt-4">
                Create Your First Token
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tokens.map((token) => (
            <Card 
              key={token.mint}
              className="bg-[#1E1B2E] border-purple-500/20"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{token.name}</span>
                  <span className="text-sm text-gray-400">{token.symbol}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Supply:</span>
                    <span>{token.supply.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Holders:</span>
                    <span>{token.holders}</span>
                  </div>
                  {token.price && (
                    <div className="flex justify-between">
                      <span>Price:</span>
                      <span>${token.price.toFixed(6)}</span>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Link href={`/token/${token.mint}`}>
                      <Button className="flex-1">View</Button>
                    </Link>
                    <Link href={`/dashboard/tokens/${token.mint}/trade`}>
                      <Button className="flex-1" variant="outline">Trade</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 