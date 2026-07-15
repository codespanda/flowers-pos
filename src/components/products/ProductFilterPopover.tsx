import { useEffect, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { STRINGS } from '@/config/strings'
import { cn } from '@/lib/utils'
import type { ProductFilters, ProductSortOption } from '@/types'

interface ProductFilterPopoverProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  onReset: () => void
  activeCount: number
}

export function ProductFilterPopover({
  filters,
  onFiltersChange,
  onReset,
  activeCount,
}: ProductFilterPopoverProps) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<ProductFilters>(filters)

  useEffect(() => {
    if (open) {
      setDraft(filters)
    }
  }, [open, filters])

  function update(partial: Partial<ProductFilters>) {
    setDraft((current) => ({ ...current, ...partial }))
  }

  function handleApply() {
    onFiltersChange(draft)
    setOpen(false)
  }

  function handleReset() {
    onReset()
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="lg" className="relative gap-2 text-foreground">
          <SlidersHorizontal className="size-4" />
          {STRINGS.productGrid.filter}
          {activeCount > 0 && (
            <span className="flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-brand-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-72 p-4">
        <p className="mb-3 text-sm font-semibold text-foreground">{STRINGS.productFilters.title}</p>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="filter-sort">{STRINGS.productFilters.sortBy}</Label>
            <Select
              value={draft.sortBy}
              onValueChange={(value) => update({ sortBy: value as ProductSortOption })}
            >
              <SelectTrigger id="filter-sort" className="h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name-asc">{STRINGS.productFilters.sortNameAsc}</SelectItem>
                <SelectItem value="price-asc">{STRINGS.productFilters.sortPriceAsc}</SelectItem>
                <SelectItem value="price-desc">{STRINGS.productFilters.sortPriceDesc}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>{STRINGS.productFilters.priceRange}</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                inputMode="numeric"
                placeholder={STRINGS.productFilters.minPricePlaceholder}
                value={draft.minPrice}
                onChange={(event) => update({ minPrice: event.target.value })}
                className="h-9"
              />
              <span className="text-muted-foreground">–</span>
              <Input
                type="number"
                min={0}
                inputMode="numeric"
                placeholder={STRINGS.productFilters.maxPricePlaceholder}
                value={draft.maxPrice}
                onChange={(event) => update({ maxPrice: event.target.value })}
                className="h-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="filter-favorites"
              checked={draft.favoritesOnly}
              onCheckedChange={(checked) => update({ favoritesOnly: checked === true })}
            />
            <Label htmlFor="filter-favorites" className="text-sm font-normal text-foreground">
              {STRINGS.productFilters.favoritesOnly}
            </Label>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <button
            type="button"
            onClick={handleReset}
            className={cn(
              'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
              activeCount === 0 && 'pointer-events-none opacity-50',
            )}
          >
            {STRINGS.productFilters.reset}
          </button>
          <Button size="sm" onClick={handleApply}>
            {STRINGS.productFilters.apply}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
