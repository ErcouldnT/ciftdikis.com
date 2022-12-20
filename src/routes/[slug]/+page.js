import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const slug = params.slug.trim().toLowerCase().replaceAll(" ", "-");

	if (slug) {
		return {
			slug: slug
		};
	}

	throw error(404, 'Not found');
}
