<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps({
    // image: {
    //     type: String,
    //     required: true
    // },  
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: ''
    }
})

const { title, content } = toRefs(props)
</script>

<template>
    <div>
        {{ title }}
    </div>
</template>