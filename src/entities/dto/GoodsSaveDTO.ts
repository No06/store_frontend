import type { GoodsCategory } from "../GoodsCategory"
import type { GoodsPhotoSaveDTO } from "./GoodsPhotoSaveDTO";

export type GoodsSaveDto = {
    id?: number
    name: string
    price: number // BigDecimal 可根据需要改为 string
    discount: number // BigDecimal 可根据需要改为 string
    stock: number
    description: string
    category: GoodsCategory // 多对一
    photos: GoodsPhotoSaveDTO[] // 一对多
}