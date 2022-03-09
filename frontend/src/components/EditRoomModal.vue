<template>
	<button
		@click="showEditModal"
		class="bg-gray-500 hover:bg-gray-400 text-white p-1 rounded-md m-2 h-8 cursor-pointer"
	>
		Redigera Rum
	</button>
	<!--Edit Room Modal -->
	<Modal
		v-if="editModal"
		@close="editModal = false"
		@submit="updateRoom"
		:showSubmitBtn="true"
		submitBtnValue="Uppdatera Rum"
		title="Redigera Rum"
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
		name: 'EditRoomModal',
		components: {
			Modal
		},
		emits: ['refresh'],
		data() {
			return {
				editModal: false,
				roomName: '',
				error: false,
				errorMessage: ''
			};
		},
		props: {
			room: {
				type: Object,
				required: true
			}
		},
		methods: {
			showEditModal() {
				this.editModal = true;
			},
			async updateRoom() {
				if (this.roomName.length < 1) {
					this.errorMessage = 'Rumsnamn saknas';
					return;
				}

				this.error = false;
				this.errorMessage = '';

				this.createModal = false;

				const request = await fetch('/api/rooms/updateName', {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						roomName: this.roomName,
						id: this.room._id
					})
				});
				if ((await request.status) === 200) {
					console.log('Room name updated successfully');
					this.roomName = '';
					this.$emit('refresh');
					this.editModal = false;
				}
			}
		},
		created() {
			this.roomName = this.room.roomName;
		}
	};
</script>
