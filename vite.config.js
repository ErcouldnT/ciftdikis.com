import { sveltekit } from '@sveltejs/kit/vite';
import { isoImport } from 'vite-plugin-iso-import';
import removeConsole from 'vite-plugin-remove-console';

const config = {
	plugins: [sveltekit(), isoImport(), removeConsole()]
};

export default config;
