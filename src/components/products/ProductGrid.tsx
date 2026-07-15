import { ProductCard } from './ProductCard'
import { ProductListItem } from './ProductListItem'
import { STRINGS } from '@/config/strings'
import type { ProductViewMode } from './ProductGridHeader'
import type { Product } from '@/types'

interface ProductGridProps {
  products: Product[]
  favoriteIds: Set<string>
  onToggleFavorite: (product: Product) => void
  onAddProduct: (product: Product) => void
  viewMode?: ProductViewMode
}

export function ProductGrid({
  products,
  favoriteIds,
  onToggleFavorite,
  onAddProduct,
  viewMode = 'grid',
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
        {STRINGS.productGrid.empty}
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-3">
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            isFavorite={favoriteIds.has(product.id)}
            onToggleFavorite={onToggleFavorite}
            onAdd={onAddProduct}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favoriteIds.has(product.id)}
          onToggleFavorite={onToggleFavorite}
          onAdd={onAddProduct}
        />
      ))}
    </div>
  )
}
