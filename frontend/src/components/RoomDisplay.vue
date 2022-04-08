<template>
	<div class="w-screen flex">
		<div class="w-1/2 bg-slate-500/[.7] p-6 rounded text-white m-8 ml-16">
			<h2 class="text-5xl font-bold text-center mb-4">Top senaste 30 dagarna</h2>
			<table class="rounded w-full text-center table-auto bg-slate-600">
				<tr class="border-b">
					<th />
					<th class="text-4xl p-2 m-4">Lagnamn</th>
					<th class="text-4xl p-2 m-4">Tid</th>
				</tr>
				<tr
					v-for="(score, index) in topLast30Days"
					:key="score._id"
					:class="{ 'border-b': index < topLast30Days.length - 1 }"
				>
					<td class="text-3xl p-2 m-4">{{ index + 1 }}.</td>

					<td class="text-3xl p-2 m-4">{{ score.teamName }}</td>
					<td class="text-3xl p-2 m-4">{{ score.time }}</td>
				</tr>
			</table>
		</div>
		<div class="w-1/2 bg-slate-500/[.7] p-6 rounded text-white m-8 mr-16">
			<h2 class="text-5xl font-bold text-center mb-4">Top all time</h2>
			<table class="rounded w-full text-center table-auto bg-slate-600">
				<tr class="border-b">
					<th />
					<th class="text-4xl p-2 m-4">Lagnamn</th>
					<th class="text-4xl p-2 m-4">Tid</th>
					<th class="text-4xl p-2 m-4">Ledtrådar</th>
				</tr>
				<tr
					v-for="(score, index) in topAllTime"
					:key="score._id"
					:class="{ 'border-b': index < topAllTime.length - 1 }"
				>
					<td class="text-3xl p-2 m-4">{{ index + 1 }}.</td>

					<td class="text-3xl p-2 m-4">{{ score.teamName }}</td>
					<td class="text-3xl p-2 m-4">{{ score.time }}</td>

					<td class="text-3xl p-2 m-4">{{ score.clues }}</td>
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
				topAllTime: {},
				topLast30Days: {}
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
				this.topAllTime = response.topAllTime;
				this.topAllTime.map((scores) => (scores.time = this.time(scores.time)));
				this.topLast30Days = response.topLast30Days;
				this.topLast30Days.map((scores) => (scores.time = this.time(scores.time)));
			},
			time(seconds) {
				const minutes = Math.floor(seconds / 60);
				return `${minutes}min`;
			}
		},
		mounted() {
			this.getScores(this.roomID);
		}
	};
</script>
