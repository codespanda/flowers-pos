import { createContext, useContext, useState, type ReactNode } from 'react'
import { COUPONS } from '@/data/coupons'
import type { Coupon, NewCouponInput } from '@/types'

interface CouponsContextValue {
  coupons: Coupon[]
  addCoupon: (input: NewCouponInput) => Coupon
  updateCoupon: (id: string, input: NewCouponInput) => Coupon
  deleteCoupon: (id: string) => void
  findByCode: (code: string) => Coupon | undefined
  redeemCoupon: (id: string) => void
}

const CouponsContext = createContext<CouponsContextValue | null>(null)

export function CouponsProvider({ children }: { children: ReactNode }) {
  const [coupons, setCoupons] = useState<Coupon[]>(COUPONS)

  function addCoupon(input: NewCouponInput): Coupon {
    const newCoupon: Coupon = {
      id: `coupon-${Date.now()}`,
      code: input.code.toUpperCase(),
      description: input.description,
      discountType: input.discountType,
      value: input.value,
      minSpend: input.minSpend,
      usageLimit: input.usageLimit,
      expiresAt: input.expiresAt,
      status: input.status,
      usageCount: 0,
    }
    setCoupons((current) => [newCoupon, ...current])
    return newCoupon
  }

  function updateCoupon(id: string, input: NewCouponInput): Coupon {
    let updated: Coupon | undefined
    setCoupons((current) =>
      current.map((coupon) => {
        if (coupon.id !== id) return coupon
        updated = { ...coupon, ...input, code: input.code.toUpperCase() }
        return updated
      }),
    )
    return updated ?? { id, usageCount: 0, ...input, code: input.code.toUpperCase() }
  }

  function deleteCoupon(id: string) {
    setCoupons((current) => current.filter((coupon) => coupon.id !== id))
  }

  function findByCode(code: string): Coupon | undefined {
    const needle = code.trim().toUpperCase()
    return coupons.find((coupon) => coupon.code === needle)
  }

  function redeemCoupon(id: string) {
    setCoupons((current) =>
      current.map((coupon) => (coupon.id === id ? { ...coupon, usageCount: coupon.usageCount + 1 } : coupon)),
    )
  }

  const value = { coupons, addCoupon, updateCoupon, deleteCoupon, findByCode, redeemCoupon }

  return <CouponsContext.Provider value={value}>{children}</CouponsContext.Provider>
}

export function useCoupons(): CouponsContextValue {
  const context = useContext(CouponsContext)
  if (!context) {
    throw new Error('useCoupons must be used within a CouponsProvider')
  }
  return context
}
