'use client'

import { Connection, PublicKey } from '@solana/web3.js'
import { Market } from '@project-serum/serum'

export class MarketService {
  private connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  async getOrderbook(marketAddress: string) {
    try {
      const market = await Market.load(
        this.connection,
        new PublicKey(marketAddress),
        {},
        new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin') // Serum program ID
      )

      const [bids, asks] = await Promise.all([
        market.loadBids(this.connection),
        market.loadAsks(this.connection),
      ])

      return {
        bids: bids.getL2(20),
        asks: asks.getL2(20),
      }
    } catch (error) {
      console.error('Failed to get orderbook:', error)
      throw error
    }
  }

  async getMarketPrice(marketAddress: string) {
    const { bids, asks } = await this.getOrderbook(marketAddress)
    if (bids.length === 0 || asks.length === 0) return null

    const bestBid = bids[0][0]
    const bestAsk = asks[0][0]
    return (bestBid + bestAsk) / 2
  }
} 