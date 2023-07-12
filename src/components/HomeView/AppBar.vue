<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <div class="appbar w-100 bg-primary">
        <p class="headline text-uppercase text-h4 text-onPrimary">store</p>
        <v-spacer/>
        <div class="d-flex flex-row-reverse">
            <button @click="router.push('/login')">登录</button>
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
        text-transform: uppercase;
        letter-spacing: 2px;
    }

    button {
        font-family: 'Noto Sans SC';
        font-weight: bold;
        color: rgb(22, 27, 33);
        background-color: #fff;
        padding: 7.5px 30px;
        border-radius: 24px;
        border: none;
        font-size: 16px;
        letter-spacing: 2px;
        cursor: pointer;
    }
    .flex-item {
        margin-left: 10px;
    }
}
</style>