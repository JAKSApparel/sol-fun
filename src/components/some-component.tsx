'use client'

import { ReactNode } from 'react'

type SomeComponentProps = {
  children?: ReactNode
}

export function SomeComponent({ children }: SomeComponentProps) {
  return (
    <div className="p-4">
      {children}
    </div>
  )
}

export default SomeComponent 