/**[OData]
 * getDepartment
 * ONS_module.fmp12
 */
import { json } from '@sveltejs/kit';
import fetch from 'node-fetch';
import https from 'https';
import { FMS_HOST, odataContext, odataAccount, odataPassword } from '$lib/Constant';

export async function POST(request: any) {
	try {
		//const url = new URL(request.url);
		const param = await request.request.json();

		const contextPath = param.contextPath;
		const schdDta = param.schdata;
		//console.log('kanricd', kanricd);
		const oURL =
			'https://' +
			FMS_HOST +
			odataContext +
			`/ONS_module/config?$select=code,name&$filter=enable eq 1`;

		const auth = 'Basic ' + Buffer.from(odataAccount + ':' + odataPassword).toString('base64');
		console.log('oURL', oURL);
		console.log('auth', auth);
		//console.log('Request parameters:', param);
		/*
		const response = await fetch(oURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: auth
			},
			agent: new https.Agent({
				rejectUnauthorized: false
			})
		});

		if (!response.ok) {
			console.error('Response status:', response.status);
			console.error('Response status text:', response.statusText);
			const errorText = await response.text();
			console.error('Error response:', errorText);
			return json(
				{ error: `API request failed: ${response.status} ${response.statusText}` },
				{ status: response.status }
			);
		}

		const res = await response.json();
		//console.log('API Response:', res);
		return json(res);
		*/
	} catch (error) {
		console.error('Error in POST handler:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
}
