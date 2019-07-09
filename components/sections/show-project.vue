<template>
	<section class="show-project">
		<div class="row center">
			<div v-if="currentProject && renderComponent" class="column small-full">
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
		updatedProject() {
			return this.$store.state.files.updatedProject;
		},
		currentProject: {
			get() {
				return this.$store.getters['files/PROJECT'];
			}
		}
	},
	watch: {
		updatedProject: function() {
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
	background-color: color(White);
}
</style>
