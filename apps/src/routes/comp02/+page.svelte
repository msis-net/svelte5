<script lang="ts">
	import { createCounter } from '$lib/store/common.svelte';
	const counter = createCounter();
</script>

<button onclick={counter.increment}>
	clicks: {counter.count}
</button>
