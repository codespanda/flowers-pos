import { cn } from '@/lib/utils'
import { CATEGORY_META } from '@/config/categories'
import type { Product } from '@/types'

interface ProductImageProps {
  product: Product
  className?: string
}

export function ProductImage({ product, className }: ProductImageProps) {
  const meta = CATEGORY_META[product.category]

  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      {product.image ? (
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="size-full object-cover"
        />
      ) : (
        <div
          className={cn(
            'flex size-full items-center justify-center bg-gradient-to-br',
            meta.gradient,
          )}
        >
          <meta.icon className="size-9 text-white" strokeWidth={1.5} />
        </div>
      )}
    </div>
  )
}
