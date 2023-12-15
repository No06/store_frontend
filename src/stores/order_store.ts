import type { CartVO } from "@/entities/CartVO";
import type { ProductOrder } from "@/entities/util/ProductOrder";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useOrderStore = defineStore("orderStore", () => {
    const orders = ref<ProductOrder[] | CartVO[]>();
    return { orders };
})