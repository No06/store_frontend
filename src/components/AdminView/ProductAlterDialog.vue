<script lang="ts" setup>
import { computed, ref } from 'vue'
import axios from 'axios';

import DialogAction from '../Dialog/DialogAction.vue';
import LoadingDialog from '../Dialog/LoadingDialog.vue';
import ErrorDialog from '../Dialog/ErrorDialog.vue';
import ProductAlterForm from './ProductAlterForm.vue';
import { useTokenStore } from '@/stores/token';

const props = defineProps({
	product: {
		type: Object,
		required: true
	},
	modelValue: Boolean
})
const emit = defineEmits(['update:modelValue', 'update:product', 'success'])

// 数据
// eslint-disable-next-line vue/no-setup-props-destructure
var _product = ref({ ...props.product })
const isValidated = ref(false)
const isLoading = ref(false)
const errorMsg = ref("")
const open = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

// 方法
function submit() {
	// 表单验证
	if (!isValidated.value) return

	isLoading.value = true
	const tokenStore = useTokenStore()
	axios.put('http://localhost:8080/product/update', _product.value, {
		headers: {
			token: tokenStore.token
		}
	})
	.then(response => {
		open.value = false
		emit('success')
	}).catch(error => {
		errorMsg.value = error.message
	}).finally(() => {
		isLoading.value = false
	});
	emit('update:product', _product.value)
}
</script>

<template>
	<v-dialog v-if="!isLoading" v-model="open" activator="parent" persistent width="auto"
		@update:model-value="_product = ref({ ...props.product })">
		<v-card>
			<v-card-title>修改商品信息</v-card-title>
			<v-card-text>
				<v-container>
					<product-alter-form :product="_product" v-model="isValidated"/>
				</v-container>
			</v-card-text>
			<dialog-action @cancel="open = false" @submit="submit"/>
		</v-card>
	</v-dialog>
	<loading-dialog v-else-if="!errorMsg" v-model="open" title="提交中"/>
	<error-dialog v-else v-model="open" :title="errorMsg"/>
</template>
