<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps({
    product: Object()
})
const { product } = toRefs(props)
</script>

<template>
    <v-carousel-item>
        <v-sheet height="100%" width="100%" class="d-flex">
            <div class="image-box" style="flex: 1;">
                <img src="https://assets.digitalocean.com/articles/alligator/css/object-fit/example-object-fit.jpg" class="image"/>
            </div>

            <div class="font-wlcmg d-flex align-center" style="flex: 1">
                <div>
                    <div>
                        <p class="title font-weight-bold">{{ product.name }}</p>
                        <p class="describe">{{ product.des }}</p>
                    </div>
                    <div v-if="product.addnlDes != ''">
                        <v-divider class="my-5" thickness="3px"/>
                        <p class="describe">{{ product.addnlDes }}</p>
                    </div>
                </div>
            </div>
        </v-sheet>
    </v-carousel-item>
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