<template>
	<!--Button to show Delete Room Modal-->
	<button
		@click="showDeleteModal"
		class="bg-red-500 hover:bg-red-400 text-white p-1 rounded-md m-2 h-8 cursor-pointer"
	>
		Ta bort rum
	</button>

	<!--Create Room Modal -->
	<Modal
		v-if="deleteModal"
		@close="deleteModal = false"
		@submit="deleteRoom"
		:showSubmitBtn="true"
		submitBtnValue="Ta bort"
		:title="`Du håller på att ta bort rummet ${room.roomName}!`"
		:error="error"
		:errorMessage="errorMessage"
	>
		<p class="text-xl m-5">Är du säker på att du vill göra detta?</p>
	</Modal>
</template>

<script>
	import Modal from './Modal.vue';
	export default {
		name: 'DeleteRoomModal',
		components: {
			Modal
		},
		emits: ['refresh'],
		data() {
			return {
				deleteModal: false,
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
			showDeleteModal() {
				this.deleteModal = true;
			},
			async deleteRoom() {
				this.error = false;
				this.errorMessage = '';

				this.deleteModal = false;

				const request = await fetch(`/api/rooms/delete/${this.room._id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if ((await request.status) === 200) {
					console.log('Deleted room successfully');
					this.$emit('refresh');
				}
			}
		}
	};
</script>
