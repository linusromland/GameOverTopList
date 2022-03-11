<template>
	<!--Button to show Delete Room Modal-->
	<button
		@click="showDeleteModal"
		class="bg-red-500 hover:bg-red-400 text-white p-1 rounded-md m-4 px-4 h-10 cursor-pointer"
	>
		Ta bort tid
	</button>

	<!--Create Room Modal -->
	<Modal
		v-if="deleteModal"
		@close="deleteModal = false"
		@submit="deleteRoom"
		:showSubmitBtn="true"
		submitBtnValue="Ta bort"
		:title="`Du håller på att ta bort en tid från laget ${score.teamName}!`"
		:error="error"
		:errorMessage="errorMessage"
	>
		<p class="text-xl m-1">Är du säker på att du vill göra detta?</p>
	</Modal>
</template>

<script>
	import Modal from './Modal.vue';
	export default {
		name: 'DeleteScoreModal',
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
			score: {
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

				const request = await fetch(`/api/scores/delete/${this.score._id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				});
				if ((await request.status) === 200) {
					console.log('Deleted score successfully');
					this.$emit('refresh');
				}
			}
		}
	};
</script>
