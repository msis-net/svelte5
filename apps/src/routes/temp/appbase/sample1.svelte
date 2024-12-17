<!--アプリ本体-->
<script lang="ts">
	export let width = 0;
	export let height = 0;
	export let scale = 1;
</script>

<div class="workbase">
	<div class="header">
		<div>header:h-[12vh] (12%)</div>
		<p>画面サイズに比例して全体を拡大縮小</p>
	</div>
	<div class="body">
		<div class="h-100vh bg-pink-500">
			<div>body</div>
			<p>h-[calc(100vh-24vh-1rem)];</p>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
			<div>TEXT</div>
		</div>
	</div>
	<div class="footer">
		<div>footer</div>
		<p>h-[12vh] (12%)</p>
	</div>
</div>

<style>
	.workbase {
		@apply fixed inset-0 m-1 flex-col space-y-1 bg-green-200 p-0;
		min-height: 99vh;
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
		overflow: hidden; /* 必要に応じてスクロール */
	}
</style>
