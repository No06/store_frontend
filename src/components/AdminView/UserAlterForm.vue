<script setup lang="ts">
import { ref, toRef, type PropType } from 'vue';
import { nonull } from '@/utils/formRules';
import type { UserDTO } from '../../entities/User';

const props = defineProps({
    user: {
        type: Object as PropType<UserDTO>,
        default: () => ({})
    }
})
const user = toRef(props.user)
const showPw = ref(false)
const emit = defineEmits(["submit"])

const isValidated = ref(false)

function submit() {
    if (isValidated.value) {
        emit('submit', user.value)
    }
}
</script>

<template>
    <v-form v-model="isValidated" @submit.prevent="submit" required>
        <v-row>
            <v-col>
                <v-text-field label="用户名" v-model="user.username" :rules="[nonull]" counter="16" />
                <v-text-field label="密码" v-model="user.password" :rules="[nonull]" counter="30"
                    :append-inner-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'" :type="showPw ? 'text' : 'password'"
                    @click:append-inner="showPw = !showPw" />
                <v-checkbox label="管理员" v-model="user.isAdmin" />
            </v-col>
        </v-row>
        <slot name="action" />
    </v-form>
</template>

<style scoped></style>