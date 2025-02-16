'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Zap, Shield, BarChart3, Copy, Construction, X } from 'lucide-react'
import { Button } from '../ui/button'
import { TradingInterface } from '../trading/trading-interface'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

// Add this component for the blurred token address
function ComingSoonToken() {
  return (
    <div className="relative group">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#1E1B2E] rounded-lg border border-purple-500/20">
        <div className="blur-sm select-none font-mono">
          {/* This will be your actual token address later */}
          Coming Soon...
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-50 cursor-not-allowed"
          disabled
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm text-purple-400">Coming Soon</span>
      </div>
    </div>
  )
}

// Add this section after your existing sections
function TokenomicsSection() {
  return (
    <section className="py-20 bg-[#1E1B2E]/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
            $CRUSH Token
          </span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">The Future of Trading</h3>
            <p className="text-gray-400 leading-relaxed">
              $CRUSH is not just another token - it&apos;s the backbone of our ecosystem, 
              powering advanced trading features, governance, and rewards for our community.
            </p>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-[#9945FF]">Token Utilities</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9945FF]" />
                  <span>Premium access to AI-driven analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9945FF]" />
                  <span>Governance voting rights</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9945FF]" />
                  <span>Trading fee discounts</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#9945FF]" />
                  <span>Staking rewards and profit sharing</span>
                </li>
              </ul>
            </div>
            <ComingSoonToken />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Community Rewards & Staking", value: "40%" },
              { label: "Liquidity & Exchange", value: "20%" },
              { label: "Development & Treasury", value: "20%" },
              { label: "Team & Advisors (24-month vest)", value: "10%" },
              { label: "Marketing & Partnerships", value: "10%" },
              { label: "Total Supply", value: "100M" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative col-span-1 bg-[#1E1B2E] rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-2xl font-bold text-[#9945FF] mb-2">{item.value}</div>
                  <div className="text-sm text-gray-400">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Token Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-[#1E1B2E] rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-lg font-semibold mb-2">Staking APY</h4>
            <p className="text-[#9945FF] font-bold">Up to 25%</p>
          </div>
          <div className="bg-[#1E1B2E] rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-lg font-semibold mb-2">Launch Date</h4>
            <p className="text-[#9945FF] font-bold">Q2 2025</p>
          </div>
          <div className="bg-[#1E1B2E] rounded-lg p-6 border border-purple-500/20">
            <h4 className="text-lg font-semibold mb-2">Token Type</h4>
            <p className="text-[#9945FF] font-bold">SPL Token</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Add this component
function DevelopmentNotice() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already acknowledged
    const hasAcknowledged = localStorage.getItem('developmentNoticeAcknowledged')
    if (!hasAcknowledged) {
      setIsVisible(true)
    }
  }, [])

  const handleAcknowledge = () => {
    localStorage.setItem('developmentNoticeAcknowledged', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1E1B2E] border-t border-purple-500/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Construction className="w-5 h-5 text-[#9945FF] animate-pulse" />
            <div className="text-sm">
              <span className="font-semibold text-[#9945FF]">Development in Progress:</span>
              {" "}We&apos;re building in public! Join our community to be part of the journey and shape the future of SolCrusher.
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="https://t.me/solcrusher" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-[#9945FF] hover:text-[#9945FF]/80 transition-colors"
            >
              Join Community
            </Link>
            <Button
              onClick={handleAcknowledge}
              className="bg-[#9945FF] hover:bg-[#9945FF]/90 text-white"
            >
              I Understand
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomeFeature() {
  return (
    <div className="min-h-screen bg-[#13111C] pt-16">
      {/* Hero Section */}
      <section className="relative">
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
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Execute trades instantly with our optimized trading engine',
              },
              {
                icon: Shield,
                title: 'Secure Trading',
                description: 'Advanced security measures to protect your assets',
              },
              {
                icon: BarChart3,
                title: 'Real-time Analytics',
                description: 'Make informed decisions with live market data',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-lg bg-[#1E1B2E] border border-purple-500/20"
              >
                <feature.icon className="w-12 h-12 text-[#14F195] mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TokenomicsSection />

      {/* Add this section before the Key Features */}
      <section className="py-20 bg-[#1E1B2E]/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-lg border border-[#9945FF]/20 p-8 bg-[#1E1B2E]">
            <h2 className="text-2xl font-bold mb-6 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                Building Together
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Open Development",
                  description: "We believe in transparency. Watch our progress, provide feedback, and help shape the future of SolCrusher.",
                },
                {
                  title: "Community First",
                  description: "Your input matters. Join our community channels to participate in key decisions and feature prioritization.",
                },
                {
                  title: "Regular Updates",
                  description: "Follow our development journey with weekly updates, test new features, and be the first to know about launches.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <h3 className="text-lg font-semibold text-[#9945FF]">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="https://t.me/solcrusher" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10">
                  Join Community
                </Button>
              </Link>
              <Link href="https://github.com/yourusername/solcrusher" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF]/10">
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
              Roadmap
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                phase: "Phase 1: MVP Development",
                date: "Q2 2025",
                items: ["Token Launch", "Basic analytics dashboard", "NFT & token tracking module"]
              },
              {
                phase: "Phase 2: Feature Expansion",
                date: "Q3 2025",
                items: ["Advanced AI models", "Mobile app release", "Partnerships with Solana DeFi projects"]
              },
              {
                phase: "Phase 3: Full Platform Rollout",
                date: "Q4 2025",
                items: ["Governance model", "Social sentiment analysis", "Staking and token rewards"]
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-[#1E1B2E] rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-[#9945FF] font-bold mb-1">{phase.date}</div>
                  <h3 className="text-xl font-bold mb-4">{phase.phase}</h3>
                  <ul className="space-y-2">
                    {phase.items.map((item, i) => (
                      <li key={i} className="text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#9945FF]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DevelopmentNotice />
    </div>
  )
} 