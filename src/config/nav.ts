import {
  LayoutGrid,
  ClipboardList,
  Users,
  Tag,
  BarChart3,
  Settings,
} from 'lucide-react'
import { STRINGS } from './strings'
import { CATEGORY_META, CATEGORY_ORDER } from './categories'
import { ROUTES } from './routes'
import type { NavItem, SecondaryNavItem } from '@/types'

export const PRIMARY_NAV: NavItem[] = [
  { id: 'all', label: STRINGS.nav.allProducts, icon: LayoutGrid },
  ...CATEGORY_ORDER.map((category) => ({
    id: category,
    label: CATEGORY_META[category].label,
    icon: CATEGORY_META[category].icon,
  })),
]

export const SECONDARY_NAV: SecondaryNavItem[] = [
  { id: 'orders', label: STRINGS.nav.orders, icon: ClipboardList, href: ROUTES.orders },
  { id: 'customers', label: STRINGS.nav.customers, icon: Users, href: ROUTES.customers },
  { id: 'coupons', label: STRINGS.nav.coupons, icon: Tag, href: ROUTES.coupons },
  { id: 'reports', label: STRINGS.nav.reports, icon: BarChart3, href: ROUTES.reports },
  { id: 'settings', label: STRINGS.nav.settings, icon: Settings, href: ROUTES.settings },
]
