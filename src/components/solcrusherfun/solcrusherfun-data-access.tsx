'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { useConnection, useAnchorWallet } from '@solana/wallet-adapter-react'
import { getProgram } from '@/lib/anchor'
import { getSolcrusherfunProgram, getSolcrusherfunProgramId } from '@project/anchor'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

const SolCrusherFunContext = createContext<any>(null)

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
  const programId = useMemo(() => getSolcrusherfunProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getSolcrusherfunProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['solcrusherfun', 'all', { cluster }],
    queryFn: () => program.account.solcrusherfun.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['solcrusherfun', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ solcrusherfun: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useSolcrusherfunProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useSolcrusherfunProgram()

  const accountQuery = useQuery({
    queryKey: ['solcrusherfun', 'fetch', { cluster, account }],
    queryFn: () => program.account.solcrusherfun.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['solcrusherfun', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ solcrusherfun: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['solcrusherfun', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ solcrusherfun: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['solcrusherfun', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ solcrusherfun: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['solcrusherfun', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ solcrusherfun: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
