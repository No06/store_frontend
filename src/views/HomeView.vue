<script setup lang="ts">
import CarouselProduct from '../components/CarouselProduct.vue';

const products = [
  {
    name: "商品1",
    des: "描述",
    addnlDes: "额外描述"
  },
  {
    name: "商品2",
    des: "描述",
    addnlDes: "额外描述"
  }
]
</script>

<template>
  <div class="h-100">
    <v-carousel
      cycle
      height="100%"
      hide-delimiter-background
      color="rgb(var(--v-theme-primary))"
      show-arrows="hover"
    >
      <carousel-product v-for="(prod, i) in products" :key="i" :product="prod"/>
    </v-carousel>
  </div>
</template>

<style lang="scss" scoped>

</style>