import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const ptid = url.searchParams.get('ptid');

	if (!ptid) {
		return json({ error: 'Patient ID is required' }, { status: 400 });
	}

	const response = await fetch(
		`http://localhost:8000/api01rv2/patientgetv2?id=${ptid}&format=json`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	if (!response.ok) {
		return json({ error: 'ORCA API error' }, { status: response.status });
	}

	const data = await response.json();
	return json(data);
};
