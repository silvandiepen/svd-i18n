<template>
	<section class="show-project">
		<div class="row center">
			<div v-if="PROJECT" class="column small-full">
				<i18nPanels></i18nPanels>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	components: {
		i18nPanels: () => import('~/components/elements/i18n-panels.vue')
	},

	computed: {
		PROJECT: {
			get() {
				return this.$store.getters['project/PROJECT'];
			}
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.show-project {
	background-color: color(White);
}
</style>
