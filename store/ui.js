export const state = () => ({
	showAddFiles: false,
	showAddProject: true,
	showProject: false
});

export const mutations = {
	setAddFiles(state, value) {
		state.showAddFiles = value;
	},
	setAddProject(state, value) {
		state.showAddProject = value;
	},
	setProject(state, value) {
		state.showProject = value;
	}
};
export const actions = {
	showAddFiles({ commit }) {
		commit('setAddFiles', true);
	},
	hideAddFiles({ commit }) {
		commit('setAddFiles', false);
	},
	showAddProject({ commit }) {
		commit('setAddProject', true);
	},
	hideAddProject({ commit }) {
		commit('setAddProject', false);
	},
	showProject({ commit }) {
		commit('setProject', true);
	},
	hideProject({ commit }) {
		commit('setProject', false);
	}
};
