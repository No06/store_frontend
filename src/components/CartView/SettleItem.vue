<script lang="ts" setup>
import type { PropType } from 'vue';
import { computed } from 'vue';
import type { CartEntry } from '../../models/CartEntry';

const props = defineProps({
    cartEntry: {
        type: Object as PropType<CartEntry>,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    }
})
const cart = props.cartEntry.cart
const isOnSale = computed(() => props.cartEntry.cart.goodsDiscount != 1)
</script>

<template>
    <div class="d-flex w-100 flex-nowrap">
        <h3 class="pr-2">{{ index }}.</h3>
        <div class="w-100">
            <v-row no-gutters>
                <v-col>
                    <h3>{{ cart.goodsName }}</h3>
                </v-col>
                <h3 class=" align-self-end" style="color:darkgrey;">x {{ cart.quantity }}</h3>
            </v-row>
            <div class="d-flex" style="color: grey;">
                <h4 class="pr-1">
                    {{ cart.goodsPrice }} 
                    {{ isOnSale ? "x " + cart.goodsDiscount : "" }} x {{ cart.quantity }} =
                </h4>
                <h4 :class="{ on_sale: isOnSale }">
                    ￥{{ cartEntry.subtotal }}
                </h4>
            </div>
        </div>
    </div>
</template>

<style scoped>
.on_sale {
    color: green;
}
</style>