import type { ReactNode } from 'react'
import { Flower2 } from 'lucide-react'
import { APP_CONFIG } from '@/config/app'
import { STRINGS } from '@/config/strings'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="mb-3 flex size-12 items-center justify-center rounded-full bg-brand-muted text-brand">
            <Flower2 className="size-6" />
          </span>
          <p className="text-lg font-semibold text-foreground">{APP_CONFIG.storeName}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{STRINGS.authLayout.tagline}</p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-5">
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>

        {footer && <div className="mt-5 text-center text-sm">{footer}</div>}
      </div>
    </div>
  )
}
