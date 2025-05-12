<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue';
import type { GoodsShowItem } from '../../entities/GoodsItem';
import type { PropType } from 'vue';
import { getFinalPrice } from '../../entities/Goods';

const props = defineProps({
    goods: {
      type: Object as PropType<GoodsShowItem>,
      required: true
    }
})
const { goods: goods } = toRefs(props)

const imageSrc = ref("")
const imgScale = ref(1)
const isError = ref(false)
const isHover = ref(false)
const isSale = goods.value.discount != 1;
const finalPrice = getFinalPrice(props.goods)

try {
    if (goods.value.photo.photo_url) {
        imageSrc.value = goods.value.photo.photo_url
    }
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
    <v-sheet class="ma-2" @mouseover="isHover = true" @mouseleave="isHover = false" @click="$router.push('/goods/'+goods.id)" style="cursor: pointer;">
        <v-sheet class="goods_image_box elevation-1 rounded-lg bg-white">
            <img class="goods_photo" :src="imageSrc">
            <div v-if="goods.stock <= 0" class="out_of_stock">
                <p class="py-2">无货</p>
            </div>
        </v-sheet>
        
        <div class="goods_info d-flex flex-column align-center my-2">
            <p class="goods_name" :class="{ underline: isHover }" style="">{{ goods.name }}</p>
            <div class="goods_price">
                <p :class="{ original_price: isSale }">￥{{ goods.price }}</p>
                <p v-if="isSale" class="current_price">￥{{ finalPrice }}</p>
            </div>
        </div>
    </v-sheet>
</template>

<style lang="scss" scoped>
.goods_image_box {
    display: flex;
    align-items: end;
    position: relative;
    overflow: hidden;
    .goods_photo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scale(v-bind(imgScale));
        transition: transform 0.3s;
    }
}
.goods_info {
    font-size: 15px;
    letter-spacing: 1px;
    text-underline-offset: 5px;
    .goods_name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
.goods_price {
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
</style>