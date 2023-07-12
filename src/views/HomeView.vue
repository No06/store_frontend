<script setup lang="ts">
import AppBar from '../components/HomeView/AppBar.vue';
import TabBar from '../components/HomeView/TabBar.vue';
</script>

<template>
  <app-bar/>
  <div class="container">
    <app-bar style="position: relative; visibility: hidden;"/>
    <tab-bar/>
  </div>
</template>

<style>
.container {
  position: absolute;
  height: 100vh;
  width: 100%;
  left: 0;
  top: 0;
}
</style>