<script lang="ts">
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { page } from '$app/stores';
	import { Fcl } from '$lib/stores/rx.svelte';

	$effect(() => {
		if (Fcl.prefCode) {
			const selectElement = document.getElementById('prefCode') as HTMLSelectElement;
			const options = selectElement.options;
			for (let i = 0; i < options.length; i++) {
				if (options[i].value === Fcl.prefCode) {
					options[i].selected = true;
					break;
				}
			}
		}

		const prefCodeSelect = document.getElementById('prefCode') as HTMLSelectElement;
		prefCodeSelect.addEventListener('change', (event) => {
			const target = event.target as HTMLSelectElement;
			Fcl.setPrefCode(target.value);
		});

		if (Fcl.facilityType) {
			const selectElement = document.getElementById('facilityType') as HTMLSelectElement;
			const options = selectElement.options;
			for (let i = 0; i < options.length; i++) {
				if (options[i].value === Fcl.facilityType) {
					options[i].selected = true;
					break;
				}
			}
		}

		const facilityTypeSelect = document.getElementById('facilityType') as HTMLSelectElement;
		facilityTypeSelect.addEventListener('change', (event) => {
			const target = event.target as HTMLSelectElement;
			Fcl.setFacilityType(target.value);
		});

		if (Fcl.facilityCode) {
			const selectElement = document.getElementById('facilityCode') as HTMLSelectElement;
			selectElement.value = Fcl.facilityCode;
		}

		const facilityCodeSelect = document.getElementById('facilityCode') as HTMLSelectElement;
		facilityCodeSelect.addEventListener('change', (event) => {
			const target = event.target as HTMLSelectElement;
			Fcl.setFacilityCode(target.value);
		});

		if (Fcl.facilityName) {
			const selectElement = document.getElementById('facilityName') as HTMLSelectElement;
			selectElement.value = Fcl.facilityName;
		}

		const facilityNameSelect = document.getElementById('facilityName') as HTMLSelectElement;
		facilityNameSelect.addEventListener('change', (event) => {
			const target = event.target as HTMLSelectElement;
			Fcl.setFacilityName(target.value);
		});
	});
</script>

<div class="p-4">
	<div class="label">医療機関情報</div>
	<div class="grid grid-cols-3 gap-4">
		<div class="flex flex-col">
			<label for="prefCode" class=" font-medium text-gray-700">都道府県コード</label>
			<select
				id="prefCode"
				name="prefCode"
				class="mt-1 block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			>
				<option value="">選択してください</option>
				<option value="01">01 北海道</option>
				<option value="02">02 青森県</option>
				<option value="03">03 岩手県</option>
				<option value="04">04 宮城県</option>
				<option value="05">05 秋田県</option>
				<option value="06">06 山形県</option>
				<option value="07">07 福島県</option>
				<option value="08">08 茨城県</option>
				<option value="09">09 栃木県</option>
				<option value="10">10 群馬県</option>
				<option value="11">11 埼玉県</option>
				<option value="12">12 千葉県</option>
				<option value="13">13 東京都</option>
				<option value="14">14 神奈川県</option>
				<option value="15">15 新潟県</option>
				<option value="16">16 富山県</option>
				<option value="17">17 石川県</option>
				<option value="18">18 福井県</option>
				<option value="19">19 山梨県</option>
				<option value="20">20 長野県</option>
				<option value="21">21 岐阜県</option>
				<option value="22">22 静岡県</option>
				<option value="23">23 愛知県</option>
				<option value="24">24 三重県</option>
				<option value="25">25 滋賀県</option>
				<option value="26">26 京都府</option>
				<option value="27">27 大阪府</option>
				<option value="28">28 兵庫県</option>
				<option value="29">29 奈良県</option>
				<option value="30">30 和歌山県</option>
				<option value="31">31 鳥取県</option>
				<option value="32">32 島根県</option>
				<option value="33">33 岡山県</option>
				<option value="34">34 広島県</option>
				<option value="35">35 山口県</option>
				<option value="36">36 徳島県</option>
				<option value="37">37 香川県</option>
				<option value="38">38 愛媛県</option>
				<option value="39">39 高知県</option>
				<option value="40">40 福岡県</option>
				<option value="41">41 佐賀県</option>
				<option value="42">42 長崎県</option>
				<option value="43">43 熊本県</option>
				<option value="44">44 大分県</option>
				<option value="45">45 宮崎県</option>
				<option value="46">46 鹿児島県</option>
				<option value="47">47 沖縄県</option>
			</select>
		</div>

		<div class="flex flex-col">
			<label for="facilityType" class=" font-medium text-gray-700">医療機関区分</label>
			<select
				id="facilityType"
				name="facilityType"
				class="mt-1 block w-full h-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			>
				<option value="">選択してください</option>
				<option value="1">1 医科</option>
				<option value="3">3 歯科</option>
			</select>
		</div>

		<div class="flex flex-col">
			<label for="facilityCode" class=" font-medium text-gray-700">医療機関コード</label>
			<input
				type="text"
				id="facilityCode"
				name="facilityCode"
				maxlength="7"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				placeholder="例: 1234567"
			/>
		</div>
	</div>

	<div class="flex flex-col">
		<label for="facilityName" class=" font-medium text-gray-700">医療機関名</label>
		<input
			type="text"
			id="facilityName"
			name="facilityName"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			placeholder="例: ○○病院"
		/>
	</div>
</div>
