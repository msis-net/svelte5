import { writable } from 'svelte/store';

// 共有するリアクティブな変数
export const count = writable(0);
