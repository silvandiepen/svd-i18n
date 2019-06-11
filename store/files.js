export const state = () => ({
	files: []
});

export const mutations = {
	add(state, file) {
		state.files.push(file);
	}
	// remove(state, { todo }) {
	// 	state.list.splice(state.list.indexOf(todo), 1);
	// },
	// toggle(state, todo) {
	// 	todo.done = !todo.done;
	// }
};
