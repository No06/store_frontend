<script lang="ts" setup>
import axios from 'axios';
import { ref, toRefs } from 'vue';

import ProductItem from '../components/ProductItem.vue';

const props = defineProps({
    url: String
})
const { url } = toRefs(props)

const products = ref()
const error = ref()
error.value = false

await axios.get(url?.value!)
.then(resp => {
    products.value = resp.data
})
.catch(e => {
    error.value = e
})
</script>

<template>
    <div class="d-flex h-100">
        <div class="filter-bar font-wlcmg">
            <div>
                <p class="">过滤</p>
            </div>
        </div>
        <v-divider vertical/>
        <v-container v-if="!error" class="mx-5">
            <v-row no-gutters>
                <v-col
                    v-for="n in products"
                    :key="n.id"
                    cols="12"
                    sm="3"
                >
                    <product-item :product="n"/>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else class="d-flex justify-center align-center text-h4" style="color: crimson;">
            <p>错误：{{ error.message }}</p>
        </v-container>
    </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "jf-openhuninn";
  src: url("/fonts/jf-openhuninn.woff2") format("woff2");
}
.filter-bar {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 42px;
    font-family: "jf-openhuninn";
}
.font-wlcmg {
  font-family: "jf-openhuninn";
  font-style: normal;
  color: #333333;
}
</style>