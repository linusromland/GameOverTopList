<script>
	import CreateRoomModal from '../components/CreateRoomModal.vue';

	export default {
		name: 'Rooms',
		components: {
			CreateRoomModal
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
	<CreateRoomModal @refresh="getRooms" />
	<div v-for="(room, index) in rooms" :key="index">
		<h1 class="text-3xl text-cyan-400">{{ room.roomName }}</h1>
		<button>Redigera</button>
		<button>Ta bort</button>
	</div>
</template>
