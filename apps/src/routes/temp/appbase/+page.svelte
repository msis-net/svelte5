<script lang="ts">
	import { onMount } from 'svelte';

	let width = 0;
	let height = 0;
	let scale = 1;
	function updateDimensions() {
		width = window.innerWidth;
		height = window.innerHeight;
		scale = Math.min(1, width / 1024, height / 768);
	}

	onMount(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	});

	import Sample from './sample1.svelte';
</script>

<!--画面サイズインジケータ-->
<div class="info text-center text-xs">
	<p>画面幅: {width}px</p>
	<p>画面高: {height}px</p>
	<p>scale: {scale}</p>
</div>

<Sample />

<style>
	.info {
		position: fixed;
		top: 1rem;
		right: 1rem;
		background-color: rgba(255, 255, 255, 0.9);
		padding: 0.5rem;
		border-radius: 0.25rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		z-index: 100;
	}
</style>
