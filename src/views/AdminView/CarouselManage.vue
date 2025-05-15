<script lang="ts" setup>
    import { ref } from 'vue'
    import { getAllCarouselByPage, deleteCarouselById, getAllGoods, saveCarousel } from '../../utils/axios';
    import type { CarouselVO } from '../../entities/vo/CarouselVO';
    import { useSnackBarStore } from '@/stores/snack_bar_store';
    import LoadingDialog from '@/components/Dialog/LoadingDialog.vue';
    import WarningDialog from '@/components/Dialog/WarningDialog.vue';
    import type { Goods } from '@/entities/Goods';
    import type { Page } from '@/models/Page';
    import CarouselAlterDialog from '@/components/AdminView/CarouselAlterDialog.vue';
    import type { CarouselSaveDTO } from '@/entities/dto/CarouselSaveDTO';

    const count = ref(0)
    const page = ref(1)
    const size = ref(10)
    const isLoading = ref(false)
    const isSubmitting = ref(false)
    const goodsList = ref(new Array<Goods>())
    const carousels = ref(new Array<CarouselVO>())
    const snackBar = useSnackBarStore()

    async function init() {
        isLoading.value = true
        await getAllCarouselByPage(page.value, size.value)
            .then(resp => {
                const data: Page<CarouselVO> = resp.data
                count.value = data.totalElements
                carousels.value = data.content
            })
            .catch(e => snackBar.errorMsg = e.message),
            await getAllGoods()
                .then(resp => {
                    goodsList.value = resp.data;
                })
                .catch(e => snackBar.errorMsg = e.message)
        isLoading.value = false
    }

    async function deleteById(id: number) {
        isSubmitting.value = true
        await deleteCarouselById(id)
            .then(() => {
                snackBar.successMsg = "删除成功"
                init()
            })
            .catch(e => snackBar.errorMsg = e.message)
            .finally(() => isSubmitting.value = false)
    }

    async function save(data: CarouselSaveDTO) {
        console.log(data)
        isSubmitting.value = true
        await saveCarousel(data)
            .then(() => {
                snackBar.successMsg = "添加成功"
                init()
            })
            .catch(e => snackBar.errorMsg = e.message)
            .finally(() => isSubmitting.value = false)
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
                <carousel-alter-dialog :goodsList="goodsList" @submit="save"></carousel-alter-dialog>
            </v-btn>
        </div>
        <v-list class="px-4 py-2 h-100">
            <v-table fixed-header>
                <thead>
                    <tr>
                        <th class="text-left">
                            图片
                        </th>
                        <th class="text-left">
                            商品名
                        </th>
                        <th class="text-left">
                            标题
                        </th>
                        <th class="text-left">
                            描述
                        </th>
                        <th class="text-left">
                            副描述
                        </th>
                        <th class="text-left">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in carousels" :key="index">
                        <td>
                            <img :src="item.photo_url" alt="图片" height="50" />
                        </td>
                        <td>
                            {{ item.goodsName }}
                        </td>
                        <td>
                            {{ item.title }}
                        </td>
                        <td>
                            {{ item.description }}
                        </td>
                        <td>
                            {{ item.subDescription }}
                        </td>
                        <td>
                            <v-btn variant="text" icon="mdi-pencil" size="small">
                                <i class="mdi-pencil mdi v-icon notranslate v-theme--lightTheme v-icon--size-default"
                                    aria-hidden="true" />
                                <carousel-alter-dialog :goods-list="goodsList" :dto="({
                                    id: item.id,
                                    goodsId: item.goodsId,
                                    title: item.title,
                                    description: item.description,
                                    subDescription: item.subDescription,
                                } as CarouselSaveDTO)" @submit="(data) => save(data)"></carousel-alter-dialog>
                            </v-btn>
                            <v-btn variant="text" icon="mdi-delete" size="small">
                                <i class="mdi-delete mdi v-icon notranslate v-theme--lightTheme v-icon--size-default"
                                    aria-hidden="true" />
                                <warning-dialog title="确定要删除这个吗？" @submit="deleteById(item.id)" autoclose />
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-list>
        <!-- 赶时间 -->
        <!-- FIXME -->
        <div class="text-center pb-2">
            <v-pagination v-model="page" :length="Math.ceil(count / ~size)" :total-visible="7"
                @update:model-value="init" />
        </div>
    </div>

    <loading-dialog v-model="isSubmitting" title="正在提交"></loading-dialog>
</template>

<style scoped></style>