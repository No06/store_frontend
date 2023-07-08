<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useField, useForm } from 'vee-validate'

const loading = ref(false)
const warning = ref(false)
const error = ref(false)
const errorMsg = ref('')

const { handleSubmit } = useForm({
  validationSchema: {
    username(value: string) {
      if (value?.length >= 2) return true
      return '用户名至少2位数'
    },
    password(value: string) {
      if (value != null && value != "") return true
      return '密码不能为空'
    }
  },
})
const username = useField('username')
const password = useField('password')

const login = handleSubmit((values: any) => {
  warning.value = false
  error.value = false;
  loading.value = true;
  axios.post("http://localhost:8080/login", JSON.stringify(values), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.data == '') {
      warning.value = true
    }
  })
  .catch((e) => {
    errorMsg.value = e
    error.value = true
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
          <v-text-field
            v-model="username.value.value"
            :counter="16"
            :error-messages="username.errorMessage.value"
            class="pb-2"
            label="账号"/>
          <v-text-field
            v-model="password.value.value"
            :counter="30"
            :error-messages="password.errorMessage.value"
            class="pb-2"
            label="密码"/>
          <v-btn 
            block 
            :loading="loading"
            size="large" 
            variant="elevated" 
            type="submit" 
            color="blue-darken-3">
            登录
          </v-btn>
        </form>
      </v-card>

      <v-alert
        class="mt-5"
        color="warning"
        theme="dark"
        icon="mdi-information"
        v-if=warning
        border
      >
        账号或密码错误！
      </v-alert>

      <v-alert
        class="mt-5"
        color="error"
        theme="dark"
        icon="mdi-close-circle-outline"
        v-if=error
        border
      >
        {{ errorMsg }}
      </v-alert>
    </div>
    
    <!-- <RouterView /> -->
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
