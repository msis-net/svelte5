<!--アプリ本体-->
<script lang="ts">
</script>

<div class="workbase">
	<div class="body flex space-x-1 p-2 bg-gray-200">
		<div class="w-[20vw] flex flex-col bg-white">
			<div class="head h-[15vh] bg-green-200">
				<div>left:body:head/h-[15%]</div>
			</div>
			<div class="flex-grow overflow-auto bg-white">
				<div class="sample bg-orange-200">
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
			<div class="head h-[35vh] bg-green-200">
				<div>right:body:head/h-[35%]</div>
			</div>
			<div class="body flex-grow bg-white">
				<div>right:body</div>
			</div>
			<div class="foot h-[25vh] bg-blue-200">
				<div>right:body:foot/h-[25%]</div>
			</div>
		</div>
	</div>
</div>

<style>
	.workbase {
		@apply fixed inset-0 m-1 flex-col space-y-1 bg-green-300 p-0;
		min-height: 99vh;
	}

	.workbase .body {
		@apply h-[100vh]; /* 12vh*2 とマージン調整残りの領域をすべて埋める */
		overflow: hideen; /* 必要に応じてスクロール */
	}

	.sample div {
		@apply border-b;
	}
</style>
