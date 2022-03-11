<template>
	<div class="w-screen flex">
		<div class="w-1/2 bg-slate-500 p-6 rounded text-white m-4">
			<h2 class="text-4xl font-bold text-center mb-4">Top senaste 30 dagarna</h2>
			<table class="rounded w-full text-center table-auto bg-slate-600">
				<tr class="border-b">
					<th />
					<th class="text-3xl p-2 m-4">Lagnamn</th>
					<th class="text-3xl p-2 m-4">Tid</th>
					<th class="text-3xl p-2 m-4">Ledtrådar</th>
				</tr>
				<tr
					v-for="(score, index) in scores"
					:key="score._id"
					:class="{ 'border-b': index < scores.length - 1 }"
				>
					<td class="text-2xl p-2 m-4">{{ index + 1 }}.</td>

					<td class="text-2xl p-2 m-4">{{ score.teamName }}</td>
					<td class="text-2xl p-2 m-4">{{ score.time }}</td>

					<td class="text-2xl p-2 m-4">{{ score.clues }}</td>
				</tr>
			</table>
		</div>
		<div class="w-1/2 bg-slate-500 p-6 rounded text-white m-4">
			<h2 class="text-4xl font-bold text-center mb-4">Top all time</h2>
			<table class="rounded w-full text-center table-auto bg-slate-600">
				<tr class="border-b">
					<th />
					<th class="text-3xl p-2 m-4">Lagnamn</th>
					<th class="text-3xl p-2 m-4">Tid</th>
					<th class="text-3xl p-2 m-4">Ledtrådar</th>
				</tr>
				<tr
					v-for="(score, index) in scores"
					:key="score._id"
					:class="{ 'border-b': index < scores.length - 1 }"
				>
					<td class="text-2xl p-2 m-4">{{ index + 1 }}.</td>

					<td class="text-2xl p-2 m-4">{{ score.teamName }}</td>
					<td class="text-2xl p-2 m-4">{{ score.time }}</td>

					<td class="text-2xl p-2 m-4">{{ score.clues }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'RoomDisplay',
		data: function () {
			return {
				scores: {}
			};
		},
		props: {
			roomID: {
				type: String,
				required: true
			}
		},
		methods: {
			async getScores(roomID) {
				const request = await fetch(`/api/scores/${roomID}`);
				const response = await request.json();
				this.scores = response;
				this.scores.map((scores) => (scores.time = this.time(scores.time)));
			},
			time(seconds) {
				const minutes = Math.floor(seconds / 60);
				const secondsLeft = seconds % 60;
				return `${minutes}min ${secondsLeft}s`;
			}
		},
		mounted() {
			this.getScores(this.roomID);
		}
	};
</script>
