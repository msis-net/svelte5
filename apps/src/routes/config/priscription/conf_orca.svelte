<script lang="ts">
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { page } from '$app/stores';
	import { Orca } from '$lib/stores/rx.svelte';

	$effect(() => {
		const certificateInput = document.getElementById('orcaCertificate') as HTMLInputElement;

		if (Orca.orcaCertificate) {
			//#certificateInputを消す
			certificateInput.classList.add('hidden');
			//console.log('Orca.orcaCertificate', Orca.orcaCertificate);
			const orcaCertName = document.getElementById('orcaCertName') as HTMLInputElement;
			//certName.style.cursor = 'pointer';

			orcaCertName.textContent = Orca.orcaCertificate;
			orcaCertName.removeAttribute('for'); //ファイル選択できないようにする
			orcaCertName.style.display = 'flex';
			orcaCertName.style.alignItems = 'center';
			orcaCertName.style.height = '100%';
			//削除対応
			orcaCertName.style.setProperty('--after-content', '"[delete]"');
			const style = document.createElement('style');
			style.textContent = `
				#orcaCertName::after {
					content: var(--after-content);
					color:red;
					cursor:pointer;
				}
			`;
			document.head.appendChild(style);

			//.p12削除
			orcaCertName.addEventListener('click', async (event) => {
				//alert('Del');
				const formData = new FormData();
				// Facility Information
				formData.append('delete', Orca.orcaCertificate);
				formData.append('key', 'orcaCertificate');
				try {
					const response = await fetch('/api/upload', {
						method: 'POST',
						body: formData
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const result = await response.json();
					console.log('Delete success:', result);
					Orca.setOrcaCertificate('');
					orcaCertName.textContent = '証明書(.p12)を選択してください。';
					orcaCertName.style.setProperty('--after-content', '');
					orcaCertName.setAttribute('for', 'orcaCertificate'); // ファイル選択を再度有効にする
					orcaCertName.classList.remove('certfile');
					certificateInput.classList.remove('hidden');

					// Clear the files from the input
					if (certificateInput.files) {
						certificateInput.value = '';
					}
				} catch (error) {
					console.error('error!:', error);
				}
			});
		}

		certificateInput.addEventListener('change', async (event) => {
			let selectedFile;
			const target = event.target as HTMLInputElement;
			if (target.files) {
				selectedFile = target.files[0];
				//console.log(selectedFile);
				//Orca.setOrcaCertificate(selectedFile.name);
				const formData = new FormData();
				formData.append('file', selectedFile);
				formData.append('key', 'orcaCertificate');
				try {
					const response = await fetch('/api/upload', {
						method: 'POST',
						body: formData
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					const contentType = response.headers.get('content-type');
					if (contentType && contentType.includes('application/json')) {
						const result = await response.json();
						if (result.error) {
							throw new Error(result.error);
						}
					}

					Orca.setOrcaCertificate(selectedFile.name);
					//console.log('アップロード成功');
				} catch (error) {
					console.error('error!:', error);
				}
			}
			//console.log(Orca.orcaCertificate);
		});

		if (Orca.orcaUrl) {
			const certPasswordInput = document.getElementById('orcaUrl') as HTMLInputElement;
			certPasswordInput.value = Orca.orcaUrl;
		}

		const orcaUrl = document.getElementById('orcaUrl') as HTMLInputElement;
		orcaUrl.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Orca.setOrcaUrl(target.value);
		});

		if (Orca.orcaCertPassword) {
			const certPasswordInput = document.getElementById('orcaCertPassword') as HTMLInputElement;
			certPasswordInput.value = Orca.orcaCertPassword;
		}

		const certPasswordInput = document.getElementById('orcaCertPassword') as HTMLInputElement;
		certPasswordInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Orca.setOrcaCertPassword(target.value);
		});

		if (Orca.orcaCertExpiry) {
			const certExpiryInput = document.getElementById('orcaCertExpiry') as HTMLInputElement;
			certExpiryInput.value = Orca.orcaCertExpiry;
		}

		const certExpiryInput = document.getElementById('orcaCertExpiry') as HTMLInputElement;
		certExpiryInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Orca.setOrcaCertExpiry(target.value);
		});

		if (Orca.orcaId) {
			const loginIdInput = document.getElementById('orcaId') as HTMLInputElement;
			loginIdInput.value = Orca.orcaId;
		}

		const loginIdInput = document.getElementById('orcaId') as HTMLInputElement;
		loginIdInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Orca.setOrcaId(target.value);
		});

		if (Orca.orcaPassword) {
			const loginPasswordInput = document.getElementById('orcaPassword') as HTMLInputElement;
			loginPasswordInput.value = Orca.orcaPassword;
		}

		const loginPasswordInput = document.getElementById('orcaPassword') as HTMLInputElement;
		loginPasswordInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Orca.setOrcaPassword(target.value);
		});
	});
</script>

<div class="p-4">
	<div class="label">WebORCA関連情報</div>
	<div class="flex flex-col mb-1">
		<input
			type="text"
			id="orcaUrl"
			name="orcaUrl"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			placeholder="URL"
		/>
	</div>
	<div class="grid grid-cols-3 gap-4">
		<div class="flex flex-col">
			<label for="orcaCertificate" id="orcaCertName" class="font-medium text-gray-700"
				>証明書(.p12)を選択してください。</label
			>
			<input
				type="file"
				id="orcaCertificate"
				name="orcaCertificate"
				accept=".p12"
				class="mt-1 w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>

		<div class="flex flex-col">
			<label for="orcaCertPassword" class=" font-medium text-gray-700">証明書パスワード</label>
			<input
				type="password"
				id="orcaCertPassword"
				name="orcaCertPassword"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				placeholder="証明書のパスワードを入力"
			/>
		</div>

		<div class="flex flex-col">
			<label for="orcaCertExpiry" class=" font-medium text-gray-700">証明書有効期限</label>
			<input
				type="date"
				id="orcaCertExpiry"
				name="orcaCertExpiry"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>
	</div>
	<div class="grid grid-cols-2 gap-4 mt-4">
		<div class="flex flex-col">
			<label for="orcaId" class=" font-medium text-gray-700">ログインID</label>
			<input
				type="text"
				id="orcaId"
				name="orcaId"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				placeholder="ログインIDを入力"
			/>
		</div>

		<div class="flex flex-col">
			<label for="orcaPassword" class=" font-medium text-gray-700">パスワード/APIキー</label>
			<input
				type="text"
				id="orcaPassword"
				name="orcaPassword"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				placeholder="パスワードを入力"
			/>
		</div>
	</div>
</div>

<style>
	#orcaCertificate {
		@apply text-[0.8rem];
	}

	#orcaCertificate::file-selector-button {
		color: dodgerblue;
		padding: 0.5em;
		border: thin solid grey;
		border-radius: 3px;
	}
</style>
