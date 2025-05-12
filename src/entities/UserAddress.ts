import type { User } from "./User"

export interface UserAddress {
  id?: number
  user?: User // 与User的关联
  name?: string
  phone?: string
  address?: string
}
