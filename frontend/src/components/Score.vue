<template>
	<div>
		<p>{{ score.teamName }}</p>
		<p>{{ score.roomName }}</p>
	</div>
</template>
<script>
	export default {
		name: 'Score',
		props: {
			score: {
				type: Object,
				required: true
			}
		},
		mounted() {
			console.log('score', this.score);
		}
	};
</script>
