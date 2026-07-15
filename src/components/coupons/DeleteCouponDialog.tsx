import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useCoupons } from '@/context/CouponsContext'
import { STRINGS } from '@/config/strings'
import { interpolate } from '@/lib/utils'
import type { Coupon } from '@/types'

interface DeleteCouponDialogProps {
  coupon: Coupon | null
  onOpenChange: (open: boolean) => void
  onDeleted?: (coupon: Coupon) => void
}

export function DeleteCouponDialog({ coupon, onOpenChange, onDeleted }: DeleteCouponDialogProps) {
  const { deleteCoupon } = useCoupons()

  function handleConfirm() {
    if (!coupon) return
    deleteCoupon(coupon.id)
    toast.success(interpolate(STRINGS.toasts.couponDeleted, { code: coupon.code }))
    onDeleted?.(coupon)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={coupon !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{STRINGS.deleteCouponDialog.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {interpolate(STRINGS.deleteCouponDialog.description, { code: coupon?.code ?? '' })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{STRINGS.deleteCouponDialog.cancel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {STRINGS.deleteCouponDialog.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
