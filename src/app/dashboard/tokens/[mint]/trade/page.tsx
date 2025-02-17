'use client'

import { useParams } from 'next/navigation'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useEffect, useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TokenListingService } from '@/lib/token-listing-service'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { TradingInterface } from '@/components/trading/trading-interface'

export default function TokenTradePage() {
  const params = useParams()
  const { connection } = useConnection()
  const [tokenInfo, setTokenInfo] = useState<any>(null)

  const fetchTokenInfo = useCallback(async () => {
    if (!params.mint) return
    const listingService = new TokenListingService(
      connection,
      process.env.NEXT_PUBLIC_PROGRAM_ID as string
    )
    const info = await listingService.getTokenInfo(params.mint as string)
    setTokenInfo(info)
  }, [connection, params.mint])

  useEffect(() => {
    fetchTokenInfo()
  }, [fetchTokenInfo])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Trade {tokenInfo?.symbol || 'Token'}
        </h1>
        <Link href="/dashboard/tokens">
          <Button variant="outline">Back to Tokens</Button>
        </Link>
      </div>

      <TradingInterface initialToken={params.mint as string} />
    </div>
  )
} 