<script lang="ts">
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcomeFallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="bg-red-200">
	<h1 class="text-center">
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcomeFallback} alt="Welcome" />
			</picture>
		</span>
		SvelteKit app
	</h1>
	<div>画面サイズに応じたcontentsの自動拡大縮小</div>
	<div class="text-[0.6em]">
		<div></div>
		自動拡大縮小をやめるには/src/app.clas
		<div>中括弧の表示例:html ｛　font-size: 1.5vw;　}を省く</div>
	</div>
	<div class="flex space-x-4">
		<button
			class="pw-3 rounded-md border border-orange-500 bg-orange-600 bg-gradient-to-r from-orange-900 p-2 px-8 text-indigo-100 hover:bg-red-400"
			>button1</button
		>
		<button
			class="pw-3 rounded-md border border-blue-500 bg-blue-600 p-2 px-8 text-indigo-100 hover:bg-sky-400"
			>button2</button
		>
	</div>
	<div class="flex w-full border p-2">
		<div class="flex-1 border">
			右サイド
			<h1>h1テキスト</h1>
			<h2>h2テキスト</h2>
			<h3>h3テキスト</h3>
			<h4>h4テキスト</h4>
		</div>
		<div class="flex-1 border">
			左サイド
			<p class="text-4xl">p:text-4xlテキスト</p>
			<p class="text-3xl">p:text-3xlテキスト</p>
			<p class="text-2xl">p:text-2xlテキスト</p>
			<p class="">pテキスト</p>
			<div>div:テキスト</div>
			<div class="font-bold">テキスト</div>
			<div class="text-4xl">div:4xl</div>
		</div>
	</div>

	<Counter />
	<hr />
	<div>
		<div class="text-2xl">Apps</div>
		<div><a href="./priscription" class="href">priscription</a></div>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
	/*
	section {
		
		align-items: center;
		flex: 0.6;
	}*/
	/*
	h1 {
		width: 100%;
	}
	*/
	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
