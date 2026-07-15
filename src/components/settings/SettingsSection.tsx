import type { ReactNode } from 'react'

interface SettingsSectionProps {
  title: string
  hint?: string
  children: ReactNode
}

export function SettingsSection({ title, hint, children }: SettingsSectionProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </section>
  )
}
