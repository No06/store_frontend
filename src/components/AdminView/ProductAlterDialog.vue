<script lang="ts" setup>
import { computed, ref } from 'vue'
import axios from 'axios';

import DialogAction from '../Dialog/DialogAction.vue';
import LoadingDialog from '../Dialog/LoadingDialog.vue';
import ErrorDialog from '../Dialog/ErrorDialog.vue';
import ProductAlterForm from './ProductAlterForm.vue';
import { useTokenStore } from '@/stores/token';
import { useCategoryStore } from '@/stores/productCategorys';

const props = defineProps({
	product: {
		type: Object,
		required: true
	},
	modelValue: Boolean
})
const emit = defineEmits(['update:modelValue', 'update:product'])

// 数据
var _product = ref()
const isLoading = ref(false)
const errorDialog = ref(false)
const errorMsg = ref("")
const successSnackBar = ref(false)
const open = computed({
	get: () => props.modelValue,
	set: (value) => {
		emit('update:modelValue', value)
	}
})

// 方法
function submit() {
	isLoading.value = true
	const tokenStore = useTokenStore()
	axios.put('http://localhost:8080/product/save', _product.value, {
		headers: {
			token: tokenStore.token
		}
	})
	.then(() => {
		open.value = false
		successSnackBar.value = true
	}).catch(error => {
		errorDialog.value = true
		errorMsg.value = error.message
	}).finally(() => {
		isLoading.value = false
		emit('update:product', _product.value)
	});
}
</script>

<template>
	<v-dialog v-if="!isLoading && !errorMsg" v-model="open" activator="parent" persistent width="auto"
		@update:model-value="_product = ref({ ...props.product })">
		<v-card>
			<v-card-title>修改商品信息</v-card-title>
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

    <v-snackbar v-model="successSnackBar" color="success">
        <v-icon icon="mdi-check" class="mr-2"/>
        执行成功
    </v-snackbar>
</template>
