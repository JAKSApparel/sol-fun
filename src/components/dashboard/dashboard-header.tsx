'use client'

import React from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from 'next/image'
import { Menu, Search } from 'lucide-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useState, useEffect } from 'react'
import { NetworkSelector } from '../solana/network-selector'
import { useCluster } from '../cluster/cluster-data-access'
import { ThemeToggle } from "@/components/theme-toggle"

function DesktopHeader({ balance }: { balance: number | null }) {
  return (
    <div className="hidden lg:flex h-16 items-center justify-between px-4">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search tokens or paste address"
            className="w-full bg-background/50 border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-4">
        <ThemeToggle />
        <NetworkSelector />
        {balance !== null && (
          <Button variant="ghost" className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-full border border-border">
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
        <WalletButton />
      </div>
    </div>
  )
}

function MobileHeader({ balance }: { balance: number | null }) {
  return (
    <div className="lg:hidden flex h-16 items-center justify-end px-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-[#1E1B2E]">
            <Menu className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 mt-2 p-4" align="end">
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search tokens or paste address"
                className="w-full bg-background border border-input rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14F195]"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-muted-foreground" />
            </div>

            {balance !== null && (
              <Button variant="ghost" className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-background rounded-full border border-input">
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

            <div className="flex items-center justify-between px-2">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>

            <div className="px-2">
              <span className="text-sm font-medium mb-2 block">Network</span>
              <NetworkSelector />
            </div>

            <div className="px-2">
              <span className="text-sm font-medium mb-2 block">Wallet</span>
              <WalletButton />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

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
    <div className="fixed top-0 right-0 left-0 z-30 border-b border-purple-500/20 bg-[#0F0D1B]/80 backdrop-blur-sm lg:left-64">
      <DesktopHeader balance={balance} />
      <MobileHeader balance={balance} />
    </div>
  )
} 