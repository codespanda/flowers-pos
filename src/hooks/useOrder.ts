import { useMemo, useState } from 'react'
import { APP_CONFIG } from '@/config/app'
import { DELIVERY_DISCOUNT, INITIAL_ORDER_ITEMS } from '@/data/order'
import type { Coupon, OrderItem, PaymentMethod, Product } from '@/types'

export function useOrder() {
  const [items, setItems] = useState<OrderItem[]>(INITIAL_ORDER_ITEMS)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)

  function addProduct(product: Product) {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { id: `item-${product.id}-${Date.now()}`, product, quantity: 1 }]
    })
  }

  function incrementItem(itemId: string) {
    setItems((current) =>
      current.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item)),
    )
  }

  function decrementItem(itemId: string) {
    setItems((current) =>
      current
        .map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  function removeItem(itemId: string) {
    setItems((current) => current.filter((item) => item.id !== itemId))
  }

  function applyCoupon(coupon: Coupon) {
    setAppliedCoupon(coupon)
  }

  function removeCoupon() {
    setAppliedCoupon(null)
  }

  function clearOrder() {
    setItems([])
    setPaymentMethod('card')
    setAppliedCoupon(null)
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  )
  const discount = items.length > 0 ? DELIVERY_DISCOUNT : 0

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0
    const base = Math.max(subtotal - discount, 0)
    const raw =
      appliedCoupon.discountType === 'percentage' ? (base * appliedCoupon.value) / 100 : appliedCoupon.value
    return Math.min(raw, base)
  }, [appliedCoupon, subtotal, discount])

  const taxableAmount = Math.max(subtotal - discount - couponDiscount, 0)
  const tax = useMemo(() => taxableAmount * APP_CONFIG.taxRate, [taxableAmount])
  const total = taxableAmount + tax

  return {
    items,
    addProduct,
    incrementItem,
    decrementItem,
    removeItem,
    clearOrder,
    paymentMethod,
    setPaymentMethod,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    couponDiscount,
    tax,
    total,
  }
}
