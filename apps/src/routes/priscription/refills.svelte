<script lang="ts">
	//同意情報
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { Rx } from '$lib/stores/rx.svelte';
	let refill = 1; //デフォルト：リフィルなし
	onMount(() => {
		const radioButtons = document.querySelectorAll('input[name="refill"]');
		radioButtons.forEach((radio) => {
			(radio as HTMLInputElement).addEventListener('click', () => {
				refill = Number((radio as HTMLInputElement).value);
				//console.log('Selected refill:', refill);
			});
			// Update background color based on selection
			document.querySelectorAll('input[name="refill"]').forEach((label, index) => {
				const value = index + 1;
				//console.log('value:', value, refill);
				if (value === refill) {
					label.classList.add('bg-blue-500');
				} else {
					label.classList.remove('bg-blue-500');
				}
			});
		});
	});
</script>

<div class="p-1">
	<div class="flex justify-center items-center">
		<div class="flex-auto text-right px-2 text-nowrap">リフィル</div>
		<label
			class="flex-auto rounded-l-md text-nowrap cursor-pointer"
			class:bg-blue-500={refill === 1}
			class:text-white={refill === 1}
		>
			<input type="radio" name="refill" value="1" bind:group={refill} class="hide-radiobtn" />
			なし
		</label>
		<label
			class="flex-auto text-nowrap cursor-pointer"
			class:bg-blue-500={refill === 2}
			class:text-white={refill === 2}
		>
			<input type="radio" name="refill" value="2" bind:group={refill} class="hide-radiobtn" />
			２回目
		</label>
		<label
			class="flex-auto rounded-r-md text-nowrap cursor-pointer"
			class:bg-blue-500={refill === 3}
			class:text-white={refill === 3}
		>
			<input type="radio" name="refill" value="3" bind:group={refill} class="hide-radiobtn" />
			３回目
		</label>
	</div>
</div>

<style>
	label {
		@apply border border-gray-600 text-center p-0.5 text-[0.9em];
	}
	input[type='radio'].hide-radiobtn {
		display: none;
	}
</style>
