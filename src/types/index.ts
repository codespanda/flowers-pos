import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'

export type IconComponent = ComponentType<LucideProps>

export type ProductCategory =
  | 'bouquets'
  | 'single-stems'
  | 'arrangements'
  | 'plants'
  | 'gifts'
  | 'seasonal'

export interface Product {
  id: string
  name: string
  price: number
  /** Optional product photo URL. Falls back to a category-themed placeholder when omitted. */
  image?: string
  category: ProductCategory
  isFavorite?: boolean
}

export interface OrderItem {
  id: string
  product: Product
  quantity: number
}

export type PaymentMethod = 'card' | 'cash' | 'gift-card'

export interface OrderCustomer {
  name: string
  fulfillment: string
}

export interface NavItem {
  id: ProductCategory | 'all'
  label: string
  icon: IconComponent
}

export interface SecondaryNavItem {
  id: string
  label: string
  icon: IconComponent
  href: string
}

export interface StatSummary {
  id: string
  label: string
  value: string
  change?: {
    direction: 'up' | 'down'
    value: string
    comparisonLabel: string
  }
  icon: IconComponent
}

export type OrderStatus = 'completed' | 'pending' | 'refunded'

export interface OrderRecord {
  id: string
  orderNumber: string
  customerName: string
  itemCount: number
  total: number
  status: OrderStatus
  placedAt: string
  fulfillment: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  orderCount: number
  totalSpent: number
  lastOrderAt: string
  favoriteCategory: ProductCategory
}

export interface NewCustomerInput {
  name: string
  email: string
  phone: string
  favoriteCategory: ProductCategory
}

export interface RevenuePoint {
  label: string
  value: number
}

export interface TopProduct {
  productId: string
  name: string
  unitsSold: number
  revenue: number
}

export interface CategorySale {
  category: ProductCategory
  revenue: number
}

export type PaymentMethodShare = {
  method: PaymentMethod
  label: string
  percent: number
}

export interface StaffMember {
  id: string
  name: string
  role: string
  email: string
}

export type CouponDiscountType = 'percentage' | 'fixed'
export type CouponStatus = 'active' | 'scheduled' | 'expired'

export interface Coupon {
  id: string
  code: string
  description: string
  discountType: CouponDiscountType
  value: number
  minSpend?: number
  usageCount: number
  usageLimit?: number
  expiresAt: string
  status: CouponStatus
}

export interface NewCouponInput {
  code: string
  description: string
  discountType: CouponDiscountType
  value: number
  minSpend?: number
  usageLimit?: number
  expiresAt: string
  status: CouponStatus
}

export type NotificationType = 'order' | 'stock' | 'customer' | 'system'

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  createdAt: string
  read: boolean
}

export interface AuthUser {
  name: string
  email: string
  storeName: string
}

export interface LoginInput {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignUpInput {
  name: string
  storeName: string
  email: string
  password: string
}

export interface ForgotPasswordInput {
  email: string
}

export type ProductSortOption = 'name-asc' | 'price-asc' | 'price-desc'

export interface ProductFilters {
  sortBy: ProductSortOption
  minPrice: string
  maxPrice: string
  favoritesOnly: boolean
}
