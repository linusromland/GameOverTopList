<template>
	<!--Button to show create Room Modal-->
	<button
		@click="showCreateRoom"
		class="bg-blue-500 hover:bg-blue-400 text-white p-1 rounded-md m-2 h-12 cursor-pointer"
	>
		Skapa rum
	</button>

	<!--Create Room Modal -->
	<Modal
		v-if="createModal"
		@close="createModal = false"
		@submit="createRoom"
		:showSubmitBtn="true"
		submitBtnValue="Skapa Rum"
		title="Skapa Rum"
		:error="error"
		:errorMessage="errorMessage"
	>
		<input
			type="text"
			class="w-5/6 p-2 m-5 rounded-md bg-gray-200 text-black"
			placeholder="Rumsnamn"
			autocomplete="off"
			maxlength="24"
			v-model="roomName"
		/>
	</Modal>
</template>

<script>
	import Modal from './Modal.vue';
	export default {
		name: 'CreateRoomModal',
		components: {
			Modal
		},
		emits: ['refresh'],
		data() {
			return {
				createModal: false,
				roomName: '',
				error: false,
				errorMessage: ''
			};
		},
		methods: {
			showCreateRoom() {
				this.createModal = true;
			},
			async createRoom() {
				if (this.roomName.length < 1) {
					this.errorMessage = 'Rumsnamn saknas';
					return;
				}

				this.error = false;
				this.errorMessage = '';

				this.createModal = false;

				const request = await fetch('/api/rooms/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						roomName: this.roomName
					})
				});
				if ((await request.status) === 200) {
					console.log('Room created successfully');
					this.roomName = '';
					this.$emit('refresh');
				}
			}
		}
	};
</script>
