import { CreditCard, Banknote, Gift } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STRINGS } from '@/config/strings'
import type { PaymentMethod } from '@/types'

interface PaymentMethodSelectorProps {
  value: PaymentMethod
  onChange: (method: PaymentMethod) => void
}

const OPTIONS: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
  { id: 'card', label: STRINGS.payment.card, icon: CreditCard },
  { id: 'cash', label: STRINGS.payment.cash, icon: Banknote },
  { id: 'gift-card', label: STRINGS.payment.giftCard, icon: Gift },
]

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {OPTIONS.map((option) => {
        const active = option.id === value
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={active}
            className={cn(
              'flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 text-xs font-semibold transition-colors',
              active
                ? 'border-success bg-success-muted text-success'
                : 'border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground',
            )}
          >
            <option.icon className="size-5" />
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
