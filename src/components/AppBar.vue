<script lang="ts" setup>
import { useRouter } from 'vue-router';
import jwt_decode from 'jwt-decode';

import { useTokenStore } from '@/stores/token';

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
            router.push("/login");
        }
    }
]
</script>

<template>
    <div class="appbar w-100 bg-surface justify-space-between">
        <p class="headline text-uppercase" style="cursor: pointer;" @click="router.push('/')">store</p>

        <div class="justify-center">
            <v-btn class="mx-2">
                主页
            </v-btn>
            <v-btn class="mx-2">
                全部商品
            </v-btn>
        </div>

        <div class="d-flex flex-row-reverse">
            <div>
                <v-btn v-if="token != null" class="button bg-primary text-none rounded-lg" size="large" prepend-icon="mdi-account">
                    {{ jwt_decode<any>(token).username }}

                    <v-menu activator="parent">
                        <v-list>
                            <v-list-item
                                v-for="(item, index) in dropDownItems"
                                :key="index"
                                :value="index"
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
            </div>
            <v-divider vertical class="mx-5"></v-divider>
            <v-row class="flex-row-reverse" align="center" justify="center">
                <v-btn icon="mdi-cart" variant="text" class="mx-2" border/>
                <v-btn icon="mdi-magnify" variant="text" class="mx-2" border/>
            </v-row>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "xiaowei";
  src: url("/fonts/xiaowei.woff2") format("woff2");
}

.appbar {
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #E0E0E0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12.5px 80px;
    transition: 0.5s;
    z-index: 1;
    
    .headline {
        font-family: 'xiaowei';
        font-size: 36px;
        font-weight: 700;
        text-decoration: none;
        letter-spacing: 2px;
    }

    .button {
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