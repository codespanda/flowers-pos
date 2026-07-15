import { APP_CONFIG } from '@/config/app'
import type { CouponDiscountType } from '@/types'

const currencyFormatter = new Intl.NumberFormat(APP_CONFIG.locale, {
  style: 'currency',
  currency: APP_CONFIG.currency,
})

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat(APP_CONFIG.locale, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(APP_CONFIG.locale, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso)
  return new Intl.DateTimeFormat(APP_CONFIG.locale, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat(APP_CONFIG.locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(iso))
}

export function formatCouponValue(discountType: CouponDiscountType, value: number): string {
  return discountType === 'percentage' ? `${value}% off` : `${formatCurrency(value)} off`
}

export function formatRelativeDate(iso: string, now: Date = new Date()): string {
  const date = new Date(iso)
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.round(diffMs / (1000 * 60 * 60))

  if (diffHours < 1) return 'Just now'
  if (diffHours < 24) return `${diffHours}h ago`

  const diffDays = Math.round(diffHours / 24)
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`

  return formatDateTime(iso)
}
