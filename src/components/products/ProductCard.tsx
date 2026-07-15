import { Heart, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/format'
import { ProductImage } from './ProductImage'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  isFavorite?: boolean
  onToggleFavorite?: (product: Product) => void
  onAdd?: (product: Product) => void
}

export function ProductCard({ product, isFavorite, onToggleFavorite, onAdd }: ProductCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full min-h-0 overflow-hidden">
        <ProductImage
          product={product}
          className="size-full transition-transform duration-300 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onToggleFavorite?.(product)}
          aria-pressed={isFavorite}
          aria-label="Toggle favorite"
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/85 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <Heart className={cn('size-4', isFavorite && 'fill-brand text-brand')} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 p-3.5">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{product.name}</p>
          <p className="text-sm font-semibold text-brand">{formatCurrency(product.price)}</p>
        </div>
        <button
          type="button"
          onClick={() => onAdd?.(product)}
          aria-label={`Add ${product.name} to order`}
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition-transform hover:scale-105 active:scale-95"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  )
}
