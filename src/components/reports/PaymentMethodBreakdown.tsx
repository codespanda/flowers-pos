import { Banknote, CreditCard, Gift } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { IconComponent, PaymentMethod, PaymentMethodShare } from '@/types'

interface PaymentMethodBreakdownProps {
  shares: PaymentMethodShare[]
}

const METHOD_COLOR: Record<PaymentMethod, string> = {
  card: 'bg-chart-1',
  cash: 'bg-chart-2',
  'gift-card': 'bg-chart-3',
}

const METHOD_ICON: Record<PaymentMethod, IconComponent> = {
  card: CreditCard,
  cash: Banknote,
  'gift-card': Gift,
}

export function PaymentMethodBreakdown({ shares }: PaymentMethodBreakdownProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
        {shares.map((share) => (
          <div
            key={share.method}
            className={cn(METHOD_COLOR[share.method], 'h-full first:rounded-l-full last:rounded-r-full')}
            style={{ width: `${share.percent}%` }}
            title={`${share.label}: ${share.percent}%`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {shares.map((share) => {
          const Icon = METHOD_ICON[share.method]
          return (
            <div key={share.method} className="flex items-center gap-1.5">
              <Icon className="size-3.5 shrink-0 text-muted-foreground" />
              <span className="text-foreground">{share.label}</span>
              <span className="text-muted-foreground">{share.percent}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
