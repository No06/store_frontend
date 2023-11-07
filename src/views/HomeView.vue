<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue';
import CarouselProduct from '@/components/HomeView/CarouselProduct.vue';
import type { CarouselVO } from '@/entities/CarouselVO';
import { getAllCarousel } from '@/utils/axios';
import { ref } from 'vue';
import { useSnackBarStore } from '../stores/snack_bar_store';

const carousels = ref(new Array<CarouselVO>);
const isLoadding = ref(false)
const snackBar = useSnackBarStore()

function init() {
    isLoadding.value = true

    getAllCarousel()
        .then(resp => carousels.value = resp.data)
        .catch(e => snackBar.errorMsg = e.message)
        .finally(() => isLoadding.value = false)
}
init()
</script>

<template>
    <v-list class="h-100">
        <div class="h-100" style="min-height: 600px;">
            <div v-if="isLoadding" class="d-flex align-center justify-center h-100">
                <v-progress-circular :size="50" color="primary" indeterminate/>
            </div>
            <div v-else-if="!snackBar.showErrorSnackBar" class="h-100">
                <v-carousel cycle height="100%" hide-delimiter-background color="rgb(var(--v-theme-primary))" show-arrows="hover">
                    <carousel-product v-for="(carousel, i) in carousels" :key="i" :carousel="carousel"/>
                </v-carousel>
            </div>
            <error-message v-else class="h-100">{{ snackBar.errorMsg }}</error-message>
        </div>
    </v-list>
</template>