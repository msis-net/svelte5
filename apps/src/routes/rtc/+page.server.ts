import { createCounter } from '$lib/store.svelte';
import type { Actions } from './$types';

export const load = async () => {
	// Server側で store を呼び出す
	const counter = createCounter();

	return {
		// フロント側に値を渡す
		count: counter.count
	};
};

// Store の更新は form action を使う
export const actions = {
	increment: async () => {
		const counter = createCounter();
		counter.increment();
		return {};
	},
	decrement: async () => {
		const counter = createCounter();
		counter.decrement();
		return {};
	}
} satisfies Actions;
