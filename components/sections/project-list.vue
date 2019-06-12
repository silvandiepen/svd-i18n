<template>
	<div class="project-list">
		<div class="project-list__block">
			<h4>{{ $t('title.yourprojects') }}</h4>
			<ul class="project-list__list">
				<li
					v-for="(project, index) in projects"
					:key="index"
					class="project-list__item"
					:class="[currentProject == project.name ? 'project-list__item--current' : '']"
					@click="setActiveProject(project.name)"
				>
					<div class="project-list__content">
						<h5>{{ project.name }}</h5>
						<button class="button button--nude button--remove" @click="deleteProject(project.name)">
							<span class="icon button__icon icon-remove"></span>
						</button>
					</div>
					<div v-if="Object.keys(project.data).length > 0" class="project-list__languages">
						<LanguageLabel v-for="(value, key) in project.data" :key="key" :lang="key"></LanguageLabel>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	components: {
		LanguageLabel: () => import('~/components/elements/language-label.vue')
	},
	computed: {
		projects() {
			return this.$store.state.files.set;
		},
		currentProject() {
			return this.$store.getters['files/getCurrentProjectName'];
		}
	},
	methods: {
		setActiveProject(project) {
			this.$store.dispatch('files/setCurrentProject', project);
		},
		deleteProject(project) {
			this.$store.dispatch('files/removeProject', project);
		}
	}
};
</script>

<style lang="scss">
@import '~tools';
.project-list {
	padding: grid(2 0);
	background-color: color(IceLight);
	&__list {
		display: flex;
		flex-direction: column;
	}
	&__item {
		position: relative;
		background-color: lighten(IceLight, 5%);
		& + & {
			margin-top: 1rem;
		}
		&--current {
			background-color: color(White);
			box-shadow: 0 0 1rem 0 color(Black, 0.25);
		}
		.button--remove {
			position: absolute;
			right: 0;
			top: 0;
		}
	}
	&__content {
		padding: 1rem;
	}
	&__languages {
		border-top: 1px solid color(IceLight);
		padding: 1rem;
	}
}
</style>
