import { useEffect, useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCoupons } from '@/context/CouponsContext'
import { STRINGS } from '@/config/strings'
import { interpolate } from '@/lib/utils'
import type { Coupon, CouponDiscountType, CouponStatus } from '@/types'

interface CouponFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Pass an existing coupon to edit it; omit to create a new one. */
  coupon?: Coupon | null
  onSaved?: (coupon: Coupon) => void
}

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden="true">
      *
    </span>
  )
}

const EMPTY_FORM = {
  code: '',
  description: '',
  discountType: 'percentage' as CouponDiscountType,
  value: '',
  minSpend: '',
  usageLimit: '',
  expiresAt: '',
  status: 'active' as CouponStatus,
}

export function CouponFormModal({ open, onOpenChange, coupon, onSaved }: CouponFormModalProps) {
  const { addCoupon, updateCoupon } = useCoupons()
  const isEditMode = Boolean(coupon)

  const [code, setCode] = useState(EMPTY_FORM.code)
  const [description, setDescription] = useState(EMPTY_FORM.description)
  const [discountType, setDiscountType] = useState<CouponDiscountType>(EMPTY_FORM.discountType)
  const [value, setValue] = useState(EMPTY_FORM.value)
  const [minSpend, setMinSpend] = useState(EMPTY_FORM.minSpend)
  const [usageLimit, setUsageLimit] = useState(EMPTY_FORM.usageLimit)
  const [expiresAt, setExpiresAt] = useState(EMPTY_FORM.expiresAt)
  const [status, setStatus] = useState<CouponStatus>(EMPTY_FORM.status)
  const [touched, setTouched] = useState({ code: false, description: false, value: false, expiresAt: false })

  useEffect(() => {
    if (!open) return
    if (coupon) {
      setCode(coupon.code)
      setDescription(coupon.description)
      setDiscountType(coupon.discountType)
      setValue(String(coupon.value))
      setMinSpend(coupon.minSpend ? String(coupon.minSpend) : '')
      setUsageLimit(coupon.usageLimit ? String(coupon.usageLimit) : '')
      setExpiresAt(coupon.expiresAt)
      setStatus(coupon.status)
    } else {
      setCode(EMPTY_FORM.code)
      setDescription(EMPTY_FORM.description)
      setDiscountType(EMPTY_FORM.discountType)
      setValue(EMPTY_FORM.value)
      setMinSpend(EMPTY_FORM.minSpend)
      setUsageLimit(EMPTY_FORM.usageLimit)
      setExpiresAt(EMPTY_FORM.expiresAt)
      setStatus(EMPTY_FORM.status)
    }
    setTouched({ code: false, description: false, value: false, expiresAt: false })
  }, [open, coupon])

  const numericValue = Number(value)
  const codeValid = code.trim() !== ''
  const descriptionValid = description.trim() !== ''
  const valueValid = value.trim() !== '' && numericValue > 0 && (discountType !== 'percentage' || numericValue <= 100)
  const expiresValid = expiresAt.trim() !== ''
  const isFormValid = codeValid && descriptionValid && valueValid && expiresValid

  const showCodeError = touched.code && !codeValid
  const showDescriptionError = touched.description && !descriptionValid
  const showValueError = touched.value && !valueValid
  const showExpiresError = touched.expiresAt && !expiresValid

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isFormValid) return

    const input = {
      code: code.trim(),
      description: description.trim(),
      discountType,
      value: numericValue,
      minSpend: minSpend.trim() === '' ? undefined : Number(minSpend),
      usageLimit: usageLimit.trim() === '' ? undefined : Number(usageLimit),
      expiresAt,
      status,
    }
    const saved = isEditMode ? updateCoupon(coupon!.id, input) : addCoupon(input)
    toast.success(
      interpolate(isEditMode ? STRINGS.toasts.couponUpdated : STRINGS.toasts.couponAdded, {
        code: saved.code,
      }),
    )
    onSaved?.(saved)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit} noValidate>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? STRINGS.couponFormModal.editTitle : STRINGS.couponFormModal.addTitle}
            </DialogTitle>
            <DialogDescription>
              {isEditMode ? STRINGS.couponFormModal.editDescription : STRINGS.couponFormModal.addDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="coupon-code">
                  {STRINGS.couponFormModal.code} <RequiredMark />
                </Label>
                <Input
                  id="coupon-code"
                  value={code}
                  onChange={(event) => setCode(event.target.value.toUpperCase())}
                  onBlur={() => setTouched((current) => ({ ...current, code: true }))}
                  placeholder={STRINGS.couponFormModal.codePlaceholder}
                  className="h-10 font-mono uppercase"
                  aria-invalid={showCodeError}
                  autoFocus
                />
                {showCodeError && (
                  <p className="text-xs text-destructive">{STRINGS.couponFormModal.codeRequired}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="coupon-status">{STRINGS.couponFormModal.status}</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as CouponStatus)}>
                  <SelectTrigger id="coupon-status" className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">{STRINGS.couponStatus.active}</SelectItem>
                    <SelectItem value="scheduled">{STRINGS.couponStatus.scheduled}</SelectItem>
                    <SelectItem value="expired">{STRINGS.couponStatus.expired}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="coupon-description">
                {STRINGS.couponFormModal.description} <RequiredMark />
              </Label>
              <Input
                id="coupon-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, description: true }))}
                placeholder={STRINGS.couponFormModal.descriptionPlaceholder}
                className="h-10"
                aria-invalid={showDescriptionError}
              />
              {showDescriptionError && (
                <p className="text-xs text-destructive">{STRINGS.couponFormModal.descriptionRequired}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="coupon-discount-type">{STRINGS.couponFormModal.discountType}</Label>
                <Select
                  value={discountType}
                  onValueChange={(v) => setDiscountType(v as CouponDiscountType)}
                >
                  <SelectTrigger id="coupon-discount-type" className="h-10 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">{STRINGS.couponFormModal.percentage}</SelectItem>
                    <SelectItem value="fixed">{STRINGS.couponFormModal.fixed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="coupon-value">
                  {STRINGS.couponFormModal.value} <RequiredMark />
                </Label>
                <Input
                  id="coupon-value"
                  type="number"
                  min={0}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  onBlur={() => setTouched((current) => ({ ...current, value: true }))}
                  className="h-10"
                  aria-invalid={showValueError}
                />
                {showValueError && (
                  <p className="text-xs text-destructive">
                    {discountType === 'percentage' && numericValue > 100
                      ? STRINGS.couponFormModal.percentageMax
                      : STRINGS.couponFormModal.valueRequired}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="coupon-min-spend">{STRINGS.couponFormModal.minSpend}</Label>
                <Input
                  id="coupon-min-spend"
                  type="number"
                  min={0}
                  value={minSpend}
                  onChange={(event) => setMinSpend(event.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="coupon-usage-limit">{STRINGS.couponFormModal.usageLimit}</Label>
                <Input
                  id="coupon-usage-limit"
                  type="number"
                  min={0}
                  value={usageLimit}
                  onChange={(event) => setUsageLimit(event.target.value)}
                  className="h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="coupon-expires">
                {STRINGS.couponFormModal.expiresAt} <RequiredMark />
              </Label>
              <Input
                id="coupon-expires"
                type="date"
                value={expiresAt}
                onChange={(event) => setExpiresAt(event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, expiresAt: true }))}
                className="h-10"
                aria-invalid={showExpiresError}
              />
              {showExpiresError && (
                <p className="text-xs text-destructive">{STRINGS.couponFormModal.expiresRequired}</p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {STRINGS.couponFormModal.cancel}
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="bg-brand text-brand-foreground hover:bg-brand/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {isEditMode ? STRINGS.couponFormModal.editSubmit : STRINGS.couponFormModal.addSubmit}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
