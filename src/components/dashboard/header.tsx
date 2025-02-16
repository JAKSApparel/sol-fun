'use client'

import { WalletButton } from '../solana/solana-provider'
import { NetworkSelector } from '../solana/network-selector'
import { AirdropButton } from '../solana/airdrop-button'
import { useCluster } from '../cluster/cluster-data-access'
import { ClusterNetwork } from '../cluster/cluster-data-access'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export function Header() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const { cluster } = useCluster()

  useEffect(() => {
    if (!publicKey) return
    
    const getBalance = async () => {
      try {
        const balance = await connection.getBalance(publicKey)
        setBalance(balance / LAMPORTS_PER_SOL)
      } catch (e) {
        console.error('Error fetching balance:', e)
        setBalance(null)
      }
    }

    getBalance()
    const interval = setInterval(getBalance, 10000)
    return () => clearInterval(interval)
  }, [publicKey, connection])

  return (
    <header className="border-b border-purple-500/20 h-16 px-6 flex items-center justify-end bg-[#13111C]/95 backdrop-blur supports-[backdrop-filter]:bg-[#13111C]/60">
      <div className="flex items-center gap-4">
        {balance !== null && (
          <div className="hidden sm:flex items-center gap-2 text-white">
            <Image 
              src="/sol.svg" 
              alt="SOL" 
              width={16} 
              height={16} 
              className="w-4 h-4"
            />
            <span>{balance.toFixed(2)} SOL</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          {cluster.network === ClusterNetwork.Devnet && <AirdropButton />}
          <NetworkSelector />
          <WalletButton />
        </div>
      </div>
    </header>
  )
} 