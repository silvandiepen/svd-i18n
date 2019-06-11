<template>
	<section class="files">
		<div class="row center">
			<div class="column small-full">
				<ul v-if="currentProject" class="files__list">
					<li v-for="(file, idx) in currentProject.data" :key="idx" class="files__file">
						<div class="i18n-data">
							<h6 class="i18n-data__key">
								{{ file.filename }}
							</h6>
							<i18nValues :data="file.data"></i18nValues>
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

<style></style>
