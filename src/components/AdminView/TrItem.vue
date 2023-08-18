<script lang="ts" setup>
import { ref } from 'vue';

import ProductAlterDialog from './ProductAlterDialog.vue';
import WarningDialog from '../Dialog/WarningDialog.vue';
import { Product } from '@/entities/Product';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['delete:product'])

const alterDialog = ref(false)

function updateSuccess(newValue: Product) {
    Object.assign(props.product, newValue)
}
// TODO: 删除接口
function submit() {
    emit('delete:product')
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
                <product-alter-dialog :product="product" v-model="alterDialog" @update:product="updateSuccess"/>
            </v-btn>
            <v-btn variant="text" icon="mdi-delete" size="small">
                <i class="mdi-delete mdi v-icon notranslate v-theme--lightTheme v-icon--size-default" aria-hidden="true"/>
                <warning-dialog title="确定要删除这件商品吗？" @submit="submit"/>
            </v-btn>
        </td>
    </tr>
</template>
