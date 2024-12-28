<!--
来院履歴
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { Rx } from '$lib/stores/rx.svelte';
	let Medical_List_Information: any = {};
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

			console.log(data);

			const medicalget01res = data?.medicalget01res || null;

			if (!medicalget01res) {
				console.warn('medicalget01res not found in response data');
				return;
			}

			const Api_Result = medicalget01res.Api_Result;
			if (Number(Api_Result) === 0) {
				Medical_List_Information = medicalget01res.Medical_List_Information;
				console.log(Medical_List_Information);
			}
		}
	});
</script>

<div class="label flex w-full">
	<div class="">番号</div>
	<div class="flex-auto">診察日</div>
	<div>科</div>
	<div>保険</div>
</div>

<!-- リスト本体 -->

<div class="overflow-y-auto flex flex-col h-full border bg-white">
	{#each Medical_List_Information as medical, i}
		<div class="label flex w-full">
			<div class="w-8">{i + 1}</div>
			<div class="flex-auto">{medical.Perform_Date}</div>
			<div>{medical.Department_Name}</div>
		</div>
	{/each}
	{#each Medical_List_Information as medical, i}
		<div class="label flex w-full">
			<div class="w-8">{i + 1}</div>
			<div class="flex-auto">{medical.Perform_Date}</div>
			<div>{medical.Department_Name}</div>
		</div>
	{/each}
</div>

<style>
	div {
		@apply flex items-center;
	}
	.label {
		@apply border border-black;
	}
	.label div {
		@apply border border-blue-500 p-1 text-nowrap  text-[0.7em] font-thin;
	}
</style>
