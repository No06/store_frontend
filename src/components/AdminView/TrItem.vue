<script lang="ts" setup>
import { ref } from 'vue';

import ProductAlterDialog from './ProductAlterDialog.vue';
import WarningDialog from '../Dialog/WarningDialog.vue';

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['delete'])

const alterDialog = ref(false)
const successSnackBar = ref(false)

function updatePrd(newValue: any) {
    Object.assign(props.product, newValue)
}
function updateSuccess() {
    successSnackBar.value = true
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
                <product-alter-dialog :product="product" v-model="alterDialog" @update:product="updatePrd" @success="updateSuccess"/>
            </v-btn>
            <v-btn variant="text" icon="mdi-delete" size="small">
                <i class="mdi-delete mdi v-icon notranslate v-theme--lightTheme v-icon--size-default" aria-hidden="true"/>
                <warning-dialog title="确定要删除这件商品吗？" @submit="emit('delete')"/>
            </v-btn>
        </td>
    </tr>
    <v-snackbar v-model="successSnackBar" color="success">
        <v-icon icon="mdi-check" class="mr-2"/>
        执行成功
    </v-snackbar>
</template>
