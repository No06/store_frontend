import type { UserAddress } from "./UserAddress"

export interface User {
  id?: number
  username?: string
  password?: string
  isAdmin?: boolean
  defaultAddress?: UserAddress // 与UserAddress的关联
}
