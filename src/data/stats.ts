import { ShoppingBag, DollarSign, Trophy } from 'lucide-react'
import { STRINGS } from '@/config/strings'
import type { StatSummary } from '@/types'

export const STAT_SUMMARIES: StatSummary[] = [
  {
    id: 'todays-orders',
    label: STRINGS.stats.todaysOrders,
    value: '12',
    change: { direction: 'up', value: '20%', comparisonLabel: STRINGS.stats.vsYesterday },
    icon: ShoppingBag,
  },
  {
    id: 'revenue',
    label: STRINGS.stats.revenue,
    value: '$1,245.50',
    change: { direction: 'up', value: '18%', comparisonLabel: STRINGS.stats.vsYesterday },
    icon: DollarSign,
  },
  {
    id: 'top-seller',
    label: STRINGS.stats.topSeller,
    value: 'Sunset Marigold Bouquet',
    icon: Trophy,
  },
]

export const TOP_SELLER_ORDER_COUNT = 24
