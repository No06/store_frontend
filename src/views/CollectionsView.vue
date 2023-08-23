<script lang="ts" setup>
import axios from 'axios';
import { ref, toRefs } from 'vue';
import * as qs from 'qs';

import ProductItem from '@/components/CollectionsView/ProductItem.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
import FilterBar from '@/components/CollectionsView/FilterBar.vue';

class searchParams {
    inStock?: boolean
    minPrice?: number
    maxPrice?: number
    category_id: Array<number> = []
}

const props = defineProps({
    url: {
        type: String,
        required: true
    }
})
const { url } = toRefs(props)

const _searchParams = ref(new searchParams)
const products = ref<Array<any>>()
const isLoading = ref(true)
const error = ref<any>(false)

async function init() {
    isLoading.value = true
    error.value = false
    await axios.get(url.value, {
        params: _searchParams.value,
        paramsSerializer: params => {
            return qs.stringify(params, {arrayFormat: 'comma'})
        }
    })
        .then(resp => {products.value = resp.data, console.log(products.value)})
        .catch(e => error.value = e)
        .finally(() => isLoading.value = false)
}
init()
</script>

<template>
    <div class="d-flex h-100">
        <filter-bar :params="_searchParams" @filter="init" @restore="_searchParams = new searchParams(), init()"/>

        <v-divider vertical />

        <v-container v-if="isLoading" class="mx-5">
            <v-row no-gutters>
                <v-col cols="12" md="3">
                    <v-skeleton-loader class="ma-5" max-width="300" type="image, article" />
                </v-col>
            </v-row>
        </v-container>
        <v-list v-else-if="!error" class="pa-5 w-100 h-100">
            <v-row no-gutters>
                <v-col v-for="n in products" :key="n.id" cols="3">
                    <product-item :product="n" />
                </v-col>
            </v-row>
        </v-list>
        <error-message v-else>{{ error.message }}</error-message>
    </div>
</template>