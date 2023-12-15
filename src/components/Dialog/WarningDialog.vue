<script lang="ts" setup>
import { computed } from 'vue';

import DialogAction from './DialogAction.vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: String
})
const emit = defineEmits(['update:modelValue', 'submit'])
const modelValue = computed({
    get: () => props.modelValue,
    set(newVal) {
        emit('update:modelValue', newVal)
    }
})

function submit(event: Event) {
    modelValue.value = false
    emit('submit', event)
}
</script>

<template>
    <v-dialog v-model="modelValue" activator="parent" width="auto">
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