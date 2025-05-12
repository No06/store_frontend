import type { Goods } from "./Goods"

export interface GoodsCategory {
  id?: number
  name?: string
  description?: string
  goodsList?: Goods[] // 与Goods的关联(一对多)
}
