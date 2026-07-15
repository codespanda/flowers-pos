import { useMemo, useState } from 'react'
import { Search, UserPlus } from 'lucide-react'
import { PageHeader } from '@/components/layout/PageHeader'
import { PageMain } from '@/components/layout/PageMain'
import { CustomerCard } from '@/components/customers/CustomerCard'
import { CustomerFormModal } from '@/components/customers/CustomerFormModal'
import { DeleteCustomerDialog } from '@/components/customers/DeleteCustomerDialog'
import { Button } from '@/components/ui/button'
import { STRINGS } from '@/config/strings'
import { useCustomers } from '@/context/CustomersContext'
import type { Customer } from '@/types'

export function CustomersPage() {
  const { customers } = useCustomers()
  const [query, setQuery] = useState('')
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null)

  const filteredCustomers = useMemo(() => {
    if (query.trim() === '') return customers
    const needle = query.toLowerCase()
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(needle) ||
        customer.email.toLowerCase().includes(needle),
    )
  }, [customers, query])

  function openAddModal() {
    setEditingCustomer(null)
    setFormModalOpen(true)
  }

  function openEditModal(customer: Customer) {
    setEditingCustomer(customer)
    setFormModalOpen(true)
  }

  return (
    <PageMain>
      <PageHeader
        title={STRINGS.customersPage.title}
        subtitle={STRINGS.customersPage.subtitle}
        actions={
          <Button size="lg" className="gap-2" onClick={openAddModal}>
            <UserPlus className="size-4" />
            {STRINGS.customersPage.addCustomer}
          </Button>
        }
      />

      <div className="relative mb-5 max-w-xs">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={STRINGS.customersPage.searchPlaceholder}
          className="h-10 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring"
        />
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
          {STRINGS.customersPage.empty}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onEdit={openEditModal}
              onDelete={setDeletingCustomer}
            />
          ))}
        </div>
      )}

      <CustomerFormModal
        open={formModalOpen}
        onOpenChange={setFormModalOpen}
        customer={editingCustomer}
      />

      <DeleteCustomerDialog customer={deletingCustomer} onOpenChange={() => setDeletingCustomer(null)} />
    </PageMain>
  )
}
