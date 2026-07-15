import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatCurrency } from '@/lib/format'
import { ProductImage } from '@/components/products/ProductImage'
import { STRINGS } from '@/config/strings'
import type { OrderItem } from '@/types'

interface OrderLineItemProps {
  item: OrderItem
  onIncrement: (itemId: string) => void
  onDecrement: (itemId: string) => void
  onRemove: (itemId: string) => void
}

export function OrderLineItem({ item, onIncrement, onDecrement, onRemove }: OrderLineItemProps) {
  const lineTotal = item.product.price * item.quantity

  return (
    <div className="flex items-center gap-3 py-3">
      <ProductImage product={item.product} className="size-14 shrink-0 rounded-lg" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{item.product.name}</p>
        <div className="mt-1.5 flex items-center gap-1.5">
          <QuantityButton icon={Minus} label="Decrease quantity" onClick={() => onDecrement(item.id)} />
          <span className="w-5 text-center text-sm font-medium text-foreground">{item.quantity}</span>
          <QuantityButton icon={Plus} label="Increase quantity" onClick={() => onIncrement(item.id)} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-foreground">{formatCurrency(lineTotal)}</span>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`${STRINGS.order.removeItem}: ${item.product.name}`}
          title={STRINGS.order.removeItem}
          className="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  )
}

interface QuantityButtonProps {
  icon: typeof Minus
  label: string
  onClick: () => void
}

function QuantityButton({ icon: Icon, label, onClick }: QuantityButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-5 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand"
    >
      <Icon className="size-3" />
    </button>
  )
}
