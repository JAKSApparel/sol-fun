'use client'

import { useParams } from 'next/navigation'
// ... other imports

export default function TokenPage() {
  const params = useParams()
  const mintAddress = params.mint // Changed from params.address
  // ... rest of the component
} 