<script lang="ts" setup>
import { computed, ref, toRef } from 'vue';

import { nonull, integer, postive } from '@/utils/formRules'
import WarningDialog from '../Dialog/WarningDialog.vue';
import ImageAddDialog from './ImageAddDialog.vue';

interface ProductImage {
    image_url: string
    product: number
}

const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    modelValue: Boolean
})
const emit = defineEmits(['submit', 'update:modelValue'])
const modelValue = computed({
    get: () => props.modelValue,
    set: (val: boolean) => {
        emit('update:modelValue', val)
    }
})

const _product = toRef(props, 'product')
const _discount = ref<Number>(_product.value.discount * 100)

// 表单规则
const discount = (value: any) => {
	if (value > 100) return '最大值为100'
	return true
}
function discountUpdate(newValue: any) {
	_discount.value = newValue
	_product.value.discount = newValue / 100
}
function imageAdd(url: string) {
    const product_image: ProductImage = {
        image_url: url,
        product: _product.value.id,
    }
    _product.value.images.push(product_image)
}
</script>

// TODO:表单验证
<template>
    <v-form @submit.prevent="emit('submit')" v-model="modelValue">
        <v-row>
            <!-- 信息 -->
            <v-col cols="12" sm="6" md="3">
                <v-combobox label="类别" v-model="_product.category.name"/>
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field label="商品名" v-model="_product.name" :rules="[nonull]" />
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-text-field label="库存" v-model="_product.stock" type="number" :rules="[nonull, postive, integer]" />
            </v-col>

            <!-- 价格 -->
            <v-col cols="12" sm="6" md="4">
                <v-text-field label="价格预览" readonly
                    :model-value="_product.price+' * '+_product.discount+
                        ' = '+Math.floor(_product.price * _product.discount * 100) / 100"
                />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field label="价格" v-model="_product.price" type="number" :rules="[nonull, postive]" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field label="折扣" v-model="_discount" :counter="3" type="number" @update:model-value="discountUpdate"
                    :rules="[nonull, postive, integer, discount]" />
            </v-col>

            <!-- 描述 -->
            <v-col cols="12">
                <v-textarea clearable clear-icon="mdi-close-circle" label="商品描述" v-model="_product.description" />
            </v-col>

            <!-- 图片 -->
            <v-col cols="12">
                <div class="d-flex align-center">
                    <span>图片</span>
                    <v-btn icon="mdi-plus" size="x-small" variant="text">
                        <i class="mdi-plus mdi v-icon notranslate v-theme--lightTheme v-icon--size-default"
                            aria-hidden="true"></i>
                        <image-add-dialog @submit="imageAdd"/>
                    </v-btn>
                </div>
                <v-list lines="one">
                    <v-list-item v-for="(image, i) in _product.images" :key="i" :title="image.image_url" variant="tonal">
                        <template v-slot:prepend>
                            <v-img :width="50" aspect-ratio="1/1" cover :src="image.image_url" class="mr-3" />
                        </template>

                        <template v-slot:append>
                            <v-btn icon="mdi-delete" variant="text">
                                <i class="mdi-delete mdi v-icon notranslate v-theme--lightTheme v-icon--size-default"
                                    aria-hidden="true"></i>
                                <warning-dialog title="确定要删除吗" @submit="_product.images.splice(i, 1)" />
                            </v-btn>
                        </template>
                    </v-list-item>
                </v-list>
            </v-col>
        </v-row>
    </v-form>
</template>