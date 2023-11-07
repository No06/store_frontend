<script lang="ts" setup>
import { clearCart, getCartByUserId, getCartCount } from '../utils/axios';
import { useTokenStore } from '../stores/token_store';
import { ref, computed } from 'vue';
import { type CartVO } from '../entities/CartVO';
import CartItem from '@/components/CartView/CartItem.vue';
import SettleItem from '@/components/CartView/SettleItem.vue';
import WarningDialog from '@/components/Dialog/WarningDialog.vue';
import { useSnackBarStore } from '../stores/snack_bar_store';
import Decimal from 'decimal.js';

const isLoading = ref(false)
const cartItems = ref(new Array<CartVO>)
const tokenStore = useTokenStore()
const count = ref(0)
const snackBarStore = useSnackBarStore()
const showWarningDialog = ref(false)

async function init() {
    isLoading.value = true
    await getCartByUserId(tokenStore.token)
        .then(resp => cartItems.value = resp.data)
        .catch(e => snackBarStore.errorMsg = e.message)
    
    getCartCount(tokenStore.token)
        .then(resp => count.value = resp.data)
        .catch(e => snackBarStore.errorMsg = e.message)
        .finally(() => isLoading.value = false)
}
const sum = computed({
    get: () => {
        let sum = 0;
        for (let i = 0; i < cartItems.value.length; i++) {
            sum += cartItems.value[i].subtotal;
        }
        return sum
    },
    set: () => {}
})
async function clear() {
    isLoading.value = true
    await clearCart(tokenStore.token)
        .catch(e => snackBarStore.errorMsg = e.message)
    init()
}
init()
</script>

<template>
    <div class="d-flex h-100">
        <div v-if="isLoading" class="d-flex align-center justify-center h-100 w-100">
            <v-progress-circular :size="50" color="primary" indeterminate/>
        </div>
        <v-list v-else-if="cartItems.length > 0" class="w-100">
            <div class="list ma-8">
                <h2 class="pb-4">总数：{{ count }}</h2>
                <cart-item v-for="(cart, i) in cartItems" :key="i" :cart="cart" @deleted="init" @changed="init"/>
            </div>
        </v-list>
        <div v-else class="d-flex align-center justify-center w-100 h-100">
            <h1 class="pr-8">¯\_(ツ)_/¯</h1>
            <h1>购物车空空如也...</h1>
        </div>

        <v-divider vertical />

        <div class="d-flex flex-column pa-6">
            <v-list class="h-100" style="min-width: 300px; max-width: 500px;">
                <div class="h-100" style="min-height: 500px;">
                    <h2>购物单</h2>
                    <v-divider class="pb-2"/>
                    <settle-item v-for="(cart, i) in cartItems" :key="i" :cart="cart" :index="i+1"/>
                </div>
            </v-list>

            <v-divider class="py-2"/>
            <div>
                <div class="d-flex align-end">
                    <h3>合计: </h3>
                    <h3 style="color:crimson;">￥</h3>
                    <h1 style="color:crimson;">{{ Decimal.trunc(sum) }}</h1>
                    <h3 style="color:crimson;">.{{ sum.toString().slice(sum.toString().indexOf('.') + 1, sum.toString().indexOf('.') + 3) }}</h3>
                </div>
                <v-row class="pt-6">
                    <v-btn size="large" color="primary" variant="text" rounded>
                        清空购物车
                        <warning-dialog v-model="showWarningDialog" activator="parent" persistent title="确定要清空购物车吗？此操作不可逆！" @submit="clear" />
                    </v-btn>
                    <div class="flex-1-0">
                        <v-btn size="large" color="primary" elevation="0" rounded block>结算</v-btn>
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
    min-height: 600px;
}
.settle {
    color: grey;
    min-height: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>