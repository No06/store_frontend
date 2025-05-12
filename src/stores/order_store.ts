import type { Cart } from "@/entities/Cart";
import type { GoodsOrder } from "@/models/GoodsOrder";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useOrderStore = defineStore("orderStore", () => {
    const orders = ref<GoodsOrder[] | Cart[]>();
    return { orders };
})