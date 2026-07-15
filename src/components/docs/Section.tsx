import type { ReactNode } from 'react'

export function Section({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border pt-12 first:border-t-0 first:pt-0">
      {children}
    </section>
  )
}
