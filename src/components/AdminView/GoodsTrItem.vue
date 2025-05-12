<script lang="ts" setup>
    import { ref, type PropType } from 'vue'

    import ProductAlterDialog from './GoodsAlterDialog.vue'
    import WarningDialog from '../Dialog/WarningDialog.vue'
    import LoadingDialog from '../Dialog/LoadingDialog.vue'
    import type { Goods } from '../../entities/Goods'
    import { getGoodsById } from '../../utils/axios'
    import type { GoodsCategory } from '../../entities/GoodsCategory'
    import type { GoodsSaveDto } from '@/entities/dto/GoodsSaveDTO'

    const props = defineProps({
        goods: {
            type: Object as PropType<Goods>,
            required: true
        },
        categorys: {
            type: Array<GoodsCategory>,
            required: true
        }
    })
    const emit = defineEmits(['updated', 'deleted', 'error'])

    const _goods = ref<Goods>()
    const isLoading = ref(false)
    const deleteWarningDialog = ref(false)
    const showDialog = ref(false)

    function emitDeleted() {
        emit('deleted', props.goods)
        deleteWarningDialog.value = false
    }

    function getFullProduct() {
        if (props.goods.id == null) {
            emit('error', '商品ID不能为空')
            return
        }
        isLoading.value = true

        getGoodsById(props.goods.id)
            .then((resp) => (_goods.value = resp.data))
            .catch((e) => emit('error', e))
            .finally(() => {
                isLoading.value = false
                showDialog.value = true
            })
    }
</script>

<template>
    <tr>
        <td>{{ goods.name }}</td>
        <td>{{ goods.price }}</td>
        <td>{{ goods.discount ?? 0 * 100 }}</td>
        <td>{{ goods.stock }}</td>
        <td>{{ goods.category?.name }}</td>
        <td>
            <v-btn variant="text" icon="mdi-pencil" size="small" @click="getFullProduct">
                <i class="mdi-pencil mdi v-icon notranslate v-theme--lightTheme v-icon--size-default"
                    aria-hidden="true" />
                <product-alter-dialog v-if="!isLoading" v-model="showDialog" lable="修改商品信息" :goods="{
                        id: goods.id,
                        name: goods.name,
                        price: goods.price,
                        discount: goods.discount,
                        stock: goods.stock,
                        description: goods.description,
                        category: goods.category,
                        photos: goods.photos
                    } as GoodsSaveDto
                    " :categorys="categorys" @submit="(dto) => emit('updated', dto)" />
                <loading-dialog v-model="isLoading" title="正在获取数据" />
            </v-btn>
            <v-btn variant="text" icon="mdi-delete" size="small">
                <i class="mdi-delete mdi v-icon notranslate v-theme--lightTheme v-icon--size-default"
                    aria-hidden="true" />
                <warning-dialog v-model="deleteWarningDialog" title="确定要删除这件商品吗？" @submit="emitDeleted" />
            </v-btn>
        </td>
    </tr>
</template>
