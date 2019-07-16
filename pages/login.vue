<template>
	<div class="layout layout-login">
		<div class="login">
			<div v-if="user.status === 'login' || user.status === 'no-user'">
				<h4>Login</h4>
				<div class="input-field">
					<input
						v-model="email"
						placeholder="email"
						name="email"
						type="email"
						autofocus
						required
						@keyup.enter="loginCheck"
					/>
					<div class="message">
						<small v-if="user.status === 'no-user'">This user doesn't exist.</small>
					</div>
				</div>
				<div v-if="email" class="input-field">
					<button class="button" @click="loginCheck">
						<span class="button__text"> Send me a code</span>
					</button>
				</div>
			</div>
			<form v-if="user.status === 'check-code' || user.status == 'wrong-code'">
				<h4>Check code</h4>
				<p class="small">
					You should receive a code in your email. Please enter that code here.
				</p>
				<div class="input-field input-field--code">
					<label>code</label>
					<input v-model="code" min="1000" max="9999" type="number" autofocus @keyup.enter="codeCheck" />
					<div class="message">
						<small v-if="user.status === 'wrong-code'">Your code is wrong.</small>
					</div>
				</div>
				<div v-if="code > -1" class="input-field">
					<button class="button" @click="codeCheck">
						<span class="button__text">Login</span>
					</button>
				</div>
			</form>
			<div v-if="user.status === 'logged-in'">
				<h3>😃</h3>
			</div>
		</div>
		<div class="register-cta">
			<p>
				No account yet?
				<button class="button">
					Register
				</button>
				here
			</p>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'default',
	data() {
		return {
			email: '',
			code: null
		};
	},
	computed: {
		user: {
			get() {
				return this.$store.state.user;
			}
		}
	},
	watch: {
		'user.status': function() {
			const _this = this;
			console.log('status changed to:' + this.$store.state.user.status);
			if (_this.$store.state.user.status === 'logged-in') {
				console.log('go to the app');
				setTimeout(() => {
					_this.goToApp();
				}, 500);
			}
		}
	},
	async asyncData({ store }) {
		await store.dispatch('user/CHECK_STATUS');
	},
	methods: {
		loginCheck() {
			console.log('Checking login..');
			this.$store.dispatch('user/CHECK_LOGIN', this.email);
		},
		codeCheck() {
			console.log('Checking code..');
			this.$store.dispatch('user/CHECK_CODE', this.code);
		},
		goToApp() {
			console.log('Go to the app..');
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
	flex-direction: column;
}
.register-cta {
	.button {
		display: inline-block;
	}
	color: color(White, 0.5);
	padding: 1rem;
	font-size: 0.75rem;
}
.login {
	padding: grid(0.5);
	max-width: 320px;
	background-color: color(White);
	border-radius: 1rem;
	box-shadow: 0 -0.25rem 0 0 color(Black, 0.25) inset;
	@include min-(padding, 0.5, 32);
	h4 {
		padding: 1rem 0;
	}
}
.input-field--code {
	input {
		width: 100%;
		text-align: center;
		font-size: 24px;
		border-radius: 1.5rem;
	}
}
</style>
