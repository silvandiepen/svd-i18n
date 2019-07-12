<template>
	<main class="page page--project">
		<!-- <AddProject v-if="showAddProject"></AddProject> -->
		<!-- <AddFiles v-if="showAddFiles"></AddFiles> -->
		<ProjectStatus></ProjectStatus>
		<ProjectPanels v-if="PROJECT"></ProjectPanels>
		<section class="project-list__section">
			<ProjectList></ProjectList>
		</section>
	</main>
</template>

<script>
export default {
	layout: 'app',
	components: {
		// AddProject: () => import('~/components/sections/add-project.vue'),
		// AddFiles: () => import('~/components/sections/add-files.vue'),
		ProjectStatus: () => import('~/components/project/project-status.vue'),
		ProjectPanels: () => import('~/components/project/project-panels.vue'),
		ProjectList: () => import('~/components/project/project-list.vue')
	},
	computed: {
		showAddProject: {
			get() {
				return this.$store.state.ui.showAddProject;
			}
		},
		showAddFiles: {
			get() {
				return this.$store.state.ui.showAddFiles;
			}
		},
		PROJECT: {
			get() {
				return this.$store.getters['project/PROJECT'];
			}
		}
	},
	async asyncData({ store }) {
		await store.dispatch('project/FETCH_PROJECTS');
	},
	created() {
		console.log(this.$route);
		this.$store.dispatch('project/LOAD_PROJECT', this.$route.params.slug);
	}
};
</script>

<style lang="scss">
@import '~tools';
@import '~silicons';

@include silicon-math-times('.icon-remove');
@include silicon-math-plus('.icon-add');
@include silicon-arrow-basic-right('.icon-upload');

.add-files,
.new-project {
	padding: grid(1) 0;
	@media #{$small-only} {
		padding: $mobile-padding;
	}
}
.hide-upload {
	opacity: 0;
	height: 0;
}

fieldset {
	padding: 2rem;
	background-color: color(IceLight, 0.5);
	border: 1px solid color(IceLight);
	border-radius: $base-border-radius;
	input[type='text'] {
		border: 1px solid color(Ice);
		padding: 1rem;
		font-size: 1rem;
		border-radius: $base-border-radius;
	}
	.button {
		display: inline-flex;
	}
}

.files {
	&__file {
		width: 100%;
	}
	&__list {
		display: flex;
		flex-wrap: nowrap;
		overflow: scroll;
	}
}
</style>
