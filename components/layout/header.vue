<template>
	<header id="header" class="header">
		<div class="header__top">
			<h3 class="header__logo">
				<nuxt-link to="/">
					i18n
				</nuxt-link>
			</h3>
		</div>

		<div v-if="PROJECTS" class="header__projects">
			<ProjectList></ProjectList>
		</div>

		<div class="header__footer">
			<UserPanel></UserPanel>
			<div class="header__details">
				<nuxt-link class="button button--yellow" to="/new-project">
					<span class="button__icon icon-add"></span>
					<span class="button__text">{{ $t('buttons.newproject') }}</span>
				</nuxt-link>
			</div>
			<ExportFiles v-if="PROJECT"></ExportFiles>
			<LanguageSelector class="header__languages"></LanguageSelector>
		</div>
	</header>
</template>

<script>
import project from '~/package.json';
export default {
	components: {
		ProjectList: () => import('~/components/project/project-list.vue'),
		UserPanel: () => import('~/components/elements/user-panel.vue'),
		LanguageSelector: () => import('~/components/elements/language-selector.vue'),
		ExportFiles: () => import('~/components/elements/export-files.vue')
	},
	data() {
		return {
			projectName: project.name
		};
	},
	computed: {
		PROJECTS: {
			get() {
				return this.$store.getters['project/PROJECTS'];
			}
		},
		PROJECT: {
			get() {
				return this.$store.getters['project/PROJECT'];
			}
		},

		currentLanguage() {
			return this.$store.state.i18n.locale;
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
	display: flex;
	justify-content: space-between;
	@media #{$medium-down} {
		flex-direction: row;
	}
	@media #{$large-up} {
		flex-direction: column;
		max-height: 100vh;
		min-height: 100vh;
	}
	&__top {
		padding: 2rem;
	}
	&__projects {
		height: 100vh;
		padding: 2rem;
		@media #{$medium-down} {
			display: none;
		}
	}
	&__footer {
		background-color: color(Plum);
		@media #{$medium-down} {
			display: none;
		}
	}
	&__languages {
		padding-left: 1rem;
		@media #{$medium-down} {
			display: none;
		}
	}
	&__export {
		padding: 1rem;
	}
	&__details {
		padding: 1rem;
		// display: flex;
		// align-items: center;
		// flex-direction: column;
		// .button {
		// 	@media #{$large-up} {
		// 		margin-top: 1rem;
		// 	}
		// }
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
