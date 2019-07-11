export default async function({ store, redirect }) {
	// If the user is not authenticated
	// store.dispatch('user/CHECK_STATUS');

	if (store.state.user.status !== 'logged-in') {
		if (store.state.i18n.locale) {
			return redirect(`/${store.state.i18n.locale}/login`);
		} else {
			return redirect('/login');
		}
	}
}
