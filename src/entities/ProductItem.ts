import type { ProductCategoryVO } from "./ProductCategory";
import type { ProductImage } from "./ProductImage";

export interface ProductItemVO {
    id: number,
    name: string,
    price: number,
    discount: number,
    stock: number,
    category: ProductCategoryVO,
    image: ProductImage
}