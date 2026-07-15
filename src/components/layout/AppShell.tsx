import type { ReactNode } from 'react'

interface AppShellProps {
  header: ReactNode
  sidebar: ReactNode
  children: ReactNode
}

export function AppShell({ header, sidebar, children }: AppShellProps) {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {header}
      <div className="flex min-h-0 flex-1">
        {sidebar}
        {children}
      </div>
    </div>
  )
}
