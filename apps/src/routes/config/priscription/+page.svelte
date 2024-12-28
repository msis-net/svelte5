<script lang="ts">
	import '$lib/css/common.css';
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';
	import { page } from '$app/stores';
	import { Rx, Fcl, Ons, Web, Orca } from '$lib/stores/rx.svelte';

	import Organization from './organization.svelte';
	import ConfOns from './conf_ons.svelte';
	import ConfOnsweb from './conf_onsweb.svelte';
	import ConfOrca from './conf_orca.svelte';
	// 初期値を設定

	const url = new URL($page.url.href);

	$effect(() => {
		//console.log(p.pinfo); // true
	});

	onMount(async () => {
		const titleElement = document.getElementById('titleLabel');
		try {
			const response = await fetch('/config.json', {
				headers: {
					Accept: 'application/json',
					'Cache-Control': 'no-cache'
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const config = await response.json();

			// Facility Information
			Fcl.setPrefCode(config.pref_code);
			Fcl.setFacilityType(config.facility_type);
			Fcl.setFacilityCode(config.facility_code);
			Fcl.setFacilityName(config.facility_name);

			// ONS Information
			Ons.setOnsHost(config.ons_host);
			Ons.setOnsReq(config.ons_req);
			Ons.setOnsRes(config.ons_res);
			Ons.setOnsUser(config.ons_user);
			Ons.setOnsPass(config.ons_pass);

			// Web API Information
			Web.setWebUrl(config.webUrl);
			Web.setCertificate(config.certificate);
			Web.setCertPassword(config.certPassword);
			Web.setCertExpiry(config.certExpiry);
			Web.setLoginId(config.loginId);
			Web.setLoginPassword(config.loginPassword);
			// ORCA Information
			Orca.setOrcaUrl(config.orcaUrl);
			Orca.setOrcaCertificate(config.orcaCertificate);
			Orca.setOrcaCertPassword(config.orcaCertPassword);
			Orca.setOrcaCertExpiry(config.orcaCertExpiry);
			Orca.setOrcaId(config.orcaId);
			Orca.setOrcaPassword(config.orcaPassword);
			// ... rest of the config settings ...
			/*
			console.log('Facility:', {
				prefCode: Fcl.prefCode,
				facilityType: Fcl.facilityType,
				facilityCode: Fcl.facilityCode,
				facilityName: Fcl.facilityName,
				hospCode: Fcl.hospCode
			});
			console.log('ONS:', {
				host: Ons.onsHost,
				req: Ons.onsReq,
				res: Ons.onsRes,
				user: Ons.onsUser,
				pass: Ons.onsPass
			});
			console.log('Web API:', {
				webUrl: Web.webUrl,
				certificate: Web.certificate,
				certPassword: Web.certPassword,
				certExpiry: Web.certExpiry,
				loginId: Web.loginId,
				loginPassword: Web.loginPassword
			});
			console.log('ORCA:', {
				orcaUrl: Orca.orcaUrl,
				certificate: Orca.orcaCertificate,
				certPassword: Orca.orcaCertPassword,
				certExpiry: Orca.orcaCertExpiry,
				id: Orca.orcaId,
				password: Orca.orcaPassword
			});
			console.log(titleElement);
			*/
			if (titleElement) {
				titleElement.textContent =
					Fcl.hospCode?.length === 10 && Fcl.facilityName
						? `医療機関情報：[ ${Fcl.hospCode} ] ${Fcl.facilityName}`
						: '左歯車アイコンから各種設定を行ってください';
			}
		} catch (error) {
			//console.error('Error loading config:', error);
			// エラーハンドリングを追加（例：ユーザーへの通知）
			//alert('設定ファイルの読み込みに失敗しました。');
			if (titleElement) {
				titleElement.textContent =
					'設定ファイルの読み込みに失敗しました。この画面を一旦閉じて再度開き直してみてください。';
				titleElement.style.color = 'red';
			}
		}
	});

	async function handleSubmit() {
		try {
			const formData = new FormData();
			// Facility Information
			formData.append('pref_code', Fcl.prefCode);
			formData.append('facility_type', Fcl.facilityType);
			formData.append('facility_code', Fcl.facilityCode);
			formData.append('facility_name', Fcl.facilityName);
			formData.append('hosp_code', Fcl.hospCode);

			// ONS Information
			formData.append('ons_host', Ons.onsHost);
			formData.append('ons_req', Ons.onsReq);
			formData.append('ons_res', Ons.onsRes);
			formData.append('ons_user', Ons.onsUser);
			formData.append('ons_pass', Ons.onsPass);

			// Web API Information
			formData.append('webUrl', Web.webUrl);
			formData.append('certificate', Web.certificate);
			formData.append('certPassword', Web.certPassword);
			formData.append('certExpiry', Web.certExpiry);
			formData.append('loginId', Web.loginId);
			formData.append('loginPassword', Web.loginPassword);

			// ORCA Information
			formData.append('orcaUrl', Orca.orcaUrl);
			formData.append('orcaCertificate', Orca.orcaCertificate);
			formData.append('orcaCertPassword', Orca.orcaCertPassword);
			formData.append('orcaCertExpiry', Orca.orcaCertExpiry);
			formData.append('orcaId', Orca.orcaId);
			formData.append('orcaPassword', Orca.orcaPassword);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			console.log('Upload success:', result);
			alert('保存に成功しました');
		} catch (error: unknown) {
			console.error('Upload failed:', error);
			const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
			alert('アップロードに失敗しました: ' + errorMessage);
		}
	}
</script>

<div class="">
	<!-- ヘッダー -->
	<header class="">
		<div class="absolute">TXPMedical API for 電子処方箋V1.0</div>
		<nav class="text-sm flex">
			<div id="titleLabel" class="flex-auto text-center"></div>
			<div class="">
				<button
					aria-label="Settings"
					class="absolute right-0"
					onclick={() => window.history.back()}
				>
					戻る
				</button>
			</div>
		</nav>
	</header>

	<!-- メインコンテンツ -->

	<main class="h-full w-full bg-blue-300 px-2 py-2">
		<!-- ステータスセクション -->

		<section class="bg-green-300 md:space-x-1">
			<form class="space-y-1" onsubmit={handleSubmit}>
				<Organization />
				<ConfOns />
				<ConfOnsweb />
				<ConfOrca />
				<div class="p-4">
					<button
						type="submit"
						class="w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					>
						保存
					</button>
				</div>
			</form>
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

	section div {
		@apply border border-gray-500;
	}
	/*幅が640以上の時*/
	@media (min-width: 640px) {
		footer {
			display: none;
		}
	}
</style>
