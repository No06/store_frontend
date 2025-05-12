<script setup lang="ts">
import { ref, type PropType } from 'vue';
import DialogAction from '@/components/Dialog/DialogAction.vue';
import { type User } from '../../entities/User';
import UserAlterForm from './UserAlterForm.vue';

defineProps({
    user: {
        type: Object as PropType<User>
    },
    label: String
})
const emit = defineEmits(["submit", "cancel"])

const open = ref(false)

function submit(user: User) {
    open.value = false
    emit("submit", user)
}
function cancel() {
    open.value = false
    emit("cancel")
}
</script>

<template>
    <v-dialog v-model="open" activator="parent" persistent width="auto" min-width="300">
        <v-card>
            <v-card-title>{{ label }}</v-card-title>
            <v-card-text>
                <user-alter-form :user="user" @submit="submit">
                    <template #action>
                        <dialog-action @cancel="cancel" />
                    </template>
                </user-alter-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped>

</style>