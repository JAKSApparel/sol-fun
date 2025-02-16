'use client'

import { MarketingHeader } from '@/components/marketing/marketing-header'
import { Button } from '@/components/ui/button'
import { TradingInterface } from '@/components/trading/trading-interface'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#13111C]">
      <MarketingHeader />
      
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Left side - Hero content */}
            <div className="lg:w-1/2 lg:pt-12">
              <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-full bg-[#1E1B2E] border border-purple-500/20">
                <span className="w-2 h-2 rounded-full bg-[#14F195]"></span>
                <span className="text-sm">Powered by Solana</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
                Trade Smarter.
                <br />
                <span className="text-purple-500">Trade Safer.</span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8">
                Advanced trading tools and real-time analytics for serious Solana traders.
                Built for speed, security, and precision.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard">
                  <Button 
                    size="lg" 
                    className="bg-[#14F195] text-black hover:bg-[#14F195]/90"
                  >
                    Launch App
                  </Button>
                </Link>
                <Link href="/dashboard/tokens/create">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-purple-500/20"
                  >
                    Create Token
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right side - Trading Interface */}
            <div className="lg:w-1/2">
              <TradingInterface />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
