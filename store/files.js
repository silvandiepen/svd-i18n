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
	},
	setKey(state, value) {
		Object.keys(state.set[state.current].data).forEach((idx) => {
			let path = value.path.split('.');
			const tempState = state.set[state.current].data[idx].data;
			switch (path.length) {
				case 2:
					tempState[value.value] = tempState[path[1]];
					delete tempState[path[1]];
					break;
				case 3:
					tempState[path[1]][value.value] = tempState[path[1]][path[2]];
					delete tempState[path[1]][path[2]];
					break;
				case 4:
					tempState[path[1]][path[2]][value.value] = tempState[path[1]][path[2]][path[3]];
					delete tempState[path[1]][path[2]][path[3]];
					break;
				case 5:
					tempState[path[1]][path[2]][path[3]][value.value] = tempState[path[1]][path[2]][path[3]][path[4]];
					delete tempState[path[1]][path[2]][path[3]][path[4]];
					break;
			}
		});
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
	setKey({ commit }, value) {
		commit('setKey', value);
	},
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
