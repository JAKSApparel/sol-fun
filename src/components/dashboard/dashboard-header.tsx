'use client'

import React from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Search } from 'lucide-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useState, useEffect } from 'react'
import { NetworkSelector } from '../solana/network-selector'
import { useCluster } from '../cluster/cluster-data-access'

export function DashboardHeader() {
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
    const interval = setInterval(getBalance, 30000)
    return () => clearInterval(interval)
  }, [publicKey, connection])

  return (
    <div className="fixed top-0 right-0 left-0 z-30 border-b border-purple-500/20 bg-[#1E1B2E]/80 backdrop-blur-sm lg:left-64">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search tokens or paste address"
              className="w-full bg-[#0F172A] border border-[#334155] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14F195]"
            />
            <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-4">
          {balance !== null && (
            <Button variant="ghost" className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] rounded-full border border-[#334155]">
              <Image 
                src="/sol.svg"
                alt="SOL"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span className="font-medium">{balance.toFixed(2)} SOL</span>
            </Button>
          )}
          <NetworkSelector />
          <WalletButton />
        </div>
      </div>
    </div>
  )
} 