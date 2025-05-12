import type { GoodsCategory } from "./GoodsCategory";
import type { GoodsPhoto } from "./GoodsPhoto";

export interface GoodsShowItem {
    id: number,
    name: string,
    price: number,
    discount: number,
    stock: number,
    category: GoodsCategory,
    photo: GoodsPhoto
}