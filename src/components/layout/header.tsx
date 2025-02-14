'use client'

import React from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '../ui/button'
import { NetworkSelector } from '../solana/network-selector'
import { AirdropButton } from '../solana/airdrop-button'
import { useCluster } from '../cluster/cluster-data-access'
import { ClusterNetwork } from '../cluster/cluster-data-access'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useEffect, useState } from 'react'

export function Header() {
  const { connection } = useConnection()
  const { publicKey, signMessage } = useWallet()
  const [balance, setBalance] = useState<number | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { cluster } = useCluster()

  useEffect(() => {
    async function getBalance() {
      if (publicKey) {
        try {
          const balance = await connection.getBalance(publicKey)
          setBalance(balance / LAMPORTS_PER_SOL)
        } catch (e) {
          console.error('Error fetching balance:', e)
          setBalance(null)
        }
      }
    }

    getBalance()
    const interval = setInterval(getBalance, 30000)
    return () => clearInterval(interval)
  }, [publicKey, connection])

  const handleSignMessage = async () => {
    try {
      if (!signMessage) throw new Error('Wallet does not support message signing')
      const message = new TextEncoder().encode('Welcome to SolCrusher! Sign this message to verify your wallet.')
      await signMessage(message)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Error signing message:', error)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#1E1B2E]/80 backdrop-blur-sm border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Image 
              src="/sol.svg"
              alt="Solana Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">SolCrusher</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search tokens or paste address"
                className="w-96 bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14F195]"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
            </div>
            {publicKey && balance !== null && (
              <div className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] rounded-full border border-[#334155]">
                <Image 
                  src="/sol.svg"
                  alt="SOL"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">
                  {balance.toFixed(2)} SOL
                </span>
              </div>
            )}
            {cluster.network === ClusterNetwork.Devnet && <AirdropButton />}
            <NetworkSelector />
            {!publicKey ? (
              <WalletButton />
            ) : !isAuthenticated ? (
              <Button onClick={handleSignMessage} className="bg-[#14F195] hover:bg-[#14F195]/90 text-black">
                Verify Wallet
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  )
} 