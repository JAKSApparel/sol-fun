'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { type Cluster, clusterApiUrl } from '@solana/web3.js'

export type ClusterNetwork = Cluster | 'localnet'

export interface ClusterInfo {
  name: string
  endpoint: string
  network: ClusterNetwork
}

const CLUSTERS: ClusterInfo[] = [
  {
    name: 'Devnet',
    endpoint: clusterApiUrl('devnet'),
    network: 'devnet',
  },
  {
    name: 'Testnet',
    endpoint: clusterApiUrl('testnet'),
    network: 'testnet',
  },
  {
    name: 'Mainnet Beta',
    endpoint: clusterApiUrl('mainnet-beta'),
    network: 'mainnet-beta',
  },
  {
    name: 'Localnet',
    endpoint: 'http://localhost:8899',
    network: 'localnet',
  },
]

const DEFAULT_CLUSTER = CLUSTERS[0]

type ClusterContextState = {
  cluster: ClusterInfo
  setCluster: (cluster: ClusterInfo) => void
  clusters: ClusterInfo[]
}

const ClusterContext = createContext<ClusterContextState>({} as ClusterContextState)

export function ClusterProvider({ children }: { children: ReactNode }) {
  const [cluster, setCluster] = useState<ClusterInfo>(DEFAULT_CLUSTER)

  return (
    <ClusterContext.Provider
      value={{
        cluster,
        setCluster,
        clusters: CLUSTERS,
      }}
    >
      {children}
    </ClusterContext.Provider>
  )
}

export function useCluster() {
  return useContext(ClusterContext)
}
