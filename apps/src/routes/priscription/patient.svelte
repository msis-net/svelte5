<script lang="ts">
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { Rx } from '$lib/stores/rx.svelte';

	onMount(async () => {
		const ptid = Rx.ptid;
		if (ptid) {
			const param = {
				scriptParameterValue: ptid
			};
			const response = await fetch(
				`/api/orca?context=/api01rv2/patientgetv2&id=${ptid}&format=json`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			const patientinfores = data?.patientinfores || null;

			if (!patientinfores) {
				console.warn('patientinfores not found in response data');
				return;
			}

			const Api_Result = patientinfores.Api_Result;
			if (Number(Api_Result) === 0) {
				const Patient_Information = patientinfores.Patient_Information;

				if (Patient_Information.Patient_ID) {
					Common.setFormData('Patient_ID', Patient_Information.Patient_ID);
				}
				if (Patient_Information.WholeName) {
					Common.setElementData('WholeName', Patient_Information.WholeName);
				}
				if (Patient_Information.WholeName_inKana) {
					Common.setElementData('WholeName_inKana', Patient_Information.WholeName_inKana);
				}
				if (Patient_Information.Sex) {
					const sex =
						Patient_Information.Sex === '1'
							? '男'
							: Patient_Information.Sex === '2'
								? '女'
								: '不明';
					Common.setElementData('Sex', sex);
				}
				if (Patient_Information.BirthDate) {
					const d = new Date(Patient_Information.BirthDate);
					const wareki = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', { era: 'narrow' }).format(
						d
					); //narrow,short,logn
					Common.setElementData('BirthDate', wareki.replace(/\//g, '.'));

					//年齢を計算する
					try {
						const age = Common.getAge(d, new Date(Rx.ymd));
						Common.setElementData('age', age + '歳');
					} catch (e) {}
				}

				Rx.setPatient_Information(Patient_Information);
				//console.log(Patient_Information);
			}
		}
	});
</script>

<div class="md:flex-auto md:space-x-1 md:flex">
	<div class="name md:flex-auto">
		<div id="WholeName"></div>
		<div id="WholeName_inKana" class="before:content-['('] after:content-[')']"></div>
	</div>
	<div id="Sex" class="namep md:w-12 md:text-center"></div>
	<div id="BirthDate" class="namep md:w-28 md:text-center"></div>
	<div id="age" class="namep md:w-20 md:text-center"></div>
</div>

<style>
	div {
		@apply flex items-center;
	}
	.name {
		@apply whitespace-nowrap;
	}
	.namep {
		@apply justify-center px-2;
	}
</style>
