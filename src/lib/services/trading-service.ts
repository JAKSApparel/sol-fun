'use client'

import { Connection, PublicKey } from '@solana/web3.js'
import { Jupiter } from '@jup-ag/core'

export class TradingService {
  private jupiter: Jupiter | null = null
  private connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  async initialize() {
    try {
      this.jupiter = await Jupiter.load({
        connection: this.connection,
        cluster: 'mainnet-beta',
        platformFeeAndAccounts: undefined,
        routeCacheDuration: 0,
        wrapUnwrapSOL: true,
      })
    } catch (error) {
      console.error('Failed to initialize Jupiter:', error)
      throw error
    }
  }

  async getRoutes({
    inputMint,
    outputMint,
    amount,
    slippage = 1,
  }: {
    inputMint: string
    outputMint: string
    amount: number
    slippage?: number
  }) {
    if (!this.jupiter) throw new Error('Jupiter not initialized')

    try {
      const routes = await this.jupiter.computeRoutes({
        inputMint: new PublicKey(inputMint),
        outputMint: new PublicKey(outputMint),
        amount,
        slippageBps: slippage * 100,
        onlyDirectRoutes: false,
      })

      return routes.routesInfos
    } catch (error) {
      console.error('Failed to get routes:', error)
      throw error
    }
  }

  async executeSwap({
    route,
    userPublicKey,
    signTransaction,
  }: {
    route: any
    userPublicKey: PublicKey
    signTransaction: (transaction: any) => Promise<any>
  }) {
    if (!this.jupiter) throw new Error('Jupiter not initialized')

    try {
      const { transactions } = await this.jupiter.exchange({
        routeInfo: route,
        userPublicKey,
      })

      const signedTransaction = await signTransaction(transactions.swapTransaction)
      const txid = await this.connection.sendRawTransaction(
        signedTransaction.serialize()
      )

      await this.connection.confirmTransaction(txid, 'confirmed')
      return txid
    } catch (error) {
      console.error('Swap failed:', error)
      throw error
    }
  }

  async getTokenAccounts(userPublicKey: PublicKey) {
    if (!this.jupiter) throw new Error('Jupiter not initialized')
    const tokens = await this.jupiter.getDepositAndFeeForUser(userPublicKey)
    return tokens
  }

  async getQuote({
    inputMint,
    outputMint,
    amount,
  }: {
    inputMint: string
    outputMint: string
    amount: number
  }) {
    if (!this.jupiter) throw new Error('Jupiter not initialized')

    try {
      const routes = await this.getRoutes({
        inputMint,
        outputMint,
        amount,
      })

      if (routes.length === 0) throw new Error('No routes found')
      return routes[0] // Best route
    } catch (error) {
      console.error('Failed to get quote:', error)
      throw error
    }
  }
} 