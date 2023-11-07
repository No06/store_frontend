<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { useTokenStore } from '@/stores/token_store';

const router = useRouter()

const tokenStore = useTokenStore()
const token = tokenStore.token
const dropDownItems = [
    {
        title: "账号",
        onClicked: () => router.push("/profile")
    },
    {
        title: "注销",
        onClicked: () => {
            tokenStore.remove();
            window.location.reload();
        }
    }
]
if (tokenStore.decodeToken().isAdmin) {
    dropDownItems.unshift(
        {
            title: "控制面板",
            onClicked: () => router.push("/admin")
        }
    )
}
const navigationItems = [
    {
        name: "主页",
        path: "/",
    },
    {
        name: "全部商品",
        path: "/collections/all-products",
    }
]
</script>

<template>
    <div class="appbar w-100 bg-surface justify-space-between">
        <p class="headline text-uppercase" @click="router.push('/')">
            store
        </p>

        <div class="justify-center">
            <v-btn 
                v-for="(item, i) in navigationItems" 
                :key="i"
                :color="router.currentRoute.value.path == item.path ? 'primary' : undefined"
                class="mx-2"
                size="large"
                @click="() => {
                    if (router.currentRoute.value.path != item.path) {
                        router.replace(item.path)
                    }
                }"
                rounded
            >
                {{ item.name }}
            </v-btn>
        </div>

        <div class="d-flex flex-row-reverse">
            <v-btn v-if="token != null" class="button bg-primary text-none rounded-lg" size="large" prepend-icon="mdi-account">
                {{ tokenStore.decodeToken().username }}

                <v-menu activator="parent">
                    <v-list>
                        <v-list-item
                            v-for="(item, i) in dropDownItems"
                            :key="i"
                            @click="item.onClicked"
                        >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn>
            
            <v-btn v-else class="button elevation-3" size="large" rounded @click="router.push('/login')">
                登录
            </v-btn>

            <v-divider vertical class="mx-6"></v-divider>

            <v-btn variant="text" icon="mdi-cart" @click="router.push('/cart')">
            </v-btn>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "xiaowei";
  src: url("/fonts/xiaowei.woff2") format("woff2");
}

.appbar {
    top: 0;
    left: 0;
    min-height: 80px;
    border-bottom: 1px solid #E0E0E0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12.5px 80px;
    box-sizing: border-box;
    transition: 0.5s;
    z-index: 1;
    
    .headline {
        font-family: 'xiaowei';
        font-size: 36px;
        font-weight: 700;
        text-decoration: none;
        letter-spacing: 2px;
        cursor: pointer;
    }

    .button {
        align-self: center;
        font-weight: 600;
        padding: 0 20px;
        font-size: 18px;
        letter-spacing: 2px;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 150px;
        overflow: hidden;
    }
}
</style>