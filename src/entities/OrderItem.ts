import type { OrderVO } from "./Order";
import type { Product } from "./Product";

export interface OrderItemVO {
    id: Number,
    product: Product,
    order: OrderVO,
    quantity: Number
}