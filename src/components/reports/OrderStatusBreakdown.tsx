import { STRINGS } from '@/config/strings'
import { cn } from '@/lib/utils'
import type { OrderRecord, OrderStatus } from '@/types'

interface OrderStatusBreakdownProps {
  orders: OrderRecord[]
}

const STATUS_ORDER: OrderStatus[] = ['completed', 'pending', 'refunded']

const STATUS_COLOR: Record<OrderStatus, string> = {
  completed: 'bg-success',
  pending: 'bg-warning',
  refunded: 'bg-destructive',
}

export function OrderStatusBreakdown({ orders }: OrderStatusBreakdownProps) {
  const total = orders.length
  const counts = STATUS_ORDER.map((status) => ({
    status,
    count: orders.filter((order) => order.status === status).length,
  }))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
        {counts.map(({ status, count }) =>
          count === 0 ? null : (
            <div
              key={status}
              className={cn(STATUS_COLOR[status], 'h-full first:rounded-l-full last:rounded-r-full')}
              style={{ width: `${(count / total) * 100}%` }}
              title={`${STRINGS.orderStatus[status]}: ${count}`}
            />
          ),
        )}
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {counts.map(({ status, count }) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={cn('size-2 shrink-0 rounded-full', STATUS_COLOR[status])} />
            <span className="text-foreground">{STRINGS.orderStatus[status]}</span>
            <span className="text-muted-foreground">
              {count} · {Math.round((count / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
