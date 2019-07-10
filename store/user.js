export const state = () => ({
	username: null,
	api_key: null,
	loggedin: false,
	email: null
});

export const mutations = {
	CHECK_LOGIN(state, value) {
		// console.log(value);
		state.loggedin = true;
	}
};
export const actions = {
	CHECK_LOGIN({ commit }, login) {
		commit('CHECK_LOGIN', login);
	}
};
