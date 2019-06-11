<template>
	<header id="header" class="header">
		<h3 class="header__logo">
			i18n
		</h3>
		<div class="header__details">
			<h4>
				{{ currentSet }}
			</h4>
			<button class="button" @click="showUpload">
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
		currentSet: {
			get() {
				return this.$store.getters['files/getCurrentName'];
			}
		}
	},
	methods: {
		showUpload() {
			this.$store.dispatch('ui/showUpload');
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
	&__header {
		display: flex;
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
