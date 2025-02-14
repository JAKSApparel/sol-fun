'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Zap, Shield, BarChart3 } from 'lucide-react'
import { Button } from '../ui/button'
import { TradingInterface } from '../trading-interface'

export default function HomeFeature() {
  return (
    <div className="min-h-screen bg-[#13111C] text-white">
      {/* Hero Section with Trading Interface */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-24"
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#14F195]/10 rounded-full border border-[#14F195]/20">
                  <Image 
                    src="/sol.svg"
                    alt="Solana Logo"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span className="text-[#14F195]">Powered by Solana</span>
                </div>
                <h1 className="text-5xl font-bold space-y-2">
                  <span className="block">Trade Smarter.</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
                    Trade Safer.
                  </span>
                </h1>
                <p className="text-lg text-gray-400">
                  Advanced trading tools and real-time analytics for serious Solana traders.
                  Built for speed, security, and precision.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-[#14F195] hover:bg-[#14F195]/90 text-black">
                    Launch App
                  </Button>
                  <Button variant="outline" className="border-[#334155] text-white hover:bg-[#1E293B]">
                    Documentation
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Trading Interface */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative lg:sticky lg:top-24"
            >
              <TradingInterface />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
              Key Features
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Market Intelligence",
                description: "Advanced AI models analyze market trends, social sentiment, and historical data.",
                icon: <BarChart3 className="w-6 h-6 text-[#9945FF]" />
              },
              {
                title: "Automated Trading Strategies",
                description: "Smart bots for automated market-making, sniping, and liquidity provision.",
                icon: <Zap className="w-6 h-6 text-[#9945FF]" />
              },
              {
                title: "Rug Protection & Risk Management",
                description: "On-chain detection tools to flag suspicious projects before investing.",
                icon: <Shield className="w-6 h-6 text-[#9945FF]" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="group relative bg-[#1E1B2E] rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden"
              >
                {/* Gradient background that shows on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-20 bg-[#1E1B2E]/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9945FF] to-[#14F195]">
              Tokenomics
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { label: "Community Rewards & Staking", value: "40%" },
              { label: "Liquidity & Exchange", value: "20%" },
              { label: "Development & Treasury", value: "20%" },
              { label: "Team & Advisors", value: "10%" },
              { label: "Marketing & Partnerships", value: "10%" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#1E1B2E] rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden text-center"
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
                items: ["AI trading bot integration", "Basic analytics dashboard", "NFT & token tracking module"]
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
    </div>
  )
} 