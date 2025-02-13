'use client'

import { useConnection } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { useCluster } from '../cluster/cluster-data-access'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { IconAlertCircle } from '@tabler/icons-react'

export function SolanaConnectionGuard({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkConnection() {
      try {
        const version = await connection.getVersion()
        console.log('Connected to Solana cluster:', cluster.name, 'Version:', version)
        setIsConnected(true)
        setError(null)
      } catch (err) {
        console.error('Failed to connect to Solana cluster:', err)
        setIsConnected(false)
        setError('Failed to connect to Solana network. Please check your internet connection or try a different cluster.')
      }
    }

    checkConnection()
    // Set up periodic connection checks
    const interval = setInterval(checkConnection, 10000)

    return () => clearInterval(interval)
  }, [connection, cluster])

  if (error) {
    return (
      <Alert variant="destructive">
        <IconAlertCircle className="h-4 w-4" />
        <AlertTitle>Connection Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!isConnected) {
    return (
      <Alert>
        <IconAlertCircle className="h-4 w-4" />
        <AlertTitle>Connecting...</AlertTitle>
        <AlertDescription>Establishing connection to Solana {cluster.name}...</AlertDescription>
      </Alert>
    )
  }

  return children
} 