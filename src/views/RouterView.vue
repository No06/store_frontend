<script setup lang="ts">
import AppBar from '../components/AppBar.vue';
</script>

<template>
	<div class="box bg-surface">
		<app-bar style="position: static;"/>

		<div class="body">
			<router-view />
		</div>
	</div>
</template>

<style scoped>
.box {
	display: flex;
	flex-direction: column;
	min-width: 1000px;
	height: 100vh;
}
.body {
	height: 100%;
	max-height: 100%;
	overflow: hidden;
}
</style>