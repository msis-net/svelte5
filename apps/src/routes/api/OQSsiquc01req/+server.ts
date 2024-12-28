/**
 * OQSsiquc01req
 */
import { json } from '@sveltejs/kit';
import { FMS_HOST } from '$lib/Constant';

export async function POST(request: any) {
	const url = new URL(request.url);
	console.log('url:', url);
}

//確認用：実運用はPOSTメソッドで行う
export async function GET(request) {
	const url = new URL(request.url);
	console.log('url:', url);
	return json({
		success: true,
		message: 'OQSsiquc01req GET endpoint'
	});
}
