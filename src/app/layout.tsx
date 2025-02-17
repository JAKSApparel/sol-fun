import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {ClusterProvider} from '@/components/cluster/cluster-data-access'
import {SolanaProvider} from '@/components/solana/solana-provider'
import {UiLayout} from '@/components/ui/ui-layout'
import { SolanaConnectionGuard } from '@/components/solana/solana-connection'
import '@/lib/polyfills'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from 'react-hot-toast'
import { UmiProvider } from '@/components/umi/umi-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SolCrusher',
  description: 'Revolutionizing NFT & Token Trading on Solana',
  icons: {
    icon: '/favicon.ico',
  },
}

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Dashboard', path: '/dashboard' },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClusterProvider>
            <SolanaProvider>
              <UmiProvider>
                <SolanaConnectionGuard>
                  {children}
                </SolanaConnectionGuard>
                <Toaster position="bottom-right" />
              </UmiProvider>
            </SolanaProvider>
          </ClusterProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
