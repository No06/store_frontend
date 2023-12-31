<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import type { ProductItemVO } from '../../entities/ProductItem';
import type { PropType } from 'vue';
import { getFinalPrice } from '../../entities/Product';

const props = defineProps({
    product: {
      type: Object as PropType<ProductItemVO>,
      required: true
    }
})
const { product } = toRefs(props)

const imageSrc = ref("")
const imgScale = ref(1)
const isError = ref(false)
const isHover = ref(false)
const isSale = product.value.discount != 1;
const finalPrice = getFinalPrice(props.product)

try {
    imageSrc.value = product.value.image.image_url
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
    <v-sheet class="ma-2" @mouseover="isHover = true" @mouseleave="isHover = false" @click="$router.push('/product/'+product.id)" style="cursor: pointer;">
        <v-sheet class="product_image_box elevation-1 rounded-lg bg-white">
            <img class="product_image" :src="imageSrc">
            <div v-if="product.stock <= 0" class="out_of_stock">
                <p class="py-2">无货</p>
            </div>
        </v-sheet>
        
        <div class="product_info d-flex flex-column align-center my-2">
            <p class="product_name" :class="{ underline: isHover }">{{ product.name }}</p>
            <div class="product_price">
                <p :class="{ original_price: isSale }">￥{{ product.price }}</p>
                <p v-if="isSale" class="current_price">￥{{ finalPrice }}</p>
            </div>
        </div>
    </v-sheet>
</template>

<style lang="scss" scoped>
.product_image_box {
    display: flex;
    align-items: end;
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
        color: black;
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
    display: block;
    position: absolute;
    display: flex;
    justify-content: center;
    color: dimgrey;
    background: rgba(212, 212, 212, 0.7);
    backdrop-filter: blur(2px);
    font-size: x-large;
}
</style>../../entities/ProductItemVO../../entities/ProductItem