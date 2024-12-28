<script lang="ts">
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { Rx } from '$lib/stores/rx.svelte';
	$effect(() => {
		if (Rx.Patient_Information === null) return;
		const HealthInsurance_Information = Rx.Patient_Information.HealthInsurance_Information;

		if (HealthInsurance_Information && Array.isArray(HealthInsurance_Information)) {
			const selectElement = document.createElement('select');
			selectElement.style.width = '100%';
			selectElement.id = 'insurance-select';
			selectElement.setAttribute('class', 'p-1 rounded-md');
			HealthInsurance_Information.forEach((insurance: any) => {
				const option = document.createElement('option');
				option.value = insurance.Insurance_Combination_Number;

				let textContent = `${insurance.Insurance_Combination_Number} ${insurance.InsuranceProvider_WholeName}`;
				if (
					insurance.PublicInsurance_Information &&
					Array.isArray(insurance.PublicInsurance_Information)
				) {
					const publicInsuranceNames = insurance.PublicInsurance_Information.map(
						(pub: any) => pub.PublicInsurance_Name
					).join(' ');
					if (publicInsuranceNames) {
						textContent += ` ${publicInsuranceNames}`;
					}
				}

				option.textContent = textContent;

				if (insurance.Insurance_Combination_Number === Rx.cmbnum) {
					option.selected = true;
				}
				selectElement.appendChild(option);
			});
			//変更処理
			selectElement.addEventListener('change', (e) => {
				const select = e.target as HTMLSelectElement;
				const selectedOption = select.options[select.selectedIndex];
				Rx.setCmbnum(selectedOption.value);
			});

			const container = document.getElementById('HealthInsurance_Information');
			if (container) {
				container.innerHTML = '';
				container.appendChild(selectElement);
			}
		}
	});
</script>

<div id="HealthInsurance_Information" class="flex-auto">保険情報</div>

<style>
</style>
