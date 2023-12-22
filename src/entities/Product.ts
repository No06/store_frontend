import Decimal from "decimal.js";
import { ProductCategoryVO } from "./ProductCategory";
import type { ProductImage } from "./ProductImage";
import type { ProductItemVO } from "./ProductItem";

export class Product {
    id!: number;
    name: string = ""
    price: number = 0
    discount: number = 1
    stock: number = 0
    description: string = ""
    category: ProductCategoryVO = new ProductCategoryVO
    images: Array<ProductImage> = new Array<ProductImage>
}

export function getFinalPrice(product: Product | ProductItemVO) {
    return new Decimal(product.price).times(product.discount).toFixed(2, Decimal.ROUND_HALF_EVEN);
}