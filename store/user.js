export const state = () => ({
	username: null,
	api_key: null,
	loggedin: false,
	email: null,
	status: 'login'
});

export const mutations = {
	LOGOUT(state) {
		state.username = null;
		state.api_key = null;
		state.loggedin = false;
		state.email = null;
		state.status = 'login';
	},
	LOGIN(state, value) {
		if (value.status) {
			state.status = value.status;
			switch (value.status) {
				case 'check-code':
					state.email = value.user.email;
					state.username = value.user.name;
					state.loggedin = false;
					break;
				case 'logged-in':
					state.session_id = value.session_id;
					state.loggedin = true;
					break;
			}
		} else {
			return;
		}
	}
};
export const actions = {
	async CHECK_STATUS({ state, commit }) {
		if (state.user && state.user.status == 'logged-in') {
			const logindata = await this.$axios.$get('/login/check', {
				params: {
					id: state.user.id,
					session_id: status.user.session_id
				}
			});
			if (logindata.status == 'logged-in') {
				commit('LOGIN', logindata);
			} else {
				commit('LOGOUT');
			}
		} else {
			commit('LOGOUT');
		}
	},
	async CHECK_LOGIN({ commit }, email) {
		const logindata = await this.$axios.$get('/login', {
			params: {
				email: email
			}
		});
		console.log('checking login', logindata);
		commit('LOGIN', logindata);
	},
	async LOGOUT({ commit }) {
		const data = await this.$axios.$get('/logout', {
			params: {
				id: state.user.id,
				session_id: status.user.session_id
			}
		});
		if (data.status == 'logged-out') {
			commit('LOGOUT');
		}
	},
	async CHECK_CODE({ state, commit }, code) {
		const logindata = await this.$axios.$get('/code', {
			params: {
				email: state.email,
				code: code
			}
		});
		console.log('checking code', logindata);

		commit('LOGIN', logindata);
	}
};
