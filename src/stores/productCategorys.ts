import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProductCategory } from '@/entities/ProductCategory';

export const useCategoryStore = defineStore('categoryStore', () => {
    const categorys = ref(new Array<ProductCategory>)
    function getCategorysNames() {
        return categorys.value.map((item) => item.name)
    }
    return { categorys, getCategorysNames }
})