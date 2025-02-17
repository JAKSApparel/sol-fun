'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()

  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Wallet', href: '/dashboard/wallet' },
  ]

  return (
    <nav className="flex space-x-4">
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`${
            pathname === link.href ? 'text-purple-500' : 'text-gray-400'
          } hover:text-purple-500`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
} 