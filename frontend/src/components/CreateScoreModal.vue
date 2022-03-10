<template>
	<!--Button to show create Score Modal-->
	<button
		@click="showScoreModal"
		class="bg-blue-500 hover:bg-blue-400 text-white p-1 rounded-md m-2 h-8 cursor-pointer"
	>
		Skapa ny tid
	</button>

	<!--Create Room Modal -->
	<Modal
		v-if="createModal"
		@close="createModal = false"
		@submit="createScore"
		:showSubmitBtn="true"
		submitBtnValue="Lägg till"
		title="Lägg till tid"
		:error="error"
		:errorMessage="errorMessage"
	>
		<div class="w-5/6 flex flex-col m-2">
			<label for="roomSelector">Välj rum: <span class="text-red-600">*</span></label>
			<select id="roomSelector" class="p-2 mt-1 rounded-md bg-gray-200 text-black" required v-model="roomID">
				<option v-for="(room, index) in rooms" :key="index" :value="room._id">
					{{ room.roomName }}
				</option>
			</select>
		</div>
		<div class="w-5/6 flex flex-col m-2">
			<label for="teamNameSelector">Lagnamn: <span class="text-red-600">*</span></label>
			<input
				id="teamNameSelector"
				type="text"
				class="p-2 rounded-md bg-gray-200 text-black"
				placeholder="Lagnamn"
				autocomplete="off"
				maxlength="42"
				v-model="teamName"
				required
			/>
		</div>
		<div class="w-5/6 flex flex-col m-2">
			<label for="cluesSelector">Antalet Ledtrådar: <span class="text-red-600">*</span></label>

			<input
				id="cluesSelector"
				type="number"
				class="p-2 rounded-md bg-gray-200 text-black"
				placeholder="Ledtrådar"
				autocomplete="off"
				max="100"
				min="0"
				v-model="clues"
				required
			/>
		</div>
		<div class="w-5/6 flex flex-col m-2">
			<label for="minuteSelector">Minuter: <span class="text-red-600">*</span></label>

			<input
				id="minuteSelector"
				type="number"
				class="p-2 rounded-md bg-gray-200 text-black"
				placeholder="Minuter"
				autocomplete="off"
				max="59"
				min="0"
				v-model="minutes"
				required
			/>
		</div>
		<div class="w-5/6 flex flex-col m-2">
			<label for="secondsSelector">Sekunder: <span class="text-red-600">*</span></label>
			<input
				id="secondsSelector"
				type="number"
				class="p-2 rounded-md bg-gray-200 text-black"
				placeholder="Sekunder"
				autocomplete="off"
				max="59"
				min="0"
				v-model="seconds"
				required
			/>
		</div>
	</Modal>
</template>

<script>
	import Modal from './Modal.vue';
	export default {
		name: 'CreateScoreModal',
		components: {
			Modal
		},
		emits: ['refresh'],
		data() {
			return {
				createModal: false,
				teamName: '',
				roomID: '',
				clues: 0,
				minutes: 0,
				seconds: 0,
				rooms: [],
				error: false,
				errorMessage: ''
			};
		},
		methods: {
			showScoreModal() {
				this.createModal = true;
			},
			async getRooms() {
				const response = await fetch('/api/rooms');
				const data = await response.json();
				this.rooms = data;
			},
			async createScore() {
				const response = await fetch('/api/items/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						room: this.roomID,
						teamName: this.teamName,
						clues: this.clues,
						minutes: this.minutes,
						seconds: this.seconds
					})
				});
				if ((await response.status) === 200) {
					this.createModal = false;
					this.$emit('refresh');
					this.roomName = '';
					this.teamName = '';
					this.clues = 0;
					this.minutes = 0;
					this.seconds = 0;
				} else {
					this.error = true;
					this.errorMessage = 'Något gick fel';
				}
			}
		},
		mounted() {
			this.getRooms();
		}
	};
</script>
