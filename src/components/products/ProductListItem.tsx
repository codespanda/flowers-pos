import { Heart, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/format'
import { CATEGORY_META } from '@/config/categories'
import { ProductImage } from './ProductImage'
import type { Product } from '@/types'

interface ProductListItemProps {
  product: Product
  isFavorite?: boolean
  onToggleFavorite?: (product: Product) => void
  onAdd?: (product: Product) => void
}

export function ProductListItem({ product, isFavorite, onToggleFavorite, onAdd }: ProductListItemProps) {
  const category = CATEGORY_META[product.category]

  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 transition-shadow hover:shadow-md">
      <ProductImage product={product} className="size-16 shrink-0 rounded-lg" />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{product.name}</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <category.icon className="size-3.5" />
          {category.label}
        </p>
      </div>

      <span className="w-20 shrink-0 text-right text-sm font-semibold text-brand">
        {formatCurrency(product.price)}
      </span>

      <button
        type="button"
        onClick={() => onToggleFavorite?.(product)}
        aria-pressed={isFavorite}
        aria-label="Toggle favorite"
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
      >
        <Heart className={cn('size-4', isFavorite && 'fill-brand text-brand')} />
      </button>

      <button
        type="button"
        onClick={() => onAdd?.(product)}
        aria-label={`Add ${product.name} to order`}
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition-transform hover:scale-105 active:scale-95"
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}
