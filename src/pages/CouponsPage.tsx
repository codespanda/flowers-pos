import { useMemo, useState } from 'react'
import { Search, Tag } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageMain } from '@/components/layout/PageMain'
import { Button } from '@/components/ui/button'
import { CouponsTable } from '@/components/coupons/CouponsTable'
import { CouponFormModal } from '@/components/coupons/CouponFormModal'
import { DeleteCouponDialog } from '@/components/coupons/DeleteCouponDialog'
import { cn } from '@/lib/utils'
import { STRINGS } from '@/config/strings'
import { useCoupons } from '@/context/CouponsContext'
import type { Coupon, CouponStatus } from '@/types'

type StatusFilter = CouponStatus | 'all'

const STATUS_FILTERS: StatusFilter[] = ['all', 'active', 'scheduled', 'expired']

export function CouponsPage() {
  const { coupons } = useCoupons()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [deletingCoupon, setDeletingCoupon] = useState<Coupon | null>(null)

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const matchesStatus = statusFilter === 'all' || coupon.status === statusFilter
      const needle = query.trim().toLowerCase()
      const matchesQuery =
        needle === '' ||
        coupon.code.toLowerCase().includes(needle) ||
        coupon.description.toLowerCase().includes(needle)
      return matchesStatus && matchesQuery
    })
  }, [coupons, query, statusFilter])

  function openAddModal() {
    setEditingCoupon(null)
    setFormModalOpen(true)
  }

  function openEditModal(coupon: Coupon) {
    setEditingCoupon(coupon)
    setFormModalOpen(true)
  }

  return (
    <PageMain>
      <PageHeader
        title={STRINGS.couponsPage.title}
        subtitle={STRINGS.couponsPage.subtitle}
        actions={
          <Button size="lg" className="gap-2" onClick={openAddModal}>
            <Tag className="size-4" />
            {STRINGS.couponsPage.addCoupon}
          </Button>
        }
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
          {STATUS_FILTERS.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                statusFilter === status
                  ? 'bg-brand-muted text-brand'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {status === 'all' ? STRINGS.couponsPage.filterAll : STRINGS.couponStatus[status]}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={STRINGS.couponsPage.searchPlaceholder}
            className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring"
          />
        </div>
      </div>

      <CouponsTable coupons={filteredCoupons} onEdit={openEditModal} onDelete={setDeletingCoupon} />

      <CouponFormModal open={formModalOpen} onOpenChange={setFormModalOpen} coupon={editingCoupon} />

      <DeleteCouponDialog coupon={deletingCoupon} onOpenChange={() => setDeletingCoupon(null)} />
    </PageMain>
  )
}
