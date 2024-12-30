<!--アプリ本体-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { Common } from '$lib/Common';

	import { page } from '$app/stores';
	import { Rx, Fcl, Ons, Web, Orca } from '$lib/stores/rx.svelte';
	import Patient from './patient.svelte';
	import Department from './department.svelte';
	import HealthInsurance from './healthInsurance.svelte';
	import Onsent from './onsent.svelte';
	import Priscription from './priscription.svelte';
	import Refills from './refills.svelte';

	import Medicalget01 from './medicalget01.svelte';
	import Medicalget02 from './medicalget02.svelte';

	// 初期値を設定
	const url = new URL($page.url.href);
	Rx.setPtid(url.searchParams.get('ptid') ?? '');
	Rx.setYmd(url.searchParams.get('ymd') ?? '');
	Rx.setCmbnum(url.searchParams.get('cmbnum') ?? '');
	Rx.setSryka(url.searchParams.get('sryka') ?? '');

	//import type { PageServerLoad } from './$types';
	//const { data } = $props<{ data: PageServerLoad }>();

	$effect(() => {});

	onMount(async () => {
		if (Rx.ymd) {
			Common.setFormData('date', Common.wareki(Rx.ymd));
		}

		const titleElement = document.getElementById('title');
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
			Web.setCertificate(config.certificate);
			Web.setCertPassword(config.cert_password);
			Web.setCertExpiry(config.cert_expiry);
			Web.setLoginId(config.login_id);
			Web.setLoginPassword(config.login_password);

			// ORCA Information
			Orca.setOrcaCertificate(config.orca_certificate);
			Orca.setOrcaCertPassword(config.orca_cert_password);
			Orca.setOrcaCertExpiry(config.orca_cert_expiry);
			Orca.setOrcaId(config.orca_id);
			Orca.setOrcaPassword(config.orca_password);
			// ... rest of the config settings ...
			/*
			console.log('Config loaded:');
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
				certificate: Web.certificate,
				certPassword: Web.certPassword,
				certExpiry: Web.certExpiry,
				loginId: Web.loginId,
				loginPassword: Web.loginPassword
			});
			console.log('ORCA:', {
				certificate: Orca.orcaCertificate,
				certPassword: Orca.orcaCertPassword,
				certExpiry: Orca.orcaCertExpiry,
				id: Orca.orcaId,
				password: Orca.orcaPassword
			});
			*/
			// 医療機関コードと施設名の表示

			if (titleElement) {
				titleElement.textContent =
					Fcl.hospCode?.length === 10 && Fcl.facilityName
						? `医療機関情報[ ${Fcl.hospCode} ] ${Fcl.facilityName}`
						: '左歯車アイコンから各種設定を行ってください';
				//titleElement.style.color = 'blue';
			}
		} catch (error) {
			console.error('Error loading config:', error);
			// エラーハンドリングを追加（例：ユーザーへの通知）
			alert('設定ファイルの読み込みに失敗しました。');
			if (titleElement) {
				titleElement.textContent =
					'設定ファイルの読み込みに失敗しました。この画面を一旦閉じて再度開き直してみてください。';
				titleElement.style.color = 'red';
			}
		}
		modal = document.getElementById('modal');
		if (modal) {
			modal.style.display = 'none';
		}
	});

	// モーダル要素を取得
	let modal: HTMLElement | null;
	let isModalOpen = false;
	let Perform_Date = $state<string | undefined>(undefined);
	let Department_Code = $state<string | undefined>(undefined);
	let Sequential_Number = $state<string | undefined>(undefined);

	export function showModal(date: string, sryka: string, seqno: string) {
		console.log('showModal', date, sryka, seqno);
		Perform_Date = date;
		Department_Code = sryka;
		Sequential_Number = seqno;
		if (modal) {
			modal.style.display = 'block';
			isModalOpen = true;
		}
	}

	function hideModal() {
		if (modal) {
			modal.style.display = 'none';
			isModalOpen = false;
		}
	}
</script>

<div class="workbase">
	<div class="header bg-pink-200">
		<div class="absolute">TXPMedical API for 電子処方箋V1.0</div>
		<div class="flex">
			<div id="title" class="flex-auto text-center"></div>

			<button
				aria-label="Settings"
				onclick={() => (window.location.href = '/config/priscription')}
				title="Close"
				class="absolute right-0"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="20px"
					viewBox="0 -960 960 960"
					width="20px"
					fill="#5f6368"
					><path
						d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
					/></svg
				>
			</button>
		</div>
		<!-- Patientセクション-->
		<section class="bg-green-300 flex">
			<div class="flex-auto space-y-1">
				<div class=" flex space-x-1">
					<input id="Patient_ID" type="text" placeholder="ID" class="w-32 bg-white" disabled />
					<Patient />
				</div>
				<div class=" flex space-x-1">
					<input id="date" type="text" placeholder="診察日" class="w-32 bg-white" disabled />
					<HealthInsurance />
					<Department />
				</div>
			</div>
			<div id="doctor" class="flex bg-green-100 p-2 w-1/4">
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
		<section class="status bg-green-300 md:flex md:space-x-1">
			<div class="flex-1 mt-0.5">
				<Onsent />
			</div>
			<div class="flex-1">
				<Priscription />
			</div>
			<div class="flex-1">
				<Refills />
			</div>
		</section>
	</div>

	<div class="body flex space-x-1 bg-gray-200">
		<div class="flex-auto flex flex-col bg-white">
			<div class="head h-[10vh] bg-green-200">
				<div>left:body:head/h-[10%]</div>
			</div>
			<div class="flex-grow overflow-auto bg-white">
				<div class="">
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
				<div>right:body:foot/h-[15%]</div>
			</div>
		</div>
		<div class="w-[20vw] flex flex-col bg-white">
			<div class="head h-[5vh] bg-green-200">
				<div class="label flex w-full text-[0.9em]">
					<div class="border-l">番号</div>
					<div class="flex-auto">診察日</div>
					<div class="">科</div>
					<div class="border-r">保険</div>
				</div>
			</div>
			<div class="flex-grow overflow-auto bg-white">
				<Medicalget01 {showModal} />
			</div>
		</div>
	</div>
	<div class="footer bg-pink-200">
		<div>footer</div>
		<p>h-[12vh] (12%)</p>
	</div>
</div>

<!--モーダルウィンドウ

	onclick={hideModal}
	onkeypress={(e) => e.key === 'Enter' && hideModal()}
-->

<div
	id="modal"
	role="button"
	tabindex="0"
	class="hidden fixed inset-0 m-0 p-0 bg-gray-500 bg-opacity-30"
>
	<div class="flex items-center justify-center h-full w-full">
		<Medicalget02
			date={Perform_Date ?? ''}
			sryka={Department_Code ?? ''}
			seqno={Sequential_Number ?? ''}
			{hideModal}
		/>
	</div>
</div>

<style>
	.workbase {
		@apply fixed inset-0 m-1 flex-col space-y-1 bg-green-300 p-0;
		min-height: 99vh;
	}

	.workbase .header {
		@apply h-[20vh];
	}
	.workbase .footer {
		@apply h-[12vh];
	}
	.workbase .body {
		@apply h-[calc(100vh-32vh-1rem)]; /* headerとfooterの割合から計算してbodyの高さにする */
		overflow: hideen; /* スクロールなし*/
	}
	.label div {
		@apply w-10 text-center bg-gray-100 py-1 border-t border-l border-gray-300;
	}
</style>
