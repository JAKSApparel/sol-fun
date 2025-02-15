import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {ClusterProvider} from '@/components/cluster/cluster-data-access'
import {SolanaProvider} from '@/components/solana/solana-provider'
import {UiLayout} from '@/components/ui/ui-layout'
import {ReactQueryProvider} from './react-query-provider'
import { SolanaConnectionGuard } from '@/components/solana/solana-connection'
import '@/lib/polyfills'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SolCrusher',
  description: 'Revolutionizing NFT & Token Trading on Solana',
}

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Dashboard', path: '/dashboard' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout>
                <SolanaConnectionGuard>
                  {children}
                </SolanaConnectionGuard>
              </UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
