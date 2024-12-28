<!--
来院履歴
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { Rx } from '$lib/stores/rx.svelte';
	let Medical_List_Information: any = {};

	export let showModal: (date: string, sryka: string, seqno: string) => void;
	onMount(async () => {
		const ptid = Rx.ptid;
		if (ptid) {
			const param = {
				data: {
					medicalgetreq: {
						Patient_ID: ptid,
						Perform_Date: Rx.ymd,
						For_Months: '12' //当日より１年間(12着き)
					}
				}
			};

			const response = await fetch(`/api/orca?context=/api01rv2/medicalgetv2&class=01`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(param)
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			//console.log(data);

			const medicalget01res = data?.medicalget01res || null;

			if (!medicalget01res) {
				console.warn('medicalget01res not found in response data');
				return;
			}

			const Api_Result = medicalget01res.Api_Result;
			if (Number(Api_Result) === 0) {
				Medical_List_Information = medicalget01res.Medical_List_Information;
				//console.log(Medical_List_Information);
				//表示用データの再構築
				Medical_List_Information.forEach((medical: any) => {
					const sryka = medical.Department_Name ? medical.Department_Name.charAt(0) : '';
					medical.Department_Name = sryka;

					medical.InsuaranceName = '';
					if (medical.HealthInsurance_Information?.InsuranceProvider_WholeName) {
						medical.InsuaranceName =
							medical.HealthInsurance_Information.InsuranceProvider_WholeName;
					}
				});
			}
		}
	});
</script>

<!-- リスト本体 -->

<div class="overflow-y-auto flex flex-col h-full border bg-white">
	{#each Medical_List_Information as medical, i}
		<div
			role="button"
			tabindex="0"
			onclick={() =>
				showModal(medical.Perform_Date, medical.Department_Code, medical.Sequential_Number)}
			onkeypress={(e) =>
				e.key === 'Enter' &&
				showModal(medical.Perform_Date, medical.Department_Code, medical.Sequential_Number)}
			class="label flex w-full cursor-pointer {i % 2 === 0
				? 'bg-gray-0'
				: 'bg-gray-100'} hover:bg-blue-500 hover:text-white"
		>
			<div class="border-l text-center">{i + 1}</div>
			<div class="flex-auto text-left px-1">{Common.wareki(medical.Perform_Date)}</div>
			<div class="text-center">{medical.Department_Name}</div>
			<div class="border-r text-center">{medical.InsuaranceName}</div>
		</div>
	{/each}
</div>

<style>
	.label div {
		@apply w-10 py-1 border-b border-gray-300;
	}
</style>
