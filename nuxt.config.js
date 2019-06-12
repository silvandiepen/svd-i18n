import pkg from './package';
import config from './config/latest';

if (config.env === 'development') {
	process.env.DEBUG = 'nuxt:*';
}

module.exports = {
	mode: 'universal',
	env: {
		environment: config.env || 'production'
	},

	/*
	 ** Headers of the page
	 */
	head: {
		title: 'i18n',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},

	/*
	 ** Customize the progress bar color
	 */
	loading: {
		color: '#000000' //,
		// failedColor: '#000000'
	},
	generate: {
		routes: ['/']
	},
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [{ src: '~/plugins/vuex-persist.js', ssr: false }],

	/*
	 ** Nuxt.js modules
	 */
	modules: [
		'nuxt-rfg-icon',
		'@nuxtjs/google-analytics',
		'@nuxtjs/pwa',
		'@nuxtjs/axios',
		[
			'nuxt-i18n',
			{
				seo: true,
				locales: [{ code: 'nl', iso: 'nl-NL', file: 'nl.json' }, { code: 'en', iso: 'en-GB', file: 'en.json' }],
				strategy: 'prefix',
				lazy: true,
				langDir: 'locales/',
				defaultLocale: 'en',
				rootRedirect: 'en',
				parsePages: false,
				vuex: {
					moduleName: 'i18n'
				}
			}
		]
	],

	/*
	 ** GoogleAnalytics module configuration
	 */
	'google-analytics': {
		id: 'UA-456653-9',
		disabled: false
	},

	/*
	 ** Axios module configuration
	 */
	axios: {
		retry: {
			retries: 3
		},
		baseURL: config.api
	},

	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** Build plugins
		 */
		plugins: [],

		// babel: {
		// 	babelrc: true,
		// 	cacheDirectory: undefined
		// },

		transpile: [], // Name of NPM packages to be transpiled

		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
			// Define toolset shortcut
			config.resolve.alias['~tools'] = 'assets/scss/tools.scss';
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				});
			}
		}
	},

	/*
	 ** Global CSS
	 */
	css: [
		{
			src: '~assets/scss/app.scss',
			lang: 'scss'
		}
	]
};
