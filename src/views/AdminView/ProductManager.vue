<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';

import ErrorMessage from '@/components/ErrorMessage.vue';
import TrItem from '@/components/AdminView/TrItem.vue';
import FilterBar from '@/components/AdminView/FilterBar.vue';

import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

// 状态
const isLoading = ref(true)
const error = ref<any>(false)
const products = ref<Array<any>>([])
const obtainedPrds = ref<Array<any>>([])
const categorys = ref<Array<any>>(["全部"])

axios.get("http://localhost:8080/product/getAll")
    .then(resp => {
        products.value = resp.data
        obtainedPrds.value = products.value
    })
    .catch(e => error.value = e.message)
    .finally(() => isLoading.value = false)

axios.get("http://localhost:8080/product/getAllCategory")
    .then(resp => {
        categorys.value = categorys.value.concat(resp.data.map((item: any) => item.name))
    })
    .catch(e => error.value = e.message)
</script>

<template>
    <div v-if="!error" class="d-flex flex-column w-100 pa-4">
        <filter-bar :products="products" :categorys="categorys" v-model:obtained-prds="obtainedPrds"/>

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
                    <tr-item v-for="item in obtainedPrds" :key="item.id" :product="item"/>
                </tbody>
            </v-table>
        </div>
    </div>

    <error-message v-else>{{ error }}</error-message>
</template>