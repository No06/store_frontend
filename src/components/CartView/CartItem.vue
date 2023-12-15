<script lang="ts" setup>
import type { PropType } from 'vue';
import { type CartVO } from '@/entities/CartVO';
import { deleteCart, updateCart } from '@/utils/axios';
import { ref, computed } from 'vue';
import { useSnackBarStore } from '@/stores/snack_bar_store';

import LoadingDialog from '@/components/Dialog/LoadingDialog.vue';
import WarningDialog from '@/components/Dialog/WarningDialog.vue';
import { debounce } from '@/utils/debounce';
import { nonull, postive } from '@/utils/formRules';

const props = defineProps({
    cart: {
        type: Object as PropType<CartVO>,
        required: true
    }
})
const emit = defineEmits(['deleted', 'modelValue'])
const cart = props.cart
const isOutOfStock = cart.product.stock == 0
const quantity = computed({ // 选购数量
    get: () => cart.quantity,
    set: (newVal) => {
        cart.quantity = newVal
        update()
    }
})
const isSelected = computed({ // 选中状态
    get: () => {
        if (isOutOfStock) return false;
        return cart.isSelected;
    },
    set: (newVal) => {
        cart.isSelected = newVal
        update()
    }
})
const snackBarStore = useSnackBarStore()

const isSubmited = ref(false) // 执行状态
const showWarningDialog = ref(false) // 是否展示警告窗
// 更新购物车商品数量
function update() {
    if (quantity.value.toString().length == 0 || quantity.value == 0) {
        return
    }
    emit('modelValue', cart);
    _debounceSave()
}
// 去抖更新商品购买数量
const _debounceSave = debounce(() => {
    _updateCartQuantity()
}, 350)
// 执行数据库购物车商品数量更新
async function _updateCartQuantity() {
    await updateCart(cart)
        .catch(e => snackBarStore.errorMsg = e.message)
}
// 减
function minus() {
    if (quantity.value > 1) quantity.value--
    update()
}
// 加
function plus() {
    quantity.value++
    update()
}
// 删除
function remove() {
    showWarningDialog.value = false
    isSubmited.value = true
    deleteCart(cart.product.id)
        .then(() => {
            snackBarStore.successMsg = "删除成功"
            emit('deleted')
        })
        .catch(e => snackBarStore.errorMsg = e.message)
        .finally(() => isSubmited.value = false)
}
</script>

<template>
    <v-card class="cart-item mb-4" elevation="3" rounded @click="() => { if (!isOutOfStock) isSelected = !isSelected }"
        :disabled="isOutOfStock">
        <v-container class="d-flex align-center h-100">
            <v-checkbox class="pr-2" v-model="isSelected" direction="vertical" hide-details hide-spin-buttons
                color="primary" />

            <div class="d-flex w-100">
                <div class="pr-8" style="width: 100px;">
                    <v-img aspect-ratio="1" cover :src="cart.product.images[0].image_url" />
                </div>
                <div class="d-flex flex-column justify-center">
                    <h2 class="text-nowrap">{{ cart.product.name }}</h2>
                    <h3 class="text-nowrap" style="color: grey;">
                        {{ cart.product.description == "" ? "（无描述）" : cart.product.description }}
                    </h3>
                </div>
            </div>
            <!-- 反Row -->
            <div v-if="!isOutOfStock" class="d-flex flex-row-reverse" style="min-width: 400px; max-width: 500px;">
                <!-- 总计 -->
                <div class="d-flex flex-column pr-4 text-nowrap" style="min-width: 100px;">
                    <h3>总计</h3>
                    <h3 class="subtotal">￥{{ cart.subtotal }}</h3>
                </div>
                <!-- 加减 -->
                <div class="d-flex flex-column justify-center pr-6">
                    <v-text-field v-model="quantity" class="centered-input" type="number" density="comfortable"
                        variant="outlined" single-line aria-hidden style="min-width: 100px; max-width: 150px;" hide-details
                        @update:model-value="update" @click.stop :rules="[nonull, postive]">
                        <template v-slot:prepend-inner>
                            <v-btn icon="mdi-minus" density="comfortable" variant="text" @click.stop="minus" />
                        </template>
                        <template v-slot:append-inner>
                            <v-btn icon="mdi-plus" density="comfortable" variant="text" @click.stop="plus" />
                        </template>
                    </v-text-field>
                </div>
            </div>
            <h2 v-else>无货</h2>

            <v-btn icon="mdi-trash-can-outline" variant="text" @click.stop="showWarningDialog = true"
                style="pointer-events: all;" />
            <warning-dialog v-model="showWarningDialog" title="确定删除吗？" activator="none" @submit="remove" />
        </v-container>
    </v-card>

    <loading-dialog v-model="isSubmited" title="提交中" />
</template>


<style scoped>
.text-nowrap {
    white-space: nowrap;
    text-overflow: ellipsis;
}

.centered-input :deep(input) {
    text-align: center;
}

.subtotal {
    overflow: auto;
}

.subtotal::-webkit-scrollbar {
    display: none;
}
</style>