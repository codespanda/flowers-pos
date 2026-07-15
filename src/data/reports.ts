import type { CategorySale, PaymentMethodShare, RevenuePoint, TopProduct } from '@/types'
import { STRINGS } from '@/config/strings'

export const REVENUE_TREND: RevenuePoint[] = [
  { label: 'Mon', value: 890 },
  { label: 'Tue', value: 1120 },
  { label: 'Wed', value: 960 },
  { label: 'Thu', value: 1310 },
  { label: 'Fri', value: 1580 },
  { label: 'Sat', value: 1890 },
  { label: 'Sun', value: 1245.5 },
]

export const TOP_PRODUCTS: TopProduct[] = [
  { productId: 'sunset-marigold-bouquet', name: 'Sunset Marigold Bouquet', unitsSold: 24, revenue: 1008 },
  { productId: 'garden-rose-dozen', name: 'Garden Rose Dozen', unitsSold: 18, revenue: 972 },
  { productId: 'ivory-peony-arrangement', name: 'Ivory Peony Arrangement', unitsSold: 12, revenue: 816 },
  { productId: 'wedding-centerpiece', name: 'Wedding Centerpiece', unitsSold: 8, revenue: 760 },
  { productId: 'succulent-trio-planter', name: 'Succulent Trio Planter', unitsSold: 21, revenue: 588 },
]

export const CATEGORY_SALES: CategorySale[] = [
  { category: 'bouquets', revenue: 2840 },
  { category: 'arrangements', revenue: 2120 },
  { category: 'seasonal', revenue: 1360 },
  { category: 'plants', revenue: 940 },
  { category: 'single-stems', revenue: 610 },
  { category: 'gifts', revenue: 385 },
]

export const PAYMENT_METHOD_SHARE: PaymentMethodShare[] = [
  { method: 'card', label: STRINGS.payment.card, percent: 62 },
  { method: 'cash', label: STRINGS.payment.cash, percent: 27 },
  { method: 'gift-card', label: STRINGS.payment.giftCard, percent: 11 },
]
