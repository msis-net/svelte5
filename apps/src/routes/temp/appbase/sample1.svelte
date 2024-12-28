<!--アプリ本体-->
<script lang="ts">
</script>

<div class="workbase">
	<div class="header bg-pink-200">
		<div>header:h-[12vh] (12%)</div>
		<p>画面サイズに比例して全体を拡大縮小</p>
	</div>
	<div class="body flex space-x-1 p-2 bg-gray-200">
		<div class="w-[20vw] flex flex-col bg-white">
			<div class="head h-[15vh] bg-green-200">
				<div>left:body:head/h-[15%]</div>
			</div>
			<div class="flex-grow overflow-auto bg-white">
				<div class=" bg-orange-200">
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
					<div>TEXT</div>
					<div>TEXT</div>
					<div>TEXT</div>
				</div>
			</div>
			<div class="foot h-[15vh] bg-blue-200">
				<div>left:body:foot/h-[15%]</div>
			</div>
		</div>
		<div class="flex-auto flex flex-col bg-white">
			<div class="head h-[15vh] bg-green-200">
				<div>right:body:head/h-[15%]</div>
			</div>
			<div class="body flex-grow bg-white">
				<div>right:body</div>
			</div>
			<div class="foot h-[15vh] bg-blue-200">
				<div>right:body:foot/h-[15%]</div>
			</div>
		</div>
		<!--
		
		-->
	</div>
	<div class="footer bg-pink-200">
		<div>footer</div>
		<p>h-[12vh] (12%)</p>
	</div>
</div>

<style>
	.workbase {
		@apply fixed inset-0 m-1 flex-col space-y-1 bg-green-300 p-0;
		min-height: 99vh;
	}

	.workbase .header,
	.workbase .footer {
		@apply /* 高さ12% */ h-[12vh];
	}
	.workbase .body {
		@apply h-[calc(100vh-24vh-1rem)]; /* 12vh*2 とマージン調整残りの領域をすべて埋める */
		overflow: hideen; /* 必要に応じてスクロール */
	}
</style>
