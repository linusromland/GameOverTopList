<template>
	<div class="bg-slate-400 px-6 navbar">
		<div class="py-4 flex justify-center lg:justify-between">
			<router-link to="/display" class="hidden lg:block title">
				<span class="pl-2 text-black font-semibold text-xl">Game Over Escape Rooms Ullevi</span></router-link
			>
			<div class="relative flex items-center lg:ml-auto">
				<router-link to="/" class="text-slate-200 cursor-pointer text-right text-xl mx-2"> Tider </router-link>
				<router-link to="/rooms" class="text-slate-200 cursor-pointer text-right text-xl mx-2">
					Rum
				</router-link>
				<router-link to="/display" class="text-slate-200 cursor-pointer text-right text-xl mx-2">
					Display
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Navbar'
	};
</script>
<style scoped>
	.navbar {
		height: 4rem;
	}

	@media all and (display-mode: fullscreen) {
		.navbar {
			animation: slideUp 0.5s forwards;
		}
		.title {
			display: none;
		}
	}
	@keyframes slideUp {
		0% {
			margin-top: 0;
		}
		100% {
			margin-top: -4rem;
		}
	}
</style>
