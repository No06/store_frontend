<script setup lang="ts">
import { deleteUserAddressById, getUserAddressByUserId, getUserDefaultAddressByUserId, saveUserAddress, updateUserDefaultAddress } from '../utils/axios';
import { useSnackBarStore } from '../stores/snack_bar_store';
import UserAddressItem from '@/components/UserAddressView/UserAddressItem.vue';
import { ref } from 'vue';
import UserAddressAlterDialog from '@/components/UserAddressView/UserAddressAlterDialog.vue';
import LoadingDialog from '@/components/Dialog/LoadingDialog.vue';
import type { UserAddressSaveDTO } from '@/entities/dto/UserAddressSaveDTO';
import type { UserAddressVO } from '../entities/vo/UserAddressVO';

var addressList = new Array<UserAddressVO>
var count = 0;
const isLoading = ref(false)
const openAddDialog = ref(false)
const committing = ref(false)
const tempObject = ref<UserAddressSaveDTO>({} as UserAddressSaveDTO)
const selectedId = ref<number>()
const snackBar = useSnackBarStore()

function init() {
    isLoading.value = true
    Promise.all([
        // 根据用户id获取所有收货地址
        getUserAddressByUserId()
            .then(resp => addressList = resp.data)
            .catch(snackBar.showAxiosError),
        // 根据用户id获取默认收货地址 保存id
        getUserDefaultAddressByUserId()
            .then(resp => selectedId.value = resp.data.id)
            .catch(snackBar.showAxiosError)
    ]).finally(() => {
        count = addressList.length
        isLoading.value = false
    })
}
// 当用户默认收货地址修改时
function updateDefaultAddress(addressId: Number) {
    updateUserDefaultAddress(addressId)
        .then(() => selectedId.value = addressId.valueOf())
        .catch(snackBar.showAxiosError)
}
// 添加
function addSubmit(address: UserAddressSaveDTO) {
    committing.value = true
    saveUserAddress(address)
        .then(() => {
            snackBar.successMsg = "添加成功"
            init()
        })
        .catch(snackBar.showAxiosError)
        .finally(() => committing.value = false)
}
// 删除地址
const doDelete = (id: Number) => {
    committing.value = true
    deleteUserAddressById(id)
        .then(() => {
            snackBar.successMsg = "删除成功"
            init()
        })
        .catch(snackBar.showAxiosError)
        .finally(() => committing.value = false)
}
// 编辑
function alterSubmit(address: UserAddressSaveDTO) {
    committing.value = true
    saveUserAddress(address)
        .then(() => {
            snackBar.successMsg = "编辑成功"
            init()
        })
        .catch(snackBar.showAxiosError)
        .finally(() => committing.value = false)
}
init()
</script>

<template>
    <!-- 加载界面 -->
    <div v-if="isLoading" class="d-flex align-center justify-center h-100 w-100">
        <v-progress-circular :size="50" color="primary" indeterminate />
    </div>

    <v-list v-else class="h-100">
        <v-container>
            <v-col>
                <v-row align="center">
                    <h2 class="pb-4">总数：{{ count }}</h2>
                    <v-spacer />
                    <v-btn variant="flat" color="primary" prepend-icon="mdi-plus">
                        添加地址
                        <user-address-alter-dialog v-model="openAddDialog" lable="添加收货地址" :address="tempObject"
                            @update:model-value="(tempObject = {} as UserAddressSaveDTO)" @submit="addSubmit" />
                    </v-btn>
                </v-row>
            </v-col>
            <v-sheet class="d-flex flex-wrap">
                <user-address-item v-for="(address, i) in addressList" :key="i" v-model="selectedId" :user-address="address"
                    @update:model-value="updateDefaultAddress" @deleted="doDelete" @update="alterSubmit"/>
            </v-sheet>
        </v-container>
    </v-list>

    <loading-dialog v-model="committing" title="提交中" />
</template>

<style scoped></style>