<script lang="ts">
	import { onMount } from 'svelte';

	let width = 0;
	let height = 0;

	function updateDimensions() {
		width = window.innerWidth;
		height = window.innerHeight;
	}

	onMount(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	});
</script>

<!--画面サイズインジケータ-->
<div class="info text-center text-xs">
	<p>画面幅: {width}px</p>
	<p>画面高: {height}px</p>
</div>

<!--アプリ本体-->
<div class="workbase">
	<div class="header">headder</div>
	<div class="body p-1">
		<div>
			<div>head</div>
			<div>head</div>
			<div>head</div>
			<div>head</div>
			<div>head</div>
			<div>head</div>
		</div>
		<div class="items-stretch">base</div>
		<div>foot</div>
	</div>
	<div class="footer">footer</div>
</div>

<style>
	.workbase {
		@apply fixed inset-0 m-1 flex-col bg-green-300 p-1;
	}

	.workbase div {
		@apply bg-red-200;
	}
	.workbase .header,
	.workbase .footer {
		@apply /* 高さ12% */ h-[12vh];
	}
	.workbase .body {
		@apply h-[calc(100vh-24vh-1rem)]; /* 12vh*2 とマージン調整残りの領域をすべて埋める */
		overflow: auto; /* 必要に応じてスクロール */
	}

	div {
		@apply border border-gray-600;
	}
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
	/*幅が768i以上の時*/
	@media (min-width: 768px) {
		.header,
		.footer {
			display: none;
		}
		.workbase .body {
			@apply h-[calc(100vh-1rem)]; /* 12vh*2 とマージン調整残りの領域をすべて埋める */
		}
	}
</style>
