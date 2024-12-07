import { writable } from 'svelte/store';

// Broadcast Channelの作成
const channel = new BroadcastChannel('count-channel');

// カスタムストアの作成
function createCountStore() {
	const { subscribe, set, update } = writable(0);

	// 他のタブからのメッセージを受信
	channel.onmessage = (event) => {
		console.log('event.data', event.data);
		set(event.data);
	};

	return {
		subscribe,
		increment: () =>
			update((n) => {
				const newValue = n + 1;
				channel.postMessage(newValue); // 他のタブに通知
				return newValue;
			}),
		set: (value: number) => {
			channel.postMessage(value); // 他のタブに通知
			set(value);
		}
	};
}

export const count = createCountStore();
