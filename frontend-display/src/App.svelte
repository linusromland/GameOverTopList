<script>
	//Component import
	import Room from './components/Room.svelte';

	let rooms = [{ roomName: 'Haunted Mansion' }, { roomName: 'Lost City of Atlantis' }];
</script>

<main>
	{#each rooms as room}
		<Room roomData={room} />
	{/each}
</main>

<style>
</style>
