<script setup lang="ts">
import AppBar from '../components/AppBar.vue';
</script>

<template>
	<div class="d-flex flex-column w-100 h-screen bg-surface">
		<app-bar style="position: static;"/>
		<div class="d-flex flex-column h-100" style="max-height: calc(100% - 80px);">
			<router-view />
		</div>
	</div>
</template>