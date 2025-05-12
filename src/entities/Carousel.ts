import type { Goods } from './Goods'

export interface Carousel {
  id?: number
  goods?: Goods // 与Goods的一对一
  title?: string
  description?: string
  subDescription?: string
}
