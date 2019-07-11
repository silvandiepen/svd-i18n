<template>
	<section class="show-project">
		<div class="row center">
			<div v-if="renderComponent && PROJECT" class="column small-full">
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
	data() {
		return {
			renderComponent: true
		};
	},
	computed: {
		PROJECT: {
			get() {
				return this.$store.getters['project/PROJECT'];
			}
		},
		UPDATE() {
			return this.$store.state.project.update;
		}
	},
	watch: {
		UPDATE: function() {
			this.forceRerender();
		}
	},
	methods: {
		forceRerender() {
			// Remove my-component from the DOM
			this.renderComponent = false;
			this.$nextTick(() => {
				// Add the component back in
				this.renderComponent = true;
			});
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.show-project {
	border-bottom: 1px solid color(Black, 0.1);
	background-color: color(White);
}
</style>
