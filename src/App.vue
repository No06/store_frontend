<script lang="ts" setup>
import { useSnackBarStore } from './stores/snack_bar_store';

const snackBarStore = useSnackBarStore()
const snackBarTimeout = 3000;
</script>

<template>
  <router-view/>
  <v-snackbar v-model="snackBarStore.showErrorSnackBar" color="error" :timeout="snackBarTimeout">
      <v-icon icon='mdi-close-circle-outline' class="mr-2" />
      {{ snackBarStore.errorMsg }}
  </v-snackbar>
  <v-snackbar v-model="snackBarStore.showSuccessSnackBar" color="success" :timeout="snackBarTimeout">
      <v-icon icon='mdi-check' class="mr-2" />
      {{ snackBarStore.successMsg }}
  </v-snackbar>
</template>

<style>
@font-face {
  font-family: "ResourceHanRoundedCN-Medium";
  src: url("/fonts/ResourceHanRoundedCN-Medium.woff2") format("woff2");
}

body {
  font-family: ResourceHanRoundedCN-Medium;
}
</style>