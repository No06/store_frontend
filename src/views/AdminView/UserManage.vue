<script setup lang="ts">
import { ref } from 'vue';
import { getUserPage, removeUserById, saveUser } from '../../utils/axios';
import type { Page } from '../../entities/util/Page';
import { useSnackBarStore } from '../../stores/snack_bar_store';
import type { UserDTO } from '@/entities/User';
import LoadingDialog from '@/components/Dialog/LoadingDialog.vue';
import UserTrItem from '@/components/AdminView/UserTrItem.vue';

const snackbar = useSnackBarStore()
const isLoading = ref(false)
const count = ref(0)
const page = ref(1)
const size = ref(10)
const submitting = ref(false)
var users: Array<UserDTO>

function init() {
    isLoading.value = true
    getUserPage(page.value, size.value)
        .then(resp => {
            const data: Page = resp.data
            count.value = data.totalElements
            users = data.content
        })
        .catch(snackbar.showAxiosError)
        .finally(() => isLoading.value = false)
}

function save(user: UserDTO) {
    submitting.value = true
    saveUser(user)
        .then(() => {
            snackbar.successMsg = "保存成功"
            init()
        })
        .catch(snackbar.showAxiosError)
        .finally(() => submitting.value = false)
}

function removeById(id: number) {
    submitting.value = true
    removeUserById(id)
        .then(() => {
            snackbar.successMsg = "删除成功"
            init()
        })
        .catch(snackbar.showAxiosError)
        .finally(() => submitting.value = false)
}
init()
</script>

<template>
    <div v-if="isLoading" class="d-flex align-center justify-center h-100 w-100">
        <v-progress-circular :size="50" color="primary" indeterminate />
    </div>
    <div v-else class="d-flex flex-column w-100 ma-2">
        <div class="d-flex ma-4">
            <h3>总数：{{ count }}</h3>
            <v-spacer></v-spacer>
            <!-- 添加按钮 -->
            <!-- <v-btn class="me-3" color="primary" prepend-icon="mdi-plus" variant="flat" size="large" rounded>
				添加
				<user-alter-dialog label="添加用户" @submit="save" />
			</v-btn> -->
        </div>
        <v-list class="px-4 py-2 h-100">
            <v-table fixed-header>
                <thead>
                    <tr>
                        <th class="text-left">
                            用户名
                        </th>
                        <th class="text-left">
                            密码
                        </th>
                        <th class="text-left">
                            管理员
                        </th>
                        <th class="text-right">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <user-tr-item v-for="(item, i) in users" :key="i" :item="item" @update="save"
                        @remove="removeById(item.id)" />
                </tbody>
            </v-table>
        </v-list>
        <!-- 赶时间 -->
        <!-- FIXME -->
        <div class="text-center pb-2">
            <v-pagination v-model="page" :length="Math.ceil(count / size)" :total-visible="7" @update:model-value="init" />
        </div>
    </div>

    <loading-dialog v-model="submitting" title="正在提交"></loading-dialog>
</template>

<style scoped></style>