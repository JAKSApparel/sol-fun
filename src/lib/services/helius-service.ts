'use client'

import { Connection, PublicKey } from '@solana/web3.js'

export class HeliusService {
  private apiKey: string
  private baseUrl: string

  constructor(apiKey: string, network: 'mainnet' | 'devnet' = 'mainnet') {
    this.apiKey = apiKey
    this.baseUrl = `https://${network}.helius-rpc.com`
  }

  // Get enhanced transaction history
  async getEnhancedTransactionHistory(address: string) {
    const response = await fetch(`${this.baseUrl}/v0/addresses/${address}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.apiKey,
      }),
    })
    return await response.json()
  }

  // Get real-time price updates
  async getTokenPrices(mintAddresses: string[]) {
    const response = await fetch(`${this.baseUrl}/v0/token-metadata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.apiKey,
        mintAccounts: mintAddresses,
      }),
    })
    return await response.json()
  }

  // Get NFT events
  async getNFTEvents(mintAddress: string) {
    const response = await fetch(`${this.baseUrl}/v1/nft-events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.apiKey,
        query: {
          nftMint: mintAddress,
        },
      }),
    })
    return await response.json()
  }

  // Get DAS API data
  async getDigitalAssetsByOwner(ownerAddress: string) {
    const response = await fetch(`${this.baseUrl}/v0/addresses/${ownerAddress}/assets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.apiKey,
      }),
    })
    return await response.json()
  }

  // Webhook management (if needed)
  async createWebhook(webhookUrl: string, accountAddresses: string[]) {
    const response = await fetch(`${this.baseUrl}/v0/webhooks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: this.apiKey,
        webhook_url: webhookUrl,
        account_addresses: accountAddresses,
      }),
    })
    return await response.json()
  }
} 