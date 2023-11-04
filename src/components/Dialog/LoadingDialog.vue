<script lang="ts" setup>
defineProps({
    title: {
        type: String,
        default: "请求中"
    },
    modelValue: Boolean
})
</script>

<template>
    <v-dialog :model-value="modelValue" persistent width="auto">
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
