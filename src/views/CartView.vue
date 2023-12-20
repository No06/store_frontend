<script lang="ts" setup>
import { clearCart, getCartByUserId } from '@/utils/axios';
import { ref, computed } from 'vue';
import { getProductTotalPrice, type CartVO } from '@/entities/CartVO';
import CartItem from '@/components/CartView/CartItem.vue';
import SettleItem from '@/components/CartView/SettleItem.vue';
import WarningDialog from '@/components/Dialog/WarningDialog.vue';
import { useSnackBarStore } from '@/stores/snack_bar_store';
import Decimal from 'decimal.js';
import router from '@/router';
import { useOrderStore } from '@/stores/order_store';
import { reactive } from 'vue';

const isLoading = ref(false)
const cartItems = ref(new Array<CartVO>)
const count = ref(0)
const snackBarStore = useSnackBarStore()
const showWarningDialog = ref(false)
const selectedItems = reactive(new Set<number>) // 清单展示物品列表
let totalDiscountSum: Decimal // 总优惠金额

//初始化
async function init() {
    isLoading.value = true
    await getCartByUserId()
        .then(resp => {
            cartItems.value = resp.data
            cartItems.value.forEach(updateCart)
            count.value = cartItems.value.length
        })
        .catch(e => snackBarStore.errorMsg = e.message)
        .finally(() => isLoading.value = false)
}
// 总价
const sum = computed({
    get: () => {
        let sum = new Decimal(0);
        totalDiscountSum = new Decimal(0);
        for (let i = 0; i < cartItems.value.length; i++) {
            // 如果是被选中的才被计算到总计
            if (selectedItems.has(i)) {
                const cart = cartItems.value[i];
                sum = sum.plus(cart.subtotal)
                totalDiscountSum = totalDiscountSum.plus(cart.totalDiscount)
            }
        }
        // 四舍六入五成双
        return sum.toFixed(2, Decimal.ROUND_HALF_EVEN);
    },
    set: () => {}
})
// 总价整数部分
const sumInteger = computed({
    get: () => {
        // 减去小数点和后两位
        const integer = sum.value.substring(0, sum.value.length - 3);
        return integer == "" ? 0 : integer;
    },
    set: () => {}
})
// 总价小数部分
const sumDecimal = computed({
    // 自身减去整数部分长度和小数点长度
    get: () => {
        const decimal = sum.value.substring(sum.value.lastIndexOf(".") + 1);
        return decimal == "" 
            ? 0
            : decimal == "00"
                ? "0"
                : decimal;
    },
    set: () => {}
})
// 清空购物车
async function clear() {
    isLoading.value = true
    await clearCart()
        .catch(e => snackBarStore.errorMsg = e.message)
    init()
}
// 结算
function submit() {
    const orderStore = useOrderStore()
    orderStore.orders = cartItems.value;
    router.push("/order");
}
// 当购物车发生变化时
function updateCart(cart: CartVO, index: number) {
    const price = getProductTotalPrice(cart)
    cart.subtotal = price.totalPrice
    cart.totalDiscount = price.totalDiscount
    if (cart.isSelected) {
        selectedItems.add(index);
    } else {
        selectedItems.delete(index);
    }
}
init()
</script>

<template>
    <div class="d-flex h-100">
        <!-- 加载界面 -->
        <div v-if="isLoading" class="d-flex align-center justify-center h-100 w-100">
            <v-progress-circular :size="50" color="primary" indeterminate />
        </div>
        <!-- 购物车列表 -->
        <v-list v-else-if="cartItems.length" class="w-100">
            <div class="list ma-8">
                <h2 class="pb-4">总数：{{ count }}</h2>
                <cart-item v-for="(cart, i) in cartItems" :key="i" :cart="cart" @deleted="init"
                    @model-value="(cart) => updateCart(cart, i)" />
            </div>
        </v-list>
        <!-- 当购物车为空时 -->
        <div v-else class="d-flex align-center justify-center w-100 h-100">
            <h1 class="pr-8">¯\_(ツ)_/¯</h1>
            <h1>购物车空空如也...</h1>
        </div>

        <v-divider vertical />
        <!-- 购物清单 -->
        <div class="d-flex flex-column pa-6" style="min-width: 300px; max-width: 500px;">
            <v-list class="h-100">
                <div class="h-100">
                    <h2>购物单</h2>
                    <v-divider class="pb-2" />
                    <settle-item v-for="(index, i) in selectedItems" :key="i" :cart="cartItems[index]" :index="i + 1" />
                </div>
            </v-list>

            <v-divider class="py-2" />
            <div>
                <div class="d-flex align-end text-no-wrap">
                    <h3>合计: </h3>
                    <h3 style="color:crimson;">￥</h3>
                    <!-- 整数 -->
                    <h1 style="color:crimson;">{{ sumInteger }}</h1>
                    <!-- 小数部分 -->
                    <h3 style="color:crimson;">.{{ sumDecimal }}</h3>
                </div>
                <div class="d-flex text-no-wrap">
                    <h3>总优惠金额: </h3>
                    <h3 style="color: green;">￥{{ totalDiscountSum }}</h3>
                </div>
                <v-row class="pt-6">
                    <!-- 清空 -->
                    <v-btn size="large" color="primary" variant="text" rounded>
                        清空购物车
                        <warning-dialog v-model="showWarningDialog" activator="parent" persistent title="确定要清空购物车吗？此操作不可逆！"
                            @submit="clear" />
                    </v-btn>
                    <!-- 结算 -->
                    <div class="flex-1-0">
                        <v-btn size="large" color="primary" elevation="0" @click="submit" rounded block>结算</v-btn>
                    </div>
                </v-row>
            </div>
        </div>
    </div>
</template>

<style scoped>
.list {
    display: flex;
    flex-direction: column;
}

.settle {
    color: grey;
    min-height: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>