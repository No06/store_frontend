<script lang="ts" setup>
import { ref } from 'vue';

import ErrorMessage from '../components/ErrorMessage.vue';
import FilterBar from '@/components/CollectionsView/FilterBar.vue';
import { getAllGoodsShowItemBySpec } from '@/utils/axios';
import type { GoodsShowItem } from '@/entities/GoodsItem';
import GoodsItem from '@/components/CollectionsView/GoodsItem.vue';
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
const goods = ref<Array<GoodsShowItem>>()
const isLoading = ref(true)
const snackBar = useSnackBarStore()

function init() {
    isLoading.value = true
    getAllGoodsShowItemBySpec(_searchParams.value)
        .then(resp => goods.value = resp.data)
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
                <v-col v-for="n in goods" :key="n.id" cols="2">
                    <goods-item :goods="n" />
                </v-col>
            </v-row>
        </v-list>
        <error-message v-else>{{ snackBar.errorMsg }}</error-message>
    </div>
</template>