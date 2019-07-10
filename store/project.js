// import { orderBy } from 'lodash';

const storeCache = 500; // 500 in sec is 5 min
Date.time = function() {
	const now = new Date();
	return now.getTime() / 1000;
};

export const state = () => ({
	projects: {},
	project: {},
	current: 0
});

export const mutations = {
	SET_PROJECTS(state, projects) {
		state.projects = projects;
		state.lastFetched = Date.time();
	},
	SET_PROJECT(state, project) {
		state.project = project.data;
		state.current = project.id;
	},
	SET_KEY(state, key) {
		state.key = key;
	}
};

export const getters = {
	ACTIVE_PROJECT(state) {
		return state.current;
	},
	PROJECT(state) {
		return state.project;
	},
	PROJECT_NAME(state) {
		return state.projects.filter((project) => {
			return project.id == state.current;
		})[0].name;
	},
	KEY(state) {
		return state.key;
	},
	PROJECTS(state) {
		return state.projects;
	},
	CURRENT_LANGUAGES(state) {
		return Object.keys(state.project);
	},
	PROJECT_KEYS(state) {
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
	async LOAD_PROJECT({ commit }, id) {
		let project = { id: id };
		project.data = await this.$axios.$get(`/project/${id}`);
		commit('SET_PROJECT', project);
	},
	async FETCH_PROJECTS({ state, commit }) {
		if (!state.lastFetched || state.lastFetched + storeCache < Date.time()) {
			const projects = await this.$axios.$get('/project/list');
			commit('SET_PROJECTS', projects);
		}
	}
};
