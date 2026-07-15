import { ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { StatSummary } from '@/types'

interface StatCardProps {
  stat: StatSummary
  footnote?: string
}

export function StatCard({ stat, footnote }: StatCardProps) {
  const ChangeIcon = stat.change?.direction === 'down' ? ArrowDown : ArrowUp

  return (
    <div className="flex items-center gap-3.5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-muted text-brand">
        <stat.icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
        <p className="truncate text-lg font-semibold text-foreground">{stat.value}</p>
        {stat.change && (
          <p
            className={cn(
              'flex items-center gap-1 text-xs font-medium',
              stat.change.direction === 'down' ? 'text-destructive' : 'text-success',
            )}
          >
            <ChangeIcon className="size-3" />
            {stat.change.value}
            <span className="font-normal text-muted-foreground">{stat.change.comparisonLabel}</span>
          </p>
        )}
        {footnote && <p className="text-xs text-muted-foreground">{footnote}</p>}
      </div>
    </div>
  )
}
