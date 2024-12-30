import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const ptid = url.searchParams.get('ptid');
	//console.log('ptid', ptid);
	/*
	if (!ptid) {
		return { patientData: null };
	}

	try {
		const response = await fetch(`/api/orca?context=/api01rv2/patientgetv2&id=${ptid}&format=json`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		const patientinfores = data?.patientinfores;
		//console.log('patientinfores', patientinfores);
		if (!patientinfores) {
			return { patientData: null };
		}

		const Api_Result = patientinfores.Api_Result;
		if (Number(Api_Result) === 0) {
			return {
				patientData: patientinfores
			};
		}

		return { patientData: null };
	} catch (error) {
		console.error('Error:', error);
		return { patientData: null };
	}
		*/
};
