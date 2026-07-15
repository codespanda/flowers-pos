import { formatCurrency } from '@/lib/format'
import { STRINGS } from '@/config/strings'
import type { TopProduct } from '@/types'

interface TopProductsChartProps {
  products: TopProduct[]
}

export function TopProductsChart({ products }: TopProductsChartProps) {
  const max = Math.max(...products.map((product) => product.revenue))

  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => {
        const widthPct = Math.max((product.revenue / max) * 100, 4)

        return (
          <div key={product.productId}>
            <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
              <span className="truncate font-medium text-foreground">{product.name}</span>
              <span className="shrink-0 text-muted-foreground">
                {formatCurrency(product.revenue)}
                <span className="ml-1.5 text-xs">
                  ({product.unitsSold} {STRINGS.reportsPage.unitsSoldSuffix})
                </span>
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${widthPct}%` }}
                title={formatCurrency(product.revenue)}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
