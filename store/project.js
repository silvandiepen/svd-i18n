const storeCache = 500; // 500 in sec is 5 min
Date.time = function() {
	const now = new Date();
	return now.getTime() / 1000;
};

const PATH_VALUE = (Obj, path, value = null) => {
	if (path.length === 1 && Obj[path[0]]) {
		if (value == null) return Obj[path[0]];
		else Obj[path[0]] = value;
	} else if (path.length === 2 && Obj[path[0]] && Obj[path[0]][path[1]]) {
		if (value == null) return Obj[path[0]][path[1]];
		else Obj[path[0]][path[1]] = value;
	} else if (path.length === 3 && Obj[path[0]] && Obj[path[0]][path[1]] && Obj[path[0]][path[1]][path[2]]) {
		if (value == null) return Obj[path[0]][path[1]][path[2]];
		else Obj[path[0]][path[1]][path[2]] = value;
	} else if (
		path.length === 4 &&
		Obj[path[0]] &&
		Obj[path[0]][path[1]] &&
		Obj[path[0]][path[1]][path[2]] &&
		Obj[path[0]][path[1]][path[2]][path[3]]
	) {
		if (value == null) return Obj[path[0]][path[1]][path[2]][path[3]];
		else Obj[path[0]][path[1]][path[2]][path[3]] = value;
	} else {
		return '';
	}
};

export const state = () => ({
	projects: {},
	project: {},
	current_value: [],
	current: 0,
	UPDATE: 0,
	status: {
		saved: true,
		changes: 0
	}
});

export const mutations = {
	SET_PROJECTS(state, projects) {
		state.projects = projects;
		state.lastFetched = Date.time();
		state.update = Date.now();
	},
	SET_PROJECT(state, project) {
		state.project = project.data;
		state.current = project.id;
		state.update = Date.now();
	},
	SAVED_PROJECT(state) {
		state.status.changes = 0;
		state.status.saved = true;
	},
	SET_KEY(state, key) {
		state.key = key;
	},
	SET_VALUE(state, value) {
		PATH_VALUE(state.project[value[0]], state.key.split('.'), value[1]);
		state.status.saved = false;
		state.status.changes = state.status.changes + 1;
	}
};

export const getters = {
	ACTIVE_PROJECT: (state) => {
		return state.current;
	},
	PROJECT: (state) => {
		return state.project;
	},
	PROJECT_NAME: (state) => {
		if (state.current > 0) {
			let project = state.projects.filter((project) => {
				return project.id == state.current;
			});
			return project[0].name;
		} else {
			return '';
		}
	},
	KEY: (state) => {
		return state.key;
	},
	KEY_VALUE: (state) => (lang) => {
		if (state.key) {
			let path = state.key.split('.');
			return PATH_VALUE(state.project[lang], path);
		} else {
			return '';
		}
	},
	PROJECTS: (state) => {
		return state.projects;
	},
	CURRENT_LANGUAGES: (state) => {
		return Object.keys(state.project);
	},
	PROJECT_KEYS: (state) => {
		let keys = {};
		Object.keys(state.project).forEach((lang) => {
			keys = { ...keys, ...state.project[lang] };
		});
		return keys;
	}
};
export const actions = {
	SET_KEY({ commit }, key) {
		commit('SET_KEY', key);
	},
	SET_VALUE({ commit }, value) {
		commit('SET_VALUE', value);
	},
	async SAVE_PROJECT({ commit }) {
		const dummy = { test: 'henk', test2: 'peter' };

		const data = await this.$axios.$post(`/project/save`, {
			params: {
				id: state.current,
				data: JSON.stringify(dummy)
			}
		});
		console.log(data);
		commit('SAVED_PROJECT', data);
	},
	async LOAD_PROJECT({ commit }, id) {
		let project = { id: id };
		project.data = await this.$axios.$get(`/project/${id}`);
		commit('SET_PROJECT', project);
	},
	async FETCH_PROJECTS({ state, commit }) {
		if (!state.lastFetched || state.lastFetched + storeCache < Date.time()) {
			const projects = await this.$axios.$get('/project/list', {
				params: {
					ID: 1
				}
			});
			commit('SET_PROJECTS', projects);
		}
	}
};
