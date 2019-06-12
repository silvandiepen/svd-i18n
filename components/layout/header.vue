<template>
	<header id="header" class="header">
		<div class="header__top">
			<h3 class="header__logo">
				<nuxt-link to="/">
					i18n
				</nuxt-link>
			</h3>
		</div>

		<ProjectList></ProjectList>
		<div class="header__details">
			<button v-if="currentSetName" class="button" @click="showAddFiles">
				<span class="button__icon icon-add"></span>
				<span class="button__text">{{ $t('buttons.addfiles') }}</span>
			</button>
			<button class="button button--yellow" @click="showAddProject">
				<span class="button__icon icon-add"></span>
				<span class="button__text">{{ $t('buttons.newproject') }}</span>
			</button>
		</div>
		<div class="header__footer">
			<div class="language-selector">
				<nuxt-link class="language-selector__link" to="/en">
					{{ $t('language.english') }}
				</nuxt-link>
				<nuxt-link class="language-selector__link" to="/nl">
					{{ $t('language.dutch') }}
				</nuxt-link>
			</div>
		</div>
	</header>
</template>

<script>
import project from '~/package.json';
export default {
	components: {
		ProjectList: () => import('~/components/sections/project-list.vue')
	},
	data() {
		return {
			projectName: project.name
		};
	},
	computed: {
		currentSetName: {
			get() {
				return this.$store.getters['files/getCurrentProjectName'];
			}
		}
	},
	methods: {
		showAddFiles() {
			this.$store.dispatch('ui/showAddFiles');
		},
		showAddProject() {
			this.$store.dispatch('ui/showAddProject');
		}
	}
};
</script>

<style lang="scss">
@import '~tools';

.highlight {
	position: fixed;
	top: 0;
	background-color: color(Plum);
	color: white;
	right: 0;
	padding: 1rem;
	z-index: 100;
}
.header {
	top: 0;
	left: 0;
	width: 100%;
	background-color: color(IceLight);
	padding: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-height: 100vh;
	min-height: 100vh;
	&__languages {
		padding-left: 1rem;
	}
	&__language {
		border: 1px solid color(Skyblue);
		background-color: color(Skyblue, 0.5);
		padding: 0.25rem;
		text-transform: uppercase;
		display: inline-block;
		font-size: 14px;
	}
	&__details {
		display: flex;
		align-items: center;
		flex-direction: column;
		.button {
			margin-top: 1rem;
		}
	}
	&__logo {
		background-color: color(Blue);
		display: inline-block;
		font-weight: bold;
		font-size: 1rem;
		padding: 0.75rem 1rem;
		border-radius: 4px;
		color: color(White);
		text-shadow: 1px 1px 0 color(BlueDark);
		a {
			text-decoration: none;
		}
	}
}
</style>
