'use client'

import { useParams } from 'next/navigation'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TokenListingService } from '@/lib/services/token-listing-service'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function TokenPage() {
  const params = useParams()
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [tokenInfo, setTokenInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTokenInfo = async () => {
      if (!params.mint) return
      
      try {
        setLoading(true)
        const listingService = new TokenListingService(connection)
        const info = await listingService.getTokenInfo(params.mint as string)
        setTokenInfo(info)
      } catch (error) {
        console.error('Failed to fetch token info:', error)
        toast.error('Failed to load token information')
      } finally {
        setLoading(false)
      }
    }

    fetchTokenInfo()
  }, [params.mint, connection])

  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>
  }

  if (!tokenInfo) {
    return <div className="container mx-auto p-4">Token not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="bg-[#1E1B2E] border-purple-500/20">
        <CardHeader>
          <CardTitle>{tokenInfo.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Token Details</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span>Symbol:</span>
                  <span>{tokenInfo.symbol}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mint Address:</span>
                  <span className="font-mono">{params.mint as string}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href={`/dashboard/tokens/${params.mint}/trade`}>
                <Button>Trade</Button>
              </Link>
              <Link href="/dashboard/tokens">
                <Button variant="outline">Back to Tokens</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 