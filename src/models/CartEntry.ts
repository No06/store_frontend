import type { CartVO } from '@/entities/vo/CartVO'
import Decimal from 'decimal.js'

export type CartEntry = {
  cart: CartVO
  subtotal: Decimal
  totalDiscount: Decimal
}

// 计算总价
export function getGoodsTotalPrice(cartItem: CartVO) {
  const discount = cartItem.goodsDiscount ?? 0
  const quantity = cartItem.quantity ?? 0
  const totalPrice = new Decimal(cartItem.goodsPrice ?? 0).times(quantity)

  // 优惠后价格
  const afterDiscountPrice = totalPrice.times(discount)
  // 总优惠价格
  const totalDiscount = totalPrice.minus(afterDiscountPrice)
  // 返回四舍六入五成双 优惠后的价格 和 总优惠价格
  return {
    totalPrice: new Decimal(afterDiscountPrice.toFixed(2, Decimal.ROUND_HALF_EVEN)),
    totalDiscount: new Decimal(totalDiscount.toFixed(2, Decimal.ROUND_HALF_EVEN))
  }
}
