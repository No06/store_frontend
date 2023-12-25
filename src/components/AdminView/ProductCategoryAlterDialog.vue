<script setup lang="ts">
import type { PropType } from 'vue';
import { type ProductCategoryDTO } from '../../entities/ProductCategory';
import { ref } from 'vue';
import DialogAction from '@/components/Dialog/DialogAction.vue';
import ProductCategoryAlterForm from '@/components/AdminView/ProductCategoryAlterForm.vue';

defineProps({
    category: {
        type: Object as PropType<ProductCategoryDTO>
    },
    label: String
})
const emit = defineEmits(["submit", "cancel"])

const open = ref(false)

function submit(category: ProductCategoryDTO) {
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
