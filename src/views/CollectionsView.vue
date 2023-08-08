<script lang="ts" setup>
import axios from 'axios';
import { ref, toRefs } from 'vue';

import ProductItem from '../components/ProductItem.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

const props = defineProps({
    url: String
})
const { url } = toRefs(props)

const products = ref<Array<any>>()
const isLoading = ref(true)
const error = ref<any>(false)

axios.get(url?.value!)
.then(resp => products.value = resp.data)
.catch(e => error.value = e)
.finally(() => isLoading.value = false)
</script>

<template>
    <div class="d-flex h-100">
        <div class="filter-bar">
            <div>
                <p class="">过滤</p>
            </div>
        </div>

        <v-divider vertical/>

        <v-container v-if="isLoading" class="mx-5">
            <v-row no-gutters>
                <v-col cols="12" md="3">
                    <v-skeleton-loader
                        class="ma-5"
                        max-width="300"
                        type="image, article"
                    />
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else-if="!error" class="mx-5">
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
        <error-message v-else>{{ error.message }}</error-message>
    </div>
</template>

<style lang="scss" scoped>
.filter-bar {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 42px;
    font-family: "jf-openhuninn";
}
</style>