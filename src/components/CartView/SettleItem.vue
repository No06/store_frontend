<script lang="ts" setup>
import type { PropType } from 'vue';
import { type CartVO } from '../../entities/CartVO';

defineProps({
    cart: {
        type: Object as PropType<CartVO>,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    }
})
</script>

<template>
    <div class="d-flex w-100">
        <h3 class="pr-2">{{ index }}.</h3>
        <div class="w-100">
            <v-row no-gutters>
                <v-col>
                    <h3>{{ cart.product.name }}</h3>
                </v-col>
                <div class="d-flex align-end">
                    <h3 style="color:darkgrey;">x {{ cart.quantity }}</h3>
                </div>
            </v-row>
            <h4 style="color: grey;">
                {{ cart.product.price }} x {{ cart.quantity }} = ￥{{ cart.subtotal }}
            </h4>
        </div>
    </div>
</template>