<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router';

import { useTokenStore } from '@/stores/token';
import { login as axiosLogin } from '@/utils/axios';

const loading = ref(false)
const isWarning = ref(false)
const warningMsg = ref('')
const isError = ref(false)
const errorMsg = ref('')

const { handleSubmit } = useForm({
    validationSchema: {
        username(value: string) {
            if (value.length >= 2) {
                if (value.length <= 16) return true
                return "长度超出限制"
            }
            return '用户名至少需要2位数'
        },
        password(value: string) {
            if (value.length >= 30) return "长度超出限制"
            if (value != null && value != "") return true
            return '密码不能为空'
        }
    },
})

const username = useField('username')
const password = useField('password')
const router = useRouter()
const tokenStore = useTokenStore()
const showPw = ref(false)

const login = handleSubmit((values: any) => {
    isWarning.value = false
    isError.value = false;
    loading.value = true;
    
    axiosLogin(JSON.stringify(values))
        .then(resp => {
            if (resp.status == 200) {
                tokenStore.update(resp.data);
                router.push('/')
            } else {
                isWarning.value = true
                warningMsg.value = resp.data
            }
        })
        .catch(e => {
            const resp = e.response
            if (resp != null) {
                errorMsg.value = resp.data
            } else {
                errorMsg.value = e.message
            }
            isError.value = true
        })
        .finally(() => loading.value = false)
})
</script>

<template>
    <div class="body justify-center">
        <div style="width: 300px;">
            <v-card class="pa-5" elevation="3">
                <v-card-title class="py-5 font-weight-black pa-2">
                    登录
                </v-card-title>
                <form @submit.prevent="login">
                    <v-text-field v-model="username.value.value" :counter="16" :error-messages="username.errorMessage.value"
                        label="账号" />
                    <v-text-field v-model="password.value.value" :counter="30" :error-messages="password.errorMessage.value"
                        label="密码" :append-inner-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPw ? 'text' : 'password'" @click:append-inner="showPw = !showPw" />
                    <v-btn block :loading="loading" size="large" variant="elevated" type="submit" color="blue-darken-3">
                        登录
                    </v-btn>
                </form>
            </v-card>

            <v-alert class="mt-5" color="warning" theme="dark" icon="mdi-information" v-if=isWarning border>
                {{ warningMsg }}
            </v-alert>

            <v-alert class="mt-5" color="error" theme="dark" icon="mdi-close-circle-outline" v-if=isError border>
                {{ errorMsg }}
            </v-alert>
        </div>
    </div>
</template>

<style scoped>
.body {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    line-height: 1.5;
    max-height: 100vh;
    display: flex;
    justify-items: center;
    align-items: center;
    background-image: linear-gradient(to top right, rgb(135, 206, 235) 0%, rgb(176, 224, 230) 50%, rgb(173, 216, 230) 100%);
}

.form-box {
    border-radius: 10px;
    background-color: aliceblue;
}
</style>
