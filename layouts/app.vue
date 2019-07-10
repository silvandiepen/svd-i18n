<template>
	<div class="layout layout-app">
		<layout-header />
		<nuxt />
		<layout-footer />
	</div>
</template>

<script>
import LayoutHeader from '~/components/layout/header.vue';
import LayoutFooter from '~/components/layout/footer.vue';

export default {
	middleware: 'authenticated',
	components: {
		LayoutHeader,
		LayoutFooter
	}
};
</script>

<style lang="scss">
@import '~tools';
.layout-app {
	display: grid;
	grid-template-columns: 320px auto;
	grid-gap: 0px;
	@media #{$medium-down} {
		grid-template-columns: 1fr;
		grid-template-rows: auto auto;
	}
}
</style>
