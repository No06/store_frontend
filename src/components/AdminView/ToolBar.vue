<script lang="ts" setup>
import { ref } from 'vue'
import GoodsAlterDialog from './GoodsAlterDialog.vue'
import type { GoodsCategory } from '@/entities/GoodsCategory'
import type { GoodsSaveDto } from '../../entities/dto/GoodsSaveDTO'

defineProps({
  categorys: {
    type: Array<GoodsCategory>,
    default: new Array()
  },
  count: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['search', 'add'])

const goods = ref<GoodsSaveDto | null>(null)
const searchName = ref('')
const searchCategory = ref('全部')

const alterDialog = ref(false)

function emitSearch() {
  emit('search', searchCategory.value, searchName.value)
}
</script>

<template>
  <div class="px-6 py-4">
    <div class="pb-2 d-flex align-center">
      <v-toolbar-title>数量：{{ count }}</v-toolbar-title>

      <v-btn
        class="me-3"
        color="primary"
        prepend-icon="mdi-plus"
        variant="flat"
        size="large"
        rounded
      >
        添加
        <GoodsAlterDialog
          lable="添加商品"
          :goods="goods!"
          :categorys="categorys"
          v-model="alterDialog"
          @update:model-value="
            goods = {
              name: '',
              price: 0,
              discount: 0,
              stock: 0,
              description: '',
              category: {},
              photos: []
            }
          "
          @submit="(goods) => emit('add', goods)"
        />
      </v-btn>
    </div>

    <v-form class="d-flex align-center" @submit.prevent="emitSearch">
      <v-btn icon="mdi-magnify" variant="text" class="mr-2" type="submit" />

      <v-combobox
        class="mr-5"
        hide-details
        label="类别"
        v-model="searchCategory"
        :items="['全部'].concat(categorys.map((category) => category.name!))"
        variant="solo-filled"
        style="min-width: 150px"
        @update:model-value="emitSearch"
      />
      <v-text-field
        v-model="searchName"
        class="flex-1-1-100"
        clearable
        hide-details="auto"
        label="商品名称关键词查找"
      />
    </v-form>
  </div>
</template>
