import { Mail, MoreVertical, Pencil, Phone, Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CATEGORY_META } from '@/config/categories'
import { STRINGS } from '@/config/strings'
import { formatCurrency, formatRelativeDate } from '@/lib/format'
import { getInitials } from '@/lib/utils'
import type { Customer } from '@/types'

interface CustomerCardProps {
  customer: Customer
  onEdit?: (customer: Customer) => void
  onDelete?: (customer: Customer) => void
}

export function CustomerCard({ customer, onEdit, onDelete }: CustomerCardProps) {
  const category = CATEGORY_META[customer.favoriteCategory]

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-3">
        <Avatar size="lg">
          <AvatarFallback className="bg-brand-muted font-semibold text-brand">
            {getInitials(customer.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{customer.name}</p>
          <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
            <category.icon className="size-3.5" />
            {category.label}
          </p>
        </div>

        {(onEdit || onDelete) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={STRINGS.customersPage.rowActionsLabel}
                className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <MoreVertical className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && (
                <DropdownMenuItem onClick={() => onEdit(customer)}>
                  <Pencil className="size-4" />
                  {STRINGS.customersPage.editAction}
                </DropdownMenuItem>
              )}
              {onDelete && (
                <DropdownMenuItem variant="destructive" onClick={() => onDelete(customer)}>
                  <Trash2 className="size-4" />
                  {STRINGS.customersPage.deleteAction}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="space-y-1.5 text-sm text-muted-foreground">
        <p className="flex items-center gap-2 truncate">
          <Mail className="size-3.5 shrink-0" />
          <span className="truncate">{customer.email}</span>
        </p>
        <p className="flex items-center gap-2">
          <Phone className="size-3.5 shrink-0" />
          {customer.phone}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-border pt-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">{STRINGS.customersPage.totalSpent}</p>
          <p className="font-semibold text-foreground">{formatCurrency(customer.totalSpent)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">
            {customer.orderCount} {STRINGS.customersPage.orders}
          </p>
          <p className="font-semibold text-foreground">
            {STRINGS.customersPage.lastOrder}: {formatRelativeDate(customer.lastOrderAt)}
          </p>
        </div>
      </div>
    </div>
  )
}
