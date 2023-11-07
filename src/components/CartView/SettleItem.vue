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
    <div class="d-flex">
        <h3 class="pr-2">{{ index }}.</h3>
        <div>
            <h3>{{ cart.product.name }}</h3>
            <h4 style="color: grey;">
                {{ cart.product.price }} x {{ cart.quantity }} = ￥{{ cart.subtotal }}
            </h4>
        </div>
    </div>
</template>