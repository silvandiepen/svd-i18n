import Vue from 'vue';

export const state = () => ({
	set: {},
	current: null,
	currentKey: null,
	updatedProject: 0
});

export const mutations = {
	setFiles(state, file) {
		if (state.current && file.filename) {
			Vue.set(state.set[state.current].data, file.filename.split('.')[0], file);
		}
		state.updatedProject = Date.now();
	},
	removeProject(state, project) {
		delete state.set[project];
	},
	newProject(state, value) {
		state.set[value] = { name: value, data: {} };
		state.current = value;
		state.updatedProject = Date.now();
	},
	setCurrentProject(state, value) {
		state.current = value;
	},
	setKey(state, value) {
		Object.keys(state.set[state.current].data).forEach((idx) => {
			if (value && value.path) {
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
			}
		});

		state.updatedProject = Date.now();
	},
	SET_CURRENT_KEY(state, value) {
		state.currentKey = value;
	}
};

export const getters = {
	PROJECT: (state) => {
		return state.set[state.current];
	},
	PROJECT_NAME: (state) => {
		if (state.current) {
			return state.current;
		} else {
			return null;
		}
	},
	PROJECT_KEYS: (state) => {
		let keys = {};
		if (state.set[state.current].data && Object.keys(state.set[state.current].data).length > 0) {
			Object.keys(state.set[state.current].data).forEach((lang) => {
				keys = { ...keys, ...state.set[state.current].data[lang].data };
			});
		}
		return keys;
	},
	CURRENT_VALUES: (state) => {
		const current = state.set[state.current].data;
		const values = Object.keys(current).map((lang) => {
			const currentLang = current[lang].data;
			if (state.currentKey) {
				const currentArray = state.currentKey.split('.');

				return currentArray.reduce((accum, curr, index) => {
					if (index === 0) {
						if (currentLang[curr]) {
							accum = currentLang[curr];
						}
					} else {
						if (accum[curr]) {
							accum = accum[curr];
						}
					}
					return accum;
				}, {});
			} else {
				return [];
			}
		});
		console.log(values);
		return values;
	},
	CURRENT_LANGUAGES: (state) => {
		let values = [];
		const current = state.set[state.current].data;
		Object.keys(current).forEach((lang) => {
			values.push(lang);
		});
		return values;
	},
	PROJECT_LANGUAGES: (state) => (project) => {
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
	SET_CURRENT_KEY({ commit }, value) {
		commit('SET_CURRENT_KEY', value);
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
