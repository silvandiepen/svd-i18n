export default function({ store, redirect }) {
	// If the user is not authenticated
	if (!store.state.user.loggedin) {
		if (store.state.i18n.locale) {
			return redirect(`/${store.state.i18n.locale}/login`);
		} else {
			return redirect('/login');
		}
	}
}
