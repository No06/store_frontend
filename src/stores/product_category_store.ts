import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ProductCategoryVO } from '@/entities/ProductCategory';

export const useCategoryStore = defineStore('categoryStore', () => {
    const categorys = ref(new Array<ProductCategoryVO>)
    function getCategorysNames() {
        return categorys.value.map((item) => item.name)
    }
    return { categorys, getCategorysNames }
})