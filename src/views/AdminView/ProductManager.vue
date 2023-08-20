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
const error = ref("")
const snackBar = ref()
const products = ref(new Array<Product>)
const showPrds = ref(new Array<Product>)
const categoryStore = useCategoryStore()


async function init() {
    isLoading.value = true
    error.value = ""
    await Promise.all([
        axios.get("http://localhost:8080/product/getAll")
            .then(resp => {
                products.value = resp.data
                showPrds.value = [].concat(resp.data)
            }),

        axios.get("http://localhost:8080/product/getAllCategory")
            .then(resp => {
                categoryStore.categorys = resp.data
            })
    ])
        .catch(e => error.value = e.message)
        .finally(() => isLoading.value = false)
}
init()
</script>

<template>
    <div v-if="!error" class="d-flex flex-column w-100 pa-4">
        <tool-bar :products="products" v-model="showPrds" @update:product="init(), snackBar = '添加成功'"/>

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
                            折扣(%)
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
                            <v-skeleton-loader type="list-item-two-line" />
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr-item v-for="(item, i) in showPrds" :key="i" :product="item" @delete:product="init(), snackBar = '删除成功'"
                        @update:product="init(), snackBar = '修改成功'"/>
                </tbody>
            </v-table>
        </div>
    </div>

    <error-message v-else>{{ error }}</error-message>
    <v-snackbar v-model="snackBar" color="success">
        <v-icon icon="mdi-check" class="mr-2"/>
        {{ snackBar }}
    </v-snackbar>
</template>