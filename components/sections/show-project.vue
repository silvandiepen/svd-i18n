<template>
	<section class="show-project">
		<div class="row center">
			<div class="column small-full">
				<ul v-if="currentProject && renderComponent" class="files__list">
					<li v-for="(value, key, idx) in currentProject.data" :key="idx" class="files__file">
						<div class="i18n-data">
							<h6 class="i18n-data__key">
								{{ value.filename }}
							</h6>
							<i18nValues :data="currentProject.data[key].data"></i18nValues>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	components: {
		i18nValues: () => import('~/components/elements/i18n-values.vue')
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
				return this.$store.getters['files/getCurrentProject'];
			}
		}
	},
	watch: {
		updatedProject: function() {
			console.log('should rerender');
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
