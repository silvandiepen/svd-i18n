<template>
	<div class="layout layout-login">
		<div class="login">
			<h4>Login</h4>
			<div class="input-field">
				<label>e-mail</label>
				<input v-model="login" type="text" />
			</div>
			<div v-if="login" class="input-field">
				<button class="button" @click="loginCheck">
					<span class="button__text"> Send me a magic link</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'default',
	data() {
		return {
			login: ''
		};
	},
	computed: {
		user: {
			get() {
				return this.$store.state.user;
			}
		}
	},
	methods: {
		loginCheck() {
			this.$store.dispatch('user/CHECK_LOGIN', this.login);
			this.$router.push({
				path: '/'
			});
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.layout-login {
	display: flex;
	width: 100%;
	height: 100vh;
	justify-content: center;
	align-items: center;
}
.login {
	padding: grid(0.5);
	background-color: color(White);
	border-radius: 1rem;
	box-shadow: 0 -0.25rem 0 0 color(Black, 0.25) inset;
	@include min-(padding, 0.5, 32);
	h4 {
		padding: 1rem 0;
	}
}
</style>
