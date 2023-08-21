<script lang="ts" setup>
import { computed, ref } from 'vue'

import DialogAction from '../Dialog/DialogAction.vue';
import LoadingDialog from '../Dialog/LoadingDialog.vue';
import ErrorDialog from '../Dialog/ErrorDialog.vue';
import ProductAlterForm from './ProductAlterForm.vue';
import { useTokenStore } from '@/stores/token';
import { useCategoryStore } from '@/stores/productCategorys';
import { ProductImage } from '@/entities/ProductImage';
import { Product } from '@/entities/Product';
import { saveProduct } from '@/utils/axios';

const props = defineProps({
	lable: String,
	product: {
		type: Object,
		required: true
	},
	modelValue: Boolean
})
const emit = defineEmits(['update:modelValue', 'update:product'])

// 数据
const _product = ref(new Product)
const isLoading = ref(false)
const errorDialog = ref(false)
const errorMsg = ref("")
const open = computed({
	get: () => props.modelValue,
	set(value) {
		emit('update:modelValue', value)
	}
})

// 方法
function submit() {
	_product.value.images.forEach((item: ProductImage, index: number) => (item.rank = index));
	isLoading.value = true
	const tokenStore = useTokenStore()
	saveProduct(_product.value, tokenStore.token)
		.then(() => {
			open.value = false
			emit('update:product', _product.value)
		}).catch(error => {
			errorDialog.value = true
			errorMsg.value = error.message
		}).finally(() => {
			isLoading.value = false
		});
}
</script>

<template>
	<v-dialog v-if="!isLoading && !errorMsg" v-model="open" activator="parent" persistent width="auto"
		@update:model-value="_product = JSON.parse(JSON.stringify(product))">
		<v-card>
			<v-card-title>{{ lable }}</v-card-title>
			<v-card-text>
				<v-container>
					<product-alter-form :product="_product" :categorys="useCategoryStore().getCategorysNames()" @submit="submit">
						<template #action>
							<dialog-action @cancel="open = false"/>
						</template>
					</product-alter-form>
				</v-container>
			</v-card-text>
		</v-card>
	</v-dialog>
	<loading-dialog v-else-if="!errorMsg" v-model="open" title="提交中"/>
	<error-dialog v-else v-model="errorDialog" :title="errorMsg" @submit="errorMsg = ''"/>
</template>
