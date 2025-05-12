<script setup lang="ts">
import type { PropType } from 'vue';
import UserAlterDialog from '@/components/AdminView/UserAlterDialog.vue';
import WarningDialog from '@/components/Dialog/WarningDialog.vue';
import type { User } from '@/entities/User';
import { ref } from 'vue';

defineProps({
    item: {
        type: Object as PropType<User>,
        required: true
    }
})
const emit = defineEmits(['update', 'remove'])
const showPw = ref(false)
</script>

<template>
    <tr>
        <td>{{ item.username }}</td>
        <td >
            {{ showPw ? item.password : "******" }}
            <v-btn :icon="showPw ? 'mdi-eye' : 'mdi-eye-off'" variant="plain" density="comfortable" @click="showPw = !showPw"/>
        </td>
        <td>{{ item.isAdmin ? "是" : "否" }}</td>
        <td class="text-right">
            <v-btn variant="text" icon="mdi-pencil" size="small">
                <i class="mdi-pencil mdi v-icon notranslate v-theme--lightTheme v-icon--size-default" aria-hidden="true" />
                <user-alter-dialog label="修改用户信息" :user="JSON.parse(JSON.stringify(item))" @submit="(newVal) => emit('update', newVal)" />
            </v-btn>
            <v-btn variant="text" icon="mdi-delete" size="small">
                <i class="mdi-delete mdi v-icon notranslate v-theme--lightTheme v-icon--size-default" aria-hidden="true" />
                <warning-dialog title="确定要删除这件商品吗？" @submit="emit('remove')" autoclose />
            </v-btn>
        </td>
    </tr>
</template>

<style scoped></style>