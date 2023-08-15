<script lang="ts" setup>
import { ref } from 'vue';

import DialogAction from '../Dialog/DialogAction.vue';

const emit = defineEmits(['submit'])

const open = ref(false)
var url = ref("")

function submit() {
    open.value = false
    emit('submit', url.value)
}
</script>

<template>
    <v-dialog v-model="open" activator="parent" persistent width="500" @update:model-value="url = ''">
        <v-card>
            <v-card-title>添加图片</v-card-title>
            <v-card-text>
                <v-text-field v-model="url" label="链接" clearable />
                <span>预览</span>
                <v-img height="auto" aspect-ratio="1/1" cover :src="url"/>
            </v-card-text>
            <dialog-action @cancel="open = false" @submit="submit"/>
        </v-card>
    </v-dialog>
</template>