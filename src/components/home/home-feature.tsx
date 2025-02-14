'use client'

import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState, useRef, useEffect } from 'react'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '../ui/button'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Heart, Sparkles, Lock, Key, Rocket } from 'lucide-react'
import { NetworkSelector } from '../solana/network-selector'
import { AirdropButton } from '../solana/airdrop-button'
import { useCluster } from '../cluster/cluster-data-access'
import { ClusterNetwork } from '../cluster/cluster-data-access'

export default function HomeFeature() {
  const { publicKey, signMessage } = useWallet()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { cluster } = useCluster()
  
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

  // Story sections with refs for scroll animations
  const sections = [
    {
      title: "Once upon a time...",
      content: "In the vast universe of blockchain, traders searched endlessly for their perfect match.",
      icon: <Heart className="w-full h-full text-pink-500" />,
    },
    {
      title: "Then came a spark...",
      content: "SolCrusher emerged, bringing AI-powered intelligence to the Solana ecosystem.",
      icon: <Sparkles className="w-full h-full text-yellow-500" />,
    },
    {
      title: "A promise of protection...",
      content: "No more heartbreaks from rug pulls. We keep your investments safe and sound.",
      icon: <Lock className="w-full h-full text-purple-500" />,
    },
    {
      title: "The perfect match...",
      content: "Advanced analytics meet user-friendly design, creating harmony in trading.",
      icon: <Key className="w-full h-full text-blue-500" />,
    },
    {
      title: "To the moon together...",
      content: "Join us on this journey to revolutionize Solana trading forever.",
      icon: <Rocket className="w-full h-full text-red-500" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-300">
      <div className="absolute top-4 right-4 z-50">
        <NetworkSelector />
      </div>

      {cluster.network === ClusterNetwork.Devnet && (
        <div className="absolute top-4 right-40 z-50">
          <AirdropButton />
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="w-full min-h-screen relative overflow-hidden flex items-center justify-center px-4"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <Heart className="w-32 h-32 mx-auto text-pink-500 mb-12" />
            </motion.div>
            <motion.h1 
              className="text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Love at First Trade
            </motion.h1>
            <motion.p 
              className="text-2xl mb-12 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              This Valentine's Day, fall in love with trading all over again
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2 }}
              className="space-x-4"
            >
              {!publicKey ? (
                <WalletButton />
              ) : !isAuthenticated ? (
                <Button onClick={handleSignMessage} className="bg-pink-500 hover:bg-pink-600 text-lg px-8 py-6">
                  Sign Message to Begin Your Journey
                </Button>
              ) : (
                <Button href="/dashboard" className="bg-purple-500 hover:bg-purple-600 text-lg px-8 py-6">
                  Enter Your Trading Paradise
                </Button>
              )}
            </motion.div>
          </div>
        </div>
        
        <FloatingHearts />
      </motion.div>

      <div className="w-full py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {sections.map((section, index) => (
            <ScrollSection
              key={index}
              index={index}
              title={section.title}
              content={section.content}
              icon={section.icon}
            />
          ))}
        </div>
      </div>

      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full py-32 px-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8">Your Trading Fairytale Begins</h2>
            <Button href="/dashboard" size="lg" className="bg-pink-500 hover:bg-pink-600 text-lg px-8 py-6">
              Start Your Journey
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function ScrollSection({ title, content, icon, index }: {
  title: string
  content: string
  icon: React.ReactNode
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={`w-full mb-40 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className={`flex items-center gap-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="flex-shrink-0">
          <div className="w-20 h-20">
            {icon}
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6">{title}</h2>
          <p className="text-xl opacity-80">{content}</p>
        </div>
      </div>
    </motion.div>
  )
}

function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            scale: 0,
          }}
          animate={{
            y: [null, -1000],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          <Heart className={`w-${Math.floor(Math.random() * 3) + 4} h-${Math.floor(Math.random() * 3) + 4} text-pink-500 opacity-${Math.floor(Math.random() * 3) + 2}0`} />
        </motion.div>
      ))}
    </div>
  )
} 