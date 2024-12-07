// Broadcast Channelの作成

let count = $state(0);
let msg = $state('default');

const channel = new BroadcastChannel('count-channel');
export function createCounter() {
	channel.onmessage = (event) => {
		// メッセージを受信
		console.log('event.data', event.data);
		count = event.data;
	};
	return {
		get count() {
			channel.postMessage(count); // 他のタブにメッセージを送信
			return count;
		},
		increment: () => (count += 1),
		decrement: () => (count -= 1)
	};
}
