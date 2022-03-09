<script>
	export default {
		name: 'Rooms',
		data() {
			return {
				scores: []
			};
		},
		methods: {
			async getScores() {
				const request = await fetch('/api/items');
				const response = await request.json();
				this.scores = response;
			}
		},
		mounted() {
			this.getScores();
		}
	};
</script>
<template>
	<div class="flex flex-col items-center bg-slate-200 p-3 main-content">
		<div class="flex items-center">
			<h1 class="text-4xl font-semibold">Tider</h1>
		</div>
		<div
			v-for="(score, index) in scores"
			:key="index"
			class="flex flex-col w-full md:w-2/4 lg:w-1/4 items-center bg-gray-300 m-3 p-2 rounded"
		>
			<p>{{ score }}</p>
		</div>
	</div>
</template>
<style scoped>
	.main-content {
		min-height: calc(100vh - 64px);
	}
	@media all and (display-mode: fullscreen) {
		.main-content {
			min-height: 100vh;
		}
	}
</style>
