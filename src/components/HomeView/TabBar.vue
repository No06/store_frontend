<script lang="ts" setup>
import { ref } from 'vue';
import TabViewPage from './TabViewPage.vue';

const tabs = [
	{
		name: "商品1",
		content: "1"
	},
	{
		name: "商品2",
		content: "2"
	},
	{
		name: "商品3",
		content: "3"
	}
]

const tab = ref(tabs[0].name)
</script>

<template>
    <div style="border-top: 1px solid #FFE0B2;">
      <v-tabs fixed-tabs v-model="tab" color="#FFF8C2" class="bg-primary">
				<v-tab v-for="tab in tabs" :key="tab.name" :value="tab.name">
					{{ tab.name }}
				</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item v-for="tab in tabs" :key="tab.name" :value="tab.name">
					<tab-view-page :title="tab.name"/>
				</v-window-item>
			</v-window>
    </div>
</template>
