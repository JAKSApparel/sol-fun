'use client'

import { Connection, PublicKey } from '@solana/web3.js'

export class MarketService {
  private connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  async getTokenPrice(tokenMint: string): Promise<number> {
    // For now, return mock prices
    // This can be expanded later to use real price feeds
    const mockPrices: { [key: string]: number } = {
      'SOL': 109.45,
      'BONK': 0.00001234,
      'JUP': 0.845,
    }
    return mockPrices[tokenMint] || 0
  }

  async getOrderbook(tokenMint: string) {
    // Mock orderbook data
    const basePrice = await this.getTokenPrice(tokenMint)
    
    const asks = Array.from({ length: 5 }).map((_, i) => ({
      price: basePrice + i * 0.1,
      amount: 10 - i,
      total: (10 - i) * (basePrice + i * 0.1)
    }))

    const bids = Array.from({ length: 5 }).map((_, i) => ({
      price: basePrice - i * 0.1,
      amount: 10 - i,
      total: (10 - i) * (basePrice - i * 0.1)
    }))

    return { asks, bids }
  }

  async get24HourChange(tokenMint: string): Promise<number> {
    // Mock 24h change data
    const mockChanges: { [key: string]: number } = {
      'SOL': 5.23,
      'BONK': -2.34,
      'JUP': 12.56,
    }
    return mockChanges[tokenMint] || 0
  }

  async getMarketStats(tokenMint: string) {
    return {
      price: await this.getTokenPrice(tokenMint),
      change24h: await this.get24HourChange(tokenMint),
      volume24h: 45678.90, // Mock volume
      marketCap: 12345678.90, // Mock market cap
      supply: 1000000000, // Mock supply
    }
  }
} 