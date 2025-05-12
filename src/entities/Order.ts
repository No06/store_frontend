import type { OrderItem } from './OrderItem'
import type { UserAddress } from './UserAddress'
import type { User } from './User'
import type { GoodsReview } from './GoodsReview'
import type { OrderStatus } from './enum/OrderStatus'
import type { FieldStatus } from './enum/FieldStatus'

export interface Order {
  id?: number
  status?: OrderStatus
  user?: User // 一对一
  review?: GoodsReview // 一对一
  orderItems?: OrderItem[] // 一对多
  userAddress?: UserAddress // 一对一
  expressNumber?: string
  createTime?: Date
  cancelTime?: Date
  payTime?: Date
  deliverTime?: Date
  receiveTime?: Date
  reviewTime?: Date
  finishTime?: Date
  fieldStatus?: FieldStatus
}
