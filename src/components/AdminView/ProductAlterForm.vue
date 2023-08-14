<script lang="ts" setup>
import { ref, toRef } from 'vue';

import { nonull, integer, postive } from '@/utils/formRules'
import WarningDialog from '../Dialog/WarningDialog.vue';
import ImageAddDialog from './ImageAddDialog.vue';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})
const _product = toRef(props, 'product')
const _discount = ref<Number>(_product.value.discount * 100)
const _images = ref(_product.value.images.map((image: any) => image.image_url))

// 表单规则
const discount = (value: any) => {
	if (value > 100) return '最大值为100'
	return true
}
function discountUpdate(newValue: any) {
	_discount.value = newValue
	_product.value.discount = newValue / 100
}
</script>

<template>
    <v-row>
        <!-- 信息 -->
        <v-col cols="12" sm="6" md="8">
            <v-text-field label="商品名" v-model="_product.name" :rules="[nonull]" />
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-text-field label="库存" v-model="_product.stock" type="number" :rules="[nonull, postive, integer]" />
        </v-col>

        <!-- 价格 -->
        <v-col cols="12" sm="6" md="4">
            价格预览：
            <p>{{ _product.price }}*{{ _product.discount }} = {{ Math.floor(_product.price *
                _product.discount * 100) / 100 }}</p>
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
                    <image-add-dialog @submit="(url) => _images.push(url)"/>
                </v-btn>
            </div>
            <v-list lines="one">
                <v-list-item v-for="(image, i) in _images" :key="i" :title="image" variant="tonal">
                    <template v-slot:prepend>
                        <v-img :width="50" aspect-ratio="1/1" cover :src="image" class="mr-3" />
                    </template>

                    <template v-slot:append>
                        <v-btn icon="mdi-delete" variant="text">
                            <i class="mdi-delete mdi v-icon notranslate v-theme--lightTheme v-icon--size-default"
                                aria-hidden="true"></i>
                            <warning-dialog title="确定要删除吗" @submit="_images.splice(i, 1)" />
                        </v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-col>
    </v-row>
</template>