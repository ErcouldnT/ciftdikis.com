import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params.product) {
		return {
			name: params.product,
		};
	}

	throw error(404, 'Not found');
}
