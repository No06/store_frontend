<script lang="ts" setup>
import { ref } from 'vue';

import ProductAlterDialog from './ProductAlterDialog.vue';
import WarningDialog from '../Dialog/WarningDialog.vue';
import LoadingDialog from '../Dialog/LoadingDialog.vue';
import ErrorDialog from '../Dialog/ErrorDialog.vue';
import { delProductById } from '@/utils/axios';
import { useTokenStore } from '@/stores/token';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['update:product', 'delete:product'])

const alterDialog = ref(false)
const deleteDialog = ref(false)
const isLoading = ref(false)
const errorMsg = ref("")
const tokenStore = useTokenStore()

function submit() {
    isLoading.value = true
    errorMsg.value = ''
    delProductById(props.product.id, tokenStore.token)
        .then(() => {
            isLoading.value = false
            deleteDialog.value = false
            emit('delete:product')
        }).catch(e => {
            errorMsg.value = e.message
        }).finally(() => {
            isLoading.value = false
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
            <v-btn variant="text" icon="mdi-pencil" size="small">
                <i class="mdi-pencil mdi v-icon notranslate v-theme--lightTheme v-icon--size-default" aria-hidden="true"/>
                <product-alter-dialog lable="修改商品信息" :product="product" v-model="alterDialog" @update:product="emit('update:product')"/>
            </v-btn>
            <v-btn variant="text" icon="mdi-delete" size="small">
                <i class="mdi-delete mdi v-icon notranslate v-theme--lightTheme v-icon--size-default" aria-hidden="true"/>
                <warning-dialog v-if="!isLoading && !errorMsg" v-model="deleteDialog" title="确定要删除这件商品吗？" @submit="submit"/>
                <loading-dialog v-else-if="!errorMsg" v-model="deleteDialog" title="请求中"/>
                <error-dialog v-else v-model="deleteDialog" :title="errorMsg" @submit="errorMsg = ''"/>
            </v-btn>
        </td>
    </tr>
</template>
