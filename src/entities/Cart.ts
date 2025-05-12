import Decimal from 'decimal.js'
import type { Goods } from './Goods'
import type { User } from './User'

export interface Cart {
  id?: number
  user?: User // 与User的多对一
  goods?: Goods // 与Goods的多对一
  quantity?: number
  isSelected?: boolean
}
