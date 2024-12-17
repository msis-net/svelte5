<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('1.発行形態の確認OQS-IF-001,002');
		console.log('2.重複チェック事前処理OQS-IF-101,102');
		appInit();
	});

	function appInit() {
		try {
			// @ts-ignore
			FileMaker.PerformScript('Init', '');
		} catch (e) {
			console.log(e);
		}
	}

	function initHospinfo(data: any) {
		alert(data);
		console.log('data:', data);
	}
</script>

<div class="">
	<!-- ヘッダー -->
	<header class="bg-blue-500 shadow">
		<nav class="p-2">
			<div>ナビゲーション</div>
		</nav>
	</header>

	<!-- メインコンテンツ -->
	<main class="h-full w-full bg-blue-300 px-2 py-2">
		<section class="bg-green-300 md:flex">
			<div class="flex-auto md:space-y-1">
				<div class="patient md:flex md:space-x-1">
					<input id="id" type="text" placeholder="ID" class="md:w-32" />
					<div id="name" class="md:w-1/4 md:flex-auto"><span data-ruby="カナ">名前</span></div>
					<div id="sex" class="md:w-12 md:text-center">性</div>
					<div id="birthday" class="md:w-28">S41.11.13</div>
					<div id="age" class="md:w-12 md:text-center">99</div>
				</div>
				<div class="patient md:flex md:space-x-1">
					<input id="date" type="text" placeholder="診察日" class="md:w-32" />
					<div id="hkncmb" class="flex-auto">保険</div>
					<div id="sryka" class=" flex-auto">診療科</div>
				</div>
			</div>
			<div id="doctor" class="flex bg-green-100 p-2 md:w-1/4">
				<div class="flex-auto">
					<div id="drcd" class="">10001</div>
					<div id="drname" class="text-nowrap">徳川　イエヤス</div>
				</div>
				<div class="flex w-16 items-center bg-slate-400 text-center">
					<button class="mx-auto border">署名</button>
				</div>
			</div>
		</section>
		<!-- ステータスセクション -->
		<section class="status mt-2 bg-green-300 md:flex md:space-x-1">
			<div class="flex-1">同意情報</div>
			<div class="flex-1">処方箋種類</div>
			<div class="flex-1">リフィール</div>
		</section>
		<!-- コンテンツセクション -->
		<section class="content mt-2 bg-green-300 md:flex md:space-x-1">
			<div class="history md:w-44">履歴</div>
			<div class="edit flex-auto">
				本体:CSVに変換する

				<button onclick={initHospinfo}>test</button>
			</div>
		</section>
		<!-- 確認セクション -->
		<section class="check mt-2 bg-green-300 md:flex md:space-x-1">
			<div class="md:w-44">病名</div>
			<div class="flex-auto">重複チェック</div>
		</section>
		<!-- 実行セクション-->
		<section class="exec mt-2 bg-green-300 md:flex md:space-x-1">
			<div class="flex-1">再印刷</div>
			<div class="flex-1">調剤結果</div>
			<div class="flex-1">取消</div>
			<div class="flex-1">変更</div>
			<div class="flex-1">ID検索</div>

			<div class="flex-1">登録</div>
		</section>
	</main>

	<!-- フッター -->
	<footer class="bg-red-50">
		<div class="p-2">
			<div>フッター</div>
		</div>
	</footer>
</div>

<style>
	header,
	footer {
		display: block;
	}

	.patient div,
	.status div,
	.content div,
	.check div,
	.exec div {
		@apply px-2 py-1;
		background-color: pink;
	}

	.exec div {
		@apply rounded-md text-center;
	}
	div {
		@apply border border-gray-600;
	}
	[data-ruby] {
		position: relative;
	}
	[data-ruby]::before {
		content: attr(data-ruby);
		position: absolute;
		top: -1.2em;
		left: 0;
		right: 0;
		margin: auto;
		font-size: 0.5em;
	}
	/*幅が768i以上の時*/
	@media (min-width: 768px) {
		header,
		footer {
			display: none;
		}
		.content {
			height: clamp(120px, calc(55vh), calc(90vh));
			/*height: calc(40vh);*/
		}
	}
</style>
