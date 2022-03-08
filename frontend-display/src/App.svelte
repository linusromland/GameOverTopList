<script>
	//External Dependencies
	import { onMount } from 'svelte';

	//Component import
	import Room from './components/Room.svelte';

	//Array of rooms
	let rooms = [];

	onMount(async () => {
		//Get all rooms
		const response = await fetch('/api/rooms');
		const data = await response.json();
		rooms = data;
	});
</script>

<main>
	{#each rooms as room}
		<Room roomData={room} />
	{/each}
</main>

<style>
</style>
