import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageMain } from '@/components/layout/PageMain'
import { OrdersTable } from '@/components/orders/OrdersTable'
import { cn } from '@/lib/utils'
import { STRINGS } from '@/config/strings'
import { ORDER_RECORDS } from '@/data/orders'
import type { OrderStatus } from '@/types'

type StatusFilter = OrderStatus | 'all'

const STATUS_FILTERS: StatusFilter[] = ['all', 'completed', 'pending', 'refunded']

export function OrdersPage() {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filteredOrders = useMemo(() => {
    return ORDER_RECORDS.filter((order) => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      const matchesQuery =
        query.trim() === '' ||
        order.orderNumber.toLowerCase().includes(query.toLowerCase()) ||
        order.customerName.toLowerCase().includes(query.toLowerCase())
      return matchesStatus && matchesQuery
    })
  }, [query, statusFilter])

  return (
    <PageMain>
      <PageHeader title={STRINGS.ordersPage.title} subtitle={STRINGS.ordersPage.subtitle} />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors',
                statusFilter === status
                  ? 'bg-brand-muted text-brand'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {status === 'all' ? STRINGS.ordersPage.filterAll : STRINGS.orderStatus[status]}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={STRINGS.ordersPage.searchPlaceholder}
            className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring"
          />
        </div>
      </div>

      <OrdersTable orders={filteredOrders} />
    </PageMain>
  )
}
