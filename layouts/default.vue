<template>
	<div class="layout layout-default" :class="[loggedIn ? '' : 'needs-login']">
		<div v-if="user && !user.loggedin">
			<layout-header />
			<nuxt />
			<layout-footer />
		</div>
		<div v-else class="login">
			<h4>Login</h4>
			<div class="input-field">
				<label>e-mail</label>
				<input v-model="login" type="text" />
			</div>
			<div v-if="login" class="input-field">
				<button class="button">
					<span class="button__text"> Send me a magic link</span>
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import LayoutHeader from '~/components/layout/header.vue';
import LayoutFooter from '~/components/layout/footer.vue';

export default {
	components: {
		LayoutHeader,
		LayoutFooter
	},
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
	}
};
</script>

<style lang="scss">
@import '~tools';
.layout {
	display: grid;
	grid-template-columns: 320px auto;
	grid-gap: 0px;
	@media #{$medium-down} {
		grid-template-columns: 1fr;
		grid-template-rows: auto auto;
	}
	&.needs-login {
		display: flex;
		width: 100%;
		height: 100vh;
		justify-content: center;
		align-items: center;
	}
}
.login {
	padding: grid(0.5);
	background-color: color(White);
	border-radius: 1rem;
	box-shadow: 0 -0.25rem 0 0 color(Black, 0.25) inset;
	h4 {
		padding: 1rem 0;
	}
}
</style>
