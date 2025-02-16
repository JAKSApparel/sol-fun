'use client'

import { useConnection } from '@solana/wallet-adapter-react'
import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { IconAlertCircle } from '@tabler/icons-react'
import { useCluster } from '../cluster/cluster-data-access'

export function SolanaConnectionGuard({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const [isConnecting, setIsConnecting] = useState(true)

  useEffect(() => {
    let mounted = true

    async function checkConnection() {
      if (!mounted) return
      setIsConnecting(true)

      try {
        const version = await connection.getVersion()
        console.log('Connected to Solana cluster:', cluster.name, 'Version:', version)
        if (mounted) setIsConnecting(false)
      } catch (error) {
        console.error('Failed to connect to Solana cluster:', error)
        if (mounted) {
          setIsConnecting(true)
          // Retry after 2 seconds
          setTimeout(checkConnection, 2000)
        }
      }
    }

    checkConnection()

    return () => {
      mounted = false
    }
  }, [connection, cluster])

  if (isConnecting) {
    return (
      <Alert variant="default" className="max-w-xl mx-auto mt-4">
        <IconAlertCircle className="h-4 w-4" />
        <AlertTitle>Connecting...</AlertTitle>
        <AlertDescription>Establishing connection to {cluster.name}...</AlertDescription>
      </Alert>
    )
  }

  return <>{children}</>
} 