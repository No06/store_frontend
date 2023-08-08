<script lang="ts" setup>
import axios from 'axios';
import { ref } from 'vue';

import ErrorMessage from '@/components/ErrorMessage.vue';
import { boyerMoore } from '@/utils/boyerMorre';

import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

// 状态
const isLoading = ref(true)
const error = ref<any>(false)
const products = ref<Array<any>>([])
const currentPrds = ref<Array<any>>([])
const categorys = ref<Array<any>>(["全部"])
const selectUpdate = ref(false)

// 表单接收
const searchProductName = ref("")
const categorySelect = ref("全部")

axios.get("http://localhost:8080/product/getAll")
    .then(resp => {
        products.value = resp.data
        currentPrds.value = products.value
    })
    .catch(e => error.value = e.message)
    .finally(() => isLoading.value = false)

axios.get("http://localhost:8080/product/getAllCategory")
    .then(resp => {
        categorys.value = categorys.value.concat(resp.data.map((item: any) => item.name))
    })
    .catch(e => error.value = e.message)

function categorySearch(products: any[]) {
    if (categorySelect.value == "全部") return products

    const _products: any[] = []
    products.forEach((i) => {
        if (categorySelect.value == i.category.name) {
            _products.push(i)
        }}
    )
    return _products;
}
function keywordSearch(products: any[]) {
    if (searchProductName.value == "") return products

    const _products: any[] = []
    products.forEach((i) => {
        if (boyerMoore(i.name.toLowerCase(), searchProductName.value.toLowerCase()) != -1) {
            _products.push(i)
        }}
    )
    return _products;
}
function search() {
    const _products = products.value
    currentPrds.value = keywordSearch(categorySearch(_products))
}
</script>

<template>
    <div v-if="!error" class="d-flex flex-column w-100 pa-4">
        <div class="ma-4">
            <v-toolbar-title class="mb-4">数量：{{ currentPrds.length }}</v-toolbar-title>
            <v-form class="d-flex align-center" @submit.prevent="search">
                <v-btn icon="mdi-magnify" variant="text" class="mr-2" type="submit"/>
                <v-select
                    class="mr-5"
                    hide-details
                    label="类别"
                    v-model="categorySelect"
                    :items="categorys"
                    variant="solo-filled"
                    style="min-width: 150px;"
                    @update:menu="search"
                ></v-select>
                <v-text-field
                    v-model="searchProductName"
                    class="flex-1-1-100"
                    clearable
                    hide-details="auto"
                    label="商品名称关键词查找"
                />
            </v-form>
        </div>

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
                <tbody>
                    <tr v-if="isLoading">
                        <td colspan="1000">
                            <v-skeleton-loader type="list-item-two-line"/>
                        </td>
                    </tr>
                    <tr v-else v-for="item in currentPrds" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.discount }}</td>
                        <td>{{ item.stock }}</td>
                        <td>{{ item.category.name }}</td>
                        <td>
                            <v-btn variant="text" icon="mdi-pencil" size="small"/>
                            <v-btn variant="text" icon="mdi-delete" size="small"/>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>

    <error-message v-else>{{ error }}</error-message>
</template>