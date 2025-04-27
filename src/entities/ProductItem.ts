import type { ProductCategory } from "./ProductCategory";
import type { ProductImage } from "./ProductImage";

export interface ProductItem {
    id: number,
    name: string,
    price: number,
    discount: number,
    stock: number,
    category: ProductCategory,
    image: ProductImage
}