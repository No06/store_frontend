<script lang="ts" setup>
import type { PropType } from 'vue';
import { type CartVO } from '@/entities/Cart';
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
    if (nonull(quantity.value.toString()) != true || postive(quantity.value) != true) {
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
        <v-div class="d-flex align-center h-100 ma-4">
            <v-row class="align-center" style="flex-wrap: nowrap;">
                <!-- 选择框 -->
                <div class="d-flex flex-0-0">
                    <v-checkbox class="pl-4 pr-2 align-self-center" v-model="isSelected" hide-details hide-spin-buttons
                        color="primary" />
                </div>
                <!-- 图片 -->
                <div class="flex-0-0" style="width: 80px;">
                    <v-img class="ma-2" aspect-ratio="1" cover :src="cart.product.images[0].image_url" />
                </div>
                <!-- 商品名与描述 -->
                <div class="text-nowrap mx-4" style="display: grid;">
                    <h2 class="text-nowrap overflow-ellipsis">{{ cart.product.name }}</h2>
                    <h3 class="text-nowrap overflow-ellipsis" style="color: grey;">
                        {{ cart.product.description == "" ? "（无描述）" : cart.product.description }}
                    </h3>
                    <!-- {{ cart.product.name }} -->
                </div>
                <v-spacer></v-spacer>
                <!-- 反Row -->
                <div class="d-flex align-center px-4" style="max-width: 500px;">
                    <div v-if="!isOutOfStock" class="d-flex flex-row-reverse align-center">
                        <!-- 总计 -->
                        <div class="d-flex flex-column pr-4 text-nowrap" style="min-width: 100px;">
                            <h3>总计</h3>
                            <h3 class="subtotal">￥{{ cart.subtotal }}</h3>
                        </div>
                        <!-- 加减 -->
                        <div class="d-flex flex-column justify-center pr-6" style="width: 160px;">
                            <v-text-field v-model="quantity" class="centered-input" type="number" density="comfortable"
                                variant="outlined" single-line aria-hidden hide-details hide-spin-buttons
                                style="min-width: 100px; max-width: 150px;" @update:model-value="update" @click.stop
                                :rules="[nonull, postive]">
                                <template v-slot:prepend-inner>
                                    <v-btn icon="mdi-minus" density="comfortable" variant="text" @click.stop="minus" />
                                </template>
                                <template v-slot:append-inner>
                                    <v-btn icon="mdi-plus" density="comfortable" variant="text" @click.stop="plus" />
                                </template>
                            </v-text-field>
                        </div>
                    </div>
                    <!-- 如果没货 -->
                    <h2 v-else>无货</h2>
                    <!-- 删除按钮 -->
                    <v-btn icon="mdi-trash-can-outline" variant="text" @click.stop="showWarningDialog = true"
                            style="pointer-events: all;" />
                </div>
            </v-row>

            <warning-dialog v-model="showWarningDialog" title="确定删除吗？" activator="none" @submit="remove" />
        </v-div>
    </v-card>

    <loading-dialog v-model="isSubmited" title="提交中" />
</template>


<style scoped>
.text-nowrap {
    overflow: hidden;
    white-space: nowrap;
}

.overflow-ellipsis {
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

</style>@/entities/Cart