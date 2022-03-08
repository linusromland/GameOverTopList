<template>
	<div class="fixed inset-0 w-full h-full z-50 flex" id="transition">
		<div class="m-auto lg:w-2/6 md:w-4/6 w-10/12 bg-white p-5 rounded-md flex flex-col items-center" v-if="!error">
			<h3 class="text-2xl m-5 text-black">{{ title }}</h3>

			<!--Modal Content-->
			<slot />

			<h3 class="m-2 text-red-500" v-if="errorMessage != ''">
				{{ errorMessage }}
			</h3>

			<div class="flex w-5/6 px-6 justify-center mt-5">
				<input
					v-if="showCancelBtn"
					type="submit"
					class="w-1/2 p-2 rounded-md m-2 bg-red-600 hover:bg-red-400 text-white cursor-pointer"
					:value="cancelBtnValue"
					@click="close"
				/>
				<input
					v-if="showSubmitBtn"
					type="submit"
					class="w-1/2 p-2 rounded-md m-2 bg-blue-500 hover:bg-blue-400 text-white cursor-pointer"
					:value="submitBtnValue"
					@click="submit"
				/>
			</div>
		</div>
		<div class="m-auto w-2/6 bg-white p-5 rounded-md flex flex-col items-center" v-else>
			<h3 class="text-2xl m-5 text-red-500">{{ errorMessage }}</h3>
			<button
				type="submit"
				class="w-5/6 p-2 rounded-md m-5 bg-red-500 hover:bg-red-400 text-white cursor-pointer"
				@click="close"
			>
				Close
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Modal',
		props: {
			showSubmitBtn: {
				//Boolean to show submit button
				type: Boolean,
				default: false
			},
			showCancelBtn: {
				//Boolean to show cancel button
				type: Boolean,
				default: true
			},
			submitBtnValue: {
				//Value of submit button
				type: String,
				default: 'Skapa'
			},
			cancelBtnValue: {
				//Value of cancel button
				type: String,
				default: 'Avbryt'
			},
			title: {
				//Title of modal
				type: String,
				default: 'Modal Title'
			},
			error: {
				//Boolean to show error message
				type: Boolean,
				default: false
			},
			errorMessage: {
				//Error message
				type: String,
				default: ''
			}
		},
		emits: ['close', 'submit'], //Events emitted by this component
		methods: {
			/**
			 * @name close
			 * @description Emits to parent to close modal
			 */
			close() {
				this.$emit('close');
			},
			/**
			 * @name submit
			 * @description Emits to parent to submit
			 */
			submit() {
				this.$emit('submit');
			}
		}
	};
</script>

<style scoped>
	#transition {
		animation: fadeIn 0.05s;
		background-color: rgba(0, 0, 0, 0.5);
	}
	@keyframes fadeIn {
		0% {
			background-color: rgba(0, 0, 0, 0);
		}
		100% {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}
</style>
