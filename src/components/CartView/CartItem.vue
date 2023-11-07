<script lang="ts" setup>
import type { PropType } from 'vue';
import type { CartVO } from '../../entities/CartVO';
import { debounce } from '@/utils/debounce';
import { deleteCart, updateCartQuantity } from '@/utils/axios';
import { ref, toRef } from 'vue';
import { useTokenStore } from '../../stores/token_store';
import { useSnackBarStore } from '@/stores/snack_bar_store';

import LoadingDialog from '@/components/Dialog/LoadingDialog.vue';
import WarningDialog from '@/components/Dialog/WarningDialog.vue';

const props = defineProps({
    cart: {
        type: Object as PropType<CartVO>,
        required: true
    }
})
const emit = defineEmits(['deleted', 'changed'])
const tokenStore = useTokenStore()
const token = tokenStore.token
const cart = props.cart
const quantity = toRef(props.cart.quantity)
const snackBarStore = useSnackBarStore()
const isSubmited = ref(false)
const showWarningDialog = ref(false)

const debounceSave = debounce(
    () => updateCartQuantity(cart.product.id, quantity.value, token)
        .then(() => emit('changed'))
        .catch(e => snackBarStore.errorMsg = e.message),
    1500
)
function min() {
    if (quantity.value > 1) quantity.value -= 1
    debounceSave()
}
function plus() {
    quantity.value++
    debounceSave()
}
function remove() {
    showWarningDialog.value = false
    isSubmited.value = true
    deleteCart(cart.product.id, token)
        .then(() => {
            snackBarStore.successMsg = "删除成功"
            emit('deleted')
        })
        .catch(e => snackBarStore.errorMsg = e.message)
        .finally(() => isSubmited.value = false)
}
</script>

<template>
    <v-sheet class="cart-item mb-4" elevation="3" rounded>
        <v-container class="d-flex align-center h-100">
            <div class="pr-8" style="width: 100px;">
                <v-img aspect-ratio="1" cover :src="cart.product.images[0].image_url" />
            </div>

            <div class="d-flex flex-column">
                <h2 class="text-nowrap">{{ cart.product.name }}</h2>
                <h3 class="text-nowrap">{{ cart.product.description == "" ? "（无描述）" : cart.product.description }}</h3>
            </div>

            <v-spacer />

            <div class="d-flex flex-column pr-6">
                <v-text-field v-model="quantity" class="centered-input" type="number" density="comfortable"
                    variant="outlined" single-line aria-hidden style="max-width: 150px;" hide-details @update:model-value="debounceSave">
                    <template v-slot:prepend-inner>
                        <v-btn icon="mdi-minus" density="comfortable" variant="text" @click="min" />
                    </template>
                    <template v-slot:append-inner>
                        <v-btn icon="mdi-plus" density="comfortable" variant="text" @click="plus" />
                    </template>
                </v-text-field>
            </div>

            <div class="d-flex flex-column pr-4">
                <h3>总计</h3>
                <h3>￥{{ cart.subtotal }}</h3>
            </div>

            <v-btn icon="mdi-trash-can-outline" variant="text" @click="showWarningDialog = true"/>
            <warning-dialog v-model="showWarningDialog" title="确定删除吗？" activator="none" @submit="remove" />
        </v-container>
    </v-sheet>

    <loading-dialog v-model="isSubmited" title="提交中" />
</template>


<style scoped>
.text-nowrap {
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>