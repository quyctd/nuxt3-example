import { InventoryItem } from './inventory'

export interface Apartment {
  id: number | string
  image: string
  address: string
  floor: number
  door: number
  inventory: InventoryItem[]
}
