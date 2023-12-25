<script lang="ts" setup>
const navigationItems = [
    {
        title: "商品管理",
        icon: "mdi-store-edit-outline",
        to: 'product-manage'
    },
    {
        title: "商品类管理",
        icon: "mdi-playlist-edit",
        to: 'product-category-manage'
    },
    {
        title: "用户管理",
        icon: "mdi-account-edit",
        to: 'user-manage'
    },
    // {
    //     title: "订单查看",
    //     icon: "mdi-note-text",
    //     to: 'order'
    // }
]
</script>

<template>
    <v-layout class="h-100">
        <v-navigation-drawer style="position: relative;" permanent>
            <v-list nav :mandatory="true" select-strategy="single-independent">
                <v-list-item 
                    v-for="(item, i) in navigationItems"
                    :key="i"
                    :prepend-icon="item.icon"
                    :title="item.title"
                    :value="i"
                    :replace="true"
                    :to="item.to"
                />
            </v-list>
        </v-navigation-drawer>

        <div class="d-flex w-100">
            <router-view/>
        </div>
    </v-layout>
</template>

<style scoped>
</style>