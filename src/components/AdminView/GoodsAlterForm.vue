<script lang="ts" setup>
import { ref, toRef } from 'vue';
import draggable from 'vuedraggable';

import { nonull, integer, natural, price } from '@/utils/formRules'
import WarningDialog from '../Dialog/WarningDialog.vue';
import ImageAddDialog from './ImageAddDialog.vue';
import type { PropType } from 'vue';
import { getFinalPrice } from '@/entities/Goods';
import type { GoodsCategory } from '@/entities/GoodsCategory';
import type { GoodsSaveDto } from '../../entities/dto/GoodsSaveDTO';
import type { GoodsPhotoSaveDTO } from '@/entities/dto/GoodsPhotoSaveDTO';

// 参数
const props = defineProps({
    goods: {
        type: Object as PropType<GoodsSaveDto>,
        default: {}
    },
    categorys: Array
})
const emit = defineEmits(['submit'])

const isValidated = ref(false)
const goods = toRef(props, 'goods')
const _discount = ref<Number>(goods.value.discount ?? 0 * 100)

// 表单规则
const discount = (value: any) => {
    if (value > 100) return '最大值为100'
    return true
}
function discountUpdate(newValue: any) {
    _discount.value = newValue
    goods.value.discount = newValue / 100
}
function imageAdd(url: string) {
    const goods_photo: GoodsPhotoSaveDTO = {
        photo_url: url,
    }
    goods.value.photos?.push(goods_photo)
}
const mustSelectedRule = (value: string | null) => {
    if (!value) return "不能为空"
    return true
}
// 提交更改
function submit() {
    // 表单验证成功才能提交
    console.log(goods.value)
    if (isValidated.value) emit('submit', goods.value)
}
</script>

<template>
    <v-form @submit.prevent="submit" v-model="isValidated" required>
        <v-row>
            <!-- 信息 -->
            <v-col cols="12" sm="6" md="3">
                <v-combobox label="类别" v-model="goods.category.name" :items="categorys" item-title="name" item-value="id"
                    :rules="[mustSelectedRule]" return-object @update:menu="console.log(goods.category)" />
            </v-col>
            <v-col cols="12" sm="6" md="6">
                <v-text-field label="商品名" v-model="goods.name" :rules="[nonull]" />
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <v-text-field label="库存" v-model="goods.stock" type="number" :rules="[nonull, natural, integer]" />
            </v-col>

            <!-- 价格 -->
            <v-col cols="12" sm="6" md="4">
                <v-text-field label="价格预览" readonly :model-value="goods.price + ' * ' + goods.discount +
                    ' = ' + getFinalPrice(goods)" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field label="价格" v-model="goods.price" type="number" required :rules="[nonull, natural, price]" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
                <v-text-field label="折扣（%）" v-model="_discount" :counter="3" type="number"
                    @update:model-value="discountUpdate" required :rules="[nonull, natural, integer, discount]" />
            </v-col>

            <!-- 描述 -->
            <v-col cols="12">
                <v-textarea clearable clear-icon="mdi-close-circle" label="商品描述" v-model="goods.description" />
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
                <v-col>
                    <draggable v-model="goods.photos" item-key="rank">
                        <template #item="{ element, index }">
                            <v-list-item :title="element.photo_url" variant="tonal" class="mb-2" rounded
                                style="cursor: pointer">
                                <!-- 图片 -->
                                <template #prepend>
                                    <v-img :width="50" aspect-ratio="1/1" cover :src="element.photo_url" class="mr-3" />
                                </template>
                                <!-- 删除按钮 -->
                                <template #append>
                                    <v-btn icon="mdi-delete" variant="text">
                                        <i class="mdi-delete mdi v-icon notranslate v-icon--size-default" />
                                        <warning-dialog title="确定要删除吗" @submit="goods.photos?.splice(index, 1)" />
                                    </v-btn>
                                </template>
                            </v-list-item>
                        </template>
                    </draggable>
                </v-col>
            </v-col>
        </v-row>
        <slot name="action"></slot>
    </v-form>
</template>