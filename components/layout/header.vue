<template>
	<header id="header" class="header">
		<h3 class="header__logo">
			i18n
		</h3>
		<div class="header__details">
			<h4 v-if="currentSetName">
				{{ currentSetName }}
			</h4>
			<div v-if="currentSetLanguages" class="header__languages">
				<span
					v-for="(lang, index) in currentSetLanguages"
					:key="index"
					class="header__language"
					:class="`header__language--${lang}`"
				>
					{{ lang }}
				</span>
			</div>
			<button class="button" @click="showAddFiles">
				<span class="button__icon icon-add"></span>
				<span class="button__text">Add files</span>
			</button>
		</div>
	</header>
</template>

<script>
import project from '~/package.json';
export default {
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
		currentSetLanguages: {
			get() {
				return this.$store.getters['files/getCurrentProjectLanguages'];
			}
		}
	},
	methods: {
		showAddFiles() {
			this.$store.dispatch('ui/showAddFiles');
		}
	}
};
</script>

<style lang="scss">
@import '~tools';

.header {
	// Header styles
	// position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	background-color: color(IceLight);
	padding: grid(1);
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	&__languages {
		border: 1px solid red;
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
		.button {
			margin-left: 1rem;
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
	}
}
</style>
