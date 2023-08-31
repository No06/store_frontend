<script lang="ts" setup>
import { ref } from 'vue';

import ErrorMessage from '@/components/ErrorMessage.vue';
import TrItem from '@/components/AdminView/TrItem.vue';
import ToolBar from '@/components/AdminView/ToolBar.vue';

import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
import { Product } from '@/entities/Product';
import { useCategoryStore } from '@/stores/productCategorys';
import { getAllProductCategory } from '@/utils/axios';

// 状态
const isLoading = ref(true)
const error = ref("")
const snackBar = ref(false)
const snackBarMsg = ref()
const showPrds = ref(new Array<Product>)
const categoryStore = useCategoryStore()

async function init() {
    isLoading.value = true
    error.value = ""
    getAllProductCategory()
        .then(resp => {
            categoryStore.categorys = resp.data
        })
        .catch(e => error.value = e.message)
        .finally(() => isLoading.value = false)
}
function showSnackBar(msg: string) {
    snackBarMsg.value = msg
    snackBar.value = true
}
init()
</script>

<template>
    <div v-if="!error" class="d-flex flex-column w-100 pa-4">
        <tool-bar v-model="showPrds" @update:product="init(), showSnackBar('添加成功')" />

        <v-list>
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
                    <tr-item v-for="(item, i) in showPrds" :key="i" :product="item"
                        @delete:product="init, showSnackBar('修改成功')"
                        @update:product="() => { init(); showSnackBar('修改成功') }" />
                </tbody>
            </v-table>
        </v-list>
    </div>

    <error-message v-else>{{ error }}</error-message>
    <v-snackbar v-model="snackBar" color="success">
        <v-icon icon="mdi-check" class="mr-2" />
        {{ snackBarMsg }}
    </v-snackbar>
</template>