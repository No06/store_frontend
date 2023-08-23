<script lang="ts" setup>
import type { Product } from '@/entities/Product';
import { getProductById } from '@/utils/axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import ErrorMessage from '../ErrorMessage.vue';

const product = ref<Product>()
const isLoadding = ref(false)
const error = ref("")

function init() {
    isLoadding.value = true
    error.value = ""
    const route = useRoute()
    var str: string;
    if (Array.isArray(route.params.id)) {
        str = route.params.id.join()
    } else {
        str = route.params.id
    }
    getProductById(str)
        .then(resp => product.value = resp.data)
        .catch(e => error.value = e.message)
        .finally(() => isLoadding.value = false)
}
init()
</script>

<template>
    <div v-if="!error" class="d-flex h-100 ma-16">
        <div class="d-flex align-center w-100">
            <div class="mx-4 my-16 h-100 bg-primary">

            </div>

            <div class="">

            </div>
        </div>

        <div class="info">

        </div>
    </div>
    <error-message v-else class="h-100">
        {{ error }}
    </error-message>
</template>

<style scoped>
.info {
    width: 90%;
    max-width: 50%;
    background-color: aqua;
}
</style>