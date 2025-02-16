'use client'

import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function MarketingHeader() {
  const { publicKey } = useWallet()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-purple-500/20 bg-[#1E1B2E]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={32} 
              height={32}
              className="w-8 h-8"
            />
            <span className="text-xl font-bold">SolCrusher</span>
          </Link>

          <div className="flex items-center gap-4">
            {publicKey && (
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
            )}
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  )
} 