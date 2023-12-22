<script lang="ts" setup>
import { ref } from 'vue';

import ProductItem from '@/components/CollectionsView/ProductItem.vue';
import ErrorMessage from '../components/ErrorMessage.vue';
import FilterBar from '@/components/CollectionsView/FilterBar.vue';
import { getAllProdItemsBySpec } from '@/utils/axios';
import type { ProductItemVO } from '@/entities/ProductItem';
import { useSnackBarStore } from '../stores/snack_bar_store';

class searchParams {
    name?: string
    inStock?: boolean
    minPrice?: number
    maxPrice?: number
    category_id: Array<number> = []
}

defineProps({
    url: {
        type: String,
        required: true
    }
})

const _searchParams = ref(new searchParams)
const products = ref<Array<ProductItemVO>>()
const isLoading = ref(true)
const snackBar = useSnackBarStore()

function init() {
    isLoading.value = true
    getAllProdItemsBySpec(_searchParams.value)
        .then(resp => products.value = resp.data)
        .catch(snackBar.showAxiosError)
        .finally(() => isLoading.value = false)
}
init()
</script>

<template>
    <div class="d-flex h-100">
        <filter-bar :params="_searchParams" @filter="init" @restore="_searchParams = new searchParams(), init()"/>

        <v-divider vertical />

        <v-container v-if="isLoading" class="mx-5">
            <v-row>
                <v-col cols="12" md="3">
                    <v-skeleton-loader class="ma-5" max-width="300" type="image, article" />
                </v-col>
            </v-row>
        </v-container>
        <v-list v-else-if="!snackBar.showErrorSnackBar" class="pa-5 w-100 h-100">
            <v-row>
                <v-col v-for="n in products" :key="n.id" cols="3">
                    <product-item :product="n" />
                </v-col>
            </v-row>
        </v-list>
        <error-message v-else>{{ snackBar.errorMsg }}</error-message>
    </div>
</template>@/entities/ProductItem