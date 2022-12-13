// export const csr = false;
import { error } from '@sveltejs/kit';
import kategoriler from '../../../config/kategoriler';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const categoryKey = params.category.toLowerCase();
	const category = kategoriler[categoryKey];

	if (category) {
		return {
			categoryKey,
			category
		};
	}

	throw error(404, 'Not found');
}
