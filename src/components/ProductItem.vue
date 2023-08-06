<script lang="ts" setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
    product: {
      type: Object,
      required: true
    }
})

const { product } = toRefs(props)
const imageSrc = ref("")
const isError = ref(false)
try {
    imageSrc.value = product.value.images[0].image_url
} catch {
    isError.value = true
}
</script>

<template>
    <div class="ma-2">
        <v-sheet class="elevation-1 rounded-lg bg-white">
            <img :src="imageSrc" class="w-100">
        </v-sheet>
        <div class="product_info d-flex flex-column align-center my-2">
            <p>{{ product.name }}</p>
            <p>￥{{ product.price }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.product_info {
    font-size: 20px;
}
</style>