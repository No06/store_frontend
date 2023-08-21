<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'
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
const emit = defineEmits(['update:modelValue', 'update:product'])
const modelValue = computed({
	get: () => props.modelValue,
	set: (newVal: any) => {
		emit('update:modelValue', newVal)
	}
})

const { products } = toRefs(props)

const product = ref(new Product)
const searchProductName = ref('')
const searchCategoryName = ref('全部')
const alterDialog = ref(false)

// 查找
function keywordSearch(main: string, pattern: string) {
	return boyerMoore(main.toLowerCase(), pattern.toLowerCase()) != -1
}
function search() {
	// 定义常用条件
	const isAllCategory = searchCategoryName.value === "全部";
	const isNoKeyword = searchProductName.value === "";

	modelValue.value = products.value.filter((item: Product) => {
		// 如果没有关键词，只根据分类过滤
		if (isNoKeyword) {
			return isAllCategory || item.category.name === searchCategoryName.value;
		}

		// 如果有关键词，根据关键词和分类过滤
		return (
			keywordSearch(item.name, searchProductName.value) &&
			(isAllCategory || item.category.name === searchCategoryName.value)
		);
	});
}
</script>

<template>
	<div class="ma-2">
		<div class="mb-2 d-flex align-center">
			<v-toolbar-title>数量：{{ modelValue.length }}</v-toolbar-title>
			<v-btn class="me-2" color="primary" prepend-icon="mdi-plus" variant="flat" size="large" rounded>
				添加
				<product-alter-dialog lable="添加商品" :product="product" v-model="alterDialog" @update:model-value="product = new Product()"
					@update:product="emit('update:product')"/>
			</v-btn>
		</div>

		<v-form class="d-flex align-center" @submit.prevent="search">
			<v-btn icon="mdi-magnify" variant="text" class="mr-2" type="submit" />
			<v-combobox class="mr-5" hide-details label="类别" v-model="searchCategoryName"
				:items="['全部'].concat(useCategoryStore().getCategorysNames())" variant="solo-filled"
				style="min-width: 150px" @update:model-value="search" />
			<v-text-field v-model="searchProductName" class="flex-1-1-100" clearable hide-details="auto"
				label="商品名称关键词查找" />
		</v-form>
	</div>
</template>
