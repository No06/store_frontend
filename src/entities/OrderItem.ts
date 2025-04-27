import type { Order } from "./Order";
import type { Product } from "./Product";

export interface OrderItem {
    id: Number,
    product: Product,
    order: Order,
    quantity: Number
}