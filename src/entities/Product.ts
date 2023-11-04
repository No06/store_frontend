import { ProductCategoryVO } from "./ProductCategoryVO";
import type { ProductImage } from "./ProductImage";

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