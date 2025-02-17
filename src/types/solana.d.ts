declare module '@solana/wallet-adapter-react' {
  import { PublicKey, Transaction, Connection } from '@solana/web3.js'

  export interface WalletContextState {
    autoConnect: boolean
    connecting: boolean
    connected: boolean
    disconnecting: boolean
    publicKey: PublicKey | null
    wallet: Wallet | null
    wallets: Wallet[]
    select(walletName: WalletName): void
    connect(): Promise<void>
    disconnect(): Promise<void>
    sendTransaction(
      transaction: Transaction,
      connection: Connection,
      options?: SendTransactionOptions
    ): Promise<string>
  }

  export function useWallet(): WalletContextState

  export function useConnection(): {
    connection: Connection
  }

  export interface SendTransactionOptions {
    signers?: Signer[]
    skipPreflight?: boolean
    preflightCommitment?: Commitment
    maxRetries?: number
  }

  export interface Wallet {
    name: WalletName
    icon: string
    publicKey: PublicKey | null
    connecting: boolean
    connected: boolean
    readyState: WalletReadyState
    adapter: WalletAdapter
  }

  export type WalletName = string
  export type WalletReadyState = 'installed' | 'loadable' | 'notDetected' | 'unsupported'

  export interface WalletAdapter {
    name: WalletName
    url: string
    icon: string
    publicKey: PublicKey | null
    connecting: boolean
    connected: boolean
    readyState: WalletReadyState
    connect(): Promise<void>
    disconnect(): Promise<void>
    sendTransaction(
      transaction: Transaction,
      connection: Connection,
      options?: SendTransactionOptions
    ): Promise<string>
  }

  export type Commitment = 
    | 'processed'
    | 'confirmed'
    | 'finalized'
    | 'recent'
    | 'single'
    | 'singleGossip'
    | 'root'
    | 'max'
} 