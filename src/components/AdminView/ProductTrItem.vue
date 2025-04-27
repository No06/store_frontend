<script lang="ts" setup>
import { ref } from 'vue';

import ProductAlterDialog from './ProductAlterDialog.vue';
import WarningDialog from '../Dialog/WarningDialog.vue';
import LoadingDialog from '../Dialog/LoadingDialog.vue';
import { Product } from '../../entities/Product';
import { getProductById } from '../../utils/axios';
import { ProductCategory } from '../../entities/ProductCategory';

const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    categorys: {
        type: Array<ProductCategory>,
        required: true
    },
})
const emit = defineEmits(['updated', 'deleted', 'error'])

const _product = ref<Product>();
const isLoading = ref(false)
const deleteWarningDialog = ref(false)
const showDialog = ref(false)

function emitDeleted() {
    emit('deleted', props.product)
    deleteWarningDialog.value = false
}

function getFullProduct() {
    isLoading.value = true

    getProductById(props.product.id)
        .then((resp) => _product.value = resp.data)
        .catch((e) => emit('error', e))
        .finally(() => {
            isLoading.value = false
            showDialog.value = true
        })
}
</script>

<template>
    <tr>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.discount * 100 }}</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.category.name }}</td>
        <td>
            <v-btn variant="text" icon="mdi-pencil" size="small" @click="getFullProduct">
                <i class="mdi-pencil mdi v-icon notranslate v-theme--lightTheme v-icon--size-default" aria-hidden="true" />
                <product-alter-dialog v-if="!isLoading" v-model="showDialog" lable="修改商品信息" :product="_product!" :categorys="categorys"
                    @submit="emit('updated', _product)" />
                <loading-dialog v-model="isLoading" title="正在获取数据" />
            </v-btn>
            <v-btn variant="text" icon="mdi-delete" size="small">
                <i class="mdi-delete mdi v-icon notranslate v-theme--lightTheme v-icon--size-default" aria-hidden="true" />
                <warning-dialog v-model="deleteWarningDialog" title="确定要删除这件商品吗？" @submit="emitDeleted" />
            </v-btn>
        </td>
    </tr>
</template>