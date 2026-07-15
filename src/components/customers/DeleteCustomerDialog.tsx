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
import { useCustomers } from '@/context/CustomersContext'
import { STRINGS } from '@/config/strings'
import { interpolate } from '@/lib/utils'
import type { Customer } from '@/types'

interface DeleteCustomerDialogProps {
  customer: Customer | null
  onOpenChange: (open: boolean) => void
  onDeleted?: (customer: Customer) => void
}

export function DeleteCustomerDialog({ customer, onOpenChange, onDeleted }: DeleteCustomerDialogProps) {
  const { deleteCustomer } = useCustomers()

  function handleConfirm() {
    if (!customer) return
    deleteCustomer(customer.id)
    toast.success(interpolate(STRINGS.toasts.customerDeleted, { name: customer.name }))
    onDeleted?.(customer)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={customer !== null} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{STRINGS.deleteCustomerDialog.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {interpolate(STRINGS.deleteCustomerDialog.description, { name: customer?.name ?? '' })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{STRINGS.deleteCustomerDialog.cancel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {STRINGS.deleteCustomerDialog.confirm}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
