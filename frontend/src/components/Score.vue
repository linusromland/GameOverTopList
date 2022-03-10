<template>
	<div class="bg-slate-300 hover:bg-slate-400 m-2 p-2 rounded flex justify-around">
		<div>
			<p>
				<span class="font-bold text-2xl">{{ score.teamName }}</span>
			</p>
			<p class="text-lg">
				{{ time }}
			</p>
			<p class="text-md">Antalet ledtrådar: {{ score.clues }}</p>
			<p>
				Rum: <span class="font-bold">{{ score.roomName }}</span>
			</p>
		</div>
		<div class="flex items-center">
			<DeleteScoreModal :score="score" @refresh="$emit('refresh')" />
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
				const secondsLeft = seconds % 60;
				return `${minutes}${secondsLeft < 10 ? '0' : ''}min ${secondsLeft}s`;
			}
		},
		mounted() {
			console.log('score', this.score);
		}
	};
</script>
