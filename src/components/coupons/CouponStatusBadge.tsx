import { cn } from '@/lib/utils'
import { STRINGS } from '@/config/strings'
import type { CouponStatus } from '@/types'

const STATUS_STYLES: Record<CouponStatus, string> = {
  active: 'bg-success-muted text-success',
  scheduled: 'bg-warning-muted text-warning',
  expired: 'bg-destructive/10 text-destructive',
}

interface CouponStatusBadgeProps {
  status: CouponStatus
}

export function CouponStatusBadge({ status }: CouponStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        STATUS_STYLES[status],
      )}
    >
      {STRINGS.couponStatus[status]}
    </span>
  )
}
