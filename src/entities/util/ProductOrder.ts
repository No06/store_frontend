import type { Product } from "../Product";

export type ProductOrder = {
    product: Product;
    quantity: number;
    subtotal: number;
}