import { CATEGORY_META } from '@/config/categories'
import { formatCurrency } from '@/lib/format'
import type { CategorySale } from '@/types'

interface CategorySalesChartProps {
  sales: CategorySale[]
}

export function CategorySalesChart({ sales }: CategorySalesChartProps) {
  const sorted = [...sales].sort((a, b) => b.revenue - a.revenue)
  const max = Math.max(...sorted.map((sale) => sale.revenue))

  return (
    <div className="flex flex-col gap-4">
      {sorted.map((sale) => {
        const meta = CATEGORY_META[sale.category]
        const widthPct = Math.max((sale.revenue / max) * 100, 4)

        return (
          <div key={sale.category}>
            <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-1.5 truncate font-medium text-foreground">
                <meta.icon className="size-3.5 shrink-0 text-muted-foreground" />
                {meta.label}
              </span>
              <span className="shrink-0 text-muted-foreground">{formatCurrency(sale.revenue)}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${widthPct}%` }}
                title={formatCurrency(sale.revenue)}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
