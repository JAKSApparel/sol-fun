'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react'
import { getProgram } from '@/lib/anchor'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Cluster, PublicKey } from '@solana/web3.js'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

type SolCrusherFunContextType = {
  program: ReturnType<typeof getProgram>
}

const SolCrusherFunContext = createContext<SolCrusherFunContextType | null>(null)

export function SolCrusherFunProvider({ children }: { children: ReactNode }) {
  const { connection } = useConnection()
  const wallet = useAnchorWallet()
  const program = getProgram(connection, wallet)

  return (
    <SolCrusherFunContext.Provider value={{ program }}>
      {children}
    </SolCrusherFunContext.Provider>
  )
}

export function useSolCrusherFun() {
  const context = useContext(SolCrusherFunContext)
  if (!context) throw new Error('useSolCrusherFun must be used within SolCrusherFunProvider')
  return context
}

export function useSolcrusherfunProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  
  // Use your actual program ID
  const programId = new PublicKey("Your_Program_ID_Here")
  const program = getProgram(connection, provider)

  const accounts = useQuery({
    queryKey: ['solcrusherfun', 'all', { cluster }],
    queryFn: () => program?.account.solcrusherfun.all() ?? [],
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
  }
}

export function useSolcrusherfunProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program } = useSolcrusherfunProgram()

  const accountQuery = useQuery({
    queryKey: ['solcrusherfun', 'fetch', { cluster, account }],
    queryFn: () => program?.account.solcrusherfun.fetch(account),
    enabled: !!program,
  })

  return {
    accountQuery,
  }
}
