<template>
	<div class="code-check"></div>
</template>

<script>
export default {
	created() {
		this.codeCheck(this.$route.params.code);
	},

	methods: {
		codeCheck(code) {
			this.$store.dispatch('user/CHECK_CODE', code);
			this.goToLogin();
		},
		goToLogin() {
			this.$router.push({
				path: '/login'
			});
			if (this.$store.state.i18n.locale) {
				this.$router.push({
					path: `/${this.$store.state.i18n.locale}/login`
				});
			} else {
				this.$router.push({
					path: '/login'
				});
			}
		}
	}
};
</script>

<style></style>
