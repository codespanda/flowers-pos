import { Flower2, FlowerIcon, Wand2, Sprout, Gift, Leaf } from 'lucide-react'
import { STRINGS } from './strings'
import type { IconComponent, ProductCategory } from '@/types'

interface CategoryMeta {
  label: string
  icon: IconComponent
  gradient: string
}

export const CATEGORY_ORDER: ProductCategory[] = [
  'bouquets',
  'single-stems',
  'arrangements',
  'plants',
  'gifts',
  'seasonal',
]

export const CATEGORY_META: Record<ProductCategory, CategoryMeta> = {
  bouquets: { label: STRINGS.nav.bouquets, icon: Flower2, gradient: 'from-rose-200 to-pink-400' },
  'single-stems': {
    label: STRINGS.nav.singleStems,
    icon: FlowerIcon,
    gradient: 'from-amber-200 to-orange-400',
  },
  arrangements: {
    label: STRINGS.nav.arrangements,
    icon: Wand2,
    gradient: 'from-fuchsia-200 to-purple-400',
  },
  plants: { label: STRINGS.nav.plants, icon: Sprout, gradient: 'from-emerald-200 to-teal-400' },
  gifts: { label: STRINGS.nav.gifts, icon: Gift, gradient: 'from-sky-200 to-blue-400' },
  seasonal: { label: STRINGS.nav.seasonal, icon: Leaf, gradient: 'from-lime-200 to-green-400' },
}
