<script lang="ts" setup>
const emit = defineEmits(['cancel', 'submit'])
defineProps({
    cancelBtnText: {
        type: String,
        default: "取消"
    },
    submitBtnText: {
        type: String,
        default: "确定"
    }
})
</script>

<template>
    <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" variant="text" class="px-5" rounded @click="emit('cancel', $event)">{{ cancelBtnText }}</v-btn>
        <v-btn color="primary" variant="elevated" class="px-5" rounded @click="emit('submit', $event)" type="submit">{{ submitBtnText }}</v-btn>
    </v-card-actions>
</template>