'use client'

import { useConnection } from '@solana/wallet-adapter-react'
import { useEffect, useState, useCallback } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { useCluster } from '../cluster/cluster-data-access'

export function SolanaConnectionGuard({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const [isConnected, setIsConnected] = useState(true)

  const checkConnection = useCallback(() => {
    try {
      await connection.getVersion()
      setIsConnected(true)
    } catch (error) {
      setIsConnected(false)
    }
  }, [connection])

  useEffect(() => {
    checkConnection()
  }, [checkConnection])

  if (!isConnected) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to connect to {cluster.name}. Please check your internet connection or try a different cluster.
        </AlertDescription>
      </Alert>
    )
  }

  return <>{children}</>
} 