import Vue from 'vue';

export const state = () => ({
	set: {},
	current: null
});

export const mutations = {
	setFiles(state, file) {
		if (state.current) {
			Vue.set(state.set[state.current].data, file.filename.split('.')[0], file);
		}
	},
	removeProject(state, project) {
		delete state.set[project];
	},
	newProject(state, value) {
		state.set[value] = { name: value, data: {} };
		state.current = value;
	},
	setCurrentProject(state, value) {
		state.current = value;
	}
};

export const getters = {
	getCurrentProject: (state) => {
		return state.set[state.current];
	},
	getCurrentProjectName: (state) => {
		if (state.current) {
			return state.current;
		} else {
			return null;
		}
	},
	getCurrentProjectLanguages: (state) => {
		if (state.set[state.current]) {
			return Object.keys(state.set[state.current].data);
		} else {
			return null;
		}
	},
	getProjectLanguages: (state) => (project) => {
		if (state.set[project]) {
			return Object.keys(state.set[project].data);
		} else {
			return null;
		}
	}
};
export const actions = {
	createProject({ commit }, value) {
		commit('newProject', value);
	},
	removeProject({ commit }, value) {
		commit('removeProject', value);
	},
	setCurrentProject({ commit }, value) {
		commit('setCurrentProject', value);
	},
	setProjectFiles({ commit }, value) {
		commit('setFiles', value);
	}
};
