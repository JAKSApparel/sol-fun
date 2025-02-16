'use client'

import { MarketingHeader } from '@/components/marketing/marketing-header'
import { Button } from '@/components/ui/button'
import { TradingInterface } from '@/components/trading/trading-interface'
import { Copy, Zap, Bot, Shield, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

const CONTRACT_ADDRESS = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // Contract address placeholder

export default function HomePage() {
  const copyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS)
    toast.success('Contract address copied!')
  }

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
                <span className="text-sm text-white">Powered by Solana</span>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
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
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-purple-500/20 text-white"
                  onClick={copyAddress}
                >
                  <Copy className="mr-2 h-4 w-4" />
                  {CONTRACT_ADDRESS}
                </Button>
              </div>
            </div>

            {/* Right side - Trading Interface */}
            <div className="lg:w-1/2">
              <TradingInterface />
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <section className="py-24 bg-[#1E1B2E]/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-4">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <FeatureCard
              icon={BarChart2}
              title="AI-Powered Market Intelligence"
              description="Advanced AI models analyze market trends, social sentiment, and historical data."
            />
            <FeatureCard
              icon={Bot}
              title="Automated Trading Strategies"
              description="Smart bots for automated market-making, sniping, and liquidity provision."
            />
            <FeatureCard
              icon={Shield}
              title="Rug Protection & Risk Management"
              description="On-chain detection tools to flag suspicious projects before investing."
            />
          </div>
        </div>
      </section>

      {/* Token Info Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">$CRUSH Token</h2>
              <p className="text-xl text-gray-400 mb-8">
                $CRUSH is not just another token - it&apos;s the backbone of our ecosystem, powering
                advanced trading features, governance, and rewards for our community.
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Token Utilities</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#14F195]" />
                    Premium access to AI-driven analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#14F195]" />
                    Governance voting rights
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#14F195]" />
                    Trading fee discounts
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#14F195]" />
                    Staking rewards and profit sharing
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <TokenInfoCard title="Community Rewards & Staking" value="40%" />
              <TokenInfoCard title="Liquidity & Exchange" value="20%" />
              <TokenInfoCard title="Development & Treasury" value="20%" />
              <TokenInfoCard title="Team & Advisors" value="10%" />
              <TokenInfoCard title="Marketing & Partnerships" value="10%" />
              <TokenInfoCard title="Total Supply" value="100M" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <InfoCard title="Staking APY" value="Up to 25%" />
            <InfoCard title="Launch Date" value="Q2 2025" />
            <InfoCard title="Token Type" value="SPL Token" />
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 bg-[#1E1B2E]/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Roadmap</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <RoadmapCard
              phase="Phase 1: MVP Development"
              date="Q2 2025"
              items={[
                "Launch token on pump.fun",
                "Basic analytics dashboard",
                "NFT & token tracking module"
              ]}
            />
            <RoadmapCard
              phase="Phase 2: Feature Expansion"
              date="Q3 2025"
              items={[
                "Advanced AI models",
                "Mobile app release",
                "Partnerships with Solana DeFi projects"
              ]}
            />
            <RoadmapCard
              phase="Phase 3: Full Platform Rollout"
              date="Q4 2025"
              items={[
                "Governance model",
                "Social sentiment analysis",
                "Staking and token rewards"
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-6 bg-[#1E1B2E] rounded-xl border border-purple-500/20">
      <Icon className="w-12 h-12 text-[#14F195] mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function TokenInfoCard({ title, value }: { title: string, value: string }) {
  return (
    <div className="p-6 bg-[#1E1B2E] rounded-xl border border-purple-500/20">
      <div className="text-sm text-gray-400">{title}</div>
      <div className="text-2xl font-bold text-white mt-1">{value}</div>
    </div>
  )
}

function InfoCard({ title, value }: { title: string, value: string }) {
  return (
    <div className="p-6 bg-[#1E1B2E] rounded-xl border border-purple-500/20">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-[#14F195] text-lg">{value}</p>
    </div>
  )
}

function RoadmapCard({ phase, date, items }: { phase: string, date: string, items: string[] }) {
  return (
    <div className="p-6 bg-[#1E1B2E] rounded-xl border border-purple-500/20">
      <div className="text-sm text-[#14F195] mb-2">{date}</div>
      <h3 className="text-xl font-semibold text-white mb-4">{phase}</h3>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-gray-400">
            <Zap className="w-4 h-4 text-[#14F195] mt-1 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
