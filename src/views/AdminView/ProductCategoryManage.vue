<script setup lang="ts">
import { ref } from 'vue';
import { ProductCategoryVO, type ProductCategoryDTO } from '../../entities/ProductCategory';
import { useSnackBarStore } from '@/stores/snack_bar_store';
import WarningDialog from '@/components/Dialog/WarningDialog.vue';
import ProductCategoryAlterDialog from '@/components/AdminView/ProductCategoryAlterDialog.vue';
import LoadingDialog from '@/components/Dialog/LoadingDialog.vue';
import { saveProductCategory, getPage, removeProductCategoryById } from '../../utils/axios';
import type { Page } from '@/entities/util/Page';

const isLoading = ref(false)
var categorys: Array<ProductCategoryVO>
const snackbar = useSnackBarStore()
const submitting = ref(false)
const count = ref(0)
const page = ref(1)
const size = ref(10)

function init(newPageVal?: number) {
    isLoading.value = true
    if (newPageVal) page.value = newPageVal;
    getPage(page.value, size.value)
        .then(resp => {
            const data: Page = resp.data
            categorys = data.content
            count.value = data.totalElements
        })
        .catch(snackbar.showAxiosError)
        .finally(() => {
            isLoading.value = false
        })
}
function deleteCategory(id?: number) {
    if (!id) {
        snackbar.errorMsg = "ID 不能为空"
        return
    }
    submitting.value = true
    removeProductCategoryById(id)
        .then(() => {
            if (page.value > 1 && (count.value - 1) % 10 == 0) {
                page.value -= 1
            }
            snackbar.successMsg = "删除成功"
            init()
        })
        .catch(snackbar.showAxiosError)
        .finally(() => submitting.value = false)
}
function save(category: ProductCategoryDTO) {
    submitting.value = true
    saveProductCategory(category)
        .then(() => {
            snackbar.successMsg = "编辑成功"
            init()
        })
        .catch(snackbar.showAxiosError)
        .finally(() => submitting.value = false)
}
init()
</script>

<template>
    <div v-if="isLoading" class="d-flex align-center justify-center h-100 w-100">
        <v-progress-circular :size="50" color="primary" indeterminate />
    </div>
    <div v-else class="d-flex flex-column w-100 ma-2">
        <div class="d-flex ma-4">
            <h3>总数：{{ count }}</h3>
            <v-spacer></v-spacer>
            <!-- 添加按钮 -->
            <v-btn class="me-3" color="primary" prepend-icon="mdi-plus" variant="flat" size="large" rounded>
				添加
				<product-category-alter-dialog label="添加商品类" @submit="save" />
			</v-btn>
        </div>
        <v-list class="px-4 py-2 h-100">
            <v-table fixed-header>
                <thead>
                    <tr>
                        <th class="text-left">
                            商品名名称
                        </th>
                        <th class="text-left">
                            描述
                        </th>
                        <th class="text-right">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in categorys" :key="i">
                        <td>{{ item.name }}</td>
                        <td>{{ item.description != ''
                            ? item.description ?? "无"
                            : "无" }}
                        </td>
                        <td class="text-right">
                            <v-btn variant="text" icon="mdi-pencil" size="small">
                                <i class="mdi-pencil mdi v-icon notranslate v-theme--lightTheme v-icon--size-default"
                                    aria-hidden="true" />
                                <product-category-alter-dialog label="修改商品类信息"
                                    :category="JSON.parse(JSON.stringify(item))" @submit="save" />
                            </v-btn>
                            <v-btn variant="text" icon="mdi-delete" size="small">
                                <i class="mdi-delete mdi v-icon notranslate v-theme--lightTheme v-icon--size-default"
                                    aria-hidden="true" />
                                <warning-dialog title="确定要删除这件商品吗？" @submit="deleteCategory(item.id)" autoclose/>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-list>
        <!-- 赶时间 -->
        <!-- FIXME -->
        <div class="text-center pb-2">
            <v-pagination v-model="page" :length="Math.ceil(count / size)" :total-visible="7" @update:model-value="init" />
        </div>
    </div>

    <loading-dialog v-model="submitting" title="正在提交"></loading-dialog>
</template>

<style scoped></style>