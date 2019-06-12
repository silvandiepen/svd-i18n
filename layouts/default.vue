<template>
	<div class="layout layout-default">
		<layout-header />
		<nuxt />
		<layout-footer />
	</div>
</template>

<script>
import LayoutHeader from '~/components/layout/header.vue';
import LayoutFooter from '~/components/layout/footer.vue';

export default {
	components: {
		LayoutHeader,
		LayoutFooter
	}
};
</script>

<style lang="scss">
@import '~tools';
.layout {
	display: grid;
	grid-template-columns: 320px auto;
	grid-gap: 0px;
}
</style>
