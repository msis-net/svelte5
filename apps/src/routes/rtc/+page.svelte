<script lang="ts">
	import { page } from '$app/stores';
	import ioClient from 'socket.io-client';

	//const ENDPOINT = 'http://192.168.1.77:5173/rtc';
	const ENDPOINT = $page.url.href;
	const socket = ioClient(ENDPOINT);

	const io = socket;

	import { onMount } from 'svelte';
	import { count } from '$lib/store';

	let textField = '';
	let userName = '';
	let messages: any = [];

	let localCount: any;
	// ストアの値を購読
	$: count.subscribe((value) => {
		localCount = value;
	});
	//メッセージを受信したときの処理

	onMount(() => {
		io.on('message', (message) => {
			console.log('onMount', message);
			messages = [...messages, message];
			console.log('from', message.from);
			console.log('message', message.message);
			const dta = JSON.parse(message.message);
			if (message.from !== userName && dta.type === 'update-count') {
				console.log('update');
				localCount = dta.value;
			}
		});
		io.on('name', (name) => {
			console.log('name', name);
			userName = name;
		});
	});

	function sendMessage() {
		const message = textField.trim();
		if (!message) return;
		console.log('sendMessage', message);
		textField = '';
		//io.emit('message', message); // サーバーと接続している同じsocketIdクライアント全てにsend_messageイベントを発火
	}

	// 必要ならサーバーへメッセージを送信
	export const updateCountOnServer = (newCount: any) => {
		socket.send(JSON.stringify({ type: 'update-count', value: newCount }));
	};

	// ユーザー操作で値を変更
	function increment() {
		const newCount = localCount + 1;

		// ローカルのストアを更新
		count.set(newCount);

		// サーバーへも通知
		updateCountOnServer(newCount);
	}
</script>

<div>
	<button on:click={increment}>
		clicks: {localCount}
	</button>
	<div>
		<header>
			<span>My Chat App/RTC/</span>
			<span>{userName}</span>
		</header>
		<form on:submit|preventDefault={sendMessage}>
			<input type="text" bind:value={textField} />
			<button type="submit">Send</button>
		</form>
		<div>
			{#each messages as message}
				<div>
					<span>
						<b>{message.from}</b>
						<i>{message.time}</i>
					</span>
					{message.message}
				</div>
			{/each}
		</div>
	</div>

	<div class="m-5">
		<div>btn1</div>
		<div>btn2</div>
		<div>btn3</div>
	</div>
</div>
