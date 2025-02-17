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

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading tokens</div>
  if (!tokens) return <div>No tokens found</div>

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