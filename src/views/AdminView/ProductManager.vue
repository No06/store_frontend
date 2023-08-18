<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';

import ErrorMessage from '@/components/ErrorMessage.vue';
import TrItem from '@/components/AdminView/TrItem.vue';
import ToolBar from '@/components/AdminView/ToolBar.vue';

import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
import { Product } from '@/entities/Product';
import { useCategoryStore } from '@/stores/productCategorys';

// 状态
const isLoading = ref(true)
const error = ref<any>(false)
const products = ref<Array<Product>>([])
const obtainedPrds = ref<Array<Product>>([])
const categoryStore = useCategoryStore()

Promise.all([
    axios.get("http://localhost:8080/product/getAll")
        .then(resp => {
            products.value = resp.data
            obtainedPrds.value = products.value
        }),

    axios.get("http://localhost:8080/product/getAllCategory")
        .then(resp => {
            categoryStore.categorys = resp.data
        })
])
    .then(() => isLoading.value = false)
    .catch(e => error.value = e.message)

function deletePrd(index: number) {
    obtainedPrds.value.splice(index, 1)
}
</script>

<template>
    <div v-if="!error" class="d-flex flex-column w-100 pa-4">
        <tool-bar :products="products" v-model="obtainedPrds"/>

        <div class="w-100">
            <v-table fixed-header>
                <thead>
                    <tr>
                        <th class="text-left">
                            名称
                        </th>
                        <th class="text-left">
                            价格(￥)
                        </th>
                        <th class="text-left">
                            折扣
                        </th>
                        <th class="text-left">
                            库存
                        </th>
                        <th class="text-left">
                            类别
                        </th>
                        <th class="text-left">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody v-if="isLoading">
                    <tr>
                        <td colspan="1000">
                            <v-skeleton-loader type="list-item-two-line"/>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr-item v-for="(item, i) in obtainedPrds" :key="i" :product="item" @delete:product="deletePrd(i)"/>
                </tbody>
            </v-table>
        </div>
    </div>

    <error-message v-else>{{ error }}</error-message>
</template>