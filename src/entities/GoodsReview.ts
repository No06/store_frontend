import type { Order } from "./Order"

export interface GoodsReview {
  id?: number
  order?: Order // 与Order的一对一
  userReview?: string
  sellerReview?: string
  userAdditionReview?: string
}
