<script lang="ts" setup>
import { ref, toRef } from 'vue';
import draggable from 'vuedraggable';

import { nonull, integer, postive, price } from '@/utils/formRules'
import WarningDialog from '../Dialog/WarningDialog.vue';
import ImageAddDialog from './ImageAddDialog.vue';
import { ProductImage } from '@/entities/ProductImage';
import { useCategoryStore } from '@/stores/productCategorys';

// 参数
const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    categorys: Array
})
const emit = defineEmits(['submit', 'update:modelValue'])

const isValidated = ref(false)
const imageDeleteDialog = ref(false)
const product = toRef(props, 'product')
const _discount = ref<Number>(product.value.discount * 100)
const categoryStore = useCategoryStore()

// 表单规则
const discount = (value: any) => {
    if (value > 100) return '最大值为100'
    return true
}
function discountUpdate(newValue: any) {
    _discount.value = newValue
    product.value.discount = newValue / 100
}
function imageAdd(url: string) {
    const product_image: ProductImage = {
        image_url: url,
        product: product.value.id,
    }
    product.value.images.push(product_image)
}
// 查询商品类id
function categoryUpdate() {
    categoryStore.categorys.forEach((item) => {
        if (item.name == product.value.category.name) {
            product.value.category.id = item.id
        }
    })
}
</script>

// TODO:表单验证
<template>
    <v-form @submit.prevent="() => { if (isValidated) emit('submit') }" v-model="isValidated" required>
        <v-row>
            <!-- 信息 -->
            <v-col cols="12" sm="6" md="3">
                <v-select label="类别" :items="categorys" v-model="product.category.name" :rules="[nonull]"
                    @update:model-value="categoryUpdate" />
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field label="商品名" v-model="product.name" :rules="[nonull]" />
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-text-field label="库存" v-model="product.stock" type="number" :rules="[nonull, postive, integer]" />
            </v-col>

            <!-- 价格 -->
            <v-col cols="12" sm="6" md="4">
                <v-text-field label="价格预览" readonly :model-value="product.price + ' * ' + product.discount +
                    ' = ' + Math.floor(product.price * product.discount * 100) / 100" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field label="价格" v-model="product.price" type="number" required
                    :rules="[nonull, postive, price]" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field label="折扣（%）" v-model="_discount" :counter="3" type="number"
                    @update:model-value="discountUpdate" required :rules="[nonull, postive, integer, discount]" />
            </v-col>

            <!-- 描述 -->
            <v-col cols="12">
                <v-textarea clearable clear-icon="mdi-close-circle" label="商品描述" v-model="product.description" />
            </v-col>

            <!-- 图片 -->
            <v-col cols="12">
                <div class="d-flex align-center">
                    <span>图片</span>
                    <v-btn icon="mdi-plus" size="x-small" variant="text">
                        <i class="mdi-plus mdi v-icon notranslate v-theme--lightTheme v-icon--size-default"
                            aria-hidden="true"></i>
                        <image-add-dialog @submit="imageAdd" />
                    </v-btn>
                </div>
                <v-list lines="one">
                    <draggable :list="product.images" item-key="rank">
                        <template #item="{element, index}">
                            <v-list-item :title="element.image_url" :key="index"
                                variant="tonal" class="mb-2" rounded style="cursor: pointer">
                                <template v-slot:prepend>
                                    <v-img :width="50" aspect-ratio="1/1" cover :src="element.image_url" class="mr-3" />
                                </template>

                                <template v-slot:append>
                                    <v-btn icon="mdi-delete" variant="text">
                                        <i class="mdi-delete mdi v-icon notranslate v-theme--lightTheme v-icon--size-default"
                                            aria-hidden="true"></i>
                                        <warning-dialog v-model="imageDeleteDialog" title="确定要删除吗"
                                            @submit="product.images.splice(index, 1), imageDeleteDialog = false" />
                                    </v-btn>
                                </template>
                            </v-list-item>
                        </template>
                    </draggable>
                </v-list>
            </v-col>
        </v-row>
        <slot name="action"></slot>
    </v-form>
</template>