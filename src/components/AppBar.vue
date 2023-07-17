<script setup lang="ts">
import { useRouter } from 'vue-router';
import jwt_decode from 'jwt-decode';

const router = useRouter()

const token = localStorage.getItem('token')
const items = [
    {
        title: "账号",
        onClicked: () => router.push("/profile")
    },
    {
        title: "注销",
        onClicked: () => {
            localStorage.removeItem("token");
            router.push("/login");
        }
    }
]
</script>

<template>
    <div class="appbar w-100 bg-surface">
        <p class="headline text-uppercase text-h4">store</p>
        <v-spacer/>
        <div class="d-flex flex-row-reverse">
            <v-btn v-if="token != null" class="button bg-primary text-none" size="large" prepend-icon="mdi-account" rounded>
                {{ jwt_decode<any>(token).username }}

                <v-menu activator="parent">
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in items"
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
    </div>
</template>

<style lang="scss">
@font-face {
  font-family: "Roboto";
  src: local("Roboto"), url("/fonts/Roboto-Bold.woff") format("woff");
}

@font-face {
  font-family: "Noto Sans SC";
  src: local("Noto Sans SC"), url("/fonts/NotoSansSC-Medium.otf") format("opentype");
}

.appbar {
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid #E0E0E0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 80px;
    transition: 0.5s;
    z-index: 1;
    
    .headline {
        font-family: 'Roboto', sans-serif;
        font-size: 32px;
        font-weight: 700;
        text-decoration: none;
        letter-spacing: 2px;
    }

    .button {
        font-family: 'Noto Sans SC';
        font-weight: 600;
        padding: 0 30px;
        font-size: 18px;
        letter-spacing: 2px;
    }

    .flex-item {
        margin-left: 10px;
    }
}
</style>