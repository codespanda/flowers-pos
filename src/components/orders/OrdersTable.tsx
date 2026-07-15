import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { OrderStatusBadge } from './OrderStatusBadge'
import { STRINGS } from '@/config/strings'
import { formatCurrency, formatDateTime } from '@/lib/format'
import type { OrderRecord } from '@/types'

interface OrdersTableProps {
  orders: OrderRecord[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
        {STRINGS.ordersPage.empty}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-4">{STRINGS.ordersPage.columnOrder}</TableHead>
            <TableHead>{STRINGS.ordersPage.columnCustomer}</TableHead>
            <TableHead>{STRINGS.ordersPage.columnItems}</TableHead>
            <TableHead>{STRINGS.ordersPage.columnFulfillment}</TableHead>
            <TableHead>{STRINGS.ordersPage.columnStatus}</TableHead>
            <TableHead>{STRINGS.ordersPage.columnPlaced}</TableHead>
            <TableHead className="pr-4 text-right">{STRINGS.ordersPage.columnTotal}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="pl-4 font-semibold text-foreground">{order.orderNumber}</TableCell>
              <TableCell className="text-foreground">{order.customerName}</TableCell>
              <TableCell className="text-muted-foreground">{order.itemCount}</TableCell>
              <TableCell className="text-muted-foreground">{order.fulfillment}</TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">{formatDateTime(order.placedAt)}</TableCell>
              <TableCell className="pr-4 text-right font-semibold text-foreground">
                {formatCurrency(order.total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
