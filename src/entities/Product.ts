import { ProductCategory } from "./ProductCategory";
import type { ProductImage } from "./ProductImage";

export class Product {
    id?: number
    name: string = ""
    price: number = 0
    discount: number = 1
    stock: number = 0
    description: string = ""
    category: ProductCategory = new ProductCategory
    images: Array<ProductImage> = new Array<ProductImage>
}