import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CouponStatusBadge } from './CouponStatusBadge'
import { STRINGS } from '@/config/strings'
import { formatCouponValue, formatCurrency, formatShortDate } from '@/lib/format'
import type { Coupon } from '@/types'

interface CouponsTableProps {
  coupons: Coupon[]
  onEdit: (coupon: Coupon) => void
  onDelete: (coupon: Coupon) => void
}

export function CouponsTable({ coupons, onEdit, onDelete }: CouponsTableProps) {
  if (coupons.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
        {STRINGS.couponsPage.empty}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="pl-4">{STRINGS.couponsPage.columnCode}</TableHead>
            <TableHead>{STRINGS.couponsPage.columnDescription}</TableHead>
            <TableHead>{STRINGS.couponsPage.columnDiscount}</TableHead>
            <TableHead>{STRINGS.couponsPage.columnMinSpend}</TableHead>
            <TableHead>{STRINGS.couponsPage.columnUsage}</TableHead>
            <TableHead>{STRINGS.couponsPage.columnExpires}</TableHead>
            <TableHead>{STRINGS.couponsPage.columnStatus}</TableHead>
            <TableHead className="pr-4 text-right">
              <span className="sr-only">{STRINGS.couponsPage.rowActionsLabel}</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell className="pl-4 font-mono font-semibold text-foreground">{coupon.code}</TableCell>
              <TableCell className="text-muted-foreground">{coupon.description}</TableCell>
              <TableCell className="text-foreground">
                {formatCouponValue(coupon.discountType, coupon.value)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {coupon.minSpend ? formatCurrency(coupon.minSpend) : '—'}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {coupon.usageCount}
                {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ` (${STRINGS.couponsPage.unlimited})`}
              </TableCell>
              <TableCell className="text-muted-foreground">{formatShortDate(coupon.expiresAt)}</TableCell>
              <TableCell>
                <CouponStatusBadge status={coupon.status} />
              </TableCell>
              <TableCell className="pr-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      aria-label={STRINGS.couponsPage.rowActionsLabel}
                      className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <MoreVertical className="size-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(coupon)}>
                      <Pencil className="size-4" />
                      {STRINGS.couponsPage.editAction}
                    </DropdownMenuItem>
                    <DropdownMenuItem variant="destructive" onClick={() => onDelete(coupon)}>
                      <Trash2 className="size-4" />
                      {STRINGS.couponsPage.deleteAction}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
