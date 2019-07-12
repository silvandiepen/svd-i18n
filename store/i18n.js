export const state = () => ({
	locales: ['en', 'nl'],
	locale: 'en',
	messages: {}
});

export const mutations = {
	SET_LANG(state, locale) {
		if (state.locales.includes(locale)) {
			state.locale = locale;
		}
	},
	SET_LOCALES(state, locales) {
		state.messages = locales;
	}
};

export const actions = {
	SET_LANG({ commit }, lang) {
		commit('SET_LANG', lang);
	},
	async LOAD_LOCALES({ commit }) {
		const locales = await this.$axios.$get(`/project/poliglott`);
		commit('SET_LOCALES', locales);
	}
};
