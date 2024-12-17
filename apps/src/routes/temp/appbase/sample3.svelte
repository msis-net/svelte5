<script lang="ts">
	export let width = 0;
	export let height = 0;
	export let scale = 1;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div id="tr_root" style:transform={`scale(${scale})`} class="w-full">
	<div id="login-inner" style:width={`${width}px`} style:height={`${height}px`}>
		<header class="header">
			<img class="icon" src="img/orca-cl-logo.svg" />
			<p class="title">WebORCA</p>
			<button id="printer-button">
				<img src="img/config.svg" />
			</button>
		</header>
		<div class="login-body">
			<div class="main">
				<form class="form">
					<div class="gtk-label left middle">ユーザー</div>
					<input
						class="gtk-panda-entry"
						type="text"
						autocomplete="username"
						name="user"
						id="user"
						required="required"
						data-ime="ASCII"
					/>
					<div style="height: 20px;"></div>
					<div class="gtk-label left middle">パスワード</div>
					<input
						class="gtk-panda-entry"
						type="password"
						autocomplete="current-password"
						name="pass"
						id="pass"
						required="required"
						data-ime="ASCII"
					/>
					<div style="height: 30px;"></div>
					<button type="submit" class="gtk-button">ログイン</button>
				</form>
			</div>
			<div class="bottom">
				<a href="log_download.html" target="_blunk">操作ログ</a>
			</div>
		</div>
		<footer class="footer">
			<img src="img/foot-logo.png" />
		</footer>
	</div>
</div>

<style>
	html,
	body {
		width: 100%;
		height: 100%;
		margin: auto;
		padding: 0;
		-webkit-text-size-adjust: 100%;
	}

	* {
		box-sizing: border-box;
	}

	#tr_root {
		width: 100%;
		height: 100%;
		transform-origin: 0 0;
	}

	#root {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	#login-inner {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
		font-size: 14px;
		line-height: 1.428571429;
		color: #333;
		background-color: #fff;
	}

	.header {
		width: 100%;
		height: 50px;
		background-color: #dadada;
		color: #555;
		border-bottom: solid 1px #e7e7e7;
		padding: 0 20px;
		font-size: 18px;
		overflow: visible;
		white-space: nowrap;
		line-height: 20px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.header .icon {
		height: 25px;
	}

	.header .title {
		width: 0;
		flex: 1;
		padding-left: 10px;
	}

	.footer {
		height: 50px;
		background-color: #dadada;
		color: #555;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer img {
		height: 50%;
	}

	.login-body {
		background-color: #e6e6e6;
		width: 100%;
		height: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.login-body .main {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		flex: 1;
	}

	.login-body .form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 300px;
		height: 300px;
	}

	.login-body .form .gtk-label {
		width: 100%;
		height: 25px;
		padding-left: 8px;
	}

	.login-body .form .gtk-panda-entry {
		width: 100%;
		height: 40px;
		padding-left: 8px;
		border-radius: 3px;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5);
		border: none !important;
	}

	.login-body .form .gtk-button {
		width: 80%;
		height: 50px;
	}

	.login-body .bottom {
		display: flex;
		justify-content: flex-end;
		align-items: flex-end;
		width: 100%;
		padding: 5px 10px;
	}

	.gtk-label,
	.gtk-panda-entry {
		position: static;
	}

	.gtk-button {
		position: static;
		border: none;
		padding: 0;
		font-size: 14px;
		letter-spacing: 0;
		white-space: pre;
		overflow: hidden;
		border-radius: 3px;
		background-image: linear-gradient(-180deg, #ffffff 0%, #eeeeee 99%);
		color: #000;
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.5);
	}

	#printer-button {
		width: 35px;
		height: 35px;
		background: none;
		border: none;
		outline: none;
		transform-origin: center;
	}

	#printer-button:active {
		transform: scale(1.08);
	}

	#printer-button img {
		width: 100%;
		height: 100%;
	}

	#login-debug-text {
		position: fixed;
		left: 10px;
		bottom: 10px;
		color: #0005;
		pointer-events: none;
		font-size: 10px;
		width: 40%;
	}

	button:focus:not(:focus-visible) {
		outline: none !important;
		box-shadow:
			inset 0 0 0 2px #2c5fc5,
			0 0 0 1px white;
	}

	button:focus-visible,
	input:focus-visible,
	textarea:focus-visible {
		outline: none !important;
		box-shadow:
			inset 0 0 0 2px #2c5fc5,
			0 0 0 1px white !important;
	}
</style>
