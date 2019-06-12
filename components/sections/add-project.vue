<template>
	<section class="new-project">
		<div class="row center">
			<div class="column small-full medium-half">
				<div class="row">
					<div class="column small-full">
						<h4>{{ $t('title.yourprojectname') }}</h4>
						<fieldset>
							<input
								v-model="project"
								:placeholder="$t('placeholder.yourprojectname')"
								type="text"
								@keyup.enter="saveProject()"
							/>
							<button v-if="project" class="button" @click="saveProject()">
								<span class="button__text">{{ $t('button.addproject') }}</span>
								<span class="button__icon icon-upload"></span>
							</button>
						</fieldset>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
export default {
	data() {
		return {
			project: null
		};
	},
	methods: {
		saveProject() {
			this.$store.dispatch('files/createProject', this.project);
			this.$store.dispatch('ui/showAddFiles');
			this.$store.dispatch('ui/hideAddProject');
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.new-project {
	background-color: color(White);
	border-bottom: 1px solid color(IceLight);
}
</style>
