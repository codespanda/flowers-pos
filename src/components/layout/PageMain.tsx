import type { ReactNode } from 'react'

interface PageMainProps {
  children: ReactNode
}

export function PageMain({ children }: PageMainProps) {
  return <main className="min-w-0 flex-1 overflow-y-auto p-6">{children}</main>
}
