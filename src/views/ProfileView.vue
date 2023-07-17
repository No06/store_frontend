<script lang="ts" setup>
import jwt_decode from 'jwt-decode';
const token = jwt_decode<any>(localStorage.getItem("token")!)
</script>

<template>
    <div class="d-flex flex-column" style="margin: 50px 300px;">
        <v-sheet border rounded class="mb-5">
            <div class="d-flex flex-row align-center">
                <div class="border ma-5" style="border-radius: 90px;">
                    <v-icon size="80px" icon="mdi-help-circle-outline"/>
                </div>
                <div class="w-100">
                    <h1>{{ token.username }}</h1>
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
</template>