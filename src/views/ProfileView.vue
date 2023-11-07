<script lang="ts" setup>
import { useTokenStore } from '@/stores/token_store';

const tokenStore = useTokenStore()
const decodeToken = tokenStore.decodeToken()
</script>

<template>
    <div class="d-flex flex-column" style="margin: 50px 300px;">
        <v-sheet border rounded class="mb-5">
            <div class="d-flex flex-row align-center">
                <div class="border ma-5 rounded-circle">
                    <v-icon size="80px" icon="mdi-help-circle-outline"/>
                </div>
                <div class="w-100">
                    <h1>{{ decodeToken.username }}</h1>
                </div>
            </div>
        </v-sheet>

        <v-expansion-panels>
            <v-expansion-panel
                title="信息"
                text="信息......"
            />
            <v-expansion-panel
                title="信息"
                text="信息......"
            />
            <v-expansion-panel
                title="信息"
                text="信息......"
            />
        </v-expansion-panels>
    </div>
</template>@/stores/token_store