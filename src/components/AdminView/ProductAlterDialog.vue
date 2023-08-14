<script lang="ts" setup>
import { computed, ref } from 'vue'

import DialogAction from '../Dialog/DialogAction.vue';
import ProductAlterForm from './ProductAlterForm.vue';

const props = defineProps({
	product: {
		type: Object,
		required: true
	},
	modelValue: Boolean
})
const emit = defineEmits(['update:modelValue', 'update:product'])

// 数据
// eslint-disable-next-line vue/no-setup-props-destructure
var _product = ref({ ...props.product })
const open = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

// 方法
// TODO
function submit() {
	emit('update:product', _product.value)
}
</script>

<template>
	<v-dialog v-model="open" activator="parent" persistent width="auto">
		<v-card>
			<v-card-title>修改商品信息</v-card-title>
			<v-card-text>
				<v-container>
					<product-alter-form :product="_product" />
				</v-container>
			</v-card-text>
			<dialog-action @cancel="open = false, _product = ref({ ...props.product })" @submit="submit"/>
		</v-card>
	</v-dialog>
</template>
