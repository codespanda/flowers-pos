import { cn } from '@/lib/utils'
import { STRINGS } from '@/config/strings'
import type { OrderStatus } from '@/types'

const STATUS_STYLES: Record<OrderStatus, string> = {
  completed: 'bg-success-muted text-success',
  pending: 'bg-warning-muted text-warning',
  refunded: 'bg-destructive/10 text-destructive',
}

interface OrderStatusBadgeProps {
  status: OrderStatus
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        STATUS_STYLES[status],
      )}
    >
      {STRINGS.orderStatus[status]}
    </span>
  )
}
