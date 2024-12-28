<script lang="ts">
	//同意情報
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { Rx } from '$lib/stores/rx.svelte';
	let PrescriptionIssueSelect = 2; //デフォルト：紙の処方箋
	onMount(() => {
		if (Rx.Patient_Information === null) return;

		PrescriptionIssueSelect = Rx.Patient_Information.PrescriptionIssueSelect;
		if (!PrescriptionIssueSelect) PrescriptionIssueSelect = 2;

		const radioButtons = document.querySelectorAll('input[name="prescription"]');
		radioButtons.forEach((radio) => {
			(radio as HTMLInputElement).addEventListener('click', () => {
				PrescriptionIssueSelect = Number((radio as HTMLInputElement).value);
			});
			// Update background color based on selection
			document.querySelectorAll('input[name="prescription"]').forEach((label, index) => {
				const value = index + 1;

				if (value === PrescriptionIssueSelect) {
					label.classList.add('bg-blue-500');
				} else {
					label.classList.remove('bg-blue-500');
				}
			});
		});
	});
</script>

<div class="p-1 space-x-2">
	<div class="flex justify-center items-center gap-4">
		<label
			class="flex-auto text-nowrap cursor-pointer"
			class:bg-blue-500={PrescriptionIssueSelect === 1}
			class:text-white={PrescriptionIssueSelect === 1}
		>
			<input
				type="radio"
				name="prescription"
				value="1"
				bind:group={PrescriptionIssueSelect}
				class="hide-radiobtn"
			/>
			電子処方箋
		</label>
		<label
			class="flex-auto text-nowrap cursor-pointer"
			class:bg-blue-500={PrescriptionIssueSelect === 2}
			class:text-white={PrescriptionIssueSelect === 2}
		>
			<input
				type="radio"
				name="prescription"
				value="2"
				bind:group={PrescriptionIssueSelect}
				class="hide-radiobtn"
			/>
			紙の処方箋
		</label>
		<label
			class="flex-auto text-nowrap cursor-pointer"
			class:bg-blue-500={PrescriptionIssueSelect === 0}
			class:text-white={PrescriptionIssueSelect === 0}
		>
			<input
				type="radio"
				name="prescription"
				value="0"
				bind:group={PrescriptionIssueSelect}
				class="hide-radiobtn"
			/>
			電子処方なし
		</label>
	</div>
</div>

<style>
	label {
		@apply border border-gray-600 rounded-md text-center p-0.5 text-[0.9em];
	}
	input[type='radio'].hide-radiobtn {
		display: none;
	}
</style>
