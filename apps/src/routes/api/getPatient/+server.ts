/**
 * getPatient
 * odata経由でAD_ORCAのpatientmodを実行
 */
import { json } from '@sveltejs/kit';
import path from 'path';
import fs from 'fs';
import forge from 'node-forge';
import fetch from 'node-fetch';
import https from 'https';
import { Orca } from '$lib/stores/rx.svelte';

import { FMS_HOST, odataContext, odataAccount, odataPassword } from '$lib/Constant';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

export async function POST(request: any) {
	//const url = new URL(request.url);
	const ptid = await request.request.json();

	// 設定を読み込む
	const config = safeLoadConfig();
	//console.log(config);

	const orcaUrl = config.orcaUrl;
	const orcaId = config.orcaId;
	const orcaCertPassword = config.orcaCertPassword;
	const orcaCertificate = config.orcaCertificate;
	const orcaPassword = config.orcaPassword;

	// 証明書の読み込みと変換処理を修正
	const certPath = path.join(process.cwd(), 'static', 'cert', orcaCertificate);
	if (!fs.existsSync(certPath)) {
		throw new Error(`Certificate file not found: ${certPath}`);
	}

	// P12ファイルをPEMに変換
	const p12Buffer = fs.readFileSync(certPath);
	const p12Asn1 = forge.asn1.fromDer(forge.util.createBuffer(p12Buffer).bytes());
	const p12 = forge.pkcs12.pkcs12FromAsn1(p12Asn1, orcaCertPassword);

	// 証明書とプライベートキーを取得
	const certBags = p12.getBags({ bagType: forge.pki.oids.certBag })[forge.pki.oids.certBag];
	const keyBags = p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[
		forge.pki.oids.pkcs8ShroudedKeyBag
	];

	if (!certBags?.[0]?.cert || !keyBags?.[0]?.key) {
		throw new Error('Failed to extract certificate or private key from P12 file');
	}

	const certificate = forge.pki.certificateToPem(certBags[0].cert);
	const privateKey = forge.pki.privateKeyToPem(keyBags[0].key);

	// HTTPS エージェントの設定を修正
	const agent = new https.Agent({
		cert: certificate,
		key: privateKey,
		rejectUnauthorized: false // 開発時のみ。本番環境では true にすることを推奨
	});

	// リクエスト URL とヘッダー
	const requestUrl = orcaUrl + '/api01rv2/patientgetv2?id=' + ptid + '&format=json';
	const authHeader = 'Basic ' + Buffer.from(`${orcaId}:${orcaPassword}`).toString('base64');
	const headers = {
		'Content-type': 'application/xm',
		Authorization: authHeader
	};
	try {
		// Fetch リクエスト
		const response = await fetch(requestUrl, {
			method: 'GET',
			headers: headers,
			agent: agent
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('response', response.ok);
		// json() ヘルパーを使用してResponseオブジェクトを返す
		return json(data);
	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

// 設定ファイルの読み込みを安全に行う関数
// 設定ファイルの読み込みを安全に行う関数
const safeLoadConfig = () => {
	try {
		const configPath = path.join(process.cwd(), 'static', 'config.json');
		if (!fs.existsSync(configPath)) {
			throw new Error('Config file not found');
		}

		const content = fs.readFileSync(configPath, 'utf8');
		if (!content.trim()) {
			throw new Error('Config file is empty');
		}

		const config = JSON.parse(content);

		// 必項目のチェック
		/*
		const required = ['orcaUrl', 'orcaId', 'orcaPassword', 'orcaCertificate', 'orcaCertPassword'];
		for (const field of required) {
			if (!config[field]) {
				throw new Error(`Missing required field: ${field}`);
			}
		}*/

		return config;
	} catch (error) {
		console.error('Config error:', error);
		throw error;
	}
};
