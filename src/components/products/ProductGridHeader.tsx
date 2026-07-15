import { LayoutGrid, List } from 'lucide-react'
import { cn } from '@/lib/utils'
import { STRINGS } from '@/config/strings'
import { ProductFilterPopover } from './ProductFilterPopover'
import type { ProductFilters } from '@/types'

export type ProductViewMode = 'grid' | 'list'

interface ProductGridHeaderProps {
  title: string
  itemCount: number
  viewMode: ProductViewMode
  onViewModeChange: (mode: ProductViewMode) => void
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  onResetFilters: () => void
  activeFilterCount: number
}

export function ProductGridHeader({
  title,
  itemCount,
  viewMode,
  onViewModeChange,
  filters,
  onFiltersChange,
  onResetFilters,
  activeFilterCount,
}: ProductGridHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <div className="flex items-baseline gap-2.5">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
        <span className="text-sm text-muted-foreground">
          {itemCount} {STRINGS.productGrid.itemsSuffix}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-border bg-card p-1">
          <ViewToggleButton
            active={viewMode === 'grid'}
            onClick={() => onViewModeChange('grid')}
            icon={LayoutGrid}
            label="Grid view"
          />
          <ViewToggleButton
            active={viewMode === 'list'}
            onClick={() => onViewModeChange('list')}
            icon={List}
            label="List view"
          />
        </div>
        <ProductFilterPopover
          filters={filters}
          onFiltersChange={onFiltersChange}
          onReset={onResetFilters}
          activeCount={activeFilterCount}
        />
      </div>
    </div>
  )
}

interface ViewToggleButtonProps {
  active: boolean
  onClick: () => void
  icon: typeof LayoutGrid
  label: string
}

function ViewToggleButton({ active, onClick, icon: Icon, label }: ViewToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'flex size-8 items-center justify-center rounded-md transition-colors',
        active ? 'bg-brand-muted text-brand' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <Icon className="size-4" />
    </button>
  )
}
