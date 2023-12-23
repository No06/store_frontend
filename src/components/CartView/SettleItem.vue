<script lang="ts" setup>
import type { PropType } from 'vue';
import { type CartVO } from '../../entities/Cart';
import { computed } from 'vue';

const props = defineProps({
    cart: {
        type: Object as PropType<CartVO>,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    }
})
const isOnSale = computed(() => props.cart.product.discount != 1)
</script>

<template>
    <div class="d-flex w-100 flex-nowrap">
        <h3 class="pr-2">{{ index }}.</h3>
        <div class="w-100">
            <v-row no-gutters>
                <v-col>
                    <h3>{{ cart.product.name }}</h3>
                </v-col>
                <h3 class=" align-self-end" style="color:darkgrey;">x {{ cart.quantity }}</h3>
            </v-row>
            <div class="d-flex" style="color: grey;">
                <h4 class="pr-1">
                    {{ cart.product.price }} 
                    {{ isOnSale ? "x " + cart.product.discount : "" }} x {{ cart.quantity }} =
                </h4>
                <h4 :class="{ on_sale: isOnSale }">
                    ￥{{ cart.subtotal }}
                </h4>
            </div>
        </div>
    </div>
</template>

<style scoped>
.on_sale {
    color: green;
}
</style>../../entities/Cart