<script lang="ts" setup>
import { ref } from 'vue';

import DialogAction from './DialogAction.vue';

defineProps({
    title: String
})
const emit = defineEmits(['submit'])
const open = ref(false)

function submit() {
    open.value = false
    emit('submit')
}
</script>

<template>
    <v-dialog v-model="open" activator="parent" persistent width="auto">
        <v-card>
            <v-card-text>
                <v-container class="d-flex align-center">
                    <v-icon icon="mdi-alert-circle" size="x-large" />
                    <v-card-title>{{ title }}</v-card-title>
                </v-container>
            </v-card-text>
            <dialog-action @cancel="open = false" @submit="submit"/>
        </v-card>
    </v-dialog>
</template>