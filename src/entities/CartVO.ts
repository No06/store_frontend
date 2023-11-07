import type { Product } from "./Product"

export type CartVO = {
    id: number,
    product: Product,
    quantity: number,
    subtotal: number,
}