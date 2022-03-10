<script>
	import CreateScoreModal from '../components/CreateScoreModal.vue';
	import Score from '../components/Score.vue';

	export default {
		name: 'Rooms',
		components: {
			CreateScoreModal,
			Score
		},
		data() {
			return {
				allScores: [],
				selectedRoom: 0,
				rooms: []
			};
		},
		methods: {
			async getScores() {
				const request = await fetch('/api/items');
				const response = await request.json();
				this.allScores = response;
				this.allScores.map((score) => {
					score.roomName = this.getRoomName(score.room);
				});
			},
			async getRooms() {
				const response = await fetch('/api/rooms');
				const data = await response.json();
				this.rooms = data;
			},
			getRoomName(roomID) {
				const room = this.rooms.find((room) => room._id == roomID);
				return room.roomName;
			}
		},
		computed: {
			filteredScores() {
				if (this.selectedRoom == 0) return this.allScores;
				return this.allScores.filter((score) => score.room === this.selectedRoom);
			}
		},
		async created() {
			await this.getRooms();
			await this.getScores();
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
		<div v-if="filteredScores.length > 0">
			<Score v-for="(score, index) in filteredScores" :key="index" :score="score" />
		</div>

		<div v-else>
			<p class="text-center">Hittade inga tider</p>
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
