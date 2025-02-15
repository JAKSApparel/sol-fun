'use client'

import { Connection, PublicKey } from '@solana/web3.js'
import axios from 'axios'

const JUPITER_API_BASE = 'https://quote-api.jup.ag/v6'

export class JupiterApiService {
  private connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  async getQuote({
    inputMint,
    outputMint,
    amount,
    slippageBps = 100, // 1%
  }: {
    inputMint: string
    outputMint: string
    amount: number
    slippageBps?: number
  }) {
    try {
      const response = await axios.get(`${JUPITER_API_BASE}/quote`, {
        params: {
          inputMint,
          outputMint,
          amount,
          slippageBps,
          onlyDirectRoutes: false,
        },
      })
      return response.data
    } catch (error) {
      console.error('Failed to get quote:', error)
      throw error
    }
  }

  async getSwap({
    route,
    userPublicKey,
  }: {
    route: any
    userPublicKey: string
  }) {
    try {
      const response = await axios.post(`${JUPITER_API_BASE}/swap`, {
        route,
        userPublicKey,
      })
      return response.data
    } catch (error) {
      console.error('Failed to get swap:', error)
      throw error
    }
  }

  async executeSwap({
    swapTransaction,
    signTransaction,
  }: {
    swapTransaction: any
    signTransaction: (transaction: any) => Promise<any>
  }) {
    try {
      const signedTx = await signTransaction(swapTransaction)
      const txid = await this.connection.sendRawTransaction(
        signedTx.serialize()
      )
      await this.connection.confirmTransaction(txid, 'confirmed')
      return txid
    } catch (error) {
      console.error('Swap failed:', error)
      throw error
    }
  }

  async getTokenList() {
    try {
      const response = await axios.get('https://token.jup.ag/all')
      return response.data
    } catch (error) {
      console.error('Failed to get token list:', error)
      throw error
    }
  }
} 