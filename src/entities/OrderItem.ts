import type { Order } from "./Order";
import type { Goods } from "./Goods";

export interface OrderItem {
  id?: number
  goods?: Goods // 与Goods的一对一
  order?: Order // 与Order的一对一
  quantity?: number
}