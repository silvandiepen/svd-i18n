export default function({ isHMR, app, store, route, params, error, redirect }) {
	const defaultLocale = app.i18n.fallbackLocale;

	store.dispatch('i18n/LOAD_LOCALES');

	if (app.i18n && app.i18n.messages && !Object.keys(app.i18n.messages).length) {
		delete app.i18n.messages;
		Object.defineProperty(app.i18n, 'messages', store.state.i18n.messages);
	}

	// If middleware is called from hot module replacement, ignore it
	if (isHMR) {
		return;
	}
	// Get locale from params
	const locale = params.lang || defaultLocale;
	if (!store.state.i18n.locales.includes(locale)) {
		return error({ message: 'This page could not be found.', statusCode: 404 });
	}
	// Set locale
	store.commit('i18n/SET_LANG', locale);
	app.i18n.locale = store.state.i18n.locale;
	// If route is /<defaultLocale>/... -> redirect to /...
	if (locale === defaultLocale && route.fullPath.indexOf('/' + defaultLocale) === 0) {
		const toReplace = '^/' + defaultLocale + (route.fullPath.indexOf('/' + defaultLocale + '/') === 0 ? '/' : '');
		const re = new RegExp(toReplace);
		return redirect(route.fullPath.replace(re, '/'));
	}
}
