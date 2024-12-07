let count = $state(0);

export function createCounter() {
	return {
		get count() {
			return count;
		},
		increment: () => (count += 1),
		decrement: () => (count -= 1)
	};
}
