<template>
	<div class="main-content w-full py-4 bg-slate-600 flex justify-center">
		<div v-if="rooms" class="w-5/6 flex flex-col items-center">
			<h1 class="text-6xl font-bold text-white">{{ this.rooms[this.activeRoomIndex].roomName }}</h1>
			<RoomDisplay :roomID="this.rooms[this.activeRoomIndex]._id" ref="activeDisplay" />
		</div>
	</div>
</template>

<script>
	import RoomDisplay from '../components/RoomDisplay.vue';
	export default {
		name: 'Display',
		components: {
			RoomDisplay
		},
		data: function () {
			return {
				rooms: null,
				activeRoomIndex: {}
			};
		},

		methods: {
			async getRooms() {
				const request = await fetch('/api/rooms');
				const response = await request.json();
				this.rooms = response;
				this.activeRoomIndex = this.rooms.length - 1;
			},
			startInterval() {
				setInterval(() => {
					this.activeRoomIndex =
						this.activeRoomIndex === this.rooms.length - 1 ? 0 : this.activeRoomIndex + 1;
					this.$refs.activeDisplay.getScores(this.rooms[this.activeRoomIndex]._id);
				}, 15000);
			}
		},
		mounted() {
			this.getRooms();
			this.startInterval();
		}
	};
</script>
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
