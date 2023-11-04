<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue';
import CarouselProduct from '@/components/HomeView/CarouselProduct.vue';
import type { ProductItemVO } from '@/entities/ProductItemVO';
import { getProductItemById } from '@/utils/axios';
import { ref } from 'vue';

const products = ref(new Array<ProductItemVO>)
const products_des = [
    {
        title: "秘鲁进口牛油果",
        des: "单果重130g起",
        subDes: "丰富纤维，低卡低糖高能量"
    },
    {
        title: "迪士尼 盲盒手办",
        des: "星际宝贝史迪奇乐在“奇”中"
    }
]
const isLoadding = ref(false)
const errorMsg = ref("")

function addProduct(product: any, index: number) {
    products.value.splice(index, 0, product)
}
function init() {
    const products_id = [44, 39]
    isLoadding.value = true
    errorMsg.value = ""
    Promise.all(
        products_id.map((id, index) => getProductItemById(id).then(resp => addProduct(resp.data, index)))
    )
        .catch(e => errorMsg.value = e.message)
        .finally(() => isLoadding.value = false)
}
init()
</script>

<template>
    <div v-if="isLoadding" class="d-flex align-center justify-center h-100">
        <v-progress-circular :size="50" color="primary" indeterminate/>
    </div>
    <div v-else-if="!errorMsg" class="h-100">
        <v-carousel cycle height="100%" hide-delimiter-background color="rgb(var(--v-theme-primary))" show-arrows="hover">
            <carousel-product v-for="(prod, i) in products" :key="i" :product="prod" :title="products_des[i].title"
                :des="products_des[i].des" :sub-des="products_des[i].subDes" />
        </v-carousel>
    </div>
    <error-message v-else class="h-100">{{ errorMsg }}</error-message>
</template>

<style lang="scss" scoped></style>@/entities/ProductVO