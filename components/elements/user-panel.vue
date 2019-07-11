<template>
	<div class="user">
		<p>Hi {{ USER.username }}</p>
		<button class="button" @click="logout">
			<span class="button__text">Log out</span>
		</button>
	</div>
</template>

<script>
export default {
	computed: {
		USER: {
			get() {
				return this.$store.state.user;
			}
		}
	},
	methods: {
		logout() {
			if (confirm('Are you sure you want to log out?')) {
				this.$store.dispatch('user/LOGOUT');
			}
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.user {
	padding: 1rem;
	color: color(White);
}
</style>
