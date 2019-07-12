<template>
	<main class="page page--home">
		<div class="content">
			<h3>Welcome</h3>
		</div>
	</main>
</template>

<script>
export default {
	layout: 'app',
	components: {},
	computed: {
		PROJECTS: {
			get() {
				return this.$store.getters['project/PROJECTS'];
			}
		}
	},
	async asyncData({ store }) {
		await store.dispatch('project/FETCH_PROJECTS');
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
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: color(White);
	// general page styles

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
