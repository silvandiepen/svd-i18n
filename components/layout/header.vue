<template>
	<header id="header" class="header">
		<div class="header__top">
			<h3 class="header__logo">
				<nuxt-link to="/">
					i18n
				</nuxt-link>
			</h3>
		</div>

		<ProjectList class="header__projects"></ProjectList>
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
			<LanguageSelector class="header__languages"></LanguageSelector>
		</div>
	</header>
</template>

<script>
import project from '~/package.json';
export default {
	components: {
		ProjectList: () => import('~/components/sections/project-list.vue'),
		LanguageSelector: () => import('~/components/elements/language-selector.vue')
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
		},
		currentLanguage() {
			return this.$store.state.i18n.locale;
		}
	},
	mounted() {
		console.log('hoiiii');
		console.log(this.$i18n.locales);
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

.language-selector {
	&__link {
		display: block;
		text-transform: uppercase;
	}
}

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
	justify-content: space-between;
	@media #{$medium-down} {
		flex-direction: row;
	}
	@media #{$large-up} {
		flex-direction: column;
		max-height: 100vh;
		min-height: 100vh;
	}
	&__projects {
		@media #{$medium-down} {
			display: none;
		}
	}
	&__footer {
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
	&__details {
		display: flex;
		align-items: center;
		flex-direction: column;
		.button {
			@media #{$large-up} {
				margin-top: 1rem;
			}
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
