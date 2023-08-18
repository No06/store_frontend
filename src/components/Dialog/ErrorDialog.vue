<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    title: String,
    modelValue: Boolean
})
const emit = defineEmits(['update:modelValue', 'submit'])
const modelValue = computed({
    get: () => props.modelValue,
    set: (val) => {
        emit('update:modelValue', val)
    }
})

function submit() {
    modelValue.value = false
    emit('submit')
}
</script>

<template>
    <v-dialog :model-value="modelValue" activator="parent" persistent width="auto">
        <v-card>
            <v-card-text>
                <v-container class="d-flex align-center">
                    <v-icon icon="mdi-alert-circle" size="x-large" />
                    <v-card-title>{{ title }}</v-card-title>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="flat" block rounded="xs" size="x-large" @click="submit">确定</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>