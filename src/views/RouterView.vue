<script setup lang="ts">
import AppBar from '../components/AppBar.vue';
</script>

<template>
  <app-bar/>
  <div class="container">
    <app-bar style="position: relative; visibility: hidden;"/>
    <router-view/>
  </div>
</template>

<style>
.container {
  position: absolute;
  height: 100vh;
  min-width: 100%;
  left: 0;
  top: 0;
}
</style>