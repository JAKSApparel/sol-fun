'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { createContext, useContext, ReactNode } from 'react'

const UmiContext = createContext<null>(null)

export function UmiProvider({ children }: { children: ReactNode }) {
  return (
    <UmiContext.Provider value={null}>
      {children}
    </UmiContext.Provider>
  )
}

export function useUmi() {
  return useContext(UmiContext)
} 