<script setup lang="ts">
import ErrorMessage from '@/components/ErrorMessage.vue';
import CarouselGoods from '@/components/HomeView/CarouselGoods.vue';
import { getAllCarousel } from '@/utils/axios';
import { ref } from 'vue';
import { useSnackBarStore } from '../stores/snack_bar_store';
import type { CarouselVO } from '../entities/vo/CarouselVO';

const carousels = ref(new Array<CarouselVO>);
const isLoadding = ref(false)
const snackBar = useSnackBarStore()

function init() {
    isLoadding.value = true

    getAllCarousel()
        .then(resp => carousels.value = resp.data)
        .catch(snackBar.showAxiosError)
        .finally(() => isLoadding.value = false)
}
init()
</script>

<template>
    <v-list class="h-100 pt-0">
        <div class="h-100" style="min-height: 600px;">
            <div v-if="isLoadding" class="d-flex align-center justify-center h-100">
                <v-progress-circular :size="50" color="primary" indeterminate/>
            </div>
            <div v-else-if="!snackBar.showErrorSnackBar" class="h-100">
                <v-carousel cycle height="100%" hide-delimiter-background color="rgb(var(--v-theme-primary))" show-arrows="hover">
                    <CarouselGoods v-for="(carousel, i) in carousels" :key="i" :carousel="carousel"/>
                </v-carousel>
            </div>
            <error-message v-else class="h-100">{{ snackBar.errorMsg }}</error-message>
        </div>
    </v-list>
</template>