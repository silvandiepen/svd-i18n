import Vue from 'vue';

export const state = () => ({
	set: {},
	current: null
});

export const mutations = {
	setFileset(state, file) {
		if (state.current) {
			Vue.set(state.set[state.current].data, file.filename.split('.')[0], file);
		}
	},
	newFileset(state, value) {
		state.set[value] = { name: value, data: {} };
		state.current = value;
	}
};

export const getters = {
	getCurrentSet: (state) => {
		return state.set[state.current];
	},
	getCurrentName: (state) => {
		return state.current;
	}
};
export const actions = {
	createFileset({ commit }, value) {
		commit('newFileset', value);
	},
	setFiles({ commit }, value) {
		commit('setFileset', value);
	}
};
