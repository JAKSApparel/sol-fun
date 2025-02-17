import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {ClusterProvider} from '@/components/cluster/cluster-data-access'
import {SolanaProvider} from '@/components/solana/solana-provider'
import {UiLayout} from '@/components/ui/ui-layout'
import { SolanaConnectionGuard } from '@/components/solana/solana-connection'
import '@/lib/polyfills'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { UmiProvider } from '@/components/umi/umi-provider'
import { ErrorBoundary } from '@/components/error-boundary'

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
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <ClusterProvider>
              <SolanaProvider>
                <UmiProvider>
                  <SolanaConnectionGuard>
                    <UiLayout>{children}</UiLayout>
                  </SolanaConnectionGuard>
                </UmiProvider>
              </SolanaProvider>
            </ClusterProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  )
}
