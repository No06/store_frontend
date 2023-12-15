import Decimal from "decimal.js";
import type { Product } from "./Product"

export type CartVO = {
    id: number,
    product: Product,
    quantity: number,
    subtotal: Decimal, // 总价
    isSelected: Boolean, // 选中状态
}
// 计算总价
export function getProductTotalPrice(cartItem: CartVO) {
    const price = new Decimal(cartItem.product.price);
    const discount = new Decimal(cartItem.product.discount);
    const quantity = new Decimal(cartItem.quantity);
    const sum = price.times(discount).times(quantity);
    return new Decimal(sum.toFixed(2, Decimal.ROUND_HALF_EVEN));
}