<script lang="ts" setup>
import { toRef } from 'vue'

const props = defineProps({
    title: {
        type: String,
        default: "请求中"
    },
    modelValue: Boolean
})
const modelValue = toRef(props, 'modelValue')
</script>

<template>
    <v-dialog v-model="modelValue" activator="parent" persistent width="auto">
        <v-card>
            <v-card-text>
                <v-container class="d-flex align-center">
                    <v-progress-circular indeterminate color="primary" />
                    <v-card-title>{{ title }}</v-card-title>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
