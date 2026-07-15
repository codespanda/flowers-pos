import { Lock, UserPlus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { OrderLineItem } from './OrderLineItem'
import { OrderTotals } from './OrderTotals'
import { PaymentMethodSelector } from './PaymentMethodSelector'
import { CouponInput } from './CouponInput'
import { STRINGS } from '@/config/strings'
import { formatCurrency } from '@/lib/format'
import type { Coupon, OrderCustomer, OrderItem, PaymentMethod } from '@/types'

interface OrderPanelProps {
  customer: OrderCustomer
  items: OrderItem[]
  subtotal: number
  discount: number
  appliedCoupon: Coupon | null
  couponDiscount: number
  onApplyCoupon: (code: string) => void
  onRemoveCoupon: () => void
  tax: number
  total: number
  paymentMethod: PaymentMethod
  onPaymentMethodChange: (method: PaymentMethod) => void
  onIncrement: (itemId: string) => void
  onDecrement: (itemId: string) => void
  onRemoveItem: (itemId: string) => void
  onHoldOrder?: () => void
  onPrintTicket?: () => void
  onCharge?: () => void
  onAddCustomer?: () => void
}

export function OrderPanel({
  customer,
  items,
  subtotal,
  discount,
  appliedCoupon,
  couponDiscount,
  onApplyCoupon,
  onRemoveCoupon,
  tax,
  total,
  paymentMethod,
  onPaymentMethodChange,
  onIncrement,
  onDecrement,
  onRemoveItem,
  onHoldOrder,
  onPrintTicket,
  onCharge,
  onAddCustomer,
}: OrderPanelProps) {
  return (
    <aside className="flex w-[380px] shrink-0 flex-col border-l border-border bg-surface p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{STRINGS.order.title}</h2>
        <Badge className="bg-brand-muted text-brand" variant="secondary">
          {items.length} {STRINGS.order.itemsSuffix}
        </Badge>
      </div>

      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="min-w-0 truncate text-sm text-muted-foreground">
          {STRINGS.order.forPrefix} <span className="font-semibold text-foreground">{customer.name}</span>
          {' · '}
          {customer.fulfillment}
        </p>
        {onAddCustomer && (
          <button
            type="button"
            onClick={onAddCustomer}
            aria-label={STRINGS.order.changeCustomer}
            title={STRINGS.order.changeCustomer}
            className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-brand"
          >
            <UserPlus className="size-4" />
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 divide-y divide-border overflow-y-auto">
        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">{STRINGS.order.empty}</p>
        ) : (
          items.map((item) => (
            <OrderLineItem
              key={item.id}
              item={item}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onRemove={onRemoveItem}
            />
          ))
        )}
      </div>

      <div className="border-t border-border py-4">
        <CouponInput appliedCoupon={appliedCoupon} onApply={onApplyCoupon} onRemove={onRemoveCoupon} />
      </div>

      <OrderTotals
        subtotal={subtotal}
        discount={discount}
        couponCode={appliedCoupon?.code}
        couponDiscount={couponDiscount}
        tax={tax}
        total={total}
      />

      <PaymentMethodSelector value={paymentMethod} onChange={onPaymentMethodChange} />

      <Button
        type="button"
        size="lg"
        onClick={onCharge}
        disabled={items.length === 0}
        className="mt-4 h-12 w-full gap-2 rounded-xl bg-brand text-base font-semibold text-brand-foreground hover:bg-brand/90"
      >
        <Lock className="size-4" />
        {STRINGS.order.chargePrefix} {formatCurrency(total)}
      </Button>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm">
        <button type="button" onClick={onHoldOrder} className="font-medium text-muted-foreground hover:text-foreground">
          {STRINGS.order.holdOrder}
        </button>
        <span className="text-border">·</span>
        <button type="button" onClick={onPrintTicket} className="font-medium text-muted-foreground hover:text-foreground">
          {STRINGS.order.printTicket}
        </button>
      </div>
    </aside>
  )
}
