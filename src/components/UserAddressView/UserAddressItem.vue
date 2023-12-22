<script setup lang="ts">
import { type PropType, toRef, computed, ref } from 'vue';
import type { UserAddress } from '@/entities/UserAddress';
import WarningDialog from '@/components/Dialog/WarningDialog.vue';
import UserAddressAlterDialog from '@/components/UserAddressView/UserAddressAlterDialog.vue';

const props = defineProps({
    userAddress: {
        type: Object as PropType<UserAddress>,
        required: true
    },
    modelValue: {
        type: Number
    }
})
const emit = defineEmits(['update:modelValue', 'deleted', 'update'])

const selected = computed({
    get: () => props.modelValue,
    set: (newVal) => emit('update:modelValue', newVal)
});
const userAddress = toRef(() => props.userAddress)
const deleteWarning = ref(false)
const alterDialog = ref(false)
</script>

<template>
    <v-col cols="4">
        <v-card class="ma-2" variant="elevated" elevation="2" @click="{}">
            <user-address-alter-dialog v-model="alterDialog" :address="JSON.parse(JSON.stringify(userAddress))"
                lable="编辑收货地址" @submit="(val) => emit('update', val)" />

            <v-card-item>
                <v-card-title>{{ userAddress.name }}</v-card-title>
                <v-card-subtitle class="mb-2">{{ userAddress.phone }}</v-card-subtitle>
                <v-card-subtitle>{{ userAddress.address }}</v-card-subtitle>
            </v-card-item>

            <v-divider />

            <v-card-actions>
                <v-row class="pl-2" align="center" align-content="center">
                    <v-radio-group v-model="selected" inline class="d-flex align-center">
                        <!-- TODO: 防抖 -->
                        <v-radio label="默认" :value="userAddress.id" color="primary" @click.stop />
                    </v-radio-group>
                </v-row>
                <v-spacer />
                <v-btn @click.stop>
                    删除
                    <warning-dialog v-model="deleteWarning" title="确定要删除这条数据吗" @submit="emit('deleted', userAddress.id)" />
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<style scoped></style>