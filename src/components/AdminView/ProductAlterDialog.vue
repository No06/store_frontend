<script lang="ts" setup>
import { computed } from 'vue'

import DialogAction from '../Dialog/DialogAction.vue';
import ProductAlterForm from './ProductAlterForm.vue';
import { ProductImage } from '@/entities/ProductImage';
import { Product } from '@/entities/Product';

const props = defineProps({
	lable: String,
	product: {
		type: Object,
	},
	categorys: {
		type: Array,
		required: true
	},
	modelValue: Boolean
})
const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

// 数据
const open = computed({
	get: () => props.modelValue,
	set(value) {
		emit('update:modelValue', value)
	}
})

// 方法
function submit(product: Product) {
	open.value = false
	product.images.forEach((item: ProductImage, index: number) => (item.rank = index));
	emit('submit', product)
}
function cancle() {
	open.value = false
	emit('cancel')
}
</script>

<template>
	<v-dialog v-model="open" activator="parent" persistent width="auto">
		<v-card>
			<v-card-title>{{ lable }}</v-card-title>
			<v-card-text>
				<v-container>
					<product-alter-form :product="product" :categorys="categorys" @submit="submit">
						<template #action>
							<dialog-action @cancel="cancle"/>
						</template>
					</product-alter-form>
				</v-container>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>