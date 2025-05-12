import type { Goods } from "../entities/Goods";

export type GoodsOrder = {
    goods: Goods;
    quantity: number;
    subtotal: number;
}