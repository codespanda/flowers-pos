import { StatCard } from './StatCard'
import { STAT_SUMMARIES, TOP_SELLER_ORDER_COUNT } from '@/data/stats'
import { STRINGS } from '@/config/strings'

export function StatsBar() {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-card p-5 sm:grid-cols-3">
      {STAT_SUMMARIES.map((stat) => (
        <StatCard
          key={stat.id}
          stat={stat}
          footnote={
            stat.id === 'top-seller'
              ? `${TOP_SELLER_ORDER_COUNT} ${STRINGS.stats.ordersTodaySuffix}`
              : undefined
          }
        />
      ))}
    </div>
  )
}
