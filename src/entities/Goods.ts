import Decimal from 'decimal.js'
import type { GoodsShowItem } from './GoodsItem'
import type { GoodsCategory } from './GoodsCategory'
import type { GoodsPhoto } from './GoodsPhoto'

export interface Goods {
  id?: number
  name?: string
  price?: number // BigDecimal 可根据需要改为 string
  discount?: number // BigDecimal 可根据需要改为 string
  stock?: number
  description?: string
  category?: GoodsCategory // 多对一
  photos?: GoodsPhoto[] // 一对多
}

export function getFinalPrice(goods: Goods | GoodsShowItem) {
  if (!goods.price || !goods.discount) {
    return '0.00'
  }
  return new Decimal(goods.price).times(goods.discount).toFixed(2, Decimal.ROUND_HALF_EVEN)
}
