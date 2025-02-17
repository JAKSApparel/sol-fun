'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useQuery } from '@tanstack/react-query'
import { createTokenListingService } from '@/lib/services'
import { TokenInfo } from '@/lib/token-listing-service'

export function TokenList() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const tokenService = createTokenListingService(connection)

  const { data: tokens, isLoading, error } = useQuery<TokenInfo[]>({
    queryKey: ['tokens', publicKey?.toBase58()],
    queryFn: () => tokenService.getAllUserTokens(publicKey!),
    enabled: !!publicKey,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Failed to load tokens. Please try again.
      </div>
    )
  }

  if (!tokens?.length) {
    return (
      <div className="text-center p-4 text-gray-500">
        No tokens found.
      </div>
    )
  }

  return (
    <div>
      {tokens.map(token => (
        <div key={token.mint}>
          <h3>{token.name}</h3>
          <p>Supply: {token.supply}</p>
          <p>Holders: {token.holders}</p>
        </div>
      ))}
    </div>
  )
} 