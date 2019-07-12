export const actions = {
	async nuxtServerInit({ dispatch }) {
		await dispatch('i18n/LOAD_LOCALES');
		await dispatch('i18n/SET_LANG', 'en');
	}
};
