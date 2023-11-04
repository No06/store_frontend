<script setup lang="ts">
import { ref } from 'vue';
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router';

import { useTokenStore } from '@/stores/token';
import { login as axiosLogin } from '@/utils/axios';

const usernameLimit = 16
const passwordLimit = 30

const { handleSubmit } = useForm({
    validationSchema: {
        username(value: string) {
            if (value.length <= 2) return '用户名至少需要2位数'
            return true
        },
        password(value: string) {
            if (value == null || value == "") return '密码不能为空'
            return true;
        }
    },
})
const loading = ref(false)
const isError = ref(false)
const alertMsg = ref('')

const username = useField('username')
const password = useField('password')
const router = useRouter()
const tokenStore = useTokenStore()
const showPw = ref(false)

const login = handleSubmit((values: any) => {
    alertMsg.value = ""
    isError.value = false;
    loading.value = true;

    axiosLogin(JSON.stringify(values))
        .then(resp => {
            if (resp.status == 200) {
                tokenStore.update(resp.data);
                router.back()
            } else {
                alertMsg.value = resp.data
            }
        })
        .catch(e => {
            const resp = e.response
            if (resp != null) {
                alertMsg.value = resp.data
            } else {
                alertMsg.value = e.message
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
                    <v-text-field v-model="username.value.value" counter :maxlength="usernameLimit" :error-messages="username.errorMessage.value" 
                        label="账号" />
                    <v-text-field v-model="password.value.value" counter :maxlength="passwordLimit" :error-messages="password.errorMessage.value"
                        label="密码" :append-inner-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPw ? 'text' : 'password'" @click:append-inner="showPw = !showPw" />
                    <v-btn block :loading="loading" size="large" variant="elevated" type="submit" color="blue-darken-3">
                        登录
                    </v-btn>
                </form>
            </v-card>

            <v-alert v-if="alertMsg" class="mt-5" :color="isError ? 'error' : 'warning'" theme="dark"
                :icon="isError ? 'mdi-close-circle-outline' : 'mdi-information'" border>
                {{ alertMsg }}
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
