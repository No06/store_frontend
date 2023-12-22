<script lang="ts" setup>
import { ref, computed } from 'vue';

import ErrorMessage from '@/components/ErrorMessage.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorDialog from '@/components/Dialog/ErrorDialog.vue';
import TrItem from '@/components/AdminView/TrItem.vue';
import ToolBar from '@/components/AdminView/ToolBar.vue';
import LoadingDialog from '@/components/Dialog/LoadingDialog.vue';

import { Product } from '@/entities/Product';
import { delProductById, getAllProdByPage, getAllProductCategory, saveProduct } from '@/utils/axios';
import { ProductCategoryVO } from '../../entities/ProductCategory';

// 状态
const count = ref(0)
const page = ref(1)
const size = ref(10)
const isLoading = ref(true)
const error = ref("")
const snackBar = ref(false)
const snackBarMsg = ref('')
const showPrds = ref(new Array<Product>)
const categorys = ref(new Array<ProductCategoryVO>)
const categoryMap = new Map<string, any>()
const errorDialogMsg = ref('')
const showErrorDialog = computed({
    get: () => errorDialogMsg.value != null && errorDialogMsg.value != "",
    set: (newVal) => newVal ? errorDialogMsg.value = "" : {},
})
const committing = ref(false)
let searchCategoryName = ''
let searchName = ''

async function init() {
    isLoading.value = true
    error.value = ""
    
    await getAllProductCategory()
        .then(resp => categorys.value = resp.data)
        .catch(e => error.value = e.message)
        .finally(() => {
            categoryMap.clear()
            categoryMap.set("全部", null)
            categorys.value.forEach(item => categoryMap.set(item.name!, item.id))
        })
    
    await search()

    isLoading.value = false
}
async function search() {
	await getAllProdByPage(
            page.value,
            size.value,
            searchName,
            categoryMap.get(searchCategoryName),
        )
		.then(resp => {
            showPrds.value = resp.data.content
            count.value = resp.data.totalElements
        })
		.catch(e => error.value = e.message)
}
function searchOnly() {
    isLoading.value = true
    search().finally(() => isLoading.value = false)
}
async function save(product: Product) {
    committing.value = true
    if (typeof product.category == "string") {
        const category = new ProductCategoryVO()
        category.name = product.category
        product.category = category;
    }
    await saveProduct(product)
        .then(() => showSnackBar('添加成功'))
        .catch(e => {
            errorDialogMsg.value = e.message
            return
        })
        .finally(() => committing.value = false)
    init()
}
async function delProduct(product: Product) {
    count.value -= 1
    committing.value = true

    await delProductById(product.id)
        .then(() => showSnackBar('删除成功'))
        .catch(e => errorDialogMsg.value = e.message)
        .finally(() => committing.value = false)
    init()
}
function showSnackBar(msg: string) {
    snackBarMsg.value = msg
    snackBar.value = true
}
function errorDialog(e: any) {
    errorDialogMsg.value = e.message
}
function updateSearchParams(categoryName: string, name: string) {
    searchCategoryName = categoryName
    searchName = name
}
init()
</script>

<template>
    <div v-if="!error" class="d-flex flex-column w-100">
        <tool-bar :categorys="categorys" :count="count"
            @search="(categoryName, name) => {
                updateSearchParams(categoryName, name)
                searchOnly()
            }"
            @add="save" />

        <v-list class="px-4 py-2 h-100">
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
                    <tr-item v-for="(item, i) in showPrds" :key="i" :product="item" :categorys="categorys"
                        @deleted="delProduct" @updated="save" @error="errorDialog"/>
                </tbody>
            </v-table>
        </v-list>

        <div class="text-center pb-2">
            <v-pagination v-model="page" :length="Math.ceil(count / size)" :total-visible="7"
            @update:model-value="searchOnly" />
        </div>
    </div>
    <error-message v-else>{{ error }}</error-message>

    <loading-dialog v-model="committing" title="提交中"/>
	<error-dialog v-model="showErrorDialog" :title="errorDialogMsg"/>
    <v-snackbar v-model="snackBar" color="success" timeout="1500">
        <v-icon icon="mdi-check" class="mr-2" />
        {{ snackBarMsg }}
    </v-snackbar>
</template>