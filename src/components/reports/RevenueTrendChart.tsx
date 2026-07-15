import { formatCurrency } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { RevenuePoint } from '@/types'

interface RevenueTrendChartProps {
  points: RevenuePoint[]
}

export function RevenueTrendChart({ points }: RevenueTrendChartProps) {
  const max = Math.max(...points.map((point) => point.value))
  const lastIndex = points.length - 1

  return (
    <div className="flex h-48 items-end gap-3 sm:gap-4">
      {points.map((point, index) => {
        const heightPct = Math.max((point.value / max) * 100, 4)
        const isLast = index === lastIndex

        return (
          <div key={point.label} className="group flex flex-1 flex-col items-center gap-2">
            <div className="relative flex h-36 w-full items-end justify-center">
              {isLast && (
                <span className="absolute -top-6 text-xs font-semibold text-foreground">
                  {formatCurrency(point.value)}
                </span>
              )}
              <div
                title={formatCurrency(point.value)}
                className={cn(
                  'w-full max-w-8 rounded-t-md bg-brand/25 transition-colors group-hover:bg-brand/40',
                  isLast && 'bg-brand group-hover:bg-brand',
                )}
                style={{ height: `${heightPct}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{point.label}</span>
          </div>
        )
      })}
    </div>
  )
}
