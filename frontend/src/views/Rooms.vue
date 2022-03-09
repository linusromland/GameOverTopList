<script>
	import Navbar from '../components/Navbar.vue';
	import CreateRoomModal from '../components/CreateRoomModal.vue';
	import EditRoomModal from '../components/EditRoomModal.vue';
	import DeleteRoomModal from '../components/DeleteRoomModal.vue';

	export default {
		name: 'Rooms',
		components: {
			CreateRoomModal,
			EditRoomModal,
			DeleteRoomModal,
			Navbar
		},
		data() {
			return {
				rooms: []
			};
		},
		methods: {
			async getRooms() {
				const request = await fetch('/api/rooms');
				const response = await request.json();
				this.rooms = response;
			}
		},
		mounted() {
			this.getRooms();
		}
	};
</script>
<template>
	<Navbar />
	<div class="flex flex-col items-center bg-slate-200 p-3 main-content">
		<div class="flex items-center">
			<h1 class="text-4xl font-semibold">Rummen</h1>
			<CreateRoomModal @refresh="getRooms" />
		</div>
		<div
			v-for="(room, index) in rooms"
			:key="index"
			class="flex flex-col w-full md:w-2/4 lg:w-1/4 items-center bg-gray-300 m-3 p-2 rounded"
		>
			<h1 class="text-3xl text-black">{{ room.roomName }}</h1>
			<div class="flex">
				<EditRoomModal :room="room" @refresh="getRooms" />
				<DeleteRoomModal :room="room" @refresh="getRooms" />
			</div>
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
