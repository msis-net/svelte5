import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		paths: {
			base: '/apps'
		},
		csrf: {
			checkOrigin: false
		},
		routes: {
			exclude: ['/socket.io/*']
		}
	},
	preprocess: vitePreprocess()
};

export default config;
