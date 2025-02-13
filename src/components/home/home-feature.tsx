'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useState, useRef, useEffect } from 'react'
import { WalletButton } from '../solana/solana-provider'
import { Button } from '../ui/button'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Heart, Sparkles, Lock, Key, Rocket } from 'lucide-react'

export default function HomeFeature() {
  const { publicKey, signMessage } = useWallet()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
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
      icon: <Heart className="w-12 h-12 text-pink-500" />,
    },
    {
      title: "Then came a spark...",
      content: "SolCrusher emerged, bringing AI-powered intelligence to the Solana ecosystem.",
      icon: <Sparkles className="w-12 h-12 text-yellow-500" />,
    },
    {
      title: "A promise of protection...",
      content: "No more heartbreaks from rug pulls. We keep your investments safe and sound.",
      icon: <Lock className="w-12 h-12 text-purple-500" />,
    },
    {
      title: "The perfect match...",
      content: "Advanced analytics meet user-friendly design, creating harmony in trading.",
      icon: <Key className="w-12 h-12 text-blue-500" />,
    },
    {
      title: "To the moon together...",
      content: "Join us on this journey to revolutionize Solana trading forever.",
      icon: <Rocket className="w-12 h-12 text-red-500" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-300">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="hero min-h-screen relative overflow-hidden"
      >
        <div className="hero-content text-center z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <Heart className="w-24 h-24 mx-auto text-pink-500 mb-8" />
            </motion.div>
            <motion.h1 
              className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Love at First Trade
            </motion.h1>
            <motion.p 
              className="text-xl mb-8"
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
            >
              {!publicKey ? (
                <WalletButton />
              ) : !isAuthenticated ? (
                <Button onClick={handleSignMessage} className="bg-pink-500 hover:bg-pink-600">
                  Sign Message to Begin Your Journey
                </Button>
              ) : (
                <Button href="/dashboard" className="bg-purple-500 hover:bg-purple-600">
                  Enter Your Trading Paradise
                </Button>
              )}
            </motion.div>
          </div>
        </div>
        
        {/* Floating hearts background */}
        <FloatingHearts />
      </motion.div>

      {/* Scrolling Story Sections */}
      <div className="py-20">
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

      {/* Final CTA Section */}
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 px-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Your Trading Fairytale Begins</h2>
            <Button href="/dashboard" size="lg" className="bg-pink-500 hover:bg-pink-600">
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
      className={`max-w-4xl mx-auto p-8 mb-20 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className={`flex items-center gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg opacity-80">{content}</p>
        </div>
      </div>
    </motion.div>
  )
}

function FloatingHearts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
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
          <Heart className="w-4 h-4 text-pink-500 opacity-30" />
        </motion.div>
      ))}
    </div>
  )
} 