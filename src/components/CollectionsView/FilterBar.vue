<script lang="ts" setup>
import type { GoodsCategoryWithCountVO } from '@/entities/vo/GoodsCountByCategoryVO';
import { getCountGoodsByCategory } from '@/utils/axios';
import { ref } from 'vue';

defineProps({
    params: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['filter', 'restore'])
 
const countGoods = ref<Array<GoodsCategoryWithCountVO>>([])

// 获取商品类型和数量
getCountGoodsByCategory()
    .then(resp => countGoods.value = resp.data)
</script>

<template>
    <v-list class="filter-bar px-10 py-8 h-100">
        <div>
            <span class="title">过滤</span>

            <v-list-subheader title="商品名" />
            <v-list-item>
                <v-text-field v-model="params!.name" density="compact" placeholder="关键词查找" variant="outlined"
                    hide-details />
            </v-list-item>

            <v-list-subheader title="库存" />
            <v-list-item>
                <v-checkbox v-model="params!.inStock" :true-value="true" label="仅看有货" density="compact" hide-details />
            </v-list-item>

            <v-list-subheader title="价格" />
            <v-list-item>
                <v-row class="pa-1">
                    <v-col sm>
                        <v-text-field v-model="params!.minPrice" label="最低价" class="price-input" density="compact"
                            variant="outlined" type="number" single-line hide-details />
                    </v-col>
                    <div class="d-flex align-center" style="width: 20px;">
                        <v-divider />
                    </div>
                    <v-col sm>
                        <v-text-field v-model="params!.maxPrice" label="最高价" class="price-input" density="compact"
                            variant="outlined" type="number" single-line hide-details />
                    </v-col>
                </v-row>
            </v-list-item>

            <v-list-subheader title="类别" />
            <v-list-item>
                <v-checkbox v-for="item, index in countGoods" :key="index" :label="item.category.name + '(' + item.count + ')'"
                    v-model="params!.category_id" :value="item.category.id" density="compact" hide-details />
            </v-list-item>

            <v-row class="mt-5">
                <v-btn size="large" color="primary" variant="text" @click="emit('restore')" rounded>重置</v-btn>
                <div class="flex-1-0">
                    <v-btn size="large" color="primary" elevation="0" @click="console.log(params), emit('filter')" rounded
                        block>查看</v-btn>
                </div>
            </v-row>
        </div>
    </v-list>
</template>

<style lang="scss" scoped>
.filter-bar {
    min-width: 320px;
    max-width: 350px;

    .title {
        font-size: xx-large;
    }

    .price-input {
        min-width: 50px;
    }
}
</style>