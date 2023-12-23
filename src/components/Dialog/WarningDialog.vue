<script lang="ts" setup>
import { computed, ref } from 'vue';

import DialogAction from './DialogAction.vue';

const props = defineProps({
    modelValue: {
        type: Boolean
    },
    title: String
})
const emit = defineEmits(['update:modelValue', 'submit'])
const open = ref(false)
const modelValue = computed({
    get: () => props.modelValue || open.value,
    set: (newVal) => {
        open.value = newVal
        emit('update:modelValue', newVal)
    }
})
function submit(event: Event) {
    emit('submit', event)
}
</script>

<template>
    <v-dialog v-model="modelValue" activator="parent" width="auto" persistent>
        <v-card>
            <v-card-text>
                <v-container class="d-flex align-center">
                    <v-icon icon="mdi-alert-circle" size="x-large" />
                    <v-card-title>{{ title }}</v-card-title>
                </v-container>
            </v-card-text>
            <dialog-action @cancel="modelValue = false" @submit="submit"/>
        </v-card>
    </v-dialog>
</template>