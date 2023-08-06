<script setup lang="ts">
import AppBar from '../components/AppBar.vue';
</script>

<template>
  <app-bar/>
  <div class="d-flex flex-column w-100 h-100 bg-surface" style="position: absolute;">
    <app-bar style="position: static; visibility: hidden;"/>
    <suspense>
      <router-view/>
    </suspense>
  </div>
</template>