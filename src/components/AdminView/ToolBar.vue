<script lang="ts" setup>
import { computed, ref } from 'vue'
import ProductAlterDialog from './ProductAlterDialog.vue';
import { Product } from '@/entities/Product';
import { useCategoryStore } from '@/stores/productCategorys';
import axios from 'axios';
import { getAllProductBySpec, url } from '@/utils/axios';
import * as qs from 'qs';

const props = defineProps({
	modelValue: {
		type: Array,
		default: new Array
	}
})
const emit = defineEmits(['update:modelValue', 'update:product'])
const modelValue = computed({
	get: () => props.modelValue,
	set: (newVal: any) => {
		emit('update:modelValue', newVal)
	}
})

const product = ref(new Product)
const searchName = ref('')
const searchCategory = ref('全部')
const categoryMap = new Map<string, any>()
categoryMap.set("全部", undefined)
useCategoryStore().categorys.forEach(item => {
	categoryMap.set(item.name, item.id);
})

const isLoading = ref(false)
const errorMsg = ref<any>(false)
const alterDialog = ref(false)

function search() {
	isLoading.value = true
	errorMsg.value = false

	getAllProductBySpec({
		name: searchName.value,
		category_id: [categoryMap.get(searchCategory.value)]
	})
		.then(resp => modelValue.value = resp.data)
		.catch(e => errorMsg.value = e.message)
		.finally(() => isLoading.value = false)
}
search()
</script>

<template>
	<div class="ma-2">
		<div class="mb-2 d-flex align-center">
			<v-toolbar-title>数量：{{ modelValue.length }}</v-toolbar-title>
			<v-btn class="me-2" color="primary" prepend-icon="mdi-plus" variant="flat" size="large" rounded>
				添加
				<product-alter-dialog lable="添加商品" :product="product" v-model="alterDialog"
					@update:model-value="product = new Product()" @update:product="emit('update:product')" />
			</v-btn>
		</div>

		<v-form class="d-flex align-center" @submit.prevent="search">
			<v-btn :loading="isLoading" icon="mdi-magnify" variant="text" class="mr-2" type="submit" />

			<v-combobox class="mr-5" hide-details label="类别" v-model="searchCategory"
				:items="['全部'].concat(useCategoryStore().getCategorysNames())" variant="solo-filled"
				style="min-width: 150px" @update:model-value="search" />
			<v-text-field v-model="searchName" class="flex-1-1-100" clearable hide-details="auto" label="商品名称关键词查找" />
		</v-form>

		<v-snackbar v-model="errorMsg" color="error">
			{{ errorMsg }}
		</v-snackbar>
	</div>
</template>
