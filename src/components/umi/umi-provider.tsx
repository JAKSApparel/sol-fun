'use client'

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { createSignerFromWalletAdapter } from '@metaplex-foundation/umi-signer-wallet-adapters'
import { createContext, useContext, ReactNode, useMemo } from 'react'
import { mplToolbox } from '@metaplex-foundation/mpl-toolbox'
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters'

const UmiContext = createContext<ReturnType<typeof createUmi> | null>(null)

export function UmiProvider({ children }: { children: ReactNode }) {
  const { connection } = useConnection()
  const wallet = useWallet()

  const umi = useMemo(() => {
    const umi = createUmi(connection.rpcEndpoint)
      .use(mplTokenMetadata())
      .use(mplToolbox())

    if (wallet.connected && wallet.wallet) {
      return umi.use(walletAdapterIdentity(wallet))
    }
    
    return umi
  }, [connection.rpcEndpoint, wallet])

  return (
    <UmiContext.Provider value={umi}>
      {children}
    </UmiContext.Provider>
  )
}

export const useUmi = () => {
  const context = useContext(UmiContext)
  if (!context) throw new Error('useUmi must be used within a UmiProvider')
  return context
} 