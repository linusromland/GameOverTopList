<template>
	<div class="main-content w-full py-4 bg-slate-600 flex justify-center">
		<div v-if="rooms" class="w-5/6 flex flex-col items-center">
			<h1 class="text-6xl font-bold text-white">{{ activeRoom.roomName }}</h1>
			<RoomDisplay :roomID="activeRoom._id" />
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
			}
		},
		computed: {
			activeRoom() {
				return this.rooms[this.activeRoomIndex];
			}
		},
		mounted() {
			this.getRooms();
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
