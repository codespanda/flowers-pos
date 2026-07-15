import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { CUSTOMERS } from '@/data/customers'
import type { Customer, NewCustomerInput } from '@/types'

interface CustomersContextValue {
  customers: Customer[]
  addCustomer: (input: NewCustomerInput) => Customer
  updateCustomer: (id: string, input: NewCustomerInput) => Customer
  deleteCustomer: (id: string) => void
}

const CustomersContext = createContext<CustomersContextValue | null>(null)

export function CustomersProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<Customer[]>(CUSTOMERS)

  function addCustomer(input: NewCustomerInput): Customer {
    const newCustomer: Customer = {
      id: `customer-${Date.now()}`,
      name: input.name,
      email: input.email,
      phone: input.phone,
      favoriteCategory: input.favoriteCategory,
      orderCount: 0,
      totalSpent: 0,
      lastOrderAt: new Date().toISOString(),
    }
    setCustomers((current) => [newCustomer, ...current])
    return newCustomer
  }

  function updateCustomer(id: string, input: NewCustomerInput): Customer {
    let updated: Customer | undefined
    setCustomers((current) =>
      current.map((customer) => {
        if (customer.id !== id) return customer
        updated = { ...customer, ...input }
        return updated
      }),
    )
    return updated ?? { id, orderCount: 0, totalSpent: 0, lastOrderAt: new Date().toISOString(), ...input }
  }

  function deleteCustomer(id: string) {
    setCustomers((current) => current.filter((customer) => customer.id !== id))
  }

  const value = useMemo(
    () => ({ customers, addCustomer, updateCustomer, deleteCustomer }),
    [customers],
  )

  return <CustomersContext.Provider value={value}>{children}</CustomersContext.Provider>
}

export function useCustomers(): CustomersContextValue {
  const context = useContext(CustomersContext)
  if (!context) {
    throw new Error('useCustomers must be used within a CustomersProvider')
  }
  return context
}
