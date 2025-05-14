<script setup lang="ts">
    import { type PropType, toRef, computed, ref } from 'vue';
    import WarningDialog from '@/components/Dialog/WarningDialog.vue';
    import UserAddressAlterDialog from '@/components/UserAddressView/UserAddressAlterDialog.vue';
    import type { UserAddressVO } from '../../entities/vo/UserAddressVO';
    import type { UserAddressSaveDTO } from '@/entities/dto/UserAddressSaveDTO';
    import { id } from 'vuetify/locale';

    const props = defineProps({
        address: {
            type: Object as PropType<UserAddressVO>,
            required: true
        },
        selectedId: {
            type: Number,
            required: true
        }
    })
    const emit = defineEmits(['deleted', 'update', 'setDefault', 'update:selectedId'])

    const deleteWarning = ref(false)
    const alterDialog = ref(false)
    const isSelected = computed(() => {
        if (props.selectedId != -1) return props.address.id
        return props.address.isDefault ? -1 : props.address.id
    })
</script>

<template>
    <v-col cols="4">
        <v-card class="ma-2" variant="elevated" elevation="2" @click="{ }">
            <user-address-alter-dialog v-model="alterDialog" :address="({
                id: address.id,
                name: address.name,
                phone: address.phone,
                address: address.address,
            } as UserAddressSaveDTO)" lable="编辑收货地址" @submit="(val) => emit('update', val)" />

            <v-card-item>
                <v-card-title>{{ address.name }}</v-card-title>
                <v-card-subtitle class="mb-2">{{ address.phone }}</v-card-subtitle>
                <v-card-subtitle>{{ address.address }}</v-card-subtitle>
            </v-card-item>

            <v-divider />

            <v-card-actions>
                <v-row class="pl-2" align="center" align-content="center">
                    <v-radio-group :model-value="selectedId" @update:model-value="emit('update:selectedId')" inline class="d-flex align-center">
                        <v-radio label="默认" :value="isSelected" color="primary" @click.stop @change="emit('setDefault')" />
                    </v-radio-group>
                </v-row>
                <v-spacer />
                <v-btn @click.stop>
                    删除
                    <warning-dialog v-model="deleteWarning" title="确定要删除这条数据吗" @submit="emit('deleted')" />
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<style scoped></style>