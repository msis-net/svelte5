<script lang="ts">
	//同意情報
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { Rx } from '$lib/stores/rx.svelte';
	onMount(() => {
		if (!Rx.Patient_Information) return;

		const DiagnosisInfoConsFlg = Rx.Patient_Information?.DiagnosisInfoConsFlg ?? 0;
		const PharmacistsInfoConsFlg = Rx.Patient_Information?.PharmacistsInfoConsFlg ?? 0;
		const OperationInfoConsFlg = Rx.Patient_Information?.OperationInfoConsFlg ?? 0;
		const SpecificHealthCheckupsInfoConsFlg =
			Rx.Patient_Information?.SpecificHealthCheckupsInfoConsFlg ?? 0;

		const ResultOfQualificationConfirmation =
			Rx.Patient_Information?.ResultOfQualificationConfirmation ?? 0;

		const Array = {
			DiagnosisInfoConsFlg: '診察',
			PharmacistsInfoConsFlg: '薬剤',
			OperationInfoConsFlg: '手術',
			SpecificHealthCheckupsInfoConsFlg: '健診'
		};

		Object.entries(Array).forEach(([id, text]) => {
			const element = document.getElementById(id);
			if (element) {
				element.style.position = 'relative';
				if (ResultOfQualificationConfirmation[id] === '1') {
					element.textContent = text + '(有)';
					element.style.color = 'blue';
				} else {
					element.textContent = text + '(無)';
					element.style.color = 'gray';
				}
			}
		});
	});
</script>

<div class="flex-auto p-1 flex">
	<div class="flex-auto text-nowrap">同意情報:</div>
	<div id="DiagnosisInfoConsFlg" class="flex-auto text-nowrap">診療</div>
	<div id="PharmacistsInfoConsFlg" class="flex-auto text-nowrap">薬剤</div>
	<div id="OperationInfoConsFlg" class="flex-auto text-nowrap">手術</div>
	<div id="SpecificHealthCheckupsInfoConsFlg" class="flex-auto text-nowrap">健診</div>
</div>

<style>
</style>
