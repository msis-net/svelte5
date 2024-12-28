<script lang="ts">
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { page } from '$app/stores';
	import { Web } from '$lib/stores/rx.svelte';

	$effect(() => {
		const certificateInput = document.getElementById('certificate') as HTMLInputElement;
		if (Web.certificate) {
			//#certificateInputを消す
			certificateInput.classList.add('hidden');
			const certName = document.getElementById('certName') as HTMLInputElement;
			//certName.style.cursor = 'pointer';
			certName.textContent = Web.certificate;
			certName.removeAttribute('for'); //ファイル選択できないようにする
			certName.style.display = 'flex';
			certName.style.alignItems = 'center';
			certName.style.height = '100%';
			//削除対応
			certName.style.setProperty('--after-content', '"[delete]"');
			const style = document.createElement('style');
			style.textContent = `
				#certName::after {
					content: var(--after-content);
					color:red;
					cursor:pointer;
				}
			`;
			document.head.appendChild(style);

			//.p12削除
			certName.addEventListener('click', async (event) => {
				//alert('Del');
				const formData = new FormData();
				// Facility Information
				formData.append('delete', Web.certificate);
				formData.append('key', 'certificate');
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
					Web.setCertificate('');
					certName.textContent = '証明書(.p12)を選択してください。';
					certName.style.setProperty('--after-content', '');
					certName.setAttribute('for', 'certificate'); // ファイル選択を再度有効にする
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
				formData.append('key', 'certificate');
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

					Web.setCertificate(selectedFile.name);
					//console.log('アップロード成功');
				} catch (error) {
					console.error('error!:', error);
				}
			}
			//console.log(Orca.orcaCertificate);
		});

		if (Web.webUrl) {
			const certPasswordInput = document.getElementById('webUrl') as HTMLInputElement;
			certPasswordInput.value = Web.webUrl;
		}

		const webUrl = document.getElementById('webUrl') as HTMLInputElement;
		webUrl.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Web.setWebUrl(target.value);
		});

		if (Web.certPassword) {
			const certPasswordInput = document.getElementById('certPassword') as HTMLInputElement;
			certPasswordInput.value = Web.certPassword;
		}

		const certPasswordInput = document.getElementById('certPassword') as HTMLInputElement;
		certPasswordInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Web.setCertPassword(target.value);
		});

		if (Web.certExpiry) {
			const certExpiryInput = document.getElementById('certExpiry') as HTMLInputElement;
			certExpiryInput.value = Web.certExpiry;
		}

		const certExpiryInput = document.getElementById('certExpiry') as HTMLInputElement;
		certExpiryInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Web.setCertExpiry(target.value);
		});

		if (Web.loginId) {
			const loginIdInput = document.getElementById('loginId') as HTMLInputElement;
			loginIdInput.value = Web.loginId;
		}

		const loginIdInput = document.getElementById('loginId') as HTMLInputElement;
		loginIdInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Web.setLoginId(target.value);
		});

		if (Web.loginPassword) {
			const loginPasswordInput = document.getElementById('loginPassword') as HTMLInputElement;
			loginPasswordInput.value = Web.loginPassword;
		}

		const loginPasswordInput = document.getElementById('loginPassword') as HTMLInputElement;
		loginPasswordInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Web.setLoginPassword(target.value);
		});
	});
</script>

<div class="p-4">
	<div class="label">オン資WebAPI接続情報</div>
	<div class="flex flex-col mb-1">
		<input
			type="text"
			id="webUrl"
			name="webUrl"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			placeholder="URL"
		/>
	</div>
	<div class="grid grid-cols-3 gap-4">
		<div class="flex flex-col">
			<label for="certificate" id="certName" class=" font-medium text-gray-700"
				>証明書(.p12)を選択してください。</label
			>
			<input
				type="file"
				id="certificate"
				name="certificate"
				accept=".p12"
				class="mt-1 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>

		<div class="flex flex-col">
			<label for="certPassword" class=" font-medium text-gray-700">証明書パスワード</label>
			<input
				type="password"
				id="certPassword"
				name="certPassword"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				placeholder="証明書のパスワードを入力"
			/>
		</div>

		<div class="flex flex-col">
			<label for="certExpiry" class=" font-medium text-gray-700">証明書有効期限</label>
			<input
				type="date"
				id="certExpiry"
				name="certExpiry"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>
	</div>
	<div class="grid grid-cols-2 gap-4">
		<div class="flex flex-col">
			<label for="loginId" class=" font-medium text-gray-700">ログインID</label>
			<input
				type="text"
				id="loginId"
				name="loginId"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				placeholder="ログインIDを入力"
			/>
		</div>

		<div class="flex flex-col">
			<label for="loginPassword" class=" font-medium text-gray-700">ログインパスワード</label>
			<input
				type="password"
				id="loginPassword"
				name="loginPassword"
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				placeholder="パスワードを入力"
			/>
		</div>
	</div>
</div>

<style>
	#certificate {
		@apply text-[0.8rem];
	}

	#certificate::file-selector-button {
		color: dodgerblue;
		padding: 0.5em;
		border: thin solid grey;
		border-radius: 3px;
	}
</style>
