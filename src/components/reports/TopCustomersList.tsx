import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { STRINGS } from '@/config/strings'
import { formatCurrency } from '@/lib/format'
import { getInitials } from '@/lib/utils'
import type { Customer } from '@/types'

interface TopCustomersListProps {
  customers: Customer[]
}

export function TopCustomersList({ customers }: TopCustomersListProps) {
  const top = [...customers].sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 5)

  return (
    <div className="flex flex-col divide-y divide-border">
      {top.map((customer) => (
        <div key={customer.id} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
          <Avatar>
            <AvatarFallback className="bg-brand-muted font-semibold text-brand">
              {getInitials(customer.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{customer.name}</p>
            <p className="text-xs text-muted-foreground">
              {customer.orderCount} {STRINGS.reportsPage.ordersSuffix}
            </p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-foreground">
            {formatCurrency(customer.totalSpent)}
          </span>
        </div>
      ))}
    </div>
  )
}
