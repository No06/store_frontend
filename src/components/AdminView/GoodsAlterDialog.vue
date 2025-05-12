<script lang="ts" setup>
import { computed } from 'vue'

import DialogAction from '../Dialog/DialogAction.vue';
import GoodsAlterForm from './GoodsAlterForm.vue';
import { type GoodsPhoto } from '@/entities/GoodsPhoto';
import type { PropType } from 'vue';
import type { GoodsSaveDto } from '../../entities/dto/GoodsSaveDTO';

const props = defineProps({
	lable: String,
	goods: {
		type: Object as PropType<GoodsSaveDto>,
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
function submit(goods: GoodsSaveDto) {
	open.value = false
	goods.photos?.forEach((item: GoodsPhoto, index: number) => (item.rank = index));
	emit('submit', goods)
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
					<GoodsAlterForm :goods="goods" :categorys="categorys" @submit="submit">
						<template #action>
							<dialog-action @cancel="cancle"/>
						</template>
					</GoodsAlterForm>
				</v-container>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>