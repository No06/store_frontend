<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useTokenStore } from '@/stores/token_store';
import { userLogin , userRegister } from '@/utils/axios';
import { useSnackBarStore } from '../stores/snack_bar_store';

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const usernameLimit = 16
const passwordLimit = 30
const nameRules = [
    (value: string) => {
        if (value == null || value == undefined || value == "" || value.length < 3) return '用户名至少需要3位数'
        return true
    }
]
const passwordRules = [
    (value: string) => {
        if (value == null || value == undefined || value == "" || value.length < 6) return '密码至少需要6位数'
        return true
    }
]
const confirmPasswordRules = [
    (value: string) => {
        if (value == null || value == undefined || value == "" || value != password.value) return "两次输入的密码不相同"
        return true
    }
]

const loading = ref(false)
const isError = ref(false)
const alertMsg = ref('')
const router = useRouter()
const tokenStore = useTokenStore()
const showPw = ref(false)
const goRegister = ref(false)
const snackBar = useSnackBarStore()
const valid = ref(false)

function login() {
    alertMsg.value = ""
    isError.value = false;
    loading.value = true;
    const user = {
        username: username.value,
        password: password.value
    }

    userLogin(user)
        .then(resp => {
            if (resp.status == 200) {
                tokenStore.update(resp.data);
                router.back();
                snackBar.successMsg = "登录成功"
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
}
function switchForm() {
    valid.value = false
    username.value = ""
    password.value = ""
    goRegister.value = !goRegister.value
}
async function register() {
    alertMsg.value = ""
    loading.value = true
    const user = {
        username: username.value,
        password: password.value
    };
    userRegister(user)
        .then(() => {
            snackBar.successMsg = "注册成功"
            switchForm()
        })
        .catch(e => alertMsg.value = e.message)
        .finally(() => loading.value = false)
}
</script>

<template>
    <div class="body justify-center">
        <div style="width: 300px;">
            <v-card class="pa-5" elevation="3">
                <!-- 登录表单 -->
                <div v-if="!goRegister">
                    <v-card-title class="py-5 font-weight-black pa-2">
                        登录
                    </v-card-title>
                    <v-form v-model="valid" @submit.prevent="() => {if (valid) login()}">
                        <v-text-field v-model="username" :rules="nameRules" counter validate-on="lazy input"
                            :maxlength="usernameLimit" label="账号" />
                        <v-text-field v-model="password" :rules="passwordRules" counter validate-on="lazy input"
                            :maxlength="passwordLimit" label="密码" :append-inner-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPw ? 'text' : 'password'" @click:append-inner="showPw = !showPw" />
                        <v-btn block :loading="loading" size="large" variant="elevated" type="submit" color="blue-darken-3">
                            登录
                        </v-btn>
                        <v-btn class="mt-2" block size="large" :disabled="loading" variant="tonal" @click="switchForm">
                            注册
                        </v-btn>
                    </v-form>
                </div>
                <!-- 注册表单 -->
                <div v-else>
                    <v-card-title class="py-5 font-weight-black pa-2">
                        注册
                    </v-card-title>

                    <v-form v-model="valid" @submit.prevent="() => {if (valid) register()}">
                        <v-text-field v-model="username" :rules="nameRules" counter validate-on="lazy input"
                            :maxlength="usernameLimit" label="账号" />
                        <v-text-field v-model="password" :rules="passwordRules" counter validate-on="lazy input"
                            :maxlength="passwordLimit" label="密码" :append-inner-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPw ? 'text' : 'password'" @click:append-inner="showPw = !showPw" />
                        <v-text-field v-model="confirmPassword" :rules="confirmPasswordRules" counter
                            :maxlength="passwordLimit" validate-on="submit" type="password" label="确认密码" />
                        <v-btn block :loading="loading" size="large" variant="elevated" type="submit" color="blue-darken-3">
                            注册
                        </v-btn>
                        <v-btn class="mt-2" block size="large" :disabled="loading" variant="tonal" @click="switchForm">
                            已有账号？前往登录
                        </v-btn>
                    </v-form>
                </div>
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
@/stores/token_store