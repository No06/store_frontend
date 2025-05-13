<script setup lang="ts">
import { computed } from 'vue'

import DialogAction from '@/components/Dialog/DialogAction.vue';
import type { PropType } from 'vue';
import UserAddressAlterForm from './UserAddressAlterForm.vue';
import type { UserAddressSaveDTO } from '../../entities/dto/UserAddressSaveDTO';

const props = defineProps({
	lable: String,
	address: {
		type: Object as PropType<UserAddressSaveDTO>,
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
function submit(address: UserAddressSaveDTO) {
	open.value = false
	emit('submit', address)
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
                    <user-address-alter-form :address="address" @submit="submit">
						<template #action>
							<dialog-action @cancel="cancle"/>
						</template>
					</user-address-alter-form>
				</v-container>
			</v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>