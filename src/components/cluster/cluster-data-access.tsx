'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { type Cluster, clusterApiUrl } from '@solana/web3.js'

export enum ClusterNetwork {
  Mainnet = 'mainnet-beta',
  Devnet = 'devnet',
  Testnet = 'testnet',
  Localnet = 'localnet'
}

export interface ClusterInfo {
  name: string
  endpoint: string
  network: ClusterNetwork
}

const CLUSTERS: ClusterInfo[] = [
  {
    name: 'Devnet',
    endpoint: clusterApiUrl('devnet'),
    network: ClusterNetwork.Devnet,
  },
  {
    name: 'Testnet',
    endpoint: clusterApiUrl('testnet'),
    network: ClusterNetwork.Testnet,
  },
  {
    name: 'Mainnet Beta',
    endpoint: clusterApiUrl('mainnet-beta'),
    network: ClusterNetwork.Mainnet,
  },
  {
    name: 'Localnet',
    endpoint: 'http://localhost:8899',
    network: ClusterNetwork.Localnet,
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
