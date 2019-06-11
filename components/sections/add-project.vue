<template>
	<section class="new-project">
		<div class="row center">
			<div class="column small-full medium-half">
				<div class="row">
					<div class="column small-full">
						<fieldset>
							<label>New fileset</label>
							<input v-model="project" type="text" />
							<button v-if="project" class="button" @click="saveProject()">
								<span class="button__text">Save fileset</span>
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

<style></style>
