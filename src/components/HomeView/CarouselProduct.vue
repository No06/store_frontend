<script lang="ts" setup>
import type { Carousel } from '@/entities/Carousel';
import { type PropType } from 'vue';

defineProps({
    carousel: {
        type: Object as PropType<Carousel>,
        required: true
    }
})
</script>

<template>
    <v-carousel-item>
        <v-sheet height="100%" width="100%" class="d-flex">
            <div class="image-box" style="flex: 1;">
                <img :src="carousel.image.image_url" class="image" />
            </div>

            <div class="font-wlcmg d-flex align-center" style="flex: 1">
                <div>
                    <div>
                        <p class="title font-weight-bold">{{ carousel.title }}</p>
                        <p class="describe">{{ carousel.description }}</p>
                    </div>
                    <div v-if="carousel.subDescription != undefined">
                        <v-divider class="my-5" thickness="3px" />
                        <p class="describe">{{ carousel.subDescription }}</p>
                    </div>
                    <div class="d-flex mt-16 w-100">
                        <v-spacer />
                        <v-btn color="primary" rounded="lg" size="x-large" prepend-icon="mdi-cart" elevation="5"
                            @click="$router.push('/product/' + carousel.product_id)">
                            <template v-slot:prepend>
                                <v-icon color="" size="32" />
                            </template>
                            <p style="font-size: 26px;">立即选购</p>
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-sheet>
    </v-carousel-item>
</template>

<style lang="scss" scoped>
@font-face {
    font-family: "jf-openhuninn";
    src: url("/fonts/jf-openhuninn.woff2") format("woff2");
}

$color-primaryContainer : rgb(var(--v-theme-primaryContainer));

.image {
    width: 35vw;
    height: 100%;
    margin-left: 100px;
    object-fit: cover;
    clip-path: inset(0 0 10% 0 round 0 0 20vw 20vw);
}

.title {
    font-size: 64px;
    margin-bottom: 40px;
    background-image: linear-gradient($color-primaryContainer, $color-primaryContainer);
    background-size: 100% 40%;
    background-clip: content-box;
    background-position: bottom 10px right 0;
}

.describe {
    font-size: 32px;
    letter-spacing: 3px;
}

.font-wlcmg {
    font-family: "jf-openhuninn";
    color: #7F7E7D;
}
</style>@/entities/Carousel