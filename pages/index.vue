<template>
	<main class="page page--home">
		<AddProject v-if="showAddProject"></AddProject>
		<AddFiles v-if="showAddFiles"></AddFiles>
		<ShowProject v-if="showProject"></ShowProject>
		<section class="project-list__section">
			<ProjectList></ProjectList>
		</section>
	</main>
</template>

<script>
export default {
	components: {
		AddProject: () => import('~/components/sections/add-project.vue'),
		AddFiles: () => import('~/components/sections/add-files.vue'),
		ShowProject: () => import('~/components/sections/show-project.vue'),
		ProjectList: () => import('~/components/sections/project-list.vue')
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
		showProject: {
			get() {
				return this.$store.state.ui.showProject;
			}
		}
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
.page {
	width: 100%;
	max-height: 100vh;
	overflow: scroll;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: color(White);
	// general page styles
	&--home {
		// specific home styles
	}
	section {
		width: 100%;
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
