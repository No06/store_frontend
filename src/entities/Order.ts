import type { Dayjs } from "dayjs"
import type { OrderItem } from "./OrderItem"
import type { UserAddress } from "./UserAddress"
import type { User } from "./User"

export interface Order {
    status: OrderStatus
    user: User
    orderItems: Array<OrderItem>
    userAddress: UserAddress
    createTime: Dayjs
    cancelTime: Dayjs
    payTime: Dayjs
    deliverTime: Dayjs
    reveiveTime: Dayjs
    reviewTime: Dayjs
    finishTime: Dayjs
}

export enum OrderStatus {
    CANCEL = "已取消",
    WAITING_PAY = "待付款",
    PAID = "已付款",
    DELIVERED = "已发货",
    RECEIPTED = "已收货",
    CONFIRMED = "已确收",
    REVIEWED = "待评价"
}