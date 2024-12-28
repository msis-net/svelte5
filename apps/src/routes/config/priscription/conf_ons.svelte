<script lang="ts">
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { page } from '$app/stores';
	import { Ons } from '$lib/stores/rx.svelte';

	$effect(() => {
		// IPアドレス
		if (Ons.onsHost) {
			const ipInput = document.getElementById('ipaddress') as HTMLInputElement;
			ipInput.value = Ons.onsHost;
		}
		const ipInput = document.getElementById('ipaddress') as HTMLInputElement;
		ipInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Ons.setOnsHost(target.value);
		});

		// 送信用パス
		if (Ons.onsReq) {
			const reqInput = document.getElementById('sharePathReq') as HTMLInputElement;
			reqInput.value = Ons.onsReq;
		}
		const reqInput = document.getElementById('sharePathReq') as HTMLInputElement;
		reqInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Ons.setOnsReq(target.value);
		});

		// 受信用パス
		if (Ons.onsRes) {
			const resInput = document.getElementById('sharePathRes') as HTMLInputElement;
			resInput.value = Ons.onsRes;
		}
		const resInput = document.getElementById('sharePathRes') as HTMLInputElement;
		resInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Ons.setOnsRes(target.value);
		});

		// ユーザ名
		if (Ons.onsUser) {
			const userInput = document.getElementById('username') as HTMLInputElement;
			userInput.value = Ons.onsUser;
		}
		const userInput = document.getElementById('username') as HTMLInputElement;
		userInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Ons.setOnsUser(target.value);
		});

		// パスワード
		if (Ons.onsPass) {
			const passInput = document.getElementById('password') as HTMLInputElement;
			passInput.value = Ons.onsPass;
		}
		const passInput = document.getElementById('password') as HTMLInputElement;
		passInput.addEventListener('change', (event) => {
			const target = event.target as HTMLInputElement;
			Ons.setOnsPass(target.value);
		});
	});
</script>

<div class="p-4">
	<div class="label">オンライン資格確認端末情報</div>
	<div class="flex flex-col">
		<label for="ipaddress" class=" font-medium text-gray-700"
			>オンライン資格確認端末IPアドレス</label
		>
		<input
			type="text"
			id="ipaddress"
			name="ipaddress"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			placeholder="例: 192.168.1.100"
		/>
	</div>

	<div class="flex flex-col">
		<label for="sharePathReq" class="font-medium text-gray-700">共有フォルダ：送信用パス</label>
		<input
			type="text"
			id="sharePathReq"
			name="sharePathReq"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			placeholder="例: \\server\share"
		/>
	</div>
	<div class="flex flex-col">
		<label for="sharePathRes" class=" font-medium text-gray-700">共有フォルダ：受信用パス</label>
		<input
			type="text"
			id="sharePathRes"
			name="sharePathRes"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			placeholder="例: \\server\share"
		/>
	</div>
	<div class="flex flex-col">
		<label for="username" class=" font-medium text-gray-700">共有フォルダ：ユーザ名 </label>
		<input
			type="text"
			id="username"
			name="username"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			placeholder="例: \\server\share"
		/>
	</div>
	<div class="flex flex-col">
		<label for="password" class=" font-medium text-gray-700">共有フォルダ：パスワード名 </label>
		<input
			type="text"
			id="password"
			name="password"
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			placeholder="例: \\server\share"
		/>
	</div>
</div>
