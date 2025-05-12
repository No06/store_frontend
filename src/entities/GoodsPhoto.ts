import type { Goods } from "./Goods"

export interface GoodsPhoto {
  id?: number
  photo_url?: string
  goods?: Goods // 与Goods的多对一关联
  rank?: number
}
