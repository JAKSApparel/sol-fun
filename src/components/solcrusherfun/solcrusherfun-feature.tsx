'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useSolCrusherFun } from './solcrusherfun-data-access'
import { SolcrusherfunCreate, SolcrusherfunList } from './solcrusherfun-ui'

export function SolcrusherfunFeature() {
  const { program } = useSolCrusherFun()
  
  if (!program) return null

  return (
    <div>
      <AppHero
        title="SolCrusher Fun"
        subtitle="A fun game on Solana"
      >
        <p className="mb-6">
          <ExplorerLink 
            path={`account/${program.programId}`} 
            label={ellipsify(program.programId.toString())} 
          />
        </p>
        <SolcrusherfunCreate />
      </AppHero>
      <SolcrusherfunList />
    </div>
  )
}
