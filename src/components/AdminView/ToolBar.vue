<script lang="ts" setup>
import { ref } from 'vue'
import ProductAlterDialog from './ProductAlterDialog.vue';
import { Product } from '@/entities/Product';
import type { ProductCategoryVO } from '@/entities/ProductCategory';

defineProps({
	categorys: {
		type: Array<ProductCategoryVO>,
		default: new Array
	},
	count: {
		type: Number,
		default: 0
	}
})
const emit = defineEmits(['search', 'add'])

const product = ref(new Product)
const searchName = ref('')
const searchCategory = ref('全部')

const alterDialog = ref(false)

function emitSearch() {
	emit('search', searchCategory.value, searchName.value);
}
</script>

<template>
	<div class="px-6 py-4">
		<div class="pb-2 d-flex align-center">
			<v-toolbar-title>数量：{{ count }}</v-toolbar-title>

			<v-btn class="me-3" color="primary" prepend-icon="mdi-plus" variant="flat" size="large" rounded>
				添加
				<product-alter-dialog lable="添加商品" :product="product" :categorys="categorys" v-model="alterDialog"
					@update:model-value="product = new Product()" @submit="(product) => emit('add', product)" />
			</v-btn>
		</div>
		
		<v-form class="d-flex align-center" @submit.prevent="emitSearch">
			<v-btn icon="mdi-magnify" variant="text" class="mr-2" type="submit" />

			<v-combobox class="mr-5" hide-details label="类别" v-model="searchCategory"
				:items="['全部'].concat(categorys.map(category => category.name!))" variant="solo-filled"
				style="min-width: 150px" @update:model-value="emitSearch" />
			<v-text-field v-model="searchName" class="flex-1-1-100" clearable hide-details="auto" label="商品名称关键词查找" />
		</v-form>
	</div>
</template>