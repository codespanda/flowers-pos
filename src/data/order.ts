import type { OrderCustomer, OrderItem } from '@/types'
import { getProductById } from './products'

export const INITIAL_CUSTOMER: OrderCustomer = {
  name: 'Emma R.',
  fulfillment: 'Pickup today',
}

export const INITIAL_ORDER_ITEMS: OrderItem[] = [
  { id: 'item-1', product: getProductById('sunset-marigold-bouquet')!, quantity: 1 },
  { id: 'item-2', product: getProductById('ivory-peony-arrangement')!, quantity: 1 },
  { id: 'item-3', product: getProductById('succulent-trio-planter')!, quantity: 2 },
]

export const DELIVERY_DISCOUNT = 10
