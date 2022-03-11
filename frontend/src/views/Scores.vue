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
				sortByFilter: '0',
				search: '',
				rooms: [],
				filteredScores: []
			};
		},
		methods: {
			async getScores() {
				console.log('Getting scores');
				const request = await fetch('/api/scores');
				const response = await request.json();
				this.allScores = response;
				this.allScores.map((score) => {
					score.roomName = this.getRoomName(score.room);
				});
				this.sortScore();
			},
			async getRooms() {
				console.log('Getting rooms');
				const response = await fetch('/api/rooms');
				const data = await response.json();
				this.rooms = data;
			},
			getRoomName(roomID) {
				const room = this.rooms.find((room) => room._id == roomID);
				return room.roomName;
			},
			sortScore() {
				const sortedByRoom =
					this.selectedRoom == 0
						? this.allScores
						: this.allScores.filter((score) => score.room === this.selectedRoom);
				const sortedBySearched = sortedByRoom.filter((score) =>
					score.teamName.toLowerCase().includes(this.search.toLowerCase())
				);
				if (this.sortByFilter == 0) {
					this.filteredScores = sortedBySearched;
				} else {
					//Sort by fastest time
					this.filteredScores = sortedBySearched.sort((a, b) => a.time - b.time);
				}
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
			<CreateScoreModal @refresh="getScores" />
		</div>
		<div class="lg:w-2/6 w-10/12">
			<div class="w-full flex justify-around">
				<input
					type="text"
					class="my-3 rounded-md bg-slate-300 text-black text-center"
					placeholder="Sök"
					autocomplete="off"
					maxlength="24"
					v-model="search"
					@input="sortScore"
				/>
				<select class="p-2 m-3 rounded-md bg-card text-black" v-model="selectedRoom" @change="sortScore">
					<option value="0" selected>Alla rum</option>
					<option v-for="(room, index) in rooms" :key="index" :value="room._id">
						{{ room.roomName }}
					</option>
				</select>
				<select class="p-2 my-3 rounded-md bg-card text-black" v-model="sortByFilter" @change="sortScore">
					<option value="0" selected>Senast tillagd</option>
					<option value="1">Bästa tid</option>
				</select>
			</div>
			<div v-if="filteredScores.length > 0">
				<Score v-for="(score, index) in filteredScores" :key="index" :score="score" @refresh="getScores" />
			</div>
			<p v-else class="text-center">Hittade inga tider</p>
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
