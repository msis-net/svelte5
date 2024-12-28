import { writable } from 'svelte/store';

let Patient_Information = $state<any>({});

let ptid = $state('');
let ymd = $state('');
let cmbnum = $state('');
let sryka = $state('');

export const Rx = {
	get Patient_Information() {
		return Patient_Information;
	},
	get ptid() {
		return ptid;
	},
	get ymd() {
		return ymd;
	},
	get sryka() {
		return sryka;
	},
	get cmbnum() {
		return cmbnum;
	},
	setPatient_Information(data: string) {
		Patient_Information = data;
	},
	setPtid(data: string) {
		ptid = data;
	},
	setYmd(data: string) {
		ymd = data;
	},
	setPatient(data: any) {
		Patient_Information = data;
	},
	setSryka(data: string) {
		sryka = data;
	},
	setCmbnum(data: string) {
		cmbnum = data;
	}
};

//
let prefCode = $state('');
let facilityType = $state('');
let facilityCode = $state('');
let facilityName = $state('');
let hospCode = $derived(prefCode + facilityType + facilityCode);
export const Fcl = {
	get prefCode() {
		return prefCode;
	},
	get facilityType() {
		return facilityType;
	},
	get facilityCode() {
		return facilityCode;
	},
	get facilityName() {
		return facilityName;
	},
	get hospCode() {
		return hospCode;
	},
	setPrefCode(data: string) {
		prefCode = data;
	},
	setFacilityType(data: string) {
		facilityType = data;
	},
	setFacilityCode(data: string) {
		facilityCode = data;
	},
	setFacilityName(data: any) {
		facilityName = data;
	}
};

//ONSI資格確認端末
let onsHost = $state('');
let onsReq = $state('');
let onsRes = $state('');
let onsUser = $state('anonymous');
let onsPass = $state('');

export const Ons = {
	get onsHost() {
		return onsHost;
	},
	get onsReq() {
		return onsReq;
	},
	get onsRes() {
		return onsRes;
	},
	get onsUser() {
		return onsUser;
	},
	get onsPass() {
		return onsPass;
	},
	setOnsHost(data: string) {
		onsHost = data;
	},
	setOnsReq(data: string) {
		onsReq = data;
	},
	setOnsRes(data: string) {
		onsRes = data;
	},
	setOnsUser(data: string) {
		onsUser = data;
	},
	setOnsPass(data: string) {
		onsPass = data;
	}
};

//WebAPI情報
let webUrl = $state('');
let certificate = $state('');
let certPassword = $state('');
let certExpiry = $state('');
let loginId = $state('');
let loginPassword = $state('');

export const Web = {
	get webUrl() {
		return webUrl;
	},
	get certificate() {
		return certificate;
	},
	get certPassword() {
		return certPassword;
	},
	get certExpiry() {
		return certExpiry;
	},
	get loginId() {
		return loginId;
	},
	get loginPassword() {
		return loginPassword;
	},
	setCertificate(data: string) {
		certificate = data;
	},
	setCertPassword(data: string) {
		certPassword = data;
	},
	setCertExpiry(data: string) {
		certExpiry = data;
	},
	setLoginId(data: string) {
		loginId = data;
	},
	setLoginPassword(data: string) {
		loginPassword = data;
	},
	setWebUrl(data: string) {
		webUrl = data;
	}
};

//ORCA関連
let orcaUrl = $state('');
let orcaCertificate = $state('');
let orcaCertPassword = $state('');
let orcaCertExpiry = $state('');
let orcaId = $state('');
let orcaPassword = $state('');

export const Orca = {
	get orcaUrl() {
		return orcaUrl;
	},
	get orcaCertificate() {
		return orcaCertificate;
	},
	get orcaCertPassword() {
		return orcaCertPassword;
	},
	get orcaCertExpiry() {
		return orcaCertExpiry;
	},
	get orcaId() {
		return orcaId;
	},
	get orcaPassword() {
		return orcaPassword;
	},
	setOrcaCertificate(data: string) {
		orcaCertificate = data;
	},
	setOrcaCertPassword(data: string) {
		orcaCertPassword = data;
	},
	setOrcaCertExpiry(data: string) {
		orcaCertExpiry = data;
	},
	setOrcaId(data: string) {
		orcaId = data;
	},
	setOrcaPassword(data: string) {
		orcaPassword = data;
	},
	setOrcaUrl(data: string) {
		orcaUrl = data;
	}
};
