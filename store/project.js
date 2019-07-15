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
	key: null,
	refresh: false,
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
		state.refresh = false;
	},
	SET_PROJECT(state, project) {
		state.project = project.data;
		state.current = project.id;
		state.key = null;
		state.update = Date.now();
	},
	SAVED_PROJECT(state) {
		state.status.changes = 0;
		state.status.saved = true;
	},
	SET_KEY(state, key) {
		state.key = key;
		state.update = Date.now();
	},
	UNSET_KEY: (state) => {
		state.key = null;
	},
	SET_VALUE(state, value) {
		if (state.key !== null && state.key.split('.')) {
			PATH_VALUE(state.project[value[0]], state.key.split('.'), value[1]);
		}
	},
	SET_CHANGE(state) {
		state.status.changes = state.status.changes + 1;
		state.status.saved = false;
	},
	DO_REFRESH: ({ state, dispatch }) => {
		state.refresh = true;
		dispatch('FETCH_PROJECTS');
		dispatch('LOAD_PROJECT', state.current);
		state.update = Date.now();
	}
};

export const getters = {
	ACTIVE_PROJECT: (state) => {
		return state.current;
	},
	PROJECT: (state) => {
		return state.project;
	},
	PROJECT_INFO: (state) => {
		return state.projects.filter((project) => {
			return project.name == state.current;
		});
	},
	PROJECT_NAME: (state) => {
		if (state.current > 0) {
			let project = state.projects.filter((project) => {
				return project.id == state.current;
			});
			return project[0].name;
		} else {
			return state.current;
		}
	},

	KEY: (state) => {
		return state.key;
	},
	KEY_VALUE: (state) => (value) => {
		if (value[1]) {
			let path = value[1].split('.');
			return PATH_VALUE(state.project[value[0]], path);
		} else if (state.key) {
			let path = state.key.split('.');
			return PATH_VALUE(state.project[value[0]], path);
		} else {
			return '';
		}
	},
	VALUE_TYPE: (state) => (key) => {
		const value = PATH_VALUE(state.project['en'], key.split('.'));
		return typeof value;
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
	CHANGED({ commit }) {
		commit('SET_CHANGE');
	},
	SET_KEY({ commit }, key) {
		commit('SET_KEY', key);
	},
	UNSET_KEY({ commit }, key) {
		commit('UNSET_KEY', key);
	},
	SET_VALUE({ commit }, value) {
		commit('SET_VALUE', value);
	},
	REFRESH({ commit }) {
		commit('DO_REFRESH');
	},
	async SAVE_PROJECT({ state, commit }) {
		const formData = new FormData();
		let projectID = state.current;
		if (isNaN(projectID)) {
			let project = state.projects.filter((project) => {
				return project.name == state.current;
			});
			projectID = project[0].id;
		}
		formData.append('id', projectID);
		formData.append('data', JSON.stringify(state.project));

		const data = await this.$axios.$post(`/project/save`, formData);
		console.log(data);
		commit('SAVED_PROJECT', data);
	},
	async LOAD_PROJECT({ commit }, id) {
		let project = { id: id };
		project.data = await this.$axios.$get(`/project/${id}`);
		commit('SET_PROJECT', project);
	},
	async FETCH_PROJECTS({ commit }) {
		const projects = await this.$axios.$get('/project/list', {
			params: {
				ID: 1
			}
		});
		commit('SET_PROJECTS', projects);
	}
};
