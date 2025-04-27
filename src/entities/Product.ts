import Decimal from "decimal.js";
import { ProductCategory } from "./ProductCategory";
import type { ProductImage } from "./ProductImage";
import type { ProductItem } from "./ProductItem";

export class Product {
    id!: number;
    name: string = ""
    price: number = 0
    discount: number = 1
    stock: number = 0
    description: string = ""
    category: ProductCategory = new ProductCategory
    images: Array<ProductImage> = new Array<ProductImage>
}

export function getFinalPrice(product: Product | ProductItem) {
    return new Decimal(product.price).times(product.discount).toFixed(2, Decimal.ROUND_HALF_EVEN);
}