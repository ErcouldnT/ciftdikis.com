import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params.product) {
		return {
			productName: params.product.toLowerCase(),
		};
	}

	throw error(404, 'Not found');
}
