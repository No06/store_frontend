<script lang="ts" setup>
defineProps({
    product: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <tr>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.discount }}</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.category.name }}</td>
        <td>
            <v-btn variant="text" icon="mdi-pencil" size="small" />
            <v-btn variant="text" icon="mdi-delete" size="small" />
        </td>
    </tr>
</template>
