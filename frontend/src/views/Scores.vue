<script>
	import CreateScoreModal from '../components/CreateScoreModal.vue';

	export default {
		name: 'Rooms',
		components: {
			CreateScoreModal
		},
		data() {
			return {
				scores: [],
				selectedRoom: 0
			};
		},
		methods: {
			async getScores() {
				const request = await fetch('/api/items');
				const response = await request.json();
				this.scores = response;
			},
			async getRooms() {
				const response = await fetch('/api/rooms');
				const data = await response.json();
				this.rooms = data;
			}
		},
		mounted() {
			this.getScores();
			this.getRooms();
		}
	};
</script>
<template>
	<div class="flex flex-col items-center bg-slate-200 p-3 main-content">
		<div class="flex items-center">
			<h1 class="text-4xl font-semibold">Tider</h1>
		</div>
		<div>
			<select class="p-2 mt-1 rounded-md bg-gray-200 text-black" v-model="selectedRoom">
				<option value="0" selected>Alla rum</option>
				<option v-for="(room, index) in rooms" :key="index" :value="room._id">
					{{ room.roomName }}
				</option>
			</select>
			<CreateScoreModal @refresh="getScores" />
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
