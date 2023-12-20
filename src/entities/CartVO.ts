import Decimal from "decimal.js";
import type { Product } from "./Product"

export type CartVO = {
    id: number,
    product: Product,
    quantity: number,
    subtotal: Decimal, // 总价 （非数据库字段）
    isSelected: Boolean, // 选中状态
    totalDiscount: Decimal // 总优惠金额（非数据库字段）
}
// 计算总价
export function getProductTotalPrice(cartItem: CartVO) {
    const discount = cartItem.product.discount;
    const quantity = cartItem.quantity;
    const totalPrice = new Decimal(cartItem.product.price).times(quantity)
    
    // 优惠后价格
    const afterDiscountPrice = totalPrice.times(discount)
    // 总优惠价格
    const totalDiscount = totalPrice.minus(afterDiscountPrice);
    // 返回四舍六入五成双 优惠后的价格 和 总优惠价格
    return {
        totalPrice: new Decimal(afterDiscountPrice.toFixed(2, Decimal.ROUND_HALF_EVEN)),
        totalDiscount: new Decimal(totalDiscount.toFixed(2, Decimal.ROUND_HALF_EVEN))
    };
}