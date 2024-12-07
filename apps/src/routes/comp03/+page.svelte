<script lang="ts">
	import { createCounter } from '$lib/store/common.svelte';
	const counter = createCounter();
</script>

<div>
	{counter.count}
</div>
