<template>
	<div class="project-status">
		<button v-if="!STATUS.saved" class="button" @click="saveProject">
			<span class="button__text">
				<span>{{ $t('buttons.save') }}</span>
				<span>{{ STATUS.changes }}</span>
			</span>
		</button>
		<span v-else>{{ $t('status.up-to-date') }}</span>
	</div>
</template>

<script>
export default {
	computed: {
		STATUS: {
			get() {
				return this.$store.state.project.status;
			}
		}
	},
	methods: {
		saveProject() {
			this.$store.dispatch('project/SAVE_PROJECT');
		}
	}
};
</script>

<style>
.project-status {
	position: fixed;
	top: 1rem;
	right: 1rem;
}
</style>
