<script lang="ts">
	import { onMount } from 'svelte';
	import { Rx } from '$lib/stores/rx.svelte';

	onMount(async () => {
		const response = await fetch('/api/getSyskanri', {
			method: 'POST',
			body: '1005',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();

		if (data) {
			const selectElement = document.createElement('select');
			selectElement.style.width = '100%';
			selectElement.id = 'department-select';
			selectElement.setAttribute('class', 'p-1 rounded-md');

			data.value.sort((a: any, b: any) => a.kbncd.localeCompare(b.kbncd)); //kbncdでソート
			data.value.forEach((item: any) => {
				const option = document.createElement('option');
				option.value = item.kbncd;
				option.textContent = `${item.kbncd} ${item.kanritbl}`;
				if (item.kbncd === Rx.sryka) {
					option.selected = true;
				}
				selectElement.appendChild(option);
			});

			//変更処理
			selectElement.addEventListener('change', (e) => {
				const select = e.target as HTMLSelectElement;
				const selectedOption = select.options[select.selectedIndex];
				Rx.setSryka(selectedOption.value);
			});

			const container = document.getElementById('Department');
			if (container) {
				container.innerHTML = '';
				container.appendChild(selectElement);
			}
		}
	});
</script>

<div id="Department" class="flex-auto p-1"></div>
