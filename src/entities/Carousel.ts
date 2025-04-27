import type { ProductImage } from "./ProductImage"

export type Carousel = {
    id: number,
    product_id: number,
    title: string,
    image: ProductImage,
    description: string,
    subDescription?: string
}