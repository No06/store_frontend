import type { Cart } from "@/entities/Cart";
import type { ProductOrder } from "@/entities/util/ProductOrder";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useOrderStore = defineStore("orderStore", () => {
    const orders = ref<ProductOrder[] | Cart[]>();
    return { orders };
})