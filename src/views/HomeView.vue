<script setup lang="ts">
const items = [
  {
    title: "商品1",
    describe: "描述"
  },
  {
    title: "商品2",
    describe: "描述"
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
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-sheet height="100%" width="100%" class="d-flex">
          <div class="image-box" style="flex: 1; background-color: #e0e0e0;">
            <img src="https://assets.digitalocean.com/articles/alligator/css/object-fit/example-object-fit.jpg" class="image"/>
          </div>

          <div class="font-wlcmg d-flex justify-center align-center" style="flex: 1">
            <div>
              <p class="title font-weight-bold">{{ item.title }}</p>
              <p class="describe ">{{ item.describe }}</p>
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: "jf-openhuninn";
  src: url("/fonts/jf-openhuninn.woff2") format("woff2");
}
$color-primaryContainer : rgb(var(--v-theme-primaryContainer));
.image {
  width: 35vw;
  height: 100%;
  margin-left: 100px;
  object-fit: cover;
  clip-path: inset(0 0 10% 0 round 0 0 20vw 20vw);
}
.title {
  font-size: 64px;
  margin-bottom: 40px;
  background-image: linear-gradient($color-primaryContainer, $color-primaryContainer);
  background-size: 100% 40%;
  background-clip: content-box;
  background-position: bottom 10px right 0;
}
.describe {
  font-size: 32px;
  letter-spacing: 3px;
}
.font-wlcmg {
  font-family: "jf-openhuninn";
  color: #7F7E7D;
}
</style>