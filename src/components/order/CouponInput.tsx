import { useState } from 'react'
import { Tag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { STRINGS } from '@/config/strings'
import { formatCouponValue } from '@/lib/format'
import type { Coupon } from '@/types'

interface CouponInputProps {
  appliedCoupon: Coupon | null
  onApply: (code: string) => void
  onRemove: () => void
}

export function CouponInput({ appliedCoupon, onApply, onRemove }: CouponInputProps) {
  const [code, setCode] = useState('')

  function handleApply() {
    if (code.trim() === '') return
    onApply(code)
    setCode('')
  }

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between gap-2 rounded-lg bg-success-muted px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <Tag className="size-4 shrink-0 text-success" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-success">{appliedCoupon.code}</p>
            <p className="truncate text-xs text-success/80">
              {formatCouponValue(appliedCoupon.discountType, appliedCoupon.value)}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={STRINGS.couponInput.remove}
          title={STRINGS.couponInput.remove}
          className="flex size-6 shrink-0 items-center justify-center rounded-full text-success transition-colors hover:bg-success/15"
        >
          <X className="size-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative min-w-0 flex-1">
        <Tag className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              handleApply()
            }
          }}
          placeholder={STRINGS.couponInput.placeholder}
          aria-label={STRINGS.couponInput.label}
          className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 font-mono text-sm text-foreground uppercase placeholder:font-sans placeholder:normal-case placeholder:text-muted-foreground outline-none transition-colors focus:border-ring"
        />
      </div>
      <Button type="button" variant="outline" className="h-10 shrink-0" onClick={handleApply}>
        {STRINGS.couponInput.apply}
      </Button>
    </div>
  )
}
