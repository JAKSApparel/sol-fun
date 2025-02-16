'use client'

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { ReactNode, useMemo } from 'react'
import { useCluster } from '../cluster/cluster-data-access'

require('@solana/wallet-adapter-react-ui/styles.css')

export function SolanaProvider({ children }: { children: ReactNode }) {
  const { cluster } = useCluster()

  // Initialize wallet adapters
  const wallets = useMemo(() => 
    [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={cluster.endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export { WalletButton } from './wallet-button'
