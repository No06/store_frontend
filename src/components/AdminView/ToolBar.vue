<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { boyerMoore } from '@/utils/boyerMorre'
import ProductAlterDialog from './ProductAlterDialog.vue';
import { Product } from '@/entities/Product';
import { useCategoryStore } from '@/stores/productCategorys';

const props = defineProps({
	products: {
		type: Array,
		required: true
	},
	modelValue: {
		type: Array,
		default: new Array
	}
})
const emit = defineEmits(['update:obtainedPrds'])

const { products } = toRefs(props)

const product = ref(new Product)
const searchProductName = ref('')
const searchCategoryName = ref('全部')
const alterDialog = ref(false)

function categorySearch(products: any[]) {
	if (searchCategoryName.value == '全部') return products

	const _products: any[] = []
	products.forEach((i) => {
		if (searchCategoryName.value == i.category.name) {
			_products.push(i)
		}
	})
	return _products
}
function keywordSearch(products: any[]) {
	if (searchProductName.value == '') return products

	const _products: any[] = []
	products.forEach((i) => {
		if (boyerMoore(i.name.toLowerCase(), searchProductName.value.toLowerCase()) != -1) {
			_products.push(i)
		}
	})
	return _products
}
function search() {
	const _products = products.value
	emit('update:obtainedPrds', keywordSearch(categorySearch(_products)))
}
</script>

<template>
	<div class="ma-2">
		<div class="mb-2 d-flex align-center">
			<v-toolbar-title>数量：{{ modelValue.length }}</v-toolbar-title>
			<v-btn class="me-2" color="primary" prepend-icon="mdi-plus" variant="flat" size="large" rounded>
				添加
				<product-alter-dialog :product="product" v-model="alterDialog"
					@update:model-value="product = new Product()" @update:product="products.push"/>
			</v-btn>
		</div>

		<v-form class="d-flex align-center" @submit.prevent="search">
			<v-btn icon="mdi-magnify" variant="text" class="mr-2" type="submit" />
			<v-combobox class="mr-5" hide-details label="类别" v-model="searchCategoryName"
				:items="['全部'].concat(useCategoryStore().getCategorysNames())" variant="solo-filled" style="min-width: 150px"
				@update:menu="search" />
			<v-text-field v-model="searchProductName" class="flex-1-1-100" clearable hide-details="auto"
				label="商品名称关键词查找" />
		</v-form>
	</div>
</template>
