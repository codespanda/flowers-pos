import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { ProductGridHeader, type ProductViewMode } from '@/components/products/ProductGridHeader'
import { ProductGrid } from '@/components/products/ProductGrid'
import { OrderPanel } from '@/components/order/OrderPanel'
import { StatsBar } from '@/components/stats/StatsBar'
import { CustomerFormModal } from '@/components/customers/CustomerFormModal'
import { PRODUCTS } from '@/data/products'
import { INITIAL_CUSTOMER } from '@/data/order'
import { STRINGS } from '@/config/strings'
import { useOrder } from '@/hooks/useOrder'
import { useCoupons } from '@/context/CouponsContext'
import { formatCurrency } from '@/lib/format'
import { interpolate } from '@/lib/utils'
import type { OrderCustomer, Product, ProductCategory, ProductFilters } from '@/types'

const DEFAULT_FILTERS: ProductFilters = {
  sortBy: 'name-asc',
  minPrice: '',
  maxPrice: '',
  favoritesOnly: false,
}

export function PosPage() {
  const [searchParams] = useSearchParams()
  const activeCategory = (searchParams.get('category') as ProductCategory | null) ?? 'all'
  const [viewMode, setViewMode] = useState<ProductViewMode>('grid')
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<ProductFilters>(DEFAULT_FILTERS)
  const [orderCustomer, setOrderCustomer] = useState<OrderCustomer>(INITIAL_CUSTOMER)
  const [addCustomerOpen, setAddCustomerOpen] = useState(false)

  const order = useOrder()
  const { findByCode, redeemCoupon } = useCoupons()

  const activeFilterCount =
    (filters.minPrice !== '' ? 1 : 0) +
    (filters.maxPrice !== '' ? 1 : 0) +
    (filters.favoritesOnly ? 1 : 0)

  const visibleProducts = useMemo(() => {
    const minPrice = filters.minPrice !== '' ? Number(filters.minPrice) : null
    const maxPrice = filters.maxPrice !== '' ? Number(filters.maxPrice) : null

    const filtered = PRODUCTS.filter((product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) return false
      if (minPrice !== null && product.price < minPrice) return false
      if (maxPrice !== null && product.price > maxPrice) return false
      if (filters.favoritesOnly && !favoriteIds.has(product.id)) return false
      return true
    })

    return [...filtered].sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price
      if (filters.sortBy === 'price-desc') return b.price - a.price
      return a.name.localeCompare(b.name)
    })
  }, [activeCategory, filters, favoriteIds])

  function toggleFavorite(product: Product) {
    setFavoriteIds((current) => {
      const next = new Set(current)
      if (next.has(product.id)) {
        next.delete(product.id)
      } else {
        next.add(product.id)
      }
      return next
    })
  }

  function handleApplyCoupon(code: string) {
    const coupon = findByCode(code)
    if (!coupon) {
      toast.error(STRINGS.toasts.couponNotFound)
      return
    }

    const isPastExpiry = new Date(coupon.expiresAt) < new Date()
    const effectiveStatus = coupon.status === 'active' && isPastExpiry ? 'expired' : coupon.status
    if (effectiveStatus !== 'active') {
      toast.error(
        interpolate(STRINGS.toasts.couponNotActive, {
          code: coupon.code,
          status: STRINGS.couponStatus[effectiveStatus].toLowerCase(),
        }),
      )
      return
    }

    if (coupon.minSpend && order.subtotal < coupon.minSpend) {
      toast.error(
        interpolate(STRINGS.toasts.couponMinSpendNotMet, {
          code: coupon.code,
          minSpend: formatCurrency(coupon.minSpend),
        }),
      )
      return
    }

    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      toast.error(interpolate(STRINGS.toasts.couponLimitReached, { code: coupon.code }))
      return
    }

    const base = Math.max(order.subtotal - order.discount, 0)
    const amount =
      coupon.discountType === 'percentage' ? (base * coupon.value) / 100 : Math.min(coupon.value, base)

    order.applyCoupon(coupon)
    redeemCoupon(coupon.id)
    toast.success(
      interpolate(STRINGS.toasts.couponApplied, { code: coupon.code, amount: formatCurrency(amount) }),
    )
  }

  function handleRemoveCoupon() {
    order.removeCoupon()
    toast(STRINGS.toasts.couponRemoved)
  }

  function handleRemoveItem(itemId: string) {
    const item = order.items.find((orderItem) => orderItem.id === itemId)
    order.removeItem(itemId)
    if (item) {
      toast(interpolate(STRINGS.toasts.itemRemoved, { name: item.product.name }))
    }
  }

  function handleCharge() {
    toast.success(interpolate(STRINGS.toasts.orderCharged, { total: formatCurrency(order.total) }))
    order.clearOrder()
    setOrderCustomer(INITIAL_CUSTOMER)
  }

  function handleHoldOrder() {
    toast(STRINGS.toasts.orderHeld)
  }

  function handlePrintTicket() {
    toast(STRINGS.toasts.ticketPrinted)
  }

  return (
    <>
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="shrink-0 px-6 pt-6">
          <ProductGridHeader
            title={STRINGS.productGrid.title}
            itemCount={visibleProducts.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            filters={filters}
            onFiltersChange={setFilters}
            onResetFilters={() => setFilters(DEFAULT_FILTERS)}
            activeFilterCount={activeFilterCount}
          />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
          <ProductGrid
            products={visibleProducts}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
            onAddProduct={order.addProduct}
            viewMode={viewMode}
          />
        </div>
        <div className="shrink-0 border-t border-border bg-background px-6 py-4">
          <StatsBar />
        </div>
      </main>

      <OrderPanel
        customer={orderCustomer}
        items={order.items}
        subtotal={order.subtotal}
        discount={order.discount}
        appliedCoupon={order.appliedCoupon}
        couponDiscount={order.couponDiscount}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        tax={order.tax}
        total={order.total}
        paymentMethod={order.paymentMethod}
        onPaymentMethodChange={order.setPaymentMethod}
        onIncrement={order.incrementItem}
        onDecrement={order.decrementItem}
        onRemoveItem={handleRemoveItem}
        onAddCustomer={() => setAddCustomerOpen(true)}
        onCharge={handleCharge}
        onHoldOrder={handleHoldOrder}
        onPrintTicket={handlePrintTicket}
      />

      <CustomerFormModal
        open={addCustomerOpen}
        onOpenChange={setAddCustomerOpen}
        onSaved={(customer) =>
          setOrderCustomer({ name: customer.name, fulfillment: STRINGS.order.pickupToday })
        }
      />
    </>
  )
}
