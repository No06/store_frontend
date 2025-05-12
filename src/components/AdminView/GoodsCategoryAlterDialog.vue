<script setup lang="ts">
import type { PropType } from 'vue';
import { type GoodsCategory } from '../../entities/GoodsCategory';
import { ref } from 'vue';
import DialogAction from '@/components/Dialog/DialogAction.vue';
import ProductCategoryAlterForm from '@/components/AdminView/GoodsCategoryAlterForm.vue';

defineProps({
    category: {
        type: Object as PropType<GoodsCategory>
    },
    label: String
})
const emit = defineEmits(["submit", "cancel"])

const open = ref(false)

function submit(category: GoodsCategory) {
    open.value = false
    emit("submit", category)
}
function cancel() {
    open.value = false
    emit("cancel")
}
</script>

<template>
    <v-dialog v-model="open" activator="parent" persistent width="auto">
        <v-card>
            <v-card-title>{{ label }}</v-card-title>
            <v-card-text>
                <product-category-alter-form :category="category" @submit="submit">
                    <template #action>
                        <dialog-action @cancel="cancel" />
                    </template>
                </product-category-alter-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style scoped></style>
