<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';

const props = defineProps({
    product: {
      type: Object,
      required: true
    }
})
const { product } = toRefs(props)

const imageSrc = ref("")
const imgScale = ref(1)
const isError = ref(false)
const isHover = ref(false)
const isSale = product.value.discount != 0;

try {
    imageSrc.value = product.value.images[0].image_url
} catch {
    isError.value = true
}

watch(
    () => isHover.value,
    (_newValue) => {
        if (_newValue) {
            imgScale.value = 1.05
        } else {
            imgScale.value = 1
        }
    }
)
</script>

<template>
    <div class="ma-2">
        <v-sheet
            class="product_image_box elevation-1 rounded-lg bg-white"
            @mouseover="isHover = true"
            @mouseleave="isHover = false"
        >
            <img class="product_image" :src="imageSrc">
            <div v-if="product.stock <= 0" class="out_of_stock">
                <p class="pa-2">售空</p>
            </div>
        </v-sheet>
        <div 
            class="product_info d-flex flex-column align-center my-2"
            @mouseover="isHover = true"
            @mouseleave="isHover = false"
        >
            <p class="product_name" :class="{ underline: isHover }">{{ product.name }}</p>
            <div class="product_price">
                <p :class="{ original_price: isSale }">￥{{ product.price }}</p>
                <p v-if="isSale" class="current_price">￥{{ product.price * 1 + product.discount }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.product_image_box {
    display: flex;
    align-items: end;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .product_image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(v-bind(imgScale));
        transition: transform 0.3s;
    }
}
.product_info {
    font-size: 20px;
    letter-spacing: 1px;
    text-underline-offset: 5px;
}
.product_price {
    display: flex;
    align-items: center;
    color: crimson;
    .original_price {
        opacity: .5;
        text-decoration: line-through;
        font-size: large;
        margin-right: 5px;
    }
    .current_price {
        color:forestgreen;
    }
}
.underline { 
    text-decoration: underline;
}
.out_of_stock {
    left: 0;
    top: auto;
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    color: dimgrey;
    background: rgba(255, 255, 255, .7);
    backdrop-filter: blur(2px);
    font-size: x-large;
}
</style>