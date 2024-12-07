<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<div>
		<div>$page.params.id: {$page.params.id}</div>
		<div>$page.route.id: {$page.route.id}</div>
		<div>$page.url.href: {$page.url.href}</div>
		<div>$page.url.origin: {$page.url.origin}</div>
		<div>$page.url.host: {$page.url.host}</div>
		<div>$page.url.hostname: {$page.url.hostname}</div>
		<div>$page.url.port: {$page.url.port}</div>
		<div>$page.url.pathname: {$page.url.pathname}</div>
	</div>
	<h1>About this app</h1>

	<p>
		This is a <a href="https://svelte.dev/docs/kit">SvelteKit</a> app. You can make your own by typing
		the following into your command line and following the prompts:
	</p>

	<pre>npx sv create</pre>

	<p>
		The page you're looking at is purely static HTML, with no client-side interactivity needed.
		Because of that, we don't need to load any JavaScript. Try viewing the page's source, or opening
		the devtools network panel and reloading.
	</p>

	<p>
		The <a href="/sverdle">Sverdle</a> page illustrates SvelteKit's data loading and form handling. Try
		using it with JavaScript disabled!
	</p>
</div>
