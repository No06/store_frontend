<script setup lang="ts">
import { useOrderStore } from '../stores/order_store';

const orderStore = useOrderStore();
console.log(orderStore.orders);
</script>

<template>
    <div>
        <h1>hello</h1>
    </div>
</template>

<style scoped>

</style>