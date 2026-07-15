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
import { useCustomers } from '@/context/CustomersContext'
import { CATEGORY_META, CATEGORY_ORDER } from '@/config/categories'
import { STRINGS } from '@/config/strings'
import { interpolate, isValidEmail } from '@/lib/utils'
import type { Customer, ProductCategory } from '@/types'

interface CustomerFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Pass an existing customer to edit it; omit to create a new one. */
  customer?: Customer | null
  onSaved?: (customer: Customer) => void
}

function RequiredMark() {
  return (
    <span className="text-destructive" aria-hidden="true">
      *
    </span>
  )
}

const EMPTY_FORM = { name: '', email: '', phone: '', favoriteCategory: 'bouquets' as ProductCategory }

export function CustomerFormModal({ open, onOpenChange, customer, onSaved }: CustomerFormModalProps) {
  const { addCustomer, updateCustomer } = useCustomers()
  const isEditMode = Boolean(customer)

  const [name, setName] = useState(EMPTY_FORM.name)
  const [email, setEmail] = useState(EMPTY_FORM.email)
  const [phone, setPhone] = useState(EMPTY_FORM.phone)
  const [favoriteCategory, setFavoriteCategory] = useState<ProductCategory>(EMPTY_FORM.favoriteCategory)
  const [touched, setTouched] = useState({ name: false, email: false, phone: false })

  useEffect(() => {
    if (!open) return
    if (customer) {
      setName(customer.name)
      setEmail(customer.email)
      setPhone(customer.phone)
      setFavoriteCategory(customer.favoriteCategory)
    } else {
      setName(EMPTY_FORM.name)
      setEmail(EMPTY_FORM.email)
      setPhone(EMPTY_FORM.phone)
      setFavoriteCategory(EMPTY_FORM.favoriteCategory)
    }
    setTouched({ name: false, email: false, phone: false })
  }, [open, customer])

  const nameValid = name.trim() !== ''
  const emailValid = isValidEmail(email)
  const phoneValid = phone.trim() !== ''
  const isFormValid = nameValid && emailValid && phoneValid

  const showNameError = touched.name && !nameValid
  const showEmailError = touched.email && !emailValid
  const showPhoneError = touched.phone && !phoneValid

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isFormValid) return

    const input = { name: name.trim(), email: email.trim(), phone: phone.trim(), favoriteCategory }
    const saved = isEditMode ? updateCustomer(customer!.id, input) : addCustomer(input)
    toast.success(
      interpolate(isEditMode ? STRINGS.toasts.customerUpdated : STRINGS.toasts.customerAdded, {
        name: saved.name,
      }),
    )
    onSaved?.(saved)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} noValidate>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? STRINGS.customerFormModal.editTitle : STRINGS.customerFormModal.addTitle}
            </DialogTitle>
            <DialogDescription>
              {isEditMode
                ? STRINGS.customerFormModal.editDescription
                : STRINGS.customerFormModal.addDescription}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="customer-name">
                {STRINGS.customerFormModal.name} <RequiredMark />
              </Label>
              <Input
                id="customer-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={() => setTouched((current) => ({ ...current, name: true }))}
                placeholder={STRINGS.customerFormModal.namePlaceholder}
                className="h-10"
                aria-invalid={showNameError}
                autoFocus
              />
              {showNameError && (
                <p className="text-xs text-destructive">{STRINGS.customerFormModal.nameRequired}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="customer-email">
                  {STRINGS.customerFormModal.email} <RequiredMark />
                </Label>
                <Input
                  id="customer-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                  placeholder={STRINGS.customerFormModal.emailPlaceholder}
                  className="h-10"
                  aria-invalid={showEmailError}
                />
                {showEmailError && (
                  <p className="text-xs text-destructive">{STRINGS.customerFormModal.emailInvalid}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="customer-phone">
                  {STRINGS.customerFormModal.phone} <RequiredMark />
                </Label>
                <Input
                  id="customer-phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
                  placeholder={STRINGS.customerFormModal.phonePlaceholder}
                  className="h-10"
                  aria-invalid={showPhoneError}
                />
                {showPhoneError && (
                  <p className="text-xs text-destructive">{STRINGS.customerFormModal.phoneRequired}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="customer-category">{STRINGS.customerFormModal.favoriteCategory}</Label>
              <Select
                value={favoriteCategory}
                onValueChange={(value) => setFavoriteCategory(value as ProductCategory)}
              >
                <SelectTrigger id="customer-category" className="h-10 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_ORDER.map((category) => (
                    <SelectItem key={category} value={category}>
                      {CATEGORY_META[category].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {STRINGS.customerFormModal.cancel}
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid}
              className="bg-brand text-brand-foreground hover:bg-brand/90 disabled:pointer-events-none disabled:opacity-50"
            >
              {isEditMode ? STRINGS.customerFormModal.editSubmit : STRINGS.customerFormModal.addSubmit}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
