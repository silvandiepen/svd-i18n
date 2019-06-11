export const state = () => ({
	showUpload: false
});

export const mutations = {
	toggleUpload(state) {
		state.showUpload = !state.showUpload;
	},
	setUpload(state, value) {
		state.showUpload = value;
	}
};
export const actions = {
	showUpload({ commit }) {
		commit('setUpload', true);
	},
	hideUpload({ commit }) {
		commit('setUpload', false);
	}
};
