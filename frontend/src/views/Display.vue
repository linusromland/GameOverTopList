<template>
	<div class="main-content w-full py-4 flex justify-center bg-slate-300" ref="main">
		<div v-if="rooms" class="w-5/6 flex flex-col items-center mt-8">
			<h1 class="text-6xl font-bold text-white bg-slate-500/[.7] p-5 rounded mb-6">
				{{ this.rooms[this.activeRoomIndex].roomName }}
			</h1>
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
				activeRoomIndex: {},
				backgroundImage: null
			};
		},
		methods: {
			async getRooms() {
				const request = await fetch('/api/rooms');
				const response = await request.json();
				this.rooms = response;
				this.activeRoomIndex = this.rooms.length - 1;
				this.getBackgroundImage();
			},
			async getBackgroundImage() {
				const request = await fetch(`/api/rooms/image/${this.rooms[this.activeRoomIndex]._id}`);
				const response = await request.json();
				this.$refs.main.style.backgroundImage = `url("${response.image}")`;
			},
			startInterval() {
				setInterval(() => {
					this.activeRoomIndex =
						this.activeRoomIndex === this.rooms.length - 1 ? 0 : this.activeRoomIndex + 1;
					this.$refs.activeDisplay.getScores(this.rooms[this.activeRoomIndex]._id);
					this.getBackgroundImage();
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
		background-size: cover;
	}
	@media all and (display-mode: fullscreen) {
		.main-content {
			min-height: 100vh;
		}
	}
</style>
