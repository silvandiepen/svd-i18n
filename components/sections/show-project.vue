<template>
	<section class="show-project">
		<div class="row center">
			<div class="column small-full">
				<ul v-if="currentProject" class="files__list">
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
	computed: {
		currentProject: {
			get() {
				return this.$store.getters['files/getCurrentProject'];
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
