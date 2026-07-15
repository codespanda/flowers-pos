import { formatCurrency } from '@/lib/format'
import { STRINGS } from '@/config/strings'

interface OrderTotalsProps {
  subtotal: number
  discount: number
  couponCode?: string
  couponDiscount?: number
  tax: number
  total: number
}

export function OrderTotals({
  subtotal,
  discount,
  couponCode,
  couponDiscount = 0,
  tax,
  total,
}: OrderTotalsProps) {
  return (
    <div className="space-y-2 border-t border-border py-4">
      <Row label={STRINGS.order.subtotal} value={formatCurrency(subtotal)} />
      {discount > 0 && (
        <Row label={STRINGS.order.deliveryDiscount} value={`−${formatCurrency(discount)}`} tone="success" />
      )}
      {couponDiscount > 0 && (
        <Row
          label={`${STRINGS.order.couponDiscount} (${couponCode})`}
          value={`−${formatCurrency(couponDiscount)}`}
          tone="success"
        />
      )}
      <Row label={STRINGS.order.salesTax} value={formatCurrency(tax)} />

      <div className="flex items-center justify-between pt-2">
        <span className="text-base font-semibold text-foreground">{STRINGS.order.totalDue}</span>
        <span className="text-xl font-bold text-brand">{formatCurrency(total)}</span>
      </div>
    </div>
  )
}

interface RowProps {
  label: string
  value: string
  tone?: 'default' | 'success'
}

function Row({ label, value, tone = 'default' }: RowProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={tone === 'success' ? 'font-medium text-success' : 'font-medium text-foreground'}>
        {value}
      </span>
    </div>
  )
}
