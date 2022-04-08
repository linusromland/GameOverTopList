<template>
	<div class="bg-card m-2 p-4 rounded flex justify-between">
		<div>
			<p>
				<span class="font-bold text-2xl">{{ score.teamName }}</span>
			</p>
			<p class="text-lg">
				{{ time }}
			</p>
			<p class="text-md">
				Antal ledtrådar: <span class="font-bold">{{ score.clues }}</span>
			</p>
			<p>
				Rum: <span class="font-bold">{{ score.roomName }}</span>
			</p>
		</div>
		<div class="flex flex-col">
			<DeleteScoreModal :score="score" @refresh="$emit('refresh')" />
			<p class="text-sm">
				Spelad: <span class="font-bold">{{ convertDatetoDay(score.date) }}</span>
			</p>
			<p class="text-sm">
				Skapad:
				<span class="font-bold"
					>{{ convertDatetoDay(score.createdAt) }} {{ convertDatetoTime(score.createdAt) }}</span
				>
			</p>
		</div>
	</div>
</template>
<script>
	import DeleteScoreModal from './DeleteScoreModal.vue';
	export default {
		name: 'Score',
		components: {
			DeleteScoreModal
		},
		emits: ['refresh'],
		props: {
			score: {
				type: Object,
				required: true
			}
		},
		computed: {
			time() {
				const seconds = this.score.time;
				const minutes = Math.floor(seconds / 60);
				return `${minutes}min`;
			}
		},
		methods: {
			convertDatetoDay(date) {
				const dateObj = new Date(date);
				return dateObj.toLocaleDateString('sv-SE');
			},
			convertDatetoTime(date) {
				const dateObj = new Date(date);
				return dateObj.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
			}
		}
	};
</script>
