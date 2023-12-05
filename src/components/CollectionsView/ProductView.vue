<script lang="ts" setup>
import { Product } from '@/entities/Product';
import ErrorMessage from '@/components/ErrorMessage.vue';
import { addCart, getProductById } from '@/utils/axios';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { ProductImage } from '@/entities/ProductImage';
import { preview, vPreview } from 'vue3-image-preview';
import { useTokenStore } from '../../stores/token_store';
import router from '../../router/index';
import { useSnackBarStore } from '../../stores/snack_bar_store';

const route = useRoute()

const product = ref(new Product)
const isLoadding = ref(false)
const count = ref(1)
const selectedImage = ref<ProductImage>()
const imageIndex = ref(0)
const isHover = ref(false)
const description = ref([0])
const tokenStore = useTokenStore();
const snackBarStore = useSnackBarStore();

function init() {
    isLoadding.value = true

    var str: string;
    if (Array.isArray(route.params.id)) {
        str = route.params.id.join()
    } else {
        str = route.params.id
    }
    getProductById(parseInt(str))
        .then(resp => {
            product.value = resp.data
            selectedImage.value = product.value.images[0]
        })
        .catch(e => snackBarStore.errorMsg = e.message)
        .finally(() => isLoadding.value = false)
}
function preImg() {
    if (imageIndex.value == 0) {
        imageIndex.value = product.value.images.length - 1
    } else {
        imageIndex.value--
    }
    selectedImage.value = product.value.images[imageIndex.value]
}
function nextImg() {
    if (imageIndex.value == product.value.images.length - 1) {
        imageIndex.value = 0
    } else {
        imageIndex.value++
    }
    selectedImage.value = product.value.images[imageIndex.value]
}
function addToCart() {
    const product_id = product.value.id
    const token = tokenStore.token;
    if (token == null || token == undefined) {
        router.push("/login")
        return
    }
    addCart(product_id, count.value, token)
        .then(() => snackBarStore.successMsg = "添加成功")
        .catch(e => snackBarStore.errorMsg = "发生错误：" + e.message)
}
init()
</script>

<template>
    <v-list v-if="!snackBarStore.showErrorSnackBar" class="h-100">
        <div class="d-flex flex-column h-100 px-16 py-8" style="min-height: 600px;">
            <div class="d-flex mx-16 mb-8" style="font-size: 24px;">
                <div class="d-flex align-center" style="cursor: pointer;" @mouseover="isHover = true"
                    @mouseleave="isHover = false" @click="$router.back">
                    <v-icon icon="mdi-menu-left" class="backup-transition" :class="{ 'backup-hover': isHover }" />
                    返回购物
                </div>
                <v-spacer />
            </div>

            <div class="d-flex align-center w-100 h-100">
                <!-- 图片 -->
                <div class="d-flex align-center h-100 w-100 mx-8">
                    <!-- 预览条 -->
                    <div class="d-flex flex-column align-center mr-8 my-16">
                        <v-btn icon="mdi-menu-up" variant="text" style="font-size: 1.5rem; color: #424242;"
                            @click="preImg" />
                        <v-list class="my-2 pa-2 elevation-3 align-center rounded-lg"
                            style="max-height: 100%; overflow: hidden;">
                            <v-card v-for="image, index in product.images ?? null" :key="index"
                                :elevation="imageIndex == index ? 8 : 0" class="my-2" transition="fade-transition"
                                style="cursor: pointer;" @click="() => { imageIndex = index; selectedImage = image }">
                                <v-img width="100" aspect-ratio="1/1" :src="image.image_url" cover />
                            </v-card>
                        </v-list>
                        <v-btn icon="mdi-menu-down" variant="text" style="font-size: 1.5rem; color: #424242;"
                            @click="nextImg" />
                    </div>
                    <!-- 大图 -->
                    <div class="d-flex align-center w-100 h-auto rounded-lg border" style="overflow: hidden;">
                        <v-img v-if="!isLoadding" v-preview aspect-ratio="1/1" cover :src="selectedImage?.image_url"
                            @click="preview({ images: selectedImage?.image_url })" style="cursor: zoom-in;" />
                        <v-skeleton-loader v-else class="w-100 h-100" color="#E0E0E0" />
                    </div>
                </div>
                <!-- 详细信息 -->
                <div class="info d-flex flex-column w-100 h-100 mx-8">
                    <div class="mb-8">
                        <v-skeleton-loader :loading="isLoadding" type="list-item-two-line">
                            <div class="d-flex flex-column align-start">
                                <!-- 商品名 -->
                                <p class="title">{{ product.name }}</p>
                                <!-- 价格 -->
                                <div class="price">
                                    <span :class="{ original_price: product.discount != 1 }">￥{{ product.price }}</span>
                                    <span v-if="product.discount != 1" class="current_price">￥{{ Math.floor(product.price *
                                        product.discount * 100) / 100 }}</span>
                                </div>
                            </div>
                        </v-skeleton-loader>
                    </div>

                    <div class="d-flex justify-space-between my-8">
                        <div>
                            <span class="subtitle">购买数量</span>
                            <v-text-field v-model="count" class="centered-input mt-2" type="number" density="comfortable"
                                variant="outlined" single-line aria-hidden style="max-width: 150px;">
                                <template v-slot:prepend-inner>
                                    <v-btn icon="mdi-minus" density="comfortable" variant="text"
                                        @click="() => { if (count > 1) count -= 1 }" />
                                </template>
                                <template v-slot:append-inner>
                                    <v-btn icon="mdi-plus" density="comfortable" variant="text" @click="count++" />
                                </template>
                            </v-text-field>
                        </div>

                        <div class="d-flex flex-column-reverse h-100">
                            <v-btn size="x-large" color="primary" rounded="lg" prepend-icon="mdi-cart" style="bottom: 0;"
                                :disabled="product.stock == 0" @click="addToCart">
                                <template v-slot:prepend>
                                    <v-icon size="large"></v-icon>
                                </template>
                                {{ product.stock == 0 ? "无货" : "添加至购物车" }}
                            </v-btn>
                        </div>
                    </div>
                    <!-- 商品描述 -->
                    <div v-if="!isLoadding" class="my-8">
                        <v-expansion-panels v-model="description">
                            <v-expansion-panel title="描述" :text=product.description />
                        </v-expansion-panels>
                    </div>
                </div>
            </div>
        </div>
    </v-list>
    
    <error-message v-else class="h-100">
        {{ snackBarStore.errorMsg }}
    </error-message>
</template>

<style lang="scss" scoped>
.info {
    font-size: 28px;
    letter-spacing: 1px;

    .title {
        font-size: 32px;
    }

    .price {
        display: flex;
        align-items: center;
        color: crimson;

        .original_price {
            color: grey;
            text-decoration: line-through;
            font-size: large;
            margin-right: 5px;
        }

        .current_price {
            color: forestgreen;
        }
    }
}

.centered-input :deep(input) {
    text-align: center;
}

.backup-transition {
    transition: all .2s;
}

.backup-hover {
    padding-right: 1rem;
}
</style>@/entities/ProductVO@/entities/Product../../stores/token_store