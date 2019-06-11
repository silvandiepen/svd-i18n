<template>
	<main class="page page--home">
		<AddProject v-if="showAddProject"></AddProject>
		<AddFiles v-if="showAddFiles"></AddFiles>
		<ShowProject v-if="showProject"></ShowProject>
	</main>
</template>

<script>
export default {
	components: {
		AddProject: () => import('~/components/sections/add-project.vue'),
		AddFiles: () => import('~/components/sections/add-files.vue'),
		ShowProject: () => import('~/components/sections/show-project.vue')
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
	border-radius: $base-border-radius;

	padding: grid(1) 0;
}

.page {
	// general page styles
	&--home {
		// specific home styles
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

.upload {
	&__file {
	}
	&__list {
		width: 100%;
	}
	&__actions {
		position: absolute;
		right: 0;
		top: 0;
		padding: 1rem;
	}
	&__item {
		position: relative;
		background-color: color(IceLight, 0.5);
		border: 1px solid color(IceLight);
		& + & {
			margin-top: 0.25rem;
		}
		display: block;
		padding: 1rem;
		.icon-remove {
			font-size: 12px;
		}
	}
	&__buttons {
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 1rem 0;
	}
	&__upload-button,
	&__add-button {
	}
}
</style>
