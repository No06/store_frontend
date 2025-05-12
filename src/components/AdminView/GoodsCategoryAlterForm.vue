<script setup lang="ts">
import type { GoodsCategory } from '@/entities/GoodsCategory';
import type { PropType } from 'vue';
import { ref, toRef } from 'vue';
import { nonull } from '@/utils/formRules';

const props = defineProps({
    category: {
        type: Object as PropType<GoodsCategory>,
        default: () => ({})
    }
})
const category = toRef(props.category)
const emit = defineEmits(["submit"])

const isValidated = ref(false)

function submit() {
    if (isValidated.value) {
        emit('submit', category.value)
    }
}
</script>

<template>
    <v-form v-model="isValidated" @submit.prevent="submit" required>
        <v-row>
            <v-col>
                <v-text-field label="类名" v-model="category.name" :rules="[nonull]" counter="10"/>
                <v-textarea label="描述" v-model="category.description" counter="50"/>
            </v-col>
        </v-row>
        <slot name="action"/>
    </v-form>
</template>

<style scoped>

</style>