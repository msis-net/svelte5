<!--
来院履歴
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { Rx } from '$lib/stores/rx.svelte';

	const { date, sryka, seqno, hideModal } = $props<{
		date: string;
		sryka: string;
		seqno: string;
		hideModal: () => void;
	}>();
	let Medical_List_Information: any = {};
	let Medical_Information: any = {};
	let { Perform_Date, Department_Name, Sequential_Number } = $state({
		Perform_Date: '',
		Department_Name: '',
		Sequential_Number: ''
	});
	let Medical_kbn = $state<Record<string, string>>({});
	let selectedKbn = $state<string>(''); //処方がデフォルト
	let selectedList: any = $state<any>([]);

	function closeWindow() {
		Perform_Date = '';
		Department_Name = '';
		Sequential_Number = '';
		selectedKbn = '';
		selectedList = [];
		Medical_kbn = {};
		Medical_Information = {};
		hideModal();
	}

	$effect(() => {
		const fetchData = async () => {
			const ptid = Rx.ptid;
			//console.log(date, sryka, seqno);
			if (sryka) {
				const param = {
					data: {
						medicalgetreq: {
							Patient_ID: ptid,
							Perform_Date: date,
							Sequential_Number: seqno,
							Medical_Information: {
								Department_Code: sryka
							}
						}
					}
				};
				//console.log(JSON.stringify(param));
				const response = await fetch(`/api/orca?context=/api01rv2/medicalgetv2&class=02`, {
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

				const medicalget01res = data?.medicalget02res || null;

				if (!medicalget01res) {
					console.warn('medicalget01res not found in response data');
					return;
				}
				Perform_Date = Common.wareki(medicalget01res.Perform_Date);
				Department_Name = medicalget01res.Department_Name;
				Sequential_Number = medicalget01res.Sequential_Number;
				selectedKbn = '200';
				selectedList = [];
				Medical_kbn = {};
				const Api_Result = medicalget01res.Api_Result;
				if (Number(Api_Result) === 0 && Medical_Information) {
					Medical_List_Information = medicalget01res.Medical_List_Information;
					if (Medical_List_Information && Medical_List_Information.length > 0) {
						//受診履歴情報（繰り返し　５）
						Medical_List_Information.forEach((medicalist: any) => {
							Medical_Information = medicalist.Medical_Information;
							//console.log('Medical_Information', Medical_Information);
							if (Medical_Information && Medical_Information.length > 0) {
								//診療内容剤情報（繰り返し　１３５）
								Medical_Information.forEach((medical: any) => {
									const Medical_Class = medical.Medical_Class;
									//console.log('Medical_Class', Medical_Class);
									if (/^1[1-4][0-3]$/.test(Medical_Class)) {
										Medical_kbn['100'] = '診察';
									} else if (/^14[8-9]$/.test(Medical_Class)) {
										Medical_kbn['140'] = '在宅処方';
									} else if (/^2[1-3][0-9]$/.test(Medical_Class)) {
										Medical_kbn['200'] = '処方';
										//電子処方箋APPなのでの処方は登録する
										selectedList.push(medical);
									} else if (/^3[1-3][0-9]$/.test(Medical_Class)) {
										Medical_kbn['300'] = '注射・点滴';
									} else if (/^[4-5][0-4][0-9]$/.test(Medical_Class)) {
										Medical_kbn['400'] = '処置';
									} else if (/^[6-7][0-4][0-9]$/.test(Medical_Class)) {
										Medical_kbn['600'] = '検査';
									} else if (/^8[0-5][0-9]$/.test(Medical_Class)) {
										Medical_kbn['800'] = 'リハビリテーション他';
									}
								});
							} else {
								Medical_kbn['000'] = '算定項目が見つかりません。';
							}
						});
					}
					// Medical_kbnをキーでソート
					Medical_kbn = Object.fromEntries(
						Object.entries(Medical_kbn).sort(([a], [b]) => Number(a) - Number(b))
					);
				}
			}
		};

		fetchData();
	});

	function handleKbnChange(event: Event) {
		const select = event.target as HTMLSelectElement;
		selectedKbn = select.value;
		console.log('Selected Kbn:', selectedKbn);
		selectedList = [];
		if (selectedKbn === '100') {
			Medical_Information.forEach((medical: any) => {
				const Medical_Class = medical.Medical_Class;
				if (/^1[1-4][0-3]$/.test(Medical_Class)) {
					selectedList.push(medical);
				}
			});
		} else if (selectedKbn === '140') {
			Medical_Information.forEach((medical: any) => {
				const Medical_Class = medical.Medical_Class;
				if (/^14[8-9]$/.test(Medical_Class)) {
					selectedList.push(medical);
				}
			});
		} else if (selectedKbn === '200') {
			Medical_Information.forEach((medical: any) => {
				const Medical_Class = medical.Medical_Class;
				if (/^2[1-3][0-9]$/.test(Medical_Class)) {
					selectedList.push(medical);
				}
			});
		} else if (selectedKbn === '300') {
			Medical_Information.forEach((medical: any) => {
				const Medical_Class = medical.Medical_Class;
				if (/^3[1-3][0-9]$/.test(Medical_Class)) {
					selectedList.push(medical);
				}
			});
		} else if (selectedKbn === '400') {
			Medical_Information.forEach((medical: any) => {
				const Medical_Class = medical.Medical_Class;
				if (/^[4-5][0-4][0-9]$/.test(Medical_Class)) {
					selectedList.push(medical);
				}
			});
		} else if (selectedKbn === '600') {
			Medical_Information.forEach((medical: any) => {
				const Medical_Class = medical.Medical_Class;
				if (/^[6-7][0-4][0-9]$/.test(Medical_Class)) {
					selectedList.push(medical);
				}
			});
		} else if (selectedKbn === '800') {
			Medical_Information.forEach((medical: any) => {
				const Medical_Class = medical.Medical_Class;
				if (/^8[0-5][0-9]$/.test(Medical_Class)) {
					selectedList.push(medical);
				}
			});
		}
		//console.log('selectedList:', selectedList);
	}
</script>

<!-- リスト本体 -->

<div class="w-[80vw] h-[80vh] rounded-md bg-white p-2">
	<div class="flex">
		<div class="flex-auto flex p-1">
			<div class="flex-auto">{Perform_Date}</div>
			<div class="w-2/6 px-2">{Department_Name}</div>
		</div>
		<select class="p-1 w-72 border rounded bg-gray-100" onchange={handleKbnChange}>
			{#each Object.entries(Medical_kbn) as [key, value]}
				<option value={key} selected={key === selectedKbn}>{value}</option>
			{/each}
		</select>
		<button
			onclick={closeWindow}
			class="ml-auto w-24 flex items-center justify-center"
			aria-label="閉じる"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				height="24px"
				viewBox="0 -960 960 960"
				width="24px"
				fill="#5f6368"
				><path
					d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
				/></svg
			>
		</button>
	</div>
	<div class="mt-2 w-full flex flex-col bg-white">
		<div class="head h-[4vh] bg-green-200">
			<div class="label flex w-full text-[0.9em]">
				<div class="flex-auto">名称</div>
				<div class="w-1/6">数量</div>
				<div class="w-1/6">日/回</div>
			</div>
		</div>
		<div class="flex-grow h-[50vh] overflow-auto bg-white">
			{#each selectedList as List, i}
				<div class="bg-blue-200">
					<div class="flex w-full">
						<div class="flex-auto pl-2">[{List.Medical_Class}]{List.Medical_Class_Name}</div>
						<div class="w-1/6 text-right px-2">{List.Medical_Class_Point?.toLocaleString()}</div>
					</div>
				</div>

				{#each List.Medication_info as item, j}
					<div class="bg-blue-100">
						<div class="flex w-full">
							<div class="flex-auto pl-4" title={item.Medication_Code}>{item.Medication_Name}</div>
							{#if item.Medication_Code?.substring(0, 3) === '001'}
								<div class="w-1/6 text-right px-2">
									{item.Medication_Number}
									{#if List.Medical_Class?.substring(0, 2) === '21'}
										日分
									{:else if List.Medical_Class?.substring(0, 2) === '22'}
										回分
									{:else if List.Medical_Class?.substring(0, 2) === '23'}
										個
									{/if}
								</div>
							{:else}
								<div class="w-1/6 text-right px-2">
									{#if item.Unit_Code_Name}
										{item.Medication_Number}
										{item.Unit_Code_Name}
									{/if}
								</div>
								<div class="w-1/6"></div>
							{/if}
						</div>
					</div>
				{/each}
			{/each}
		</div>
	</div>
</div>

<style>
	.label div {
		@apply border border-gray-600 text-center;
	}
</style>
