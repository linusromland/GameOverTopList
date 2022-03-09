<script>
	import CreateRoomModal from '../components/CreateRoomModal.vue';
	import EditRoomModal from '../components/EditRoomModal.vue';
	import DeleteRoomModal from '../components/DeleteRoomModal.vue';

	export default {
		name: 'Rooms',
		components: {
			CreateRoomModal,
			EditRoomModal,
			DeleteRoomModal
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
		<EditRoomModal :room="room" @refresh="getRooms" />
		<DeleteRoomModal :room="room" @refresh="getRooms" />
	</div>
</template>
