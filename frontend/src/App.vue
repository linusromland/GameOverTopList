<template>
	<Navbar />
	<main>
		<RouterView />
	</main>
</template>

<script>
	import Navbar from './components/Navbar.vue';
	export default {
		name: 'TopList',
		components: {
			Navbar
		}
	};
</script>
