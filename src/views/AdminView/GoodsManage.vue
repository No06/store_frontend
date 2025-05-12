<script lang="ts" setup>
import { ref, computed } from 'vue';

import ErrorMessage from '@/components/ErrorMessage.vue';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorDialog from '@/components/Dialog/ErrorDialog.vue';
import TrItem from '@/components/AdminView/GoodsTrItem.vue';
import ToolBar from '@/components/AdminView/ToolBar.vue';
import LoadingDialog from '@/components/Dialog/LoadingDialog.vue';

import type { Goods } from '@/entities/Goods';
import { delGoodsById, getAllGoodsByPage, getAllGoodsCategory, saveGoods } from '@/utils/axios';
import type { GoodsCategory } from '../../entities/GoodsCategory';
import type { Page } from '@/models/Page';
import { useSnackBarStore } from '@/stores/snack_bar_store';

// 状态
const count = ref(0)
const page = ref(1)
const size = ref(10)
const isLoading = ref(true)
const error = ref("")
const showPrds = ref(new Array<Goods>)
const categorys = ref(new Array<GoodsCategory>)
const categoryMap = new Map<string, any>()
const snackBar = useSnackBarStore()
const committing = ref(false)
let searchCategoryName = ''
let searchName = ''

async function init() {
    isLoading.value = true
    error.value = ""
    
    await getAllGoodsCategory()
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
	await getAllGoodsByPage(
            page.value,
            size.value,
            searchName,
            categoryMap.get(searchCategoryName),
        )
		.then(resp => {
            const data: Page<Goods> = resp.data
            showPrds.value = data.content
            count.value = data.totalElements
        })
		.catch(e => error.value = e.message)
}
function searchOnly() {
    isLoading.value = true
    search().finally(() => isLoading.value = false)
}
async function save(goods: Goods) {
    committing.value = true
    if (typeof goods.category == "string") {
        const category = {} as GoodsCategory
        category.name = goods.category
        goods.category = category;
    }
    await saveGoods(goods)
        .then(() => snackBar.successMsg = "保存成功")
        .catch(e => {
            snackBar.errorMsg = e.message
            return
        })
        .finally(() => committing.value = false)
    init()
}
async function delGoods(goods: Goods) {
    if (goods.id == null) {
        snackBar.errorMsg = "ID 不能为空"
        return
    }
    count.value -= 1
    committing.value = true

    await delGoodsById(goods.id)
        .then(() => {
            // 非第一页并且剩余数能被10整除
            if (page.value > 1 && count.value % 10 == 0) {
                page.value -= 1
            }
            snackBar.successMsg = "删除成功"
        })
        .catch(e => snackBar.showErrorSnackBar)
        .finally(() => committing.value = false)
    init()
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
                    <tr-item v-for="(item, i) in showPrds" :key="i" :goods="item" :categorys="categorys"
                        @deleted="delGoods" @updated="save" @error="(e) => snackBar.errorMsg = e"/>
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
</template>