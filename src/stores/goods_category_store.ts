import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { GoodsCategory } from '@/entities/GoodsCategory';

export const useCategoryStore = defineStore('categoryStore', () => {
    const categorys = ref(new Array<GoodsCategory>)
    function getCategorysNames() {
        return categorys.value.map((item) => item.name)
    }
    return { categorys, getCategorysNames }
})